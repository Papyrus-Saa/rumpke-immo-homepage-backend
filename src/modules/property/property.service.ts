import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { Property } from './entities/property.entity';
import { calculateDistance, getBoundsFromRadius } from '../../common/utils/geo.utils';

@Injectable()
export class PropertyService {
  constructor(
    @InjectRepository(Property)
    private propertyRepository: Repository<Property>,
  ) { }

  private transformProperty(property: Property) {
    if (!property) return null;

    const images = property.media
      ?.filter(m => m.type === 'IMAGE')
      .sort((a, b) => {
        if (a.is_primary) return -1;
        if (b.is_primary) return 1;
        return a.position - b.position;
      })
      .map(m => m.url) || [];

    return {
      ...property,
      images,
    };
  }

  async create(createPropertyDto: CreatePropertyDto) {
    const slug = createPropertyDto.title
      ?.toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '') || `property-${Date.now()}`;

    const reference_code = `REF-${Date.now()}-${Math.random().toString(36).substr(2, 5).toUpperCase()}`;

    const property = this.propertyRepository.create({
      ...createPropertyDto,
      slug,
      reference_code,
    });

    const saved = await this.propertyRepository.save(property);
    return this.findOne(saved.id);
  }

  async findAll() {
    const properties = await this.propertyRepository.find({
      relations: ['media'],
    });
    return properties.map(p => this.transformProperty(p));
  }

  async findNearby(lat: number, lng: number, radiusKm: number) {
    const bounds = getBoundsFromRadius(lat, lng, radiusKm);

    const properties = await this.propertyRepository.find({
      where: {
        latitude: Between(bounds.south, bounds.north),
        longitude: Between(bounds.west, bounds.east),
      },
      relations: ['media'],
    });

    const propertiesWithDistance = properties
      .map((property) => {
        if (!property.latitude || !property.longitude) return null;

        const distance = calculateDistance(
          lat,
          lng,
          property.latitude,
          property.longitude,
        );

        return {
          ...this.transformProperty(property),
          distance,
        };
      })
      .filter((p): p is NonNullable<typeof p> => p !== null && p.distance <= radiusKm)
      .sort((a, b) => a.distance - b.distance);

    return propertiesWithDistance;
  }

  async findInBounds(bounds: {
    north: number;
    south: number;
    east: number;
    west: number;
  }) {
    const properties = await this.propertyRepository.find({
      where: {
        latitude: Between(bounds.south, bounds.north),
        longitude: Between(bounds.west, bounds.east),
      },
      relations: ['media'],
    });
    return properties.map(p => this.transformProperty(p));
  }

  async findOne(id: string) {
    const property = await this.propertyRepository.findOne({
      where: { id },
      relations: ['media'],
    });
    if (!property) return null;
    return this.transformProperty(property);
  }

  async update(id: string, updatePropertyDto: UpdatePropertyDto) {
    await this.propertyRepository.update(id, updatePropertyDto);
    return this.findOne(id);
  }

  async remove(id: string) {
    await this.propertyRepository.delete(id);
    return { deleted: true };
  }
}

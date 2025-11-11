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

  create(createPropertyDto: CreatePropertyDto) {
    const property = this.propertyRepository.create(createPropertyDto);
    return this.propertyRepository.save(property);
  }

  findAll() {
    return this.propertyRepository.find();
  }

  /**
   * Busca propiedades cercanas a una ubicación dada
   */
  async findNearby(lat: number, lng: number, radiusKm: number) {
    // Calculamos bounds para filtrar eficientemente
    const bounds = getBoundsFromRadius(lat, lng, radiusKm);

    // Buscamos propiedades dentro del rectángulo
    const properties = await this.propertyRepository.find({
      where: {
        latitude: Between(bounds.south, bounds.north),
        longitude: Between(bounds.west, bounds.east),
      },
    });

    // Calculamos distancia exacta y filtramos por radio
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
          ...property,
          distance,
        };
      })
      .filter((p): p is NonNullable<typeof p> => p !== null && p.distance <= radiusKm)
      .sort((a, b) => a.distance - b.distance); // Ordenar por distancia

    return propertiesWithDistance;
  }

  /**
   * Busca propiedades dentro de los límites del mapa
   */
  async findInBounds(bounds: {
    north: number;
    south: number;
    east: number;
    west: number;
  }) {
    return this.propertyRepository.find({
      where: {
        latitude: Between(bounds.south, bounds.north),
        longitude: Between(bounds.west, bounds.east),
      },
    });
  }

  findOne(id: string) {
    return this.propertyRepository.findOne({ where: { id } });
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

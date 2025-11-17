import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { Property } from './entities/property.entity';
import { calculateDistance, getBoundsFromRadius } from '../../common/utils/geo.utils';
import { GeocodingService } from '../../common/services/geocoding.service';

@Injectable()
export class PropertyService {
  constructor(
    @InjectRepository(Property)
    private propertyRepository: Repository<Property>,
    private geocodingService: GeocodingService,
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

    let latitude = createPropertyDto.latitude;
    let longitude = createPropertyDto.longitude;

    if (!latitude || !longitude) {
      const address = this.geocodingService.buildAddress(
        createPropertyDto.address_line,
        createPropertyDto.city,
        createPropertyDto.postal_code,
        createPropertyDto.country,
      );

      if (address) {
        const result = await this.geocodingService.geocode(address);
        if (result) {
          latitude = result.latitude;
          longitude = result.longitude;
        }
      }
    }


    let createData: any = { ...createPropertyDto, slug, reference_code, latitude, longitude };
    if (typeof createPropertyDto.agent === 'string' && createPropertyDto.agent.trim().length > 0) {
      createData.agent = { id: createPropertyDto.agent };
    } else {
      delete createData.agent;
    }
    const property = this.propertyRepository.create(createData);

    const saved = await this.propertyRepository.save(property);
    const savedProperty = Array.isArray(saved) ? saved[0] : saved;
    return this.findOne(savedProperty.id);
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
    let updateData: any = { ...updatePropertyDto };
    if (typeof updatePropertyDto.agent === 'string') {
      updateData.agent = { id: updatePropertyDto.agent };
    } else if (updatePropertyDto.agent === undefined) {

      delete updateData.agent;
    }
    await this.propertyRepository.update(id, updateData);
    return this.findOne(id);
  }

  async remove(id: string) {
    await this.propertyRepository.delete(id);
    return { deleted: true };
  }

  async search(searchDto: any) {
    const {
      keyword,
      operation,
      type,
      status,
      priceMin,
      priceMax,
      bedroomsMin,
      bathroomsMin,
      totalAreaMin,
      totalAreaMax,
      builtAreaMin,
      builtAreaMax,
      yearBuiltMin,
      yearBuiltMax,
      energyLabel,
      country,
      city,
      postalCode,
      latitude,
      longitude,
      radiusKm,
      hasGarage,
      hasPool,
      hasGarden,
      hasBalcony,
      hasTerrace,
      petsAllowed,
      isFurnished,
      categoryIds,
      amenityIds,
      tagIds,
      agentId,
      orderBy = 'createdAt',
      order = 'DESC',
      page = 1,
      limit = 20,
    } = searchDto;

    const query = this.propertyRepository
      .createQueryBuilder('property')
      .leftJoinAndSelect('property.media', 'media')
      .leftJoinAndSelect('property.categories', 'category')
      .leftJoinAndSelect('property.amenities', 'amenity')
      .leftJoinAndSelect('property.tags', 'tag')
      .leftJoinAndSelect('property.agent', 'agent');

    if (keyword) {
      query.andWhere(
        '(property.title_de ILIKE :keyword OR property.title_en ILIKE :keyword OR property.title_es ILIKE :keyword OR property.title_pl ILIKE :keyword OR property.title_nl ILIKE :keyword OR property.description_de ILIKE :keyword OR property.description_en ILIKE :keyword OR property.description_es ILIKE :keyword OR property.description_pl ILIKE :keyword OR property.description_nl ILIKE :keyword)',
        { keyword: `%${keyword}%` },
      );
    }


    if (operation) {
      query.andWhere('property.operation = :operation', { operation });
    }

    if (type) {
      query.andWhere('property.type = :type', { type });
    }

    if (status) {
      query.andWhere('property.status = :status', { status });
    } else {

      query.andWhere('property.status = :status', { status: 'PUBLISHED' });
    }

    // Precio
    if (priceMin !== undefined) {
      query.andWhere('property.price >= :priceMin', { priceMin });
    }

    if (priceMax !== undefined) {
      query.andWhere('property.price <= :priceMax', { priceMax });
    }


    if (bedroomsMin !== undefined) {
      query.andWhere('property.bedrooms >= :bedroomsMin', { bedroomsMin });
    }

    if (bathroomsMin !== undefined) {
      query.andWhere('property.bathrooms >= :bathroomsMin', { bathroomsMin });
    }


    if (totalAreaMin !== undefined) {
      query.andWhere('property.total_area >= :totalAreaMin', { totalAreaMin });
    }

    if (totalAreaMax !== undefined) {
      query.andWhere('property.total_area <= :totalAreaMax', { totalAreaMax });
    }

    if (builtAreaMin !== undefined) {
      query.andWhere('property.built_area >= :builtAreaMin', { builtAreaMin });
    }

    if (builtAreaMax !== undefined) {
      query.andWhere('property.built_area <= :builtAreaMax', { builtAreaMax });
    }


    if (yearBuiltMin !== undefined) {
      query.andWhere('property.year_built >= :yearBuiltMin', { yearBuiltMin });
    }

    if (yearBuiltMax !== undefined) {
      query.andWhere('property.year_built <= :yearBuiltMax', { yearBuiltMax });
    }


    if (energyLabel) {
      query.andWhere('property.energy_label = :energyLabel', { energyLabel });
    }


    if (country) {
      query.andWhere('property.country ILIKE :country', {
        country: `%${country}%`,
      });
    }

    if (city) {
      query.andWhere('property.city ILIKE :city', { city: `%${city}%` });
    }

    if (postalCode) {
      query.andWhere('property.postal_code = :postalCode', { postalCode });
    }

    if (latitude !== undefined && longitude !== undefined && radiusKm) {
      const bounds = getBoundsFromRadius(latitude, longitude, radiusKm);
      query.andWhere(
        'property.latitude BETWEEN :south AND :north',
        { south: bounds.south, north: bounds.north },
      );
      query.andWhere(
        'property.longitude BETWEEN :west AND :east',
        { west: bounds.west, east: bounds.east },
      );
    }


    if (hasGarage !== undefined) {
      query.andWhere('property.has_garage = :hasGarage', { hasGarage });
    }

    if (hasPool !== undefined) {
      query.andWhere('property.has_pool = :hasPool', { hasPool });
    }

    if (hasGarden !== undefined) {
      query.andWhere('property.has_garden = :hasGarden', { hasGarden });
    }

    if (hasBalcony !== undefined) {
      query.andWhere('property.has_balcony = :hasBalcony', { hasBalcony });
    }

    if (hasTerrace !== undefined) {
      query.andWhere('property.has_terrace = :hasTerrace', { hasTerrace });
    }

    if (petsAllowed !== undefined) {
      query.andWhere('property.pets_allowed = :petsAllowed', { petsAllowed });
    }

    if (isFurnished !== undefined) {
      query.andWhere('property.is_furnished = :isFurnished', { isFurnished });
    }


    if (categoryIds && categoryIds.length > 0) {
      query.andWhere('category.id IN (:...categoryIds)', { categoryIds });
    }

    if (amenityIds && amenityIds.length > 0) {
      query.andWhere('amenity.id IN (:...amenityIds)', { amenityIds });
    }

    if (tagIds && tagIds.length > 0) {
      query.andWhere('tag.id IN (:...tagIds)', { tagIds });
    }


    if (agentId) {
      query.andWhere('property.agent_id = :agentId', { agentId });
    }


    const orderColumn = {
      price: 'property.price',
      totalArea: 'property.total_area',
      yearBuilt: 'property.year_built',
      createdAt: 'property.created_at',
      publishedAt: 'property.published_at',
    }[orderBy] || 'property.created_at';

    query.orderBy(orderColumn, order as 'ASC' | 'DESC');


    const skip = (page - 1) * limit;
    query.skip(skip).take(limit);


    const [properties, total] = await query.getManyAndCount();


    let results = properties.map(p => this.transformProperty(p)).filter(p => p !== null);

    if (latitude !== undefined && longitude !== undefined && radiusKm) {
      const resultsWithDistance = results
        .map((property) => {
          if (!property || !property.latitude || !property.longitude) return null;

          const distance = calculateDistance(
            latitude,
            longitude,
            property.latitude,
            property.longitude,
          );

          if (distance > radiusKm) return null;

          return {
            ...property,
            distance,
          };
        })
        .filter((p): p is NonNullable<typeof p> => p !== null);

      return {
        data: resultsWithDistance,
        meta: {
          total: resultsWithDistance.length,
          page,
          limit,
          totalPages: Math.ceil(resultsWithDistance.length / limit),
        },
      };
    }

    return {
      data: results,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }
}

import {
  IsOptional,
  IsEnum,
  IsNumber,
  IsString,
  IsBoolean,
  Min,
  Max,
  IsArray,
  IsUUID,
  IsLatitude,
  IsLongitude,
} from 'class-validator';
import { Type } from 'class-transformer';

import {
  OperationType,
  PropertyType,
  PropertyStatus,
  EnergyLabel,
} from '../entities/property.entity';

export class SearchPropertyDto {

  @IsOptional()
  @IsString()
  keyword?: string;


  @IsOptional()
  @IsEnum(OperationType)
  operation?: OperationType;

  @IsOptional()
  @IsEnum(PropertyType)
  type?: PropertyType;

  @IsOptional()
  @IsEnum(PropertyStatus)
  status?: PropertyStatus;


  @IsOptional()
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  priceMin?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  priceMax?: number;


  @IsOptional()
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  bedroomsMin?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  bathroomsMin?: number;


  @IsOptional()
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  totalAreaMin?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  totalAreaMax?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  builtAreaMin?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  builtAreaMax?: number;


  @IsOptional()
  @IsNumber()
  @Min(1800)
  @Max(new Date().getFullYear() + 5)
  @Type(() => Number)
  yearBuiltMin?: number;

  @IsOptional()
  @IsNumber()
  @Min(1800)
  @Max(new Date().getFullYear() + 5)
  @Type(() => Number)
  yearBuiltMax?: number;


  @IsOptional()
  @IsEnum(EnergyLabel)
  energyLabel?: EnergyLabel;


  @IsOptional()
  @IsString()
  country?: string;

  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @IsString()
  postalCode?: string;

  @IsOptional()
  @IsLatitude()
  @Type(() => Number)
  latitude?: number;

  @IsOptional()
  @IsLongitude()
  @Type(() => Number)
  longitude?: number;

  @IsOptional()
  @IsNumber()
  @Min(0.1)
  @Max(100)
  @Type(() => Number)
  radiusKm?: number;

  // Características booleanas
  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  hasGarage?: boolean;

  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  hasPool?: boolean;

  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  hasGarden?: boolean;

  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  hasBalcony?: boolean;

  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  hasTerrace?: boolean;

  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  petsAllowed?: boolean;

  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  isFurnished?: boolean;


  @IsOptional()
  @IsArray()
  @IsUUID('4', { each: true })
  categoryIds?: string[];

  @IsOptional()
  @IsArray()
  @IsUUID('4', { each: true })
  amenityIds?: string[];

  @IsOptional()
  @IsArray()
  @IsUUID('4', { each: true })
  tagIds?: string[];


  @IsOptional()
  @IsUUID('4')
  agentId?: string;


  @IsOptional()
  @IsEnum(['price', 'totalArea', 'yearBuilt', 'createdAt', 'publishedAt'])
  orderBy?: 'price' | 'totalArea' | 'yearBuilt' | 'createdAt' | 'publishedAt';

  @IsOptional()
  @IsEnum(['ASC', 'DESC'])
  order?: 'ASC' | 'DESC';

  // Paginación
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Type(() => Number)
  page?: number;

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(100)
  @Type(() => Number)
  limit?: number;
}

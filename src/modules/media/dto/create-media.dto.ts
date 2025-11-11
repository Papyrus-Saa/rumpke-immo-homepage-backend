import {
  IsEnum,
  IsString,
  IsNumber,
  IsOptional,
  IsBoolean,
  IsUrl,
  Min,
  MaxLength,
  IsUUID,
} from 'class-validator';
import { MediaType } from '../entities/media.entity';

export class CreateMediaDto {
  @IsUUID('4', { message: 'Immobilien-ID muss eine gültige UUID sein' })
  property_id: string;

  @IsEnum(MediaType, { message: 'Ungültiger Medientyp' })
  type: MediaType;

  @IsUrl({}, { message: 'URL muss gültig sein' })
  url: string;

  @IsOptional()
  @IsString({ message: 'Alternativtext muss Text sein' })
  @MaxLength(500, { message: 'Alternativtext ist zu lang' })
  alt?: string;

  @IsOptional()
  @IsNumber({}, { message: 'Position muss eine Zahl sein' })
  @Min(0, { message: 'Position kann nicht negativ sein' })
  position?: number;

  @IsOptional()
  @IsBoolean({ message: 'Primär muss true oder false sein' })
  is_primary?: boolean;

  @IsOptional()
  @IsNumber({}, { message: 'Breite muss eine Zahl sein' })
  @Min(1, { message: 'Breite muss größer als 0 sein' })
  width?: number;

  @IsOptional()
  @IsNumber({}, { message: 'Höhe muss eine Zahl sein' })
  @Min(1, { message: 'Höhe muss größer als 0 sein' })
  height?: number;

  @IsOptional()
  @IsNumber({}, { message: 'Größe muss eine Zahl sein' })
  @Min(1, { message: 'Größe muss größer als 0 sein' })
  size_bytes?: number;

  @IsOptional()
  @IsString({ message: 'Prüfsumme muss Text sein' })
  @MaxLength(100, { message: 'Prüfsumme ist zu lang' })
  checksum?: string;

  @IsOptional()
  @IsString({ message: 'Cloudinary Public-ID muss Text sein' })
  @MaxLength(255, { message: 'Public-ID ist zu lang' })
  cloudinary_public_id?: string;
}

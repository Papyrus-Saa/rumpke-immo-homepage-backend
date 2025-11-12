import {
  IsString,
  IsEmail,
  IsOptional,
  IsBoolean,
  IsUrl,
  IsArray,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateAgentDto {
  @IsString({ message: 'Vorname muss Text sein' })
  @MaxLength(100, { message: 'Vorname ist zu lang' })
  first_name: string;

  @IsString({ message: 'Nachname muss Text sein' })
  @MaxLength(100, { message: 'Nachname ist zu lang' })
  last_name: string;

  @IsEmail({}, { message: 'Ungültige E-Mail-Adresse' })
  email: string;

  @IsString({ message: 'Telefonnummer muss Text sein' })
  @MaxLength(50, { message: 'Telefonnummer ist zu lang' })
  phone: string;

  @IsOptional()
  @IsString({ message: 'Mobilnummer muss Text sein' })
  @MaxLength(50, { message: 'Mobilnummer ist zu lang' })
  mobile?: string;

  @IsOptional()
  @IsUrl({}, { message: 'Foto-URL muss gültig sein' })
  photo_url?: string;

  @IsOptional()
  @IsString({ message: 'Biografie (DE) muss Text sein' })
  @MaxLength(1000, { message: 'Biografie (DE) ist zu lang' })
  bio_de?: string;

  @IsOptional()
  @IsString({ message: 'Biografie (EN) muss Text sein' })
  @MaxLength(1000, { message: 'Biografie (EN) ist zu lang' })
  bio_en?: string;

  @IsOptional()
  @IsString({ message: 'Biografie (ES) muss Text sein' })
  @MaxLength(1000, { message: 'Biografie (ES) ist zu lang' })
  bio_es?: string;

  @IsOptional()
  @IsString({ message: 'Biografie (PL) muss Text sein' })
  @MaxLength(1000, { message: 'Biografie (PL) ist zu lang' })
  bio_pl?: string;

  @IsOptional()
  @IsString({ message: 'Biografie (NL) muss Text sein' })
  @MaxLength(1000, { message: 'Biografie (NL) ist zu lang' })
  bio_nl?: string;

  @IsArray({ message: 'Sprachen müssen ein Array sein' })
  @IsString({ each: true, message: 'Jede Sprache muss Text sein' })
  @MinLength(1, { message: 'Mindestens eine Sprache erforderlich' })
  languages: string[];

  @IsOptional()
  @IsBoolean({ message: 'Öffentlich muss true oder false sein' })
  is_public?: boolean;

  @IsOptional()
  @IsBoolean({ message: 'Aktiv muss true oder false sein' })
  is_active?: boolean;

  @IsOptional()
  @IsString({ message: 'Position (DE) muss Text sein' })
  @MaxLength(100, { message: 'Position (DE) ist zu lang' })
  position_de?: string;

  @IsOptional()
  @IsString({ message: 'Position (EN) muss Text sein' })
  @MaxLength(100, { message: 'Position (EN) ist zu lang' })
  position_en?: string;

  @IsOptional()
  @IsString({ message: 'Position (ES) muss Text sein' })
  @MaxLength(100, { message: 'Position (ES) ist zu lang' })
  position_es?: string;

  @IsOptional()
  @IsString({ message: 'Position (PL) muss Text sein' })
  @MaxLength(100, { message: 'Position (PL) ist zu lang' })
  position_pl?: string;

  @IsOptional()
  @IsString({ message: 'Position (NL) muss Text sein' })
  @MaxLength(100, { message: 'Position (NL) ist zu lang' })
  position_nl?: string;
}

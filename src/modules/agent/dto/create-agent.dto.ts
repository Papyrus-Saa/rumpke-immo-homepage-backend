import {
  IsString,
  IsEmail,
  IsOptional,
  IsBoolean,
  IsUrl,
  IsArray,
  MaxLength,
  ArrayNotEmpty,
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


  @IsOptional() @IsString() @MaxLength(1000) bio_pl?: string;
  @IsOptional() @IsString() @MaxLength(1000) bio_nl?: string;
  @IsOptional() @IsString() @MaxLength(1000) bio_pt?: string;
  @IsOptional() @IsString() @MaxLength(1000) bio_fr?: string;
  @IsOptional() @IsString() @MaxLength(1000) bio_it?: string;
  @IsOptional() @IsString() @MaxLength(1000) bio_ru?: string;
  @IsOptional() @IsString() @MaxLength(1000) bio_ar?: string;
  @IsOptional() @IsString() @MaxLength(1000) bio_zh?: string;
  @IsOptional() @IsString() @MaxLength(1000) bio_ja?: string;
  @IsOptional() @IsString() @MaxLength(1000) bio_tr?: string;
  @IsOptional() @IsString() @MaxLength(1000) bio_hi?: string;

  @IsArray({ message: 'Sprachen müssen ein Array sein' })
  @ArrayNotEmpty({ message: 'Mindestens eine Sprache erforderlich' })
  @IsString({ each: true, message: 'Jede Sprache muss Text sein' })
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

  @IsOptional() @IsString() @MaxLength(100) position_pl?: string;
  @IsOptional() @IsString() @MaxLength(100) position_nl?: string;
  @IsOptional() @IsString() @MaxLength(100) position_pt?: string;
  @IsOptional() @IsString() @MaxLength(100) position_fr?: string;
  @IsOptional() @IsString() @MaxLength(100) position_it?: string;
  @IsOptional() @IsString() @MaxLength(100) position_ru?: string;
  @IsOptional() @IsString() @MaxLength(100) position_ar?: string;
  @IsOptional() @IsString() @MaxLength(100) position_zh?: string;
  @IsOptional() @IsString() @MaxLength(100) position_ja?: string;
  @IsOptional() @IsString() @MaxLength(100) position_tr?: string;
  @IsOptional() @IsString() @MaxLength(100) position_hi?: string;
}

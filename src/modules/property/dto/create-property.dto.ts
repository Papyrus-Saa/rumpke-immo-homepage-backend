import {
  IsEnum,
  IsString,
  IsNumber,
  IsOptional,
  IsBoolean,
  IsDate,
  IsUrl,
  Min,
  Max,
  IsLatitude,
  IsLongitude,
  Length,
  MaxLength,
} from 'class-validator';
import { Type } from 'class-transformer';
import { OperationType, PropertyType, PropertyStatus, EnergyLabel } from '../entities/property.entity';



export class CreatePropertyDto {
  @IsString({ message: 'AgentId muss Text sein' })
  agent: string;
  @IsEnum(OperationType, { message: 'Vorgang muss SELL oder RENT sein' })
  operation: OperationType;

  @IsEnum(PropertyType, { message: 'Ungültiger Immobilientyp' })
  type: PropertyType;

  @IsOptional()
  @IsEnum(PropertyStatus, { message: 'Ungültiger Immobilienstatus' })
  status?: PropertyStatus;

  @IsString({ message: 'Adresse muss Text sein' })
  @MaxLength(255, { message: 'Adresse ist zu lang' })
  address_line: string;

  @IsString({ message: 'Stadt muss Text sein' })
  @MaxLength(100, { message: 'Stadt ist zu lang' })
  city: string;

  @IsString({ message: 'Postleitzahl muss Text sein' })
  @MaxLength(20, { message: 'Postleitzahl ist zu lang' })
  postal_code: string;

  @IsString({ message: 'Region muss Text sein' })
  @MaxLength(100, { message: 'Region ist zu lang' })
  region: string;

  @IsOptional()
  @IsString({ message: 'Land muss Text sein' })
  @MaxLength(100, { message: 'Land ist zu lang' })
  country?: string;

  @IsOptional()
  @IsLatitude({ message: 'Ungültiger Breitengrad' })
  latitude?: number;

  @IsOptional()
  @IsLongitude({ message: 'Ungültiger Längengrad' })
  longitude?: number;

  @IsNumber({}, { message: 'Wohnfläche muss eine Zahl sein' })
  @Min(1, { message: 'Wohnfläche muss größer als 0 sein' })
  built_area_m2: number;

  @IsOptional()
  @IsNumber({}, { message: 'Nutzfläche muss eine Zahl sein' })
  @Min(1, { message: 'Nutzfläche muss größer als 0 sein' })
  usable_area_m2?: number;

  @IsOptional()
  @IsNumber({}, { message: 'Grundstücksfläche muss eine Zahl sein' })
  @Min(1, { message: 'Grundstücksfläche muss größer als 0 sein' })
  plot_area_m2?: number;

  @IsNumber({}, { message: 'Anzahl der Zimmer muss eine Zahl sein' })
  @Min(1, { message: 'Mindestens 1 Zimmer erforderlich' })
  rooms: number;

  @IsNumber({}, { message: 'Anzahl der Schlafzimmer muss eine Zahl sein' })
  @Min(0, { message: 'Schlafzimmer können nicht negativ sein' })
  bedrooms: number;

  @IsNumber({}, { message: 'Anzahl der Badezimmer muss eine Zahl sein' })
  @Min(1, { message: 'Mindestens 1 Badezimmer erforderlich' })
  bathrooms: number;

  @IsOptional()
  @IsNumber({}, { message: 'Etage muss eine Zahl sein' })
  floor?: number;

  @IsOptional()
  @IsNumber({}, { message: 'Gesamtzahl der Etagen muss eine Zahl sein' })
  @Min(1, { message: 'Gesamtzahl der Etagen muss mindestens 1 sein' })
  floors_total?: number;

  @IsOptional()
  @IsBoolean({ message: 'Aufzug muss true oder false sein' })
  has_elevator?: boolean;

  @IsOptional()
  @IsNumber({}, { message: 'Anzahl der Parkplätze muss eine Zahl sein' })
  @Min(0, { message: 'Parkplätze können nicht negativ sein' })
  parking_spaces?: number;

  @IsOptional()
  @IsBoolean({ message: 'Garage muss true oder false sein' })
  garage?: boolean;

  @IsOptional()
  @IsBoolean({ message: 'Abstellraum muss true oder false sein' })
  storage_room?: boolean;

  @IsOptional()
  @IsString({ message: 'Küchentyp muss Text sein' })
  @MaxLength(50, { message: 'Küchentyp ist zu lang' })
  kitchen_type?: string;

  @IsOptional()
  @IsString({ message: 'Heizungstyp muss Text sein' })
  @MaxLength(50, { message: 'Heizungstyp ist zu lang' })
  heating?: string;

  @IsOptional()
  @IsBoolean({ message: 'Klimaanlage muss true oder false sein' })
  air_conditioning?: boolean;

  @IsOptional()
  @IsString({ message: 'Möblierung muss Text sein' })
  @MaxLength(50, { message: 'Möblierung ist zu lang' })
  furnished?: string;

  @IsOptional()
  @IsString({ message: 'Ausrichtung muss Text sein' })
  @MaxLength(50, { message: 'Ausrichtung ist zu lang' })
  orientation?: string;

  @IsOptional()
  @IsNumber({}, { message: 'Baujahr muss eine Zahl sein' })
  @Min(1800, { message: 'Baujahr ist zu alt' })
  @Max(new Date().getFullYear() + 2, { message: 'Baujahr kann nicht in der Zukunft liegen' })
  build_year?: number;

  @IsOptional()
  @IsNumber({}, { message: 'Renovierungsjahr muss eine Zahl sein' })
  @Min(1800, { message: 'Renovierungsjahr ist zu alt' })
  @Max(new Date().getFullYear() + 2, { message: 'Renovierungsjahr kann nicht in der Zukunft liegen' })
  renovation_year?: number;

  @IsOptional()
  @Type(() => Date)
  @IsDate({ message: 'Verfügbarkeitsdatum muss ein gültiges Datum sein' })
  available_from?: Date;

  @IsNumber({}, { message: 'Preis muss eine Zahl sein' })
  @Min(0, { message: 'Preis kann nicht negativ sein' })
  price_amount: number;

  @IsOptional()
  @IsString({ message: 'Währung muss Text sein' })
  @Length(3, 3, { message: 'Währung muss ein 3-Buchstaben-Code sein (z.B. EUR)' })
  currency?: string;

  @IsOptional()
  @IsString({ message: 'Preisfrequenz muss Text sein' })
  @MaxLength(20, { message: 'Preisfrequenz ist zu lang' })
  price_frequency?: string;

  @IsOptional()
  @IsNumber({}, { message: 'Nebenkosten müssen eine Zahl sein' })
  @Min(0, { message: 'Nebenkosten können nicht negativ sein' })
  community_fees?: number;

  @IsOptional()
  @IsNumber({}, { message: 'Grundsteuer muss eine Zahl sein' })
  @Min(0, { message: 'Grundsteuer kann nicht negativ sein' })
  property_tax?: number;

  @IsOptional()
  @IsNumber({}, { message: 'Kaution muss eine Zahl sein' })
  @Min(0, { message: 'Kaution kann nicht negativ sein' })
  deposit?: number;

  @IsOptional()
  @IsString({ message: 'Provisionsinfo muss Text sein' })
  @MaxLength(500, { message: 'Provisionsinfo ist zu lang' })
  commission_info?: string;

  @IsOptional()
  @IsEnum(EnergyLabel, { message: 'Ungültiges Energielabel' })
  energy_label?: EnergyLabel;

  @IsOptional()
  @IsNumber({}, { message: 'Energieverbrauch muss eine Zahl sein' })
  @Min(0, { message: 'Energieverbrauch kann nicht negativ sein' })
  energy_consumption_kwh_m2y?: number;

  @IsOptional()
  @IsNumber({}, { message: 'CO2-Emissionen müssen eine Zahl sein' })
  @Min(0, { message: 'CO2-Emissionen können nicht negativ sein' })
  co2_emissions_kg_m2y?: number;

  @IsOptional()
  @IsUrl({}, { message: 'Energieausweis-URL muss gültig sein' })
  energy_certificate_url?: string;

  @IsOptional()
  @IsBoolean({ message: 'Balkon muss true oder false sein' })
  balcony?: boolean;

  @IsOptional()
  @IsBoolean({ message: 'Terrasse muss true oder false sein' })
  terrace?: boolean;

  @IsOptional()
  @IsBoolean({ message: 'Garten muss true oder false sein' })
  garden?: boolean;

  @IsOptional()
  @IsBoolean({ message: 'Pool muss true oder false sein' })
  pool?: boolean;

  @IsOptional()
  @IsBoolean({ message: 'Kamin muss true oder false sein' })
  fireplace?: boolean;

  @IsOptional()
  @IsBoolean({ message: 'Haustiere erlaubt muss true oder false sein' })
  pets_allowed?: boolean;

  @IsOptional()
  @IsBoolean({ message: 'Meerblick muss true oder false sein' })
  sea_view?: boolean;

  @IsOptional()
  @IsBoolean({ message: 'Bergblick muss true oder false sein' })
  mountain_view?: boolean;

  @IsOptional()
  @IsBoolean({ message: 'Stadtblick muss true oder false sein' })
  city_view?: boolean;

  @IsOptional()
  @IsBoolean({ message: 'Doppelverglasung muss true oder false sein' })
  double_glazing?: boolean;

  @IsOptional()
  @IsBoolean({ message: 'Smart Home muss true oder false sein' })
  smart_home?: boolean;

  @IsOptional()
  @IsBoolean({ message: 'Solarpanels muss true oder false sein' })
  solar_panels?: boolean;

  @IsOptional()
  @IsBoolean({ message: 'Fußbodenheizung muss true oder false sein' })
  floor_heating?: boolean;

  @IsOptional()
  @IsBoolean({ message: 'Sicherheitstür muss true oder false sein' })
  security_door?: boolean;

  @IsOptional()
  @IsBoolean({ message: 'Videoüberwachung muss true oder false sein' })
  cctv?: boolean;

  @IsOptional()
  @IsBoolean({ message: 'Hausmeister muss true oder false sein' })
  concierge?: boolean;

  @IsOptional()
  @IsString({ message: 'Beschreibung muss Text sein' })
  @MaxLength(5000, { message: 'Beschreibung ist zu lang' })
  description?: string;

  @IsOptional()
  @IsString({ message: 'Interne Notizen müssen Text sein' })
  @MaxLength(2000, { message: 'Interne Notizen sind zu lang' })
  notes_internal?: string;

  @IsOptional()
  @IsString({ message: 'Titel muss Text sein' })
  @MaxLength(200, { message: 'Titel ist zu lang' })
  title?: string;

  @IsOptional()
  @IsBoolean({ message: 'Hervorgehoben muss true oder false sein' })
  is_featured?: boolean;

  @IsOptional()
  @IsBoolean({ message: 'Neu muss true oder false sein' })
  is_new?: boolean;
}

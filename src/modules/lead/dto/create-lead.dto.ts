import {
  IsEnum,
  IsString,
  IsEmail,
  IsBoolean,
  IsOptional,
  IsUUID,
  MaxLength,
} from 'class-validator';

import { LeadType } from '../entities/lead.entity';

export class CreateLeadDto {
  @IsEnum(LeadType, {
    message: 'Art der Anfrage muss CONTACT, VALUATION oder VISIT_REQUEST sein',
  })
  type: LeadType;

  @IsOptional()
  @IsUUID('4', { message: 'Immobilien-ID muss eine gültige UUID sein' })
  property_id?: string;

  @IsString({ message: 'Name muss eine Zeichenkette sein' })
  @MaxLength(100, { message: 'Name darf maximal 100 Zeichen lang sein' })
  name: string;

  @IsEmail({}, { message: 'E-Mail muss eine gültige E-Mail-Adresse sein' })
  @MaxLength(100, { message: 'E-Mail darf maximal 100 Zeichen lang sein' })
  email: string;

  @IsString({ message: 'Telefon muss eine Zeichenkette sein' })
  @MaxLength(30, { message: 'Telefon darf maximal 30 Zeichen lang sein' })
  phone: string;

  @IsString({ message: 'Nachricht muss eine Zeichenkette sein' })
  @MaxLength(2000, {
    message: 'Nachricht darf maximal 2000 Zeichen lang sein',
  })
  message: string;

  @IsBoolean({ message: 'Einwilligung muss ein boolescher Wert sein' })
  consent: boolean;

  @IsOptional()
  @IsString({ message: 'Quelle muss eine Zeichenkette sein' })
  @MaxLength(100, { message: 'Quelle darf maximal 100 Zeichen lang sein' })
  source?: string;
}

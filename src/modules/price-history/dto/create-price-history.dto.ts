import {
  IsEnum,
  IsNumber,
  IsString,
  IsOptional,
  IsUUID,
  Min,
  MaxLength,
} from 'class-validator';

import { PriceChangeReason } from '../entities/price-history.entity';

export class CreatePriceHistoryDto {
  @IsUUID('4', { message: 'Immobilien-ID muss eine gültige UUID sein' })
  property_id: string;

  @IsNumber(
    { maxDecimalPlaces: 2 },
    { message: 'Alter Preis muss eine Zahl mit maximal 2 Dezimalstellen sein' },
  )
  @Min(0, { message: 'Alter Preis muss mindestens 0 sein' })
  old_price: number;

  @IsNumber(
    { maxDecimalPlaces: 2 },
    { message: 'Neuer Preis muss eine Zahl mit maximal 2 Dezimalstellen sein' },
  )
  @Min(0, { message: 'Neuer Preis muss mindestens 0 sein' })
  new_price: number;

  @IsEnum(PriceChangeReason, {
    message:
      'Grund muss INITIAL, MARKET_ADJUSTMENT, NEGOTIATION, PROMOTION, CORRECTION oder OTHER sein',
  })
  reason: PriceChangeReason;

  @IsOptional()
  @IsString({ message: 'Notizen müssen eine Zeichenkette sein' })
  @MaxLength(1000, { message: 'Notizen dürfen maximal 1000 Zeichen lang sein' })
  notes?: string;

  @IsOptional()
  @IsString({ message: 'Geändert von muss eine Zeichenkette sein' })
  @MaxLength(100, {
    message: 'Geändert von darf maximal 100 Zeichen lang sein',
  })
  changed_by?: string;
}

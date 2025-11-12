import {
  IsEnum,
  IsString,
  IsOptional,
  IsUUID,
  MaxLength,
} from 'class-validator';

import { StatusHistoryStatus } from '../entities/status-history.entity';

export class CreateStatusHistoryDto {
  @IsUUID('4', { message: 'Immobilien-ID muss eine gültige UUID sein' })
  property_id: string;

  @IsOptional()
  @IsEnum(StatusHistoryStatus, {
    message:
      'Alter Status muss DRAFT, PUBLISHED, RESERVED, SOLD, RENTED oder HIDDEN sein',
  })
  old_status?: StatusHistoryStatus;

  @IsEnum(StatusHistoryStatus, {
    message:
      'Neuer Status muss DRAFT, PUBLISHED, RESERVED, SOLD, RENTED oder HIDDEN sein',
  })
  new_status: StatusHistoryStatus;

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

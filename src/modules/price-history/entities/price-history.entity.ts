import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { Property } from '../../property/entities/property.entity';

export enum PriceChangeReason {
  INITIAL = 'INITIAL',
  MARKET_ADJUSTMENT = 'MARKET_ADJUSTMENT',
  NEGOTIATION = 'NEGOTIATION',
  PROMOTION = 'PROMOTION',
  CORRECTION = 'CORRECTION',
  OTHER = 'OTHER',
}

@Entity('price_history')
export class PriceHistory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  property_id: string;

  @ManyToOne(() => Property, (property) => property.priceHistory, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'property_id' })
  property: Property;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  old_price: number;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  new_price: number;

  @Column({ type: 'enum', enum: PriceChangeReason })
  reason: PriceChangeReason;

  @Column({ type: 'text', nullable: true })
  notes: string;

  @Column({ nullable: true })
  changed_by: string;

  @CreateDateColumn()
  changed_at: Date;
}

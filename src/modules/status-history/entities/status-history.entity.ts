import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { Property } from '../../property/entities/property.entity';

export enum StatusHistoryStatus {
  PUBLISHED = 'PUBLISHED',
  RESERVED = 'RESERVED',
  SOLD = 'SOLD',
  RENTED = 'RENTED',
  DRAFT = 'DRAFT',
  HIDDEN = 'HIDDEN',
}

@Entity('status_history')
export class StatusHistory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  property_id: string;

  @ManyToOne(() => Property, (property) => property.statusHistory, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'property_id' })
  property: Property;

  @Column({
    type: 'enum',
    enum: StatusHistoryStatus,
    nullable: true,
  })
  old_status: StatusHistoryStatus | null;

  @Column({
    type: 'enum',
    enum: StatusHistoryStatus,
  })
  new_status: StatusHistoryStatus;

  @Column({ type: 'text', nullable: true })
  notes: string;

  @Column({ nullable: true })
  changed_by: string;

  @CreateDateColumn()
  changed_at: Date;
}

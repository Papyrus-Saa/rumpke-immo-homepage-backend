import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { Property } from '../../property/entities/property.entity';

export enum LeadType {
  CONTACT = 'CONTACT',
  VALUATION = 'VALUATION',
  VISIT_REQUEST = 'VISIT_REQUEST',
}

export enum LeadStatus {
  NEW = 'NEW',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}

@Entity('leads')
export class Lead {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'enum', enum: LeadType })
  type: LeadType;

  @Column({ type: 'uuid', nullable: true })
  property_id: string;

  @ManyToOne(() => Property, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'property_id' })
  property: Property;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column({ type: 'text' })
  message: string;

  @Column({ default: false })
  consent: boolean;

  @Column({ nullable: true })
  source: string;

  @Column({ type: 'enum', enum: LeadStatus, default: LeadStatus.NEW })
  status: LeadStatus;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

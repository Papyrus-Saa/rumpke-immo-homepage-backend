import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Property } from '../../property/entities/property.entity';

export enum AmenityCategory {
  INTERIOR = 'INTERIOR',
  EXTERIOR = 'EXTERIOR',
  SECURITY = 'SECURITY',
  SERVICES = 'SERVICES',
  FEATURES = 'FEATURES',
  TECHNOLOGY = 'TECHNOLOGY',
}

@Entity('amenities')
export class Amenity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  key: string;

  @Column()
  name_de: string;

  @Column({ nullable: true })
  name_en: string;

  @Column({ nullable: true })
  name_es: string;

  @Column({ nullable: true })
  name_pl: string;

  @Column({ nullable: true })
  name_nl: string;

  @Column({ type: 'enum', enum: AmenityCategory })
  category: AmenityCategory;

  @Column({ nullable: true })
  icon: string;

  @Column({ default: 0 })
  sort_order: number;

  @Column({ default: true })
  is_active: boolean;

  @ManyToMany(() => Property, (property) => property.amenities)
  properties: Property[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

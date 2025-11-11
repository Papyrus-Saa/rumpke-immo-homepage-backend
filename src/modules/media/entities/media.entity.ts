import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { Property } from '../../property/entities/property.entity';

export enum MediaType {
  IMAGE = 'IMAGE',
  VIDEO = 'VIDEO',
  FLOORPLAN = 'FLOORPLAN',
  TOUR_360 = 'TOUR_360',
  DOCUMENT = 'DOCUMENT',
}

@Entity('media')
export class Media {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  property_id: string;

  @ManyToOne(() => Property, (property) => property.media, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'property_id' })
  property: Property;

  @Column({ type: 'enum', enum: MediaType })
  type: MediaType;

  @Column()
  url: string;

  @Column({ nullable: true })
  alt: string;

  @Column({ type: 'int', default: 0 })
  position: number;

  @Column({ default: false })
  is_primary: boolean;

  @Column({ type: 'int', nullable: true })
  width: number;

  @Column({ type: 'int', nullable: true })
  height: number;

  @Column({ type: 'int', nullable: true })
  size_bytes: number;

  @Column({ nullable: true })
  checksum: string;

  @Column({ nullable: true })
  cloudinary_public_id: string;

  @CreateDateColumn()
  created_at: Date;
}

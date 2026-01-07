import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToMany,
  ManyToOne,
  JoinTable,
  JoinColumn,

} from 'typeorm';
import { Media } from '../../media/entities/media.entity';
import { Category } from '../../taxonomy/entities/category.entity';
import { Amenity } from '../../taxonomy/entities/amenity.entity';
import { Tag } from '../../taxonomy/entities/tag.entity';
import { Agent } from '../../agent/entities/agent.entity';
import { PriceHistory } from '../../price-history/entities/price-history.entity';
import { StatusHistory } from '../../status-history/entities/status-history.entity';

export enum OperationType {
  SELL = 'SELL',
  RENT = 'RENT',
}

export enum PropertyType {
  HAUS = 'haus',
  WOHNUNG = 'wohnung',
  GEWERBE = 'gewerbe',
  GRUNDSTUECK = 'grundstueck',
  SONSTIGE = 'sonstige',
}

export enum PropertyStatus {
  PUBLISHED = 'PUBLISHED',
  RESERVED = 'RESERVED',
  SOLD = 'SOLD',
  RENTED = 'RENTED',
  DRAFT = 'DRAFT',
  HIDDEN = 'HIDDEN',
}

export enum EnergyLabel {
  A = 'A',
  B = 'B',
  C = 'C',
  D = 'D',
  E = 'E',
  F = 'F',
  G = 'G',
}

@Entity('properties')
export class Property {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  owner: string;

  @Column({ type: 'enum', enum: ['haus', 'wohnung', 'gewerbe', 'grundstueck', 'sonstige'], default: 'sonstige' })
  category: 'haus' | 'wohnung' | 'gewerbe' | 'grundstueck' | 'sonstige';

  @Column({ unique: true })
  slug: string;

  @Column({ unique: true })
  reference_code: string;

  @Column({ type: 'enum', enum: OperationType })
  operation: OperationType;

  @Column({ type: 'enum', enum: PropertyType })
  type: PropertyType;

  @Column({ default: false })
  is_featured: boolean;

  @Column({ default: false })
  is_new: boolean;

  @Column()
  address_line: string;

  @Column()
  city: string;

  @Column()
  postal_code: string;


  @Column({ default: 'Germany' })
  country: string;

  @Column({ type: 'decimal', precision: 10, scale: 7, nullable: true })
  latitude: number;

  @Column({ type: 'decimal', precision: 10, scale: 7, nullable: true })
  longitude: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  built_area_m2: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  usable_area_m2: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  plot_area_m2: number;

  @Column({ type: 'int' })
  rooms: number;

  @Column({ type: 'int' })
  bedrooms: number;

  @Column({ type: 'int' })
  bathrooms: number;

  @Column({ type: 'int', nullable: true })
  floor: number;

  @Column({ type: 'int', nullable: true })
  floors_total: number;

  @Column({ default: false })
  has_elevator: boolean;

  @Column({ type: 'int', default: 0 })
  parking_spaces: number;

  @Column({ default: false })
  garage: boolean;

  @Column({ default: false })
  storage_room: boolean;

  @Column({ nullable: true })
  kitchen_type: string;

  @Column({ nullable: true })
  heating: string;

  @Column({ default: false })
  air_conditioning: boolean;

  @Column({ nullable: true })
  furnished: string;

  @Column({ nullable: true })
  orientation: string;

  @Column({ type: 'int', nullable: true })
  build_year: number;

  @Column({ type: 'int', nullable: true })
  renovation_year: number;

  @Column({ type: 'enum', enum: PropertyStatus, default: PropertyStatus.DRAFT })
  status: PropertyStatus;

  @Column({ type: 'date', nullable: true })
  available_from: Date;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  price_amount: number;

  @Column({ default: 'EUR' })
  currency: string;

  @Column({ nullable: true })
  price_frequency: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  community_fees: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  property_tax: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  deposit: number;

  @Column({ type: 'text', nullable: true })
  commission_info: string;

  @Column({ type: 'enum', enum: EnergyLabel, nullable: true })
  energy_label: EnergyLabel;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  energy_consumption_kwh_m2y: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  co2_emissions_kg_m2y: number;

  @Column({ nullable: true })
  energy_certificate_url: string;

  @Column({ default: false })
  balcony: boolean;

  @Column({ default: false })
  terrace: boolean;

  @Column({ default: false })
  garden: boolean;

  @Column({ default: false })
  pool: boolean;

  @Column({ default: false })
  fireplace: boolean;

  @Column({ default: false })
  pets_allowed: boolean;

  @Column({ default: false })
  sea_view: boolean;

  @Column({ default: false })
  mountain_view: boolean;

  @Column({ default: false })
  city_view: boolean;

  @Column({ default: false })
  double_glazing: boolean;

  @Column({ default: false })
  smart_home: boolean;

  @Column({ default: false })
  solar_panels: boolean;

  @Column({ default: false })
  floor_heating: boolean;

  @Column({ default: false })
  security_door: boolean;

  @Column({ default: false })
  cctv: boolean;

  @Column({ default: false })
  concierge: boolean;

  // SEO
  @Column({ nullable: true })
  seo_title: string;

  @Column({ type: 'text', nullable: true })
  seo_description: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'text', nullable: true })
  notes_internal: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column({ type: 'timestamp', nullable: true })
  published_at: Date;

  @Column({ type: 'timestamp', nullable: true })
  archived_at: Date;

  @OneToMany(() => Media, (media) => media.property)
  media: Media[];

  @OneToMany(() => PriceHistory, (priceHistory) => priceHistory.property)
  priceHistory: PriceHistory[];

  @OneToMany(() => StatusHistory, (statusHistory) => statusHistory.property)
  statusHistory: StatusHistory[];

  @ManyToMany(() => Category, (category) => category.properties)
  @JoinTable({
    name: 'property_categories',
    joinColumn: { name: 'property_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'category_id', referencedColumnName: 'id' },
  })
  categories: Category[];

  @ManyToMany(() => Amenity, (amenity) => amenity.properties)
  @JoinTable({
    name: 'property_amenities',
    joinColumn: { name: 'property_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'amenity_id', referencedColumnName: 'id' },
  })
  amenities: Amenity[];

  @ManyToMany(() => Tag, (tag) => tag.properties)
  @JoinTable({
    name: 'property_tags',
    joinColumn: { name: 'property_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'tag_id', referencedColumnName: 'id' },
  })
  tags: Tag[];

  @Column({ type: 'uuid', nullable: true })
  agent_id: string;

  @ManyToOne(() => Agent, (agent) => agent.properties, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'agent_id' })
  agent: Agent;
}

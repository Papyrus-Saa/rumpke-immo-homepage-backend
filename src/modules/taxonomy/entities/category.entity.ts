import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Property } from '../../property/entities/property.entity';

@Entity('categories')
export class Category {
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

  @Column({ nullable: true })
  description_de: string;

  @Column({ nullable: true })
  description_en: string;

  @Column({ nullable: true })
  description_es: string;

  @Column({ nullable: true })
  description_pl: string;

  @Column({ nullable: true })
  description_nl: string;

  @Column({ nullable: true })
  icon: string;

  @Column({ default: 0 })
  sort_order: number;

  @Column({ default: true })
  is_active: boolean;

  @ManyToMany(() => Property, (property) => property.categories)
  properties: Property[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

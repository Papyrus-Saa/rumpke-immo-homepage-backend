import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Property } from '../../property/entities/property.entity';

@Entity('tags')
export class Tag {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  slug: string;

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
  color: string;

  @Column({ default: true })
  is_active: boolean;

  @ManyToMany(() => Property, (property) => property.tags)
  properties: Property[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

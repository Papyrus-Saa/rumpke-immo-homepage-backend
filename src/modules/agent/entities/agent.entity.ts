import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Property } from '../../property/entities/property.entity';

@Entity('agents')
export class Agent {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  phone: string;

  @Column({ nullable: true })
  mobile: string;

  @Column({ nullable: true })
  photo_url: string;

  @Column({ type: 'text', nullable: true })
  bio_de: string;

  @Column({ type: 'text', nullable: true })
  bio_en: string;

  @Column({ type: 'text', nullable: true })
  bio_es: string;

  @Column({ type: 'text', nullable: true })
  bio_pl: string;

  @Column({ type: 'text', nullable: true })
  bio_nl: string;

  @Column({ type: 'simple-array'})
  languages: string[];

  @Column({ default: true })
  is_public: boolean;

  @Column({ default: true })
  is_active: boolean;

  @Column({ nullable: true })
  position_de: string;

  @Column({ nullable: true })
  position_en: string;

  @Column({ nullable: true })
  position_es: string;

  @Column({ nullable: true })
  position_pl: string;

  @Column({ nullable: true })
  position_nl: string;

  @OneToMany(() => Property, (property) => property.agent)
  properties: Property[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

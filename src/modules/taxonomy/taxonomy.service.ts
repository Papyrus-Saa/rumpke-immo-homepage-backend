import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';
import { Amenity } from './entities/amenity.entity';
import { Tag } from './entities/tag.entity';

@Injectable()
export class TaxonomyService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    @InjectRepository(Amenity)
    private amenityRepository: Repository<Amenity>,
    @InjectRepository(Tag)
    private tagRepository: Repository<Tag>,
  ) { }

  async findAllCategories(): Promise<Category[]> {
    return this.categoryRepository.find({
      where: { is_active: true },
      order: { sort_order: 'ASC', name_de: 'ASC' },
    });
  }

  async findAllAmenities(): Promise<Amenity[]> {
    return this.amenityRepository.find({
      where: { is_active: true },
      order: { category: 'ASC', sort_order: 'ASC', name_de: 'ASC' },
    });
  }

  async findAllTags(): Promise<Tag[]> {
    return this.tagRepository.find({
      where: { is_active: true },
      order: { name_de: 'ASC' },
    });
  }

  async findCategoryByKey(key: string): Promise<Category | null> {
    return this.categoryRepository.findOne({ where: { key } });
  }

  async findAmenityByKey(key: string): Promise<Amenity | null> {
    return this.amenityRepository.findOne({ where: { key } });
  }

  async findTagBySlug(slug: string): Promise<Tag | null> {
    return this.tagRepository.findOne({ where: { slug } });
  }
}

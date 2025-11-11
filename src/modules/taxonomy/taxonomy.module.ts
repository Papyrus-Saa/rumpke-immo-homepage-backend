import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Amenity } from './entities/amenity.entity';
import { Tag } from './entities/tag.entity';
import { TaxonomyController } from './taxonomy.controller';
import { TaxonomyService } from './taxonomy.service';


@Module({
  imports: [TypeOrmModule.forFeature([Category, Amenity, Tag])],
  controllers: [TaxonomyController],
  providers: [TaxonomyService],
  exports: [TaxonomyService, TypeOrmModule],
})
export class TaxonomyModule { }

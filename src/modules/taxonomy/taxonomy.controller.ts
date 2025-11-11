import { Controller, Get } from '@nestjs/common';
import { TaxonomyService } from './taxonomy.service';

@Controller('taxonomy')
export class TaxonomyController {
  constructor(private readonly taxonomyService: TaxonomyService) { }

  @Get('categories')
  findAllCategories() {
    return this.taxonomyService.findAllCategories();
  }

  @Get('amenities')
  findAllAmenities() {
    return this.taxonomyService.findAllAmenities();
  }

  @Get('tags')
  findAllTags() {
    return this.taxonomyService.findAllTags();
  }
}

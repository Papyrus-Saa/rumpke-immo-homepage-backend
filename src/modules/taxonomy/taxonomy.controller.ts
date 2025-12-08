import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { TaxonomyService } from './taxonomy.service';

@UseGuards(JwtAuthGuard)
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

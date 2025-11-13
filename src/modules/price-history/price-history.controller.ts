import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';

import { PriceHistoryService } from './price-history.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreatePriceHistoryDto } from './dto/create-price-history.dto';
import { UpdatePriceHistoryDto } from './dto/update-price-history.dto';

@Controller('price-history')
export class PriceHistoryController {
  constructor(private readonly priceHistoryService: PriceHistoryService) { }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createPriceHistoryDto: CreatePriceHistoryDto) {
    return this.priceHistoryService.create(createPriceHistoryDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.priceHistoryService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('property/:propertyId')
  findByProperty(@Param('propertyId') propertyId: string) {
    return this.priceHistoryService.findByProperty(propertyId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('property/:propertyId/evolution')
  getPriceEvolution(@Param('propertyId') propertyId: string) {
    return this.priceHistoryService.getPriceEvolution(propertyId);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.priceHistoryService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePriceHistoryDto: UpdatePriceHistoryDto,
  ) {
    return this.priceHistoryService.update(id, updatePriceHistoryDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.priceHistoryService.remove(id);
  }
}

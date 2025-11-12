import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';

import { StatusHistoryService } from './status-history.service';
import { CreateStatusHistoryDto } from './dto/create-status-history.dto';
import { UpdateStatusHistoryDto } from './dto/update-status-history.dto';

@Controller('status-history')
export class StatusHistoryController {
  constructor(private readonly statusHistoryService: StatusHistoryService) { }

  @Post()
  create(@Body() createStatusHistoryDto: CreateStatusHistoryDto) {
    return this.statusHistoryService.create(createStatusHistoryDto);
  }

  @Get()
  findAll() {
    return this.statusHistoryService.findAll();
  }

  @Get('stats')
  getStatusStats() {
    return this.statusHistoryService.getStatusStats();
  }

  @Get('property/:propertyId')
  findByProperty(@Param('propertyId') propertyId: string) {
    return this.statusHistoryService.findByProperty(propertyId);
  }

  @Get('property/:propertyId/timeline')
  getStatusTimeline(@Param('propertyId') propertyId: string) {
    return this.statusHistoryService.getStatusTimeline(propertyId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.statusHistoryService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateStatusHistoryDto: UpdateStatusHistoryDto,
  ) {
    return this.statusHistoryService.update(id, updateStatusHistoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.statusHistoryService.remove(id);
  }
}

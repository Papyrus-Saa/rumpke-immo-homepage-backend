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

import { StatusHistoryService } from './status-history.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateStatusHistoryDto } from './dto/create-status-history.dto';
import { UpdateStatusHistoryDto } from './dto/update-status-history.dto';

@Controller('status-history')
export class StatusHistoryController {
  constructor(private readonly statusHistoryService: StatusHistoryService) { }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createStatusHistoryDto: CreateStatusHistoryDto) {
    return this.statusHistoryService.create(createStatusHistoryDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.statusHistoryService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('stats')
  getStatusStats() {
    return this.statusHistoryService.getStatusStats();
  }

  @UseGuards(JwtAuthGuard)
  @Get('property/:propertyId')
  findByProperty(@Param('propertyId') propertyId: string) {
    return this.statusHistoryService.findByProperty(propertyId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('property/:propertyId/timeline')
  getStatusTimeline(@Param('propertyId') propertyId: string) {
    return this.statusHistoryService.getStatusTimeline(propertyId);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.statusHistoryService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateStatusHistoryDto: UpdateStatusHistoryDto,
  ) {
    return this.statusHistoryService.update(id, updateStatusHistoryDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.statusHistoryService.remove(id);
  }
}

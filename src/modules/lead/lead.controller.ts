import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';

import { LeadService } from './lead.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateLeadDto } from './dto/create-lead.dto';
import { UpdateLeadDto } from './dto/update-lead.dto';
import { LeadStatus, LeadType } from './entities/lead.entity';

@UseGuards(JwtAuthGuard)
@Controller('lead')
export class LeadController {
  constructor(private readonly leadService: LeadService) { }

  @Throttle({ default: { ttl: 60000, limit: 3 } })
  @Post()
  create(@Body() createLeadDto: CreateLeadDto) {
    return this.leadService.create(createLeadDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(
    @Query('status') status?: LeadStatus,
    @Query('type') type?: LeadType,
    @Query('propertyId') propertyId?: string,
  ) {
    return this.leadService.findAll(status, type, propertyId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('stats')
  getStats() {
    return this.leadService.getStats();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.leadService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLeadDto: UpdateLeadDto) {
    return this.leadService.update(id, updateLeadDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.leadService.remove(id);
  }
}

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';

import { LeadService } from './lead.service';
import { CreateLeadDto } from './dto/create-lead.dto';
import { UpdateLeadDto } from './dto/update-lead.dto';
import { LeadStatus, LeadType } from './entities/lead.entity';

@Controller('lead')
export class LeadController {
  constructor(private readonly leadService: LeadService) { }

  @Post()
  create(@Body() createLeadDto: CreateLeadDto) {
    return this.leadService.create(createLeadDto);
  }

  @Get()
  findAll(
    @Query('status') status?: LeadStatus,
    @Query('type') type?: LeadType,
    @Query('propertyId') propertyId?: string,
  ) {
    return this.leadService.findAll(status, type, propertyId);
  }

  @Get('stats')
  getStats() {
    return this.leadService.getStats();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.leadService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLeadDto: UpdateLeadDto) {
    return this.leadService.update(id, updateLeadDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.leadService.remove(id);
  }
}

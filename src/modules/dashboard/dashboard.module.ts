import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';
import { Property } from '../property/entities/property.entity';
import { Agent } from '../agent/entities/agent.entity';
import { Lead } from '../lead/entities/lead.entity';
import { Category } from '../taxonomy/entities/category.entity';
import { Tag } from '../taxonomy/entities/tag.entity';
import { Amenity } from '../taxonomy/entities/amenity.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Property,
      Agent,
      Lead,
      Category,
      Tag,
      Amenity,
    ]),
  ],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule { }

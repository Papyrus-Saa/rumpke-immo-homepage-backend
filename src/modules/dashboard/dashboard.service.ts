import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, MoreThanOrEqual } from 'typeorm';
import { DashboardSummaryDto } from './dto/dashboard-summary.dto';
import { Property, PropertyStatus } from '../property/entities/property.entity';
import { Agent } from '../agent/entities/agent.entity';
import { Lead } from '../lead/entities/lead.entity';
import { Category } from '../taxonomy/entities/category.entity';
import { Tag } from '../taxonomy/entities/tag.entity';
import { Amenity } from '../taxonomy/entities/amenity.entity';

@Injectable()
export class DashboardService {
  constructor(
    @InjectRepository(Property)
    private readonly propertyRepo: Repository<Property>,
    @InjectRepository(Agent)
    private readonly agentRepo: Repository<Agent>,
    @InjectRepository(Lead)
    private readonly leadRepo: Repository<Lead>,
    @InjectRepository(Category)
    private readonly categoryRepo: Repository<Category>,
    @InjectRepository(Tag)
    private readonly tagRepo: Repository<Tag>,
    @InjectRepository(Amenity)
    private readonly amenityRepo: Repository<Amenity>,
  ) { }

  async getSummary(): Promise<DashboardSummaryDto> {
    // Properties
    const totalProperties = await this.propertyRepo.count();
    const publishedProperties = await this.propertyRepo.count({ where: { status: PropertyStatus.PUBLISHED } });
    const reservedProperties = await this.propertyRepo.count({ where: { status: PropertyStatus.RESERVED } });
    const soldProperties = await this.propertyRepo.count({ where: { status: PropertyStatus.SOLD } });
    const rentedProperties = await this.propertyRepo.count({ where: { status: PropertyStatus.RENTED } });
    const draftProperties = await this.propertyRepo.count({ where: { status: PropertyStatus.DRAFT } });
    const hiddenProperties = await this.propertyRepo.count({ where: { status: PropertyStatus.HIDDEN } });

    // Agents
    const totalAgents = await this.agentRepo.count();
    const activeAgents = await this.agentRepo.count({ where: { is_active: true } });
    const inactiveAgents = await this.agentRepo.count({ where: { is_active: false } });

    // Leads
    const totalLeads = await this.leadRepo.count();
    const now = new Date();
    const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const leadsThisMonth = await this.leadRepo.count({ where: { created_at: MoreThanOrEqual(firstDayOfMonth) } });

    // Taxonomy
    const totalCategories = await this.categoryRepo.count();
    const totalTags = await this.tagRepo.count();
    const totalAmenities = await this.amenityRepo.count();

    return {
      totalProperties,
      publishedProperties,
      reservedProperties,
      soldProperties,
      rentedProperties,
      draftProperties,
      hiddenProperties,
      totalAgents,
      activeAgents,
      inactiveAgents,
      totalLeads,
      leadsThisMonth,
      totalCategories,
      totalTags,
      totalAmenities,
    };
  }
}

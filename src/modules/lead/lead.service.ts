import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Lead, LeadStatus, LeadType } from './entities/lead.entity';
import { CreateLeadDto } from './dto/create-lead.dto';
import { UpdateLeadDto } from './dto/update-lead.dto';

@Injectable()
export class LeadService {
  constructor(
    @InjectRepository(Lead)
    private readonly leadRepository: Repository<Lead>,
  ) { }

  async create(createLeadDto: CreateLeadDto): Promise<Lead> {
    const lead = this.leadRepository.create(createLeadDto);
    return await this.leadRepository.save(lead);
  }

  async findAll(
    status?: LeadStatus,
    type?: LeadType,
    propertyId?: string,
  ): Promise<Lead[]> {
    const query = this.leadRepository.createQueryBuilder('lead');

    if (status) {
      query.andWhere('lead.status = :status', { status });
    }

    if (type) {
      query.andWhere('lead.type = :type', { type });
    }

    if (propertyId) {
      query.andWhere('lead.property_id = :propertyId', { propertyId });
    }

    query.leftJoinAndSelect('lead.property', 'property');
    query.orderBy('lead.created_at', 'DESC');

    return await query.getMany();
  }

  async findOne(id: string): Promise<Lead> {
    const lead = await this.leadRepository.findOne({
      where: { id },
      relations: ['property'],
    });

    if (!lead) {
      throw new NotFoundException(`Lead mit ID ${id} wurde nicht gefunden`);
    }

    return lead;
  }

  async update(id: string, updateLeadDto: UpdateLeadDto): Promise<Lead> {
    const lead = await this.findOne(id);

    Object.assign(lead, updateLeadDto);

    return await this.leadRepository.save(lead);
  }

  async remove(id: string): Promise<void> {
    const lead = await this.findOne(id);
    await this.leadRepository.remove(lead);
  }

  async countByStatus(status: LeadStatus): Promise<number> {
    return await this.leadRepository.count({ where: { status } });
  }

  async getStats(): Promise<{
    total: number;
    new: number;
    inProgress: number;
    done: number;
    byType: { type: LeadType; count: number }[];
  }> {
    const total = await this.leadRepository.count();
    const newCount = await this.countByStatus(LeadStatus.NEW);
    const inProgress = await this.countByStatus(LeadStatus.IN_PROGRESS);
    const done = await this.countByStatus(LeadStatus.DONE);

    const byType = await this.leadRepository
      .createQueryBuilder('lead')
      .select('lead.type', 'type')
      .addSelect('COUNT(*)', 'count')
      .groupBy('lead.type')
      .getRawMany();

    return {
      total,
      new: newCount,
      inProgress,
      done,
      byType: byType.map((item) => ({
        type: item.type,
        count: parseInt(item.count, 10),
      })),
    };
  }
}

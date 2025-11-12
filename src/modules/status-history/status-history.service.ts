
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import {
  StatusHistory,
  StatusHistoryStatus,
} from './entities/status-history.entity';
import { CreateStatusHistoryDto } from './dto/create-status-history.dto';
import { UpdateStatusHistoryDto } from './dto/update-status-history.dto';

@Injectable()
export class StatusHistoryService {
  constructor(
    @InjectRepository(StatusHistory)
    private readonly statusHistoryRepository: Repository<StatusHistory>,
  ) { }

  async create(
    createStatusHistoryDto: CreateStatusHistoryDto,
  ): Promise<StatusHistory> {
    const statusHistory = this.statusHistoryRepository.create(
      createStatusHistoryDto,
    );
    return await this.statusHistoryRepository.save(statusHistory);
  }

  async findAll(): Promise<StatusHistory[]> {
    return await this.statusHistoryRepository.find({
      relations: ['property'],
      order: { changed_at: 'DESC' },
    });
  }

  async findByProperty(propertyId: string): Promise<StatusHistory[]> {
    return await this.statusHistoryRepository.find({
      where: { property_id: propertyId },
      order: { changed_at: 'ASC' },
    });
  }

  async findOne(id: string): Promise<StatusHistory> {
    const statusHistory = await this.statusHistoryRepository.findOne({
      where: { id },
      relations: ['property'],
    });

    if (!statusHistory) {
      throw new NotFoundException(
        `Statushistorie mit ID ${id} wurde nicht gefunden`,
      );
    }

    return statusHistory;
  }

  async update(
    id: string,
    updateStatusHistoryDto: UpdateStatusHistoryDto,
  ): Promise<StatusHistory> {
    const statusHistory = await this.findOne(id);

    Object.assign(statusHistory, updateStatusHistoryDto);

    return await this.statusHistoryRepository.save(statusHistory);
  }

  async remove(id: string): Promise<void> {
    const statusHistory = await this.findOne(id);
    await this.statusHistoryRepository.remove(statusHistory);
  }

  async getStatusTimeline(propertyId: string): Promise<{
    currentStatus: StatusHistoryStatus;
    totalChanges: number;
    daysInCurrentStatus: number;
    timeline: StatusHistory[];
  }> {
    const timeline = await this.findByProperty(propertyId);

    if (timeline.length === 0) {
      throw new NotFoundException(
        `Keine Statushistorie für Immobilie ${propertyId} gefunden`,
      );
    }

    const currentStatus = timeline[timeline.length - 1].new_status;
    const lastChange = new Date(timeline[timeline.length - 1].changed_at);
    const now = new Date();
    const daysInCurrentStatus = Math.floor(
      (now.getTime() - lastChange.getTime()) / (1000 * 60 * 60 * 24),
    );

    return {
      currentStatus,
      totalChanges: timeline.length,
      daysInCurrentStatus,
      timeline,
    };
  }

  async getStatusStats(): Promise<{
    byStatus: { status: StatusHistoryStatus; count: number }[];
    recentChanges: StatusHistory[];
  }> {
    const byStatus = await this.statusHistoryRepository
      .createQueryBuilder('statusHistory')
      .select('statusHistory.new_status', 'status')
      .addSelect('COUNT(*)', 'count')
      .groupBy('statusHistory.new_status')
      .getRawMany();

    const recentChanges = await this.statusHistoryRepository.find({
      relations: ['property'],
      order: { changed_at: 'DESC' },
      take: 10,
    });

    return {
      byStatus: byStatus.map((item) => ({
        status: item.status,
        count: parseInt(item.count, 10),
      })),
      recentChanges,
    };
  }
}

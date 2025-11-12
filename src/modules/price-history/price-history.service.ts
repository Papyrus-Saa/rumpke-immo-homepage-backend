import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { PriceHistory } from './entities/price-history.entity';
import { CreatePriceHistoryDto } from './dto/create-price-history.dto';
import { UpdatePriceHistoryDto } from './dto/update-price-history.dto';

@Injectable()
export class PriceHistoryService {
  constructor(
    @InjectRepository(PriceHistory)
    private readonly priceHistoryRepository: Repository<PriceHistory>,
  ) { }

  async create(
    createPriceHistoryDto: CreatePriceHistoryDto,
  ): Promise<PriceHistory> {
    const priceHistory = this.priceHistoryRepository.create(
      createPriceHistoryDto,
    );
    return await this.priceHistoryRepository.save(priceHistory);
  }

  async findAll(): Promise<PriceHistory[]> {
    return await this.priceHistoryRepository.find({
      relations: ['property'],
      order: { changed_at: 'DESC' },
    });
  }

  async findByProperty(propertyId: string): Promise<PriceHistory[]> {
    return await this.priceHistoryRepository.find({
      where: { property_id: propertyId },
      order: { changed_at: 'ASC' },
    });
  }

  async findOne(id: string): Promise<PriceHistory> {
    const priceHistory = await this.priceHistoryRepository.findOne({
      where: { id },
      relations: ['property'],
    });

    if (!priceHistory) {
      throw new NotFoundException(
        `Preishistorie mit ID ${id} wurde nicht gefunden`,
      );
    }

    return priceHistory;
  }

  async update(
    id: string,
    updatePriceHistoryDto: UpdatePriceHistoryDto,
  ): Promise<PriceHistory> {
    const priceHistory = await this.findOne(id);

    Object.assign(priceHistory, updatePriceHistoryDto);

    return await this.priceHistoryRepository.save(priceHistory);
  }

  async remove(id: string): Promise<void> {
    const priceHistory = await this.findOne(id);
    await this.priceHistoryRepository.remove(priceHistory);
  }

  async getPriceEvolution(propertyId: string): Promise<{
    currentPrice: number;
    initialPrice: number;
    priceChange: number;
    priceChangePercentage: number;
    totalChanges: number;
    history: PriceHistory[];
  }> {
    const history = await this.findByProperty(propertyId);

    if (history.length === 0) {
      throw new NotFoundException(
        `Keine Preishistorie für Immobilie ${propertyId} gefunden`,
      );
    }

    const initialPrice = history[0].new_price;
    const currentPrice = history[history.length - 1].new_price;
    const priceChange = currentPrice - initialPrice;
    const priceChangePercentage = ((priceChange / initialPrice) * 100);

    return {
      currentPrice: Number(currentPrice),
      initialPrice: Number(initialPrice),
      priceChange: Number(priceChange),
      priceChangePercentage: Number(priceChangePercentage.toFixed(2)),
      totalChanges: history.length,
      history,
    };
  }
}

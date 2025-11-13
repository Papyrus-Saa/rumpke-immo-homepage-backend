import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SitemapService } from './sitemap.service';
import { SitemapController } from './sitemap.controller';
import { Property } from '../property/entities/property.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Property])],
  controllers: [SitemapController],
  providers: [SitemapService],
})
export class SitemapModule { }

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Property, PropertyStatus } from '../property/entities/property.entity';

@Injectable()
export class SitemapService {
  constructor(
    @InjectRepository(Property)
    private readonly propertyRepository: Repository<Property>,
  ) { }

  async generatePropertiesSitemap(baseUrl: string): Promise<string> {
    const properties = await this.propertyRepository.find({
      where: { status: PropertyStatus.PUBLISHED },
      select: ['id', 'slug', 'updated_at'],
    });

    const urls = properties.map((property) => {
      const lastmod = property.updated_at.toISOString().split('T')[0];
      return `
  <url>
    <loc>${baseUrl}/property/${property.slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;
    });

    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('')}
</urlset>`;
  }

  async generateSitemapIndex(baseUrl: string): Promise<string> {
    const now = new Date().toISOString().split('T')[0];

    return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${baseUrl}/sitemap/properties.xml</loc>
    <lastmod>${now}</lastmod>
  </sitemap>
</sitemapindex>`;
  }
}

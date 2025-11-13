import { Controller, Get, Header, Req } from '@nestjs/common';
import { SitemapService } from './sitemap.service';

@Controller('sitemap')
export class SitemapController {
  constructor(private readonly sitemapService: SitemapService) { }

  @Get('properties.xml')
  @Header('Content-Type', 'application/xml')
  async getPropertiesSitemap(@Req() req: any) {
    const baseUrl = `${req.protocol}://${req.get('host')}`;
    return this.sitemapService.generatePropertiesSitemap(baseUrl);
  }

  @Get()
  @Header('Content-Type', 'application/xml')
  async getSitemapIndex(@Req() req: any) {
    const baseUrl = `${req.protocol}://${req.get('host')}`;
    return this.sitemapService.generateSitemapIndex(baseUrl);
  }
}

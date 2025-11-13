import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

interface GeocodeResult {
  latitude: number;
  longitude: number;
  formatted_address?: string;
}

@Injectable()
export class GeocodingService {
  private readonly logger = new Logger(GeocodingService.name);
  private readonly apiKey: string;

  constructor(private configService: ConfigService) {
    this.apiKey = this.configService.get('GEOCODING_API_KEY') || '';
  }

  async geocode(address: string): Promise<GeocodeResult | null> {
    if (!this.apiKey) {
      this.logger.warn('GEOCODING_API_KEY not configured');
      return null;
    }

    try {
      const response = await axios.get(
        'https://maps.googleapis.com/maps/api/geocode/json',
        {
          params: {
            address,
            key: this.apiKey,
          },
        },
      );

      if (response.data.status === 'OK' && response.data.results.length > 0) {
        const location = response.data.results[0].geometry.location;
        return {
          latitude: location.lat,
          longitude: location.lng,
          formatted_address: response.data.results[0].formatted_address,
        };
      }

      this.logger.warn(`Geocoding failed: ${response.data.status}`);
      return null;
    } catch (error) {
      this.logger.error('Geocoding error:', error.message);
      return null;
    }
  }

  buildAddress(
    street?: string,
    city?: string,
    postalCode?: string,
    country?: string,
  ): string {
    return [street, postalCode, city, country].filter(Boolean).join(', ');
  }
}

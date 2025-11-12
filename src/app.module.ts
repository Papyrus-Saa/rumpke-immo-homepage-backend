import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PropertyModule } from './modules/property/property.module';
import { MediaModule } from './modules/media/media.module';
import { TaxonomyModule } from './modules/taxonomy/taxonomy.module';
import { AgentModule } from './modules/agent/agent.module';
import { LeadModule } from './modules/lead/lead.module';
import { PriceHistoryModule } from './modules/price-history/price-history.module';
import { StatusHistoryModule } from './modules/status-history/status-history.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.get('DATABASE_URL'),
        autoLoadEntities: true,
        synchronize: configService.get('NODE_ENV') === 'development',
        logging: true,
        ssl: {
          rejectUnauthorized: false,
        },
      }),
      inject: [ConfigService],
    }),
    PropertyModule,
    MediaModule,
    TaxonomyModule,
    AgentModule,
    LeadModule,
    PriceHistoryModule,
    StatusHistoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }

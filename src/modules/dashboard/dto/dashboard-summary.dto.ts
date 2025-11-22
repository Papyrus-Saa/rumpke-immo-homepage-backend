import { ApiProperty } from '@nestjs/swagger';

export class DashboardSummaryDto {
  @ApiProperty({ example: 0 })
  totalProperties: number;

  @ApiProperty({ example: 0 })
  publishedProperties: number;

  @ApiProperty({ example: 0 })
  reservedProperties: number;

  @ApiProperty({ example: 0 })
  soldProperties: number;

  @ApiProperty({ example: 0 })
  rentedProperties: number;

  @ApiProperty({ example: 0 })
  draftProperties: number;

  @ApiProperty({ example: 0 })
  hiddenProperties: number;

  @ApiProperty({ example: 0 })
  totalAgents: number;

  @ApiProperty({ example: 0 })
  activeAgents: number;

  @ApiProperty({ example: 0 })
  inactiveAgents: number;

  @ApiProperty({ example: 0 })
  totalLeads: number;

  @ApiProperty({ example: 0 })
  leadsThisMonth: number;

  @ApiProperty({ example: 0 })
  totalCategories: number;

  @ApiProperty({ example: 0 })
  totalTags: number;

  @ApiProperty({ example: 0 })
  totalAmenities: number;
}

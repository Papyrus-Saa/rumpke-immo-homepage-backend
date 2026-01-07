import { MigrationInterface, QueryRunner } from "typeorm";

export class RemoveRegionFromPropertiesTable1702396800000 implements MigrationInterface {
  name = 'RemoveRegionFromPropertiesTable1702396800000'

  public async up(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('properties');
    const hasRegion = table?.findColumnByName('region');
    if (hasRegion) {
      await queryRunner.query(`ALTER TABLE "properties" DROP COLUMN "region"`);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "properties" ADD "region" character varying NOT NULL`);
  }
}

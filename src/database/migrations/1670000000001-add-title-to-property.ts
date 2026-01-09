import { MigrationInterface, QueryRunner } from "typeorm";

export class AddTitleToProperty1670000000001 implements MigrationInterface {
  name = 'AddTitleToProperty1670000000001'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "properties" ADD COLUMN IF NOT EXISTS "title" character varying`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "properties" DROP COLUMN IF EXISTS "title"`);
  }
}

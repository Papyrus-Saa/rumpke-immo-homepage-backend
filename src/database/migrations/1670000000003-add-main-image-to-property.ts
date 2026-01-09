import { MigrationInterface, QueryRunner } from "typeorm";

export class AddMainImageToProperty1670000000003 implements MigrationInterface {
    name = 'AddMainImageToProperty1670000000003'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "properties" ADD COLUMN IF NOT EXISTS "main_image" character varying NOT NULL DEFAULT ''`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "properties" DROP COLUMN IF EXISTS "main_image"`);
    }
}

import { MigrationInterface, QueryRunner } from "typeorm";

export class MakeTitleNotNull1670000000002 implements MigrationInterface {
    name = 'MakeTitleNotNull1670000000002'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`UPDATE "properties" SET "title" = '' WHERE "title" IS NULL`);
        await queryRunner.query(`ALTER TABLE "properties" ALTER COLUMN "title" SET NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "properties" ALTER COLUMN "title" DROP NOT NULL`);
    }
}

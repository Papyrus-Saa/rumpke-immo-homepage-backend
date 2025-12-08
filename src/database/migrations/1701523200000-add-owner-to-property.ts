import { MigrationInterface, QueryRunner } from "typeorm";

export class addOwnerToProperty1701523200000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "properties" ADD COLUMN "owner" varchar(255)`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "properties" DROP COLUMN "owner"`);
  }
}

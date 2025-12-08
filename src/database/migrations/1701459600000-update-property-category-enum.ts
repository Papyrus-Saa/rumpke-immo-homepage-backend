import { MigrationInterface, QueryRunner } from "typeorm";

export class updatePropertyCategoryEnum1701459600000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // 1. Rename old enum type if exists
    await queryRunner.query(`DO $$ BEGIN IF EXISTS (SELECT 1 FROM pg_type WHERE typname = 'properties_category_enum') THEN ALTER TYPE "properties_category_enum" RENAME TO "properties_category_enum_old"; END IF; END $$;`);

    // 2. Create new enum type
    await queryRunner.query(`CREATE TYPE "properties_category_enum" AS ENUM ('haus', 'wohnung', 'gewerbe', 'grundstueck', 'sonstige')`);

    // 3. Alter column to use new enum type
    await queryRunner.query(`ALTER TABLE "properties" ALTER COLUMN "category" DROP DEFAULT`);
    await queryRunner.query(`ALTER TABLE "properties" ALTER COLUMN "category" TYPE "properties_category_enum" USING "category"::text::"properties_category_enum"`);
    await queryRunner.query(`ALTER TABLE "properties" ALTER COLUMN "category" SET DEFAULT 'sonstige'`);

    // 4. Drop old enum type if exists
    await queryRunner.query(`DO $$ BEGIN IF EXISTS (SELECT 1 FROM pg_type WHERE typname = 'properties_category_enum_old') THEN DROP TYPE "properties_category_enum_old"; END IF; END $$;`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // 1. Rename new enum type
    await queryRunner.query(`ALTER TYPE "properties_category_enum" RENAME TO "properties_category_enum_new"`);

    // 2. Recreate old enum type (add previous values as needed)
    await queryRunner.query(`CREATE TYPE "properties_category_enum" AS ENUM ('wohnungen', 'haeuser', 'luxus', 'alle-immobilien')`);

    // 3. Alter column to use old enum type
    await queryRunner.query(`ALTER TABLE "properties" ALTER COLUMN "category" DROP DEFAULT`);
    await queryRunner.query(`ALTER TABLE "properties" ALTER COLUMN "category" TYPE "properties_category_enum" USING "category"::text::"properties_category_enum"`);
    await queryRunner.query(`ALTER TABLE "properties" ALTER COLUMN "category" SET DEFAULT 'alle-immobilien'`);

    // 4. Drop new enum type
    await queryRunner.query(`DROP TYPE "properties_category_enum_new"`);
  }
}

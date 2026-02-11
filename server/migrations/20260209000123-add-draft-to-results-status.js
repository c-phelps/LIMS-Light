"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    // Drop old default first
    await queryInterface.sequelize.query(`
      ALTER TABLE "Results"
      ALTER COLUMN "status" DROP DEFAULT;
    `);

    // Rename old enum if it exists
    await queryInterface.sequelize.query(`
      DO $$
      BEGIN
        IF EXISTS (SELECT 1 FROM pg_type WHERE typname = 'enum_results_status') THEN
          ALTER TYPE "enum_Results_status" RENAME TO "enum_Results_status_old";
        END IF;
      END$$;
    `);

    // Create new enum with DRAFT
    await queryInterface.sequelize.query(`
      CREATE TYPE "enum_Results_status" AS ENUM (
        'DRAFT',
        'PENDING',
        'APPROVED',
        'REJECTED'
      );
    `);

    // Alter column to use new enum
    await queryInterface.sequelize.query(`
      ALTER TABLE "Results"
      ALTER COLUMN "status"
      TYPE "enum_Results_status"
      USING "status"::text::"enum_Results_status";
    `);

    // Set new default
    await queryInterface.sequelize.query(`
      ALTER TABLE "Results"
      ALTER COLUMN "status"
      SET DEFAULT 'DRAFT';
    `);

    // Drop old enum if exists
    await queryInterface.sequelize.query(`
      DROP TYPE IF EXISTS "enum_Results_status_old";
    `);
  },

  async down(queryInterface, Sequelize) {
    // Reverse the process

    await queryInterface.sequelize.query(`
      ALTER TABLE "Results"
      ALTER COLUMN "status" DROP DEFAULT;
    `);

    await queryInterface.sequelize.query(`
      DO $$
      BEGIN
        IF EXISTS (SELECT 1 FROM pg_type WHERE typname = 'enum_results_status') THEN
          ALTER TYPE "enum_Results_status" RENAME TO "enum_Results_status_new";
        END IF;
      END$$;
    `);

    await queryInterface.sequelize.query(`
      CREATE TYPE "enum_Results_status" AS ENUM (
        'PENDING',
        'APPROVED',
        'REJECTED'
      );
    `);

    await queryInterface.sequelize.query(`
      ALTER TABLE "Results"
      ALTER COLUMN "status"
      TYPE "enum_Results_status"
      USING "status"::text::"enum_Results_status";
    `);

    await queryInterface.sequelize.query(`
      ALTER TABLE "Results"
      ALTER COLUMN "status"
      SET DEFAULT 'PENDING';
    `);

    await queryInterface.sequelize.query(`
      DROP TYPE IF EXISTS "enum_Results_status_new";
    `);
  },
};
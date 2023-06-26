import { MigrationInterface, QueryRunner } from "typeorm";

export class User1687477305536 implements MigrationInterface {
    name = 'User1687477305536'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "nome" text NOT NULL, "email" text NOT NULL, "idade" integer NOT NULL)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "users"`);
    }

}

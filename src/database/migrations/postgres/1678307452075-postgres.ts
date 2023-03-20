import { MigrationInterface, QueryRunner } from 'typeorm';

export class postgres1678307452075 implements MigrationInterface {
  name = 'postgres1678307452075';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "servico" ("id" SERIAL NOT NULL, "nome" character varying NOT NULL, "valor_minimo" integer NOT NULL, "quantidade_horas" integer NOT NULL, "porcentagem" integer NOT NULL, "valor_quarto" integer NOT NULL, "horas_quarto" integer NOT NULL, "valor_sala" integer NOT NULL, "horas_sala" integer NOT NULL, "valor_banheiro" integer NOT NULL, "horas_banheiro" integer NOT NULL, "valor_cozinha" integer NOT NULL, "horas_cozinha" integer NOT NULL, "valor_quintal" integer NOT NULL, "horas_quintal" integer NOT NULL, "valor_outros" integer NOT NULL, "horas_outros" integer NOT NULL, "icone" character varying NOT NULL, "posicao" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "update_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, CONSTRAINT "PK_289d0aa6d49f9d0fd65aefc6677" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "usuario_plataforma" ("id" SERIAL NOT NULL, "nome" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "update_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, CONSTRAINT "UQ_04ba99f3d46fe29af4169acfc0b" UNIQUE ("email"), CONSTRAINT "PK_811ebd0f861e733d314b11d71b5" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "usuario_plataforma"`);
    await queryRunner.query(`DROP TABLE "servico"`);
  }
}

import { MigrationInterface, QueryRunner } from 'typeorm';

export class CriandoEntidadeServico1663354986620 implements MigrationInterface {
  name = '1CriandoEntidadeServico1663354986620';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`servico\` (\`id\` int NOT NULL AUTO_INCREMENT, \`nome\` varchar(255) NOT NULL, \`valor_minimo\` int NOT NULL, \`quantidade_horas\` int NOT NULL, \`porcentagem\` int NOT NULL, \`valor_quarto\` int NOT NULL, \`horas_quarto\` int NOT NULL, \`valor_sala\` int NOT NULL, \`horas_sala\` int NOT NULL, \`valor_banheiro\` int NOT NULL, \`horas_banheiro\` int NOT NULL, \`valor_cozinha\` int NOT NULL, \`horas_cozinha\` int NOT NULL, \`valor_quintal\` int NOT NULL, \`horas_quintal\` int NOT NULL, \`valor_outros\` int NOT NULL, \`horas_outros\` int NOT NULL, \`icone\` varchar(255) NOT NULL, \`posicao\` int NOT NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`update_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`servico\``);
  }
}

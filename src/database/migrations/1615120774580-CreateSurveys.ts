import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateSurveys1615120774580 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'surveys',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        comment: 'Identificador unico de pesquisa'
                    },
                    {
                        name: 'title',
                        type: 'varchar',
                        comment: 'Título da pesquisa'
                    },
                    {
                        name: 'description',
                        type: 'varchar',
                        comment: 'Descrição da pesquisa'
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp',
                        default: 'now()',
                        comment: 'Data de criação do registro de pesquisa'
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("surveys")
    }

}

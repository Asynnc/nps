import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateUsers1614867785216 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'users',
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                        comment: "Identificador único do usuário"
                    },
                    {
                        name: "name",
                        type: "varchar",
                        comment: "Nome do usuário"
                    },
                    {
                        name: "email",
                        type: "varchar",
                        comment: "Email do usuário"
                    },
                    {
                        name: "created_at",
                        type: "date",
                        default: "now()",
                        comment: "Data de criação do usuário"
                    },
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('users')
    }

}

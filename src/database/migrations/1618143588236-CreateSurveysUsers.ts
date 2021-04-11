import {MigrationInterface, QueryRunner, Table} from "typeorm";


export class CreateSurveysUsers1618143588236 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table ({
                name: "surveys_users",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        comment: "Identificador unico da pesquisa do usuário"
                    },
                    {
                        name: "user_id",
                        type: "uuid",
                        comment: "Usuário relacionado"
                    },
                    {
                        name: "survey_id",
                        type: "uuid",
                        comment: "Pesquisa relacionada"
                    },
                    {
                        name: "value",
                        type: "number",
                        isNullable: true,
                        comment: "Valor da pesquisa"
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()",
                        comment: "Data de criação do registro"
                    }
                ],
                foreignKeys: [
                    {
                        name: "FKUser",
                        referencedTableName: "users",
                        referencedColumnNames: ["id"],
                        columnNames: ["user_id"],
                        onDelete: "CASCADE",
                        onUpdate: "CASCADE"
                    },
                    {
                        name: "FKSurvey",
                        referencedTableName: "surveys",
                        referencedColumnNames: ["id"],
                        columnNames: ["survey_id"],
                        onDelete: "CASCADE",
                        onUpdate: "CASCADE"
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("surveys_users")
    }

}

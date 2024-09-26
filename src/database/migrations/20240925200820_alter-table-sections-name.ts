import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {

    await knex.schema.renameTable('sections', 'table_sessions')
}


export async function down(knex: Knex): Promise<void> {
}


import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('tables_temp', table => {
        table.integer('number').primary();
        table.string('description');
        table.timestamp('created_at').defaultTo(knex.fn.now());
    });

   // await knex('tables_temp').insert(await knex('tables').select())

    await knex.schema.dropTable('tables')
    await knex.schema.renameTable('tables_temp', 'tables')
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists('tables_temp')
}


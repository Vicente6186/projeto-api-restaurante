import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  
   await knex.schema.alterTable('table_sessions', table => {
        table.dropColumn('status')
      //table.timestamp('closed_at')
        table.dropColumn('price')
        table.integer('table_id').notNullable().references('number').inTable('tables')
    })
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.alterTable('table_sessions', table => {
       table.dropColumn('closed_at')
        table.dropColumn('table_id')
    })
}


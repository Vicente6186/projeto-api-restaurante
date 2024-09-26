import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {

    await knex.schema.createTable('sections', table => {
        table.increments('id').primary();
        table.string('price').notNullable().defaultTo(0);
        table.string('status').notNullable().checkIn(['active', 'inactive']);
        table.timestamp('created_at').defaultTo(knex.fn.now());
    });
    
    await knex.schema.createTable('tables', table => {
        table.integer('number').primary();
        table.string('description').notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());
    });

    
    await knex.schema.createTable('products', table => {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.decimal('price').notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
    });
    
    await knex.schema.createTableLike('products_old', 'products');

}



export async function down(knex: Knex): Promise<void> {
}


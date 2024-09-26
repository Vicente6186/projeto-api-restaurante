import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('tables_temp', table => {
        table.increments('id').primary()
        table.integer('number').notNullable()
        table.string('description')
    })

    await knex.schema.createTable('products_temp', table => {
        table.increments('id').primary()
        table.string('name').notNullable()
        table.decimal('price').notNullable()
    })

    await knex.schema.createTable('table_sessions_temp', table => {
        table.increments('id').primary()
        table.integer('table_id').references('id').inTable('tables_temp').notNullable()
        table.timestamp('created_at').defaultTo(knex.fn.now())
        table.timestamp('closed_at')
    })

    await knex.schema.createTable('orders_temp', table => {
        table.increments('id').primary()
        table.integer('quantity').notNullable()
        table.decimal('price').notNullable()
        table.integer('product_id').references('id').inTable('products_temp').notNullable()
        table.integer('table_session_id').references('id').inTable('table_sessions_temp').notNullable()
    })

    await knex('tables_temp').insert(await knex('tables').select('number', 'description'))
    await knex('products_temp').insert(await knex('products').select('name', 'price'))

    await knex.schema.dropTable('tables')
    await knex.schema.dropTable('products')
    await knex.schema.dropTable('products_old')
    await knex.schema.dropTable('table_sessions')
    await knex.schema.renameTable('tables_temp', 'tables')
    await knex.schema.renameTable('products_temp', 'products')
    await knex.schema.renameTable('orders_temp', 'orders')
    await knex.schema.renameTable('table_sessions_temp', 'table_sessions')

    // await knex.schema.alterTable('orders', table => {
    //     table.dropForeign('product_id')
    //     table.dropForeign('table_session_id')
    //     table.foreign('product_id').references('id').inTable('products')
    //     table.foreign('table_session_id').references('id').inTable('table_sessions')
    // })

    // await knex.schema.alterTable('table_sessions', table => {
    //     table.dropForeign('table_id')
    //     table.foreign('table_id').references('id').inTable('tables')
    // })
}


export async function down(knex: Knex): Promise<void> {
}


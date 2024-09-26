import { Request, Response } from "express"
import { z } from "zod"
import knex from "../database/database"
import AppError from "../models/app-error"

class TableSessionsController {
    
    static async index(request: Request, response: Response) {
        let tables = await knex<TableSessionType>('table_sessions')
        .select('table_sessions.id', 'created_at', 'closed_at', 'number', 'description')
        .groupBy('table_sessions.id')
        .join('tables', 'table_sessions.table_id', 'tables.id') 

        for (let index in tables) {
            let table = tables[index]
            const orders = await knex<OrderType>('orders').where({ table_session_id: table.id }).join('products', 'orders.product_id', 'products.id').select('products.name', 'orders.quantity', 'orders.price')
            const totalPrice = orders.reduce((acc, order) => acc + order.price * order.quantity, 0)
            tables[index] = { ...table, totalPrice, orders }
        }
        
        
    
        
        response.json(tables)
    }
    
    static async store(request: Request, response: Response) {
        const schema = z.object({
            table_id: z.number().positive(),
        })
        const { table_id } = schema.parse(request.body)
        const searchedTable = await knex<TableSessionType>('table_sessions').where({ table_id }).whereNull('closed_at').first()

        if(searchedTable) throw new AppError('This table is open!', 409)
        const createdTable = await knex<TableSessionType>('table_sessions').insert({ table_id }).returning('*')
        
        response.status(201).json(createdTable)
    }
    
    static async update(request: Request, response: Response) {
        const schema = z.object({
            table_id: z.number().positive().optional(),
            closed_at: z.boolean().optional()
        })
        
        const { id } = request.params
        const fields: any = schema.parse(request.body)

        if(fields.closed_at) fields.closed_at = knex.fn.now()
            
        
        const updatedTable = await knex<TableSessionType>('table_sessions').where({ id: Number(id) }).update(fields).returning('*')
        
        response.json(updatedTable)
    }
    
    static async destroy(request: Request, response: Response) {
        const { id } = request.params
        await knex('orders').where({ table_session_id: id }).del();
        await knex<TableSessionType>('table_sessions').where({ id: Number(id) }).del()
        response.status(204).send()
    }
}

export default TableSessionsController
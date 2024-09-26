import { Request, Response } from "express";
import knex from "../database/database";
import { z } from "zod";
import AppError from "../models/app-error";

class OrdersController {
    static async index(request: Request, response: Response) {
        const orders = await knex<OrderType>('orders')
        response.json(orders)
    }
    
    static async show(request: Request, response: Response) {
        const { id } = request.params
        const order = await knex<OrderType>('orders').where({ id: Number(id) }).first()
        response.json(order)
    }
    
    static async store(request: Request, response: Response) {
        const schema = z.object({
            quantity: z.number().positive(),
            product_id: z.number().positive(),
            table_session_id: z.number().positive()
        })
        const { quantity, product_id , table_session_id}: Partial<OrderType> = schema.parse(request.body)
        
        const table_session = await knex<TableSessionType>('table_sessions')
        .where({ id: Number(table_session_id) }).whereNull('closed_at').first()
        if(!table_session) throw new AppError('Table session not found!', 404)
            
        const {price} = await knex<ProductType>('products').where({ id: Number(product_id) }).first()
        
        const createdOrder = await knex<OrderType>('orders').insert({ quantity, price, product_id, table_session_id }).returning('*')
        
        response.status(201).json(createdOrder)
    }
    
    static async update(request: Request, response: Response) {
        const schema = z.object({
            quantity: z.number().positive().optional(),
            product_id: z.number().positive().optional()
        })
        const { id } = request.params
        
        const table_session = await knex<TableSessionType>('table_sessions')
        .where({ id: Number(id) }).whereNull('closed_at').first()
        if(!table_session) throw new AppError('Table session not found!', 404)

        const fields: Partial<OrderType> = schema.parse(request.body)

        if(fields.product_id) fields.price = (await knex<ProductType>('products').where({ id: Number(fields.product_id) }).first()).price
        
        const updatedOrder = await knex<OrderType>('orders')
        .where({ id: Number(id) }).update(fields).returning('*')
        
        response.json(updatedOrder)
    }
    
    static async destroy(request: Request, response: Response) {
        const { id } = request.params

        const deletedOrder = await knex<OrderType>('orders').where({ id: Number(id) })
        const table_session = await knex<TableSessionType>('table_sessions')
        .where({ id: deletedOrder[0].table_session_id }).whereNull('closed_at').first() 

        if(!table_session) throw new AppError('Table session not found!', 404)

        await knex<OrderType>('orders').where({ id: Number(id) }).delete()

        response.json(deletedOrder)
    }
}

export default OrdersController
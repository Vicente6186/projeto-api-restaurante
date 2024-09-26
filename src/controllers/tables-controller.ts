import { Request, Response } from "express"
import { z } from "zod"
import knex from "../database/database"

class TablesController {
    
    static async index(request: Request, response: Response) {
        const tables = await knex<TableType>('tables').select()
        response.json(tables)
    }
    
    static async store(request: Request, response: Response) {
        const schema = z.object({
            number: z.number().positive(),
            description: z.string().trim().optional()
        })
        const { number, description } = schema.parse(request.body)
        const createdTable = await knex<TableType>('tables').insert({ number, description }).returning('*')
        
        response.status(201).json(createdTable)
    }
    
    static async update(request: Request, response: Response) {
        const schema = z.object({
            number: z.number().positive().optional(),
            description: z.string().trim().optional()
        })
        
        const { id } = request.params
        const fields = schema.parse(request.body)
        
        const updatedTable = await knex<TableType>('tables').where({ id: Number(id) }).update(fields).returning('*')
        
        response.json(updatedTable)
    }
    
    static async destroy(request: Request, response: Response) {
        const { id } = request.params
        let deletedTable = await knex<TableType>('tables').where({ id: Number(id) }).delete()
        response.json(deletedTable)
    }
}

export default TablesController
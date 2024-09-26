import { Request, Response } from "express";
import {z} from 'zod'
import knex from "../database/database";

class ProductsController {
    static async index(request: Request, response: Response) {
        const { name, price } = request.query
        const products = await knex<ProductType>('products')
        .select().whereLike('name', `%${name ?? ""}%`).whereLike('price', price ?? "%%")
        response.json(products)
    }

    static async show(request: Request, response: Response) {
       const { id } = request.params
       const product = await knex<ProductType>('products').where({id: Number(id)}).first()
       response.json(product)
    }

    static async store(request: Request, response: Response) {
       const schema = z.object({
           name: z.string().trim().min(1),
           price: z.number().positive()
       })

       const {name, price} = schema.parse(request.body)

      const createdProduct = await knex<ProductType>('products').insert({name, price}).returning('*')

      response.status(201).json(createdProduct)

    }

    static async update(request: Request, response: Response) {
       let schema = z.object({
           name: z.string().trim().min(1).optional(),
           price: z.number().positive().optional()
       })

        const fields = schema.parse(request.body)

       const {id} = request.params
       const updatedProduct = await knex<ProductType>('products')
       .update(fields).where({id: Number(id)}).returning('*')

       response.json(updatedProduct)
    }

    static async destroy(request: Request, response: Response) {
       let deletedProduct = await knex<ProductType>('products').where({id: Number(request.params.id)}).delete()
       response.json(deletedProduct)
    }
}

export default ProductsController
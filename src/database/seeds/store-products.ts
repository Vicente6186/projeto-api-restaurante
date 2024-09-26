import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("products").del();

    // Inserts seed entries
    await knex("products").insert([
       {name: 'Picanha', price: 50.00},
       {name: 'File de Frango', price: 30.00},
       {name: 'Coxinha', price: 20.00},
       {name: 'Coca Cola', price: 10.00},
       {name: 'Pizza', price: 40.00},
       {name: 'Cachorro Quente', price: 5.00},
       {name: 'Feijão', price: 15.00},
       {name: 'Sorvete', price: 20.00},
       {name: 'Hambúrguer', price: 25.00},
    ]);
};

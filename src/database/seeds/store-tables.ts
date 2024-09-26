import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("tables").del();

    // Inserts seed entries
    await knex("tables").insert([
       {number: 1},
       {number: 2},
       {number: 3},
       {number: 4},
       {number: 5, description: 'mesa especial'},
    ]);
};

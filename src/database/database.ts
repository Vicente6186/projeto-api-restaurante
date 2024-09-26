import knexInitializer from 'knex';
import knexConfig from '../../knexfile'

const knex = knexInitializer(knexConfig);
export default knex
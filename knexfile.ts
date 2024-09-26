export default {
    client: 'sqlite3',
    connection: {
        filename: './src/database/db.sqlite',
    },
    migrations: {
        directory: './src/database/migrations',
        extension: 'ts',
    },
    seeds: {
        directory: './src/database/seeds',
        extension: 'ts',
    },
    pool: {
        afterCreate: (conn, done) => {
            conn.run('PRAGMA foreign_keys = ON', done)
        }
    },
    useNullAsDefault: true
}
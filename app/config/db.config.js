const config = {
    connectionLimit: 10,
    host: process.env.HOST,
    user: process.env.SQL_USER,
    port: process.env.SQL_PORT,
    password: process.env.SQL_PASSWORD,
    database: process.env.DATABASE,
    multipleStatements: true
}

module.exports = config;
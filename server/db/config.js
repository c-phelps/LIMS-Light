//separate credentials and config from code
require('dotenv').config();

module.exports = {
    url: process.env.DATABASE_URL,
    options: {
        dialect: 'postgres',
        logging: false,
    }
}
var pjson = require('../../package.json');
import dotenv from 'dotenv';
dotenv.config();

export const config = {
    server: {
        env: process.env.ENV,
        port: process.env.SERVER_PORT,
        apiVersion: process.env.API_VERSION,
        apiPath: process.env.API_PATH,
    },
    mongo:{
        uri: process.env.DB_URI,
        name: process.env.DB_NAME,
    },
    jwt:{
        secret: process.env.JWT_SECRET,
        public: process.env.JWT_PUBLIC,
        auth: process.env.JWT_AUTH_SECRET,
        expire: process.env.JWT_EXPIRE,
        expireRefresh: process.env.JWT_REFRESH_EXPIRE,
    },
    kafka: {
        broker: process.env.KAFKA_BROKER,
        client: process.env.KAFKA_CLIENT,
        topic: process.env.KAFKA_TOPIC,
        group: process.env.KAFKA_GROUP,
        foreigners: process.env.KAFKA_FOREIGNERS!,
    },
    paths: {
        logger: process.env.LOGGER_PATH
    },
    package: pjson,
};

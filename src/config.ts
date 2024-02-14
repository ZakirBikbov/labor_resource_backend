import { DataSourceOptions } from "typeorm";
import { User } from "@/entities/user.entity";
import { SeederOptions } from 'typeorm-extension';
import { UserFactory } from "@/db/factories/user.factory";
import MainSeeder from "@/db/seeds/main.seeder";
import { Order } from "@/entities/order.entity";
import { Service } from "@/entities/service.entity";
import { ServiceFactory } from "@/db/factories/service.factory";
import { OrderFactory } from "@/db/factories/order.factory";
import { Response } from "@/entities/response.entity";
import { ResponseFactory } from "@/db/factories/response.factory";
import dotenv from "dotenv";
import * as process from "process";
import { UserPosition } from "./entities/userPosition.interface";

dotenv.config();

export const appDBConnect: DataSourceOptions & SeederOptions = {
    type: 'mysql',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT!),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: true,
    logging: true,
    entities: [
        User,
        Service,
        Order,
        Response,
        UserPosition
    ],
    seeds: [
        MainSeeder,
    ],
    factories: [
        UserFactory,
        ServiceFactory,
        OrderFactory,
        ResponseFactory
    ]
}
import { Faker } from '@faker-js/faker';
import { setSeederFactory } from 'typeorm-extension';
import { Response } from '@/entities/response.entity';

export const ResponseFactory = setSeederFactory(Response, (faker: Faker) => {
    const response = new Response();
    return response;
})
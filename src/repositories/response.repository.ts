import { In, Repository } from 'typeorm';
import { appDataSource } from '@/dataSource';
import { Response } from '@/entities/response.entity';
import { IResponse } from '@/interfaces/IResponse.interface';
import { EResponseStatus } from '@/enum/EResponseStatus.enum';
import { ResponseDto } from '@/dto/response.dto';
import { EditResponseDto } from '@/dto/editResponse.dto';

export class ResponseRepository extends Repository<Response> {
    constructor() {
        super(Response, appDataSource.createEntityManager());
    }

    async createResponse(data: ResponseDto): Promise<IResponse> {
        const response = new Response();
        response.orderId = data.orderId;
        response.performerId = data.performerId;
        response.status = EResponseStatus.WAITING;
        return await this.save(response);
    }

    async editResponse(data: EditResponseDto): Promise<boolean> {
        const editedResponse = await this.update(
            { id: data.id },
            {
                performerId: data.performerId,
                orderId: data.orderId,
                start: data.start,
                end: data.end,
                status: data.status,
                performerRating: data.performerRating,
                customerRating: data.customerRating
            });
        return (editedResponse.affected && editedResponse.affected > 0) as boolean;
    }

    async editMultipleResponses(data: EditResponseDto, responsesId: number[]): Promise<boolean> {
        const editedResponse = await this.update(
            { id: In(responsesId) },
            {
                performerId: data.performerId,
                orderId: data.orderId,
                start: data.start,
                end: data.end,
                status: data.status,
                performerRating: data.performerRating,
                customerRating: data.customerRating
            });
        return (editedResponse.affected && editedResponse.affected > 0) as boolean;
    }

    async deleteResponse(id: number): Promise<boolean> {
        const deletedResponse = await this.delete({ id });
        console.log(`Response with id: ${id} has been deleted.`);
        return (deletedResponse.affected && deletedResponse.affected > 0) as boolean;
    }
}
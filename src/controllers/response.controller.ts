import { RequestHandler } from 'express';
import { plainToInstance } from 'class-transformer';
import { ArrivalNotificationDto } from '@/dto/arrivalNotification.dto';
import { CompletionNotificationDto } from '@/dto/completionNotification.dto';
import { ResponseDto } from '@/dto/response.dto';
import { ResponseService } from '@/services/response.service';
import { validate } from 'class-validator';
import { ERole } from '@/enum/ERole.enum';
import { ResponseByManagerDto } from '@/dto/responseByManager.dto';
import { ConfirmArrivalDto } from '@/dto/confirmArrival.dto';
import { ConfirmCompletionDto } from '@/dto/confirmCompletion.dto';
import { DeleteResponseDto } from '@/dto/deleteResponse.dto';
import { BlockPerformerDto } from '@/dto/blockPerformer.dto';
import { UnblockPerformerDto } from '@/dto/unblockPerformer.dto';

export class ResponseController {
	private service: ResponseService;

	constructor() {
		this.service = new ResponseService();
	}

	createResponse: RequestHandler = async (req, res, next): Promise<void> => {
		try {
			let responseDto;
			if (req.app.locals.user.role === ERole.manager || req.app.locals.user.role === ERole.admin) {
				responseDto = plainToInstance(ResponseByManagerDto, req.body);
			} else {
				responseDto = plainToInstance(ResponseDto, { ...req.body, performerId: req.app.locals.user.id });
			}

			const errors = await validate(responseDto);
			if (errors.length) throw errors;
			const response = await this.service.createResponse(responseDto);
			res.send(response);
		} catch (e: any) {
			next(e);
		}
	}

	deleteOrder: RequestHandler = async (req, res, next): Promise<void> => {
		try {
			const deletionDto = plainToInstance(DeleteResponseDto, { id: parseInt(req.params.id) });
			const errors = await validate(deletionDto);
			if (errors.length) throw errors;
			const success = await this.service.deleteResponse(deletionDto);
			if (!success) throw new Error('The response wasn\'t found.');
			res.send({
				success,
				message: 'The response has been successfully deleted.'
			});
		} catch (e: any) {
			next(e);
		}
	}

	blockPerformer: RequestHandler = async (req, res, next): Promise<void> => {
		try {
			const blockPerformerDto = plainToInstance(BlockPerformerDto, { id: parseInt(req.params.id) });
			const errors = await validate(blockPerformerDto);
			if (errors.length) throw errors;
			const success = await this.service.blockPerformer(blockPerformerDto);
			if (!success) throw new Error('The response wasn\'t found.');
			res.send({
				success,
				message: 'The performer is suspended from participating in the order.'
			});
		} catch (e: any) {
			next(e);
		}
	}

	unblockPerformer: RequestHandler = async (req, res, next): Promise<void> => {
		try {
			const unblockPerformerDto = plainToInstance(UnblockPerformerDto, { id: parseInt(req.params.id) });
			const errors = await validate(unblockPerformerDto);
			if (errors.length) throw errors;
			const success = await this.service.unblockPerformer(unblockPerformerDto);
			if (!success) throw new Error('The response wasn\'t found.');
			res.send({
				success,
				message: 'The performer is allowed to participate in the order.'
			});
		} catch (e: any) {
			next(e);
		}
	}

	notifyArrival: RequestHandler = async (req, res, next): Promise<void> => {
		try {
			const arrivalDto = plainToInstance(ArrivalNotificationDto, { id: parseInt(req.params.id) });
			const errors = await validate(arrivalDto);
			if (errors.length) throw errors;
			const success = await this.service.notifyArrival(arrivalDto);
			res.send({
				success,
				message: 'Arrival notification sent.'
			});
		} catch (e: any) {
			next(e);
		}
	}

	confirmArrival: RequestHandler = async (req, res, next): Promise<void> => {
		try {
			const confirmArrivalDto = plainToInstance(ConfirmArrivalDto, { id: parseInt(req.params.id) });
			const errors = await validate(confirmArrivalDto);
			if (errors.length) throw errors;
			const { success, start } = await this.service.confirmArrival(confirmArrivalDto);
			res.send({
				success,
				start,
				message: `Arrival confirmed${start ? ', the start of work has been recorded' : ''}.`
			});
		} catch (e: any) {
			next(e);
		}
	}

	notifyCompletion: RequestHandler = async (req, res, next): Promise<void> => {
		try {
			const completionDto = plainToInstance(CompletionNotificationDto, { id: parseInt(req.params.id) });
			const errors = await validate(completionDto);
			if (errors.length) throw errors;
			const success = await this.service.notifyCompletion(completionDto);
			res.send({
				success,
				message: 'Completion notification sent.'
			});
		} catch (e: any) {
			next(e);
		}
	}

	confirmCompletion: RequestHandler = async (req, res, next): Promise<void> => {
		try {
			const confirmCompletionDto = plainToInstance(ConfirmCompletionDto, { id: parseInt(req.params.id) });
			const errors = await validate(confirmCompletionDto);
			if (errors.length) throw errors;
			const { success, end } = await this.service.confirmCompletion(confirmCompletionDto);
			res.send({
				success,
				end,
				message: 'Completion confirmed, end of work has been recorded.'
			});
		} catch (e: any) {
			next(e);
		}
	}
}
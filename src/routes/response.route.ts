import { Router } from "express";
import { IRoute } from '@/interfaces/IRoute.interface';
import { roleChecker } from "@/middlewares/roleChecker";
import { ResponseController } from "@/controllers/response.controller";
import { ERole } from "@/enum/ERole.enum";

export class ResponseRoute implements IRoute {
	public path = '/response';
	public router = Router();
	private controller: ResponseController;

	constructor() {
		this.controller = new ResponseController();
		this.init();
	}

	private init() {
		this.router.post('/', roleChecker([ERole.admin, ERole.manager, ERole.performer]), this.controller.createResponse);
		this.router.delete('/:id', roleChecker([ERole.admin, ERole.manager, ERole.performer]), this.controller.deleteOrder);
		this.router.patch('/:id/block', roleChecker([ERole.admin, ERole.manager]), this.controller.blockPerformer);
		this.router.patch('/:id/unblock', roleChecker([ERole.admin, ERole.manager]), this.controller.unblockPerformer);
		this.router.patch('/:id/notifyArrival', roleChecker([ERole.admin, ERole.manager, ERole.performer]), this.controller.notifyArrival);
		this.router.patch('/:id/confirmArrival', roleChecker([ERole.admin, ERole.manager, ERole.customer]), this.controller.confirmArrival);
		this.router.patch('/:id/notifyCompletion', roleChecker([ERole.admin, ERole.manager, ERole.performer]), this.controller.notifyCompletion);
		this.router.patch('/:id/confirmCompletion', roleChecker([ERole.admin, ERole.manager, ERole.customer]), this.controller.confirmCompletion);
	}
}
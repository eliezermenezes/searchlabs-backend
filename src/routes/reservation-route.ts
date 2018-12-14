'use strict';

import { Router } from 'express';
import { ReservationController } from "../controllers/reservation-controller";
import { AuthController } from "../controllers/auth-controller";

export class ReservationRoute {
    public router: Router;
    public _auth: AuthController;
    public _controller: ReservationController;

    constructor() {
        this.router = Router();
        this._auth = new AuthController();
        this._controller = new ReservationController();
        this.onInit();
    }

    public onInit(): void {
        this.router.get('/', [this._auth.verifyToken], this._controller.get);
        this.router.get('/by/laboratory/:laboratory', [this._auth.verifyToken], this._controller.getByLaboratory);
        this.router.get('/:id', [this._auth.verifyToken], this._controller.getById);
        this.router.patch('/:id/add_observation', [this._auth.verifyToken], this._controller.addObservacao);
        this.router.delete('/:id/delete', [this._auth.verifyToken], this._controller.delete);
        this.router.get('/:id/cancel', [this._auth.verifyToken], this._controller.cancel);
    }
}

const reservationRoute = new ReservationRoute();
reservationRoute.onInit();
export default reservationRoute.router;
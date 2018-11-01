'use strict';

import { Reservation } from './../models/attributes/reservation';
import { Solicitation } from "../models/attributes/solicitation";

export interface ReservationInterface {

    register(dataRequest: Solicitation): Promise<Reservation>;

    addObservation(id: number, observation: string): Promise<Reservation>;

    getAll(): Promise<Reservation[]>;

    getById(id: number): Promise<Reservation>

    delete(id: number): Promise<Reservation>;

    cancel(id: number): Promise<Reservation>;
}
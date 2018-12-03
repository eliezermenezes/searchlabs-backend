'use strict';

import { Request, Response, NextFunction } from 'express';
import ClassRepository from '../repositories/class-repository';
import {filterClass} from "../utils/class-filter.utils";

export class ClassController {

    public async post(request: Request | any, response: Response, next: NextFunction) {

        try {
            
            request.body.teacher = request.data.user.id;
            const createdClass = await ClassRepository.create(request.body);
            if (!createdClass) {
                response.status(404).send({
                    message: 'class_not_created'
                });
            } else {
                response.status(201).send(createdClass);
            }
        } catch (e) {
            response.status(500).send({
                message: 'failed_to_process_your_request'
            });
        }
    }

    public async patch(request: Request, response: Response, next: NextFunction) {
        try {
            const updatedClass = await ClassRepository.update(request.params.id, request.body);
            if (!updatedClass) {
                response.status(404).send({
                    message: 'class_not_updated'
                });
            } else {
                response.status(200).send(updatedClass);
            }
        } catch (e) {
            response.status(500).send({
                message: 'failed_to_process_your_request'
            });
        }
    }

    public async get(request: Request, response: Response, next: NextFunction) {

        const filter = new filterClass(request);
        try {
            const classes = await ClassRepository.getAll(filter.get());
            if (classes.length === 0) {
                response.status(404).send({
                    message: 'classes_not_found'
                });
            }
            else {
                response.status(200).send(classes);
            }
        } catch (e) {
            response.status(500).send({
                message: 'failed_to_process_your_request'
            });
        }
    }

    public async onlyClasses(request: Request | any, response: Response, next: NextFunction) {
        try {
            const classes = await ClassRepository.onlyClasses(request.data.user.id);
            if (classes.length === 0) {
                response.status(404).send({
                    message: 'classes_not_found'
                });
            }
            else {
                response.status(200).send(classes);
            }
        } catch (e) {
            response.status(500).send({
                message: 'failed_to_process_your_request'
            });
        }
    }

    public async getByTeacher(request: Request, response: Response, next: NextFunction) {
        try {
            const classes = await ClassRepository.getByTeacher(request.params.teacher);
            if (classes.length === 0) {
                response.status(404).send({
                    message: 'results_not_found'
                });
            } else {
                response.status(200).send(classes);
            }
        } catch (error) {
            response.status(500).send({
                message: 'failed_to_process_your_request'
            });
        }
    }

    public async getById(request: Request, response: Response, next: NextFunction) {
        try {
            const classe = await ClassRepository.getById(request.params.id);
            if (!classe) {
                response.status(404).send({
                    message: 'class_not_found'
                });
            } else {
                response.status(200).send(classe);
            }
        } catch (error) {
            response.status(500).send({
                message: 'failed_to_process_your_request'
            });
        }
    }

    public async delete(request: Request, response: Response, next: NextFunction) {
        try {
            const classDeletet = await ClassRepository.delete(request.params.id);
            if (!classDeletet) {
                response.status(404).send({
                    message: 'class_not_found'
                });
            } else {
                response.status(200).send(classDeletet);
            }
        } catch (e) {
            response.status(500).send({
                message: 'failed_to_process_your_request'
            });
        }
    }
}
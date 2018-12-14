'use strict';

import { Request, Response, NextFunction } from 'express';
import UserRepository from '../repositories/user-repository';
import { User } from "../models/attributes/user";
const jwt = require('jsonwebtoken');

export class AuthController {

    public async doLogin(request: Request, response: Response, next: NextFunction) {
        const username = request.body.email;

        try {
            let user = await UserRepository.getUserByUsername(username);
            if (!user) {
                response.status(403).send({
                    message: 'user no authorized'
                });
                return;
            }
            if (user.register === 'incomplete') {
                let data = {
                    name: request.body.firstName,
                    family_name: request.body.lastName,
                    register: 'complete'
                };
                user = await UserRepository.update(user.id, data);
            }
            const token = jwt.sign({ user: user }, 'secretSearchlabs', {
                expiresIn: 3600
            });

            response.status(200).send({
                auth: true,
                token: {
                    type: 'Bearer',
                    access: token,
                    expires: 3600
                },
                user: user
            });
        } catch (e) {
            response.status(500).send({
                message: 'error_internal_server'
            });
            console.log(e);
        }
    }

    public async verifyToken(request: any, response: Response, next: NextFunction) {
        let token = request.headers['x-access-token'] || request.headers.authorization;

        if (!token) {
            response.status(403).send({
                message: 'no token provided'
            });
            return;
        }

        token = (token.split(' ')[1]);
        jwt.verify(token, 'secretSearchlabs', (err: any, decoded: User) => {
            if (err) {
                response.status(500).send({
                    rollback: 'Fail to authentication',
                    error: err
                });
                return;
            }
            request.data = decoded;
            next();
        });
    }

    public isAdministrator(request: any, response: Response, next: NextFunction) {
        const user = request.data.user;
        if (user.role !== 'administrator') {
            response.status(403).send({
                message: 'role insuficient'
            });
            return;
        }
        next();
    }

    public async isTeacher(request: any, response: Response, next: NextFunction) {
        const user = request.data.user;
        if (user.role !== 'teacher') {
            response.status(403).send({
                message: 'role insuficient'
            });
            return;
        }
        next();
    }

    public async isStudent(request: any, response: Response, next: NextFunction) {
        const user = request.data.user;
        if (user.role !== 'student') {
            response.status(403).send({
                message: 'role insuficient'
            });
            return;
        }
        next();
    }

    public async doLogout() {}
}
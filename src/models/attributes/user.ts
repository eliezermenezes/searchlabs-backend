'use strict';

export class User {
    public id?: number;
    public username?: string;
    public name?: string;
    public family_name?: string;
    public role?: string;
    public phone?: string;
    public gender?: string;
    public register?: string;
    public createdAt?: Date;
    public updatedAt?: Date;
}

export default new User();
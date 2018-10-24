export class User {
    public id?: number;
    public username?: string;
    public name?: string;
    public family_name?: string;
    public role?: string;
    public phone?: string;
    public birthday?: Date;
    public gender?: string;
    public avatar?: string;
    public createdAt?: Date;
    public updatedAt?: Date;
}

export default new User();
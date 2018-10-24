'use strict';

import debug from 'debug';
debug('ts-express:server');

export class Utils {

    public port: number | string | boolean;

    constructor(porta: number | string) {
        this.port = this.normalizePort(porta);
    }

    public getPort(): number | string | boolean {
        return this.port;
    }

    public normalizePort(value: number | string): number | string | boolean {
        let porta: number = (typeof value === 'string') ? parseInt(value, 10) : value;
        if (isNaN(porta))
            return value;
        else if (porta >= 0)
            return porta;
        else return false;
    }

    public onError(error: NodeJS.ErrnoException): void {
        if (error.syscall !== 'listen') throw error;
        let bind = (typeof this.port === 'string') ? 'Pipe ' + this.port : 'Port ' + this.port;
        switch (error.code) {
            case 'EACCES':
                console.error(`${bind} requires elevated privileges`);
                process.exit(1);
                break;
            case 'EADDRINUSE':
                console.error(`${bind} is already in use`);
                process.exit(1);
                break;
            default:
                throw error;
        }
    }
}
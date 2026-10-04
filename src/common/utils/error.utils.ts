export class NotFoundException extends Error {
    constructor(message: string) {
        super(message, { cause: 404 });
    }
}

interface IDetails {
    path: string;
    message: string;
}

export class BadRequestException extends Error {
    constructor(message: string, public details?: { path: string; message: string }[]) {
        super(message, { cause: 400 });
    }
}

export class UnauthorizedException extends Error {
    constructor(message: string) {
        super(message, { cause: 401 });
    }
}


export class ConflictException extends Error {
    constructor(message: string) {
        super(message, { cause: 409 });
    }
}

export class ForbiddenException extends Error {
    constructor(message: string) {
        super(message, { cause: 403 });
    }
}

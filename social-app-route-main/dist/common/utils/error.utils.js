"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForbiddenException = exports.ConflictException = exports.UnauthorizedException = exports.BadRequestException = exports.NotFoundException = void 0;
class NotFoundException extends Error {
    constructor(message) {
        super(message, { cause: 404 });
    }
}
exports.NotFoundException = NotFoundException;
class BadRequestException extends Error {
    details;
    constructor(message, details) {
        super(message, { cause: 400 });
        this.details = details;
    }
}
exports.BadRequestException = BadRequestException;
class UnauthorizedException extends Error {
    constructor(message) {
        super(message, { cause: 401 });
    }
}
exports.UnauthorizedException = UnauthorizedException;
class ConflictException extends Error {
    constructor(message) {
        super(message, { cause: 409 });
    }
}
exports.ConflictException = ConflictException;
class ForbiddenException extends Error {
    constructor(message) {
        super(message, { cause: 403 });
    }
}
exports.ForbiddenException = ForbiddenException;

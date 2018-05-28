import { ErrorHandler } from '@angular/core';

export class GenericErrorHandler extends ErrorHandler {
    constructor() {
        super();
    }

    handleError(error) {
        super.handleError(error);
        console.error(error);
    }
}

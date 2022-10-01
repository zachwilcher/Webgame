

export class ReadOnlyFieldSetError extends Error {
    constructor() {
        super('Field is read-only and cannot be changed.');
    }
}


export class WriteOnlyFieldReadError extends Error {
    constructor() {
        super('Field is write-only and cannot be accessed.');
    }
}

export class UnimplementedMethodError extends Error {
    constructor() {
        super('Method is abstract and needs to be overriden.')
    }
}



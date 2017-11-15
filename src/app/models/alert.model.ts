export interface IAlert {
    type: AlertType;
    message: string;
    permanent: boolean;
}

export enum AlertType {
    Success, Error, Info, Warning
}

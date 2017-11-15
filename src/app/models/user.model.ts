export interface IUser {
    id: string;
    accessToken: string;
    mail: string;

    firstName?: string;
    lastName?: string;

    currentClass?: string;
    futureClass?: string;
}

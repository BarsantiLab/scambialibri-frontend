export interface IUser {
    id: string;
    accessToken: string;
    mail: string;

    firstName?: string;
    lastName?: string;

    currentGrade?: string;
    futureGrade?: string;

    onboardingCompleted?: boolean;
}

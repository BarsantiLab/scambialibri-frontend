export interface IUser {
    id: string;
    accessToken: string;
    mail: string;

    firstName?: string;
    lastName?: string;

    school?: string;
    specialization?: string;
    currentGrade?: string;
    futureGrade?: string;

    onboardingCompleted?: boolean;
}

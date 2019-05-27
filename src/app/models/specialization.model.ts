import { ISchool } from 'app/models/school.model';

export interface ISpecialization {
    id: string;
    name?: string;
    school?: ISchool;
}

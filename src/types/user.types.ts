export enum EGenders {
    male = 'male',
    female= 'female',
    mixed = 'mixed'
}

export interface IUser {
    name: String,
    email: String,
    password: String,
    gender: String,
}


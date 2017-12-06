export interface User {
    _id: string,
    firstname: string,
    lastname: string,
    email: string,
    password: string,
    profilePictureUrl: string,
    salt: string,
    token: string,
    role: string,
    countryCode: string,
    description: string,
    firstime: string,
}
export class User {
    _id: string;
    email: string;
    password: string;
    profilePictureUrl: string;
    salt: string;
    token: string;
    role: string;
    countryCode: string;
    description: string;
    firstTime: boolean;
    personalDetail: PersonalDetail;
    addresses: Array<Address>;

    constructor() {
        this.personalDetail = new PersonalDetail();
        this.addresses = new Array<Address>();
    }
}

export class PersonalDetail {

    gender: string;
    firstname: string;
    phone: number;
    lastname: String
    date: string;
    day: string;
    month: string;
    year: string;

    constructor() { }
}

export class Address {

    id: string;
    address: string;
    indication: string;
    region: string;
    state: string;
    code: number;

    constructor() { }
}
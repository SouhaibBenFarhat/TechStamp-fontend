export class Business {
    userId: string;
    pageName: string;
    coverPicture: string;
    logo: string;
    images: Array<string>;
    visible: boolean;
    activie: boolean;
    pageEmail: string;
    position: {
        latitude: number;
        langitude: number;
    }
    approximation: string;
    phoneNumber: number;
    categories: Array<string>;
    businessType: {
        name: string
    }
    website: string;
    instagram: string;
    twitter: string;
    facebook: string;
    description: string;
    workTime: {
        sunday: boolean,
        saturday: boolean,
        openTime: string,
        closeTime: string
    }
    constructor() {
        this.images = new Array<string>(); this.categories = new Array<string>();
        this.position = { latitude: 0, langitude: 0 };
    }

}
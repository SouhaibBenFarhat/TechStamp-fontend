import { BusinessType } from "./businessType";
export class Business {
    _id: string;
    userId: string;
    pageName: string;
    coverPicture: string;
    logo: string;
    images: Array<string>;
    visible: boolean;
    active: boolean;
    pageEmail: string;
    position: {
        latitude: number;
        langitude: number;
    }
    approximation: string;
    phoneNumber: number;
    categories: Array<string>;
    businessType: BusinessType;
    website: string;
    instagram: string;
    twitter: string;
    facebook: string;
    description: string;
    workTime: WorkTime;
    constructor() {
        this.images = new Array<string>();
        this.categories = new Array<string>();
        this.position = { latitude: 0, langitude: 0 };
        this.businessType = new BusinessType();
        this.workTime = new WorkTime();
    }

}
export class WorkTime {

    sunday: boolean;
    saturday: boolean;
    openTime: string;
    closeTime: string;

}
import { BusinessType } from "../models/businessType";


export class DummyDataProvider {

    constructor() { }

    public getDummyBusinessType(): Array<BusinessType> {

        let bt1 = new BusinessType();
        bt1.description = " Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel non illo consequatur obcaecati soluta architecto! Error iureassumenda, aliquam, rerum reiciendis molestias qui atque repellat consequuntur corporis perferendis magnam mollitia By clicking Create Account, you agree to our"
        bt1.name = "Local Business.";
        bt1.logo = "./assets/img/local-business.png";

        let bt2 = new BusinessType();
        bt2.description = " Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel non illo consequatur obcaecati soluta architecto! Error iureassumenda, aliquam, rerum reiciendis molestias qui atque repellat consequuntur corporis perferendis magnam mollitia By clicking Create Account, you agree to our"
        bt2.name = "Company,Organization.";
        bt2.logo = "./assets/img/brand.png";

        let businessTypes = new Array<BusinessType>();
        businessTypes.push(bt1);
        businessTypes.push(bt2);
        return businessTypes;
    }

}
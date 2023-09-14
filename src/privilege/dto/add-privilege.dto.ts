import { IsNotEmpty, IsString } from "class-validator";
import { IsNull } from "typeorm";

export class AddPrivilegeDto {
    @IsNotEmpty()
    reference: string;

    @IsNotEmpty()
    name: string;
    
    description: string;

    @IsNotEmpty()
    resource: string;

    createdAt: string;

    updatedAt: string;

}

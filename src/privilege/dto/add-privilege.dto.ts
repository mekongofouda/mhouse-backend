import { IsNotEmpty, IsUUID } from "class-validator";

export class AddPrivilegeDto {
    @IsNotEmpty()
    reference: string;

    @IsNotEmpty()
    name: string;
    
    description: string;

    @IsNotEmpty()
    resource: string;
}

import { IsAlpha, IsEmpty, IsNotEmpty, IsOptional, IsString, Length, MaxLength } from "class-validator";

export class AddPrivilegeDto {

    @IsEmpty()
    refPrivilege: string;

    @IsEmpty()
    name: string;
    
    @IsString()
    @IsOptional()
    @MaxLength(64, { message: "La taille maximale de la description est de 64 caractères"})
    description: string;

    @IsString()
    @IsNotEmpty()
    @IsAlpha()
    @MaxLength(16, { message: "La taille maximale de la resource est de 16 caractères"})
    resource: string;
}

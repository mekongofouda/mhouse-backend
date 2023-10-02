import { IsAlpha, IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator";

export class AddPrivilegeDto {

    @IsString()
    @IsOptional()
    @MaxLength(32, { message: "La taille maximale du titre est de 32 caractères"})
    title: string;
    
    @IsString()
    @IsOptional()
    @MaxLength(64, { message: "La taille maximale de la description est de 64 caractères"})
    description: string;

    @IsString()
    @IsNotEmpty()
    @IsAlpha()
    @MaxLength(16, { message: "La taille maximale de la resource est de 16 caractères"})
    resource: string;

    @IsString()
    @IsOptional()
    refRole: string;

}

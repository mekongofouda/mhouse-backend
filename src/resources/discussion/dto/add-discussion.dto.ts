import { IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator";

export class AddDiscussionDto {

    @IsString()
    @IsNotEmpty()
    @MaxLength(20, { message: "La taille maximale du titre est de 20 caractères"})
    refCustomer: string;
    
    @IsString()
    @IsOptional()
    @MaxLength(128, { message: "La taille maximale du titre est de 128 caractères"})
    title: string;

    @IsString()
    @IsOptional()
    @MaxLength(256, { message: "La taille maximale de la description est de 256 caractères"})
    description: string;

}

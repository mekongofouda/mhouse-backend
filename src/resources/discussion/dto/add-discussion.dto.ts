import { IsOptional, IsString, MaxLength } from "class-validator";

export class AddDiscussionDto {

    @IsString()
    @IsOptional()
    @MaxLength(32, { message: "La taille maximale du titre est de 32 caractères"})
    title: string;
    
    @IsString()
    @IsOptional()
    @MaxLength(128, { message: "La taille maximale de la description est de 64 caractères"})
    description: string;

}

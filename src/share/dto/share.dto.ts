import { IsEmpty, IsOptional, IsString, MaxLength } from "class-validator";

export class ShareDto {

    @IsEmpty()
    refShare: string;

    @IsString()
    @IsOptional()
    @MaxLength(128, { message: "La taille maximale du titre est de 32 caractères"})
    adress: string;
    
}

import { IsBase64, IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator";

export class AddHomeCareDto {
    
    @IsString()
    @IsNotEmpty()
    @MaxLength(16, { message: "La taille maximale du type est de 16 caractères"})
    type: string;

    @IsBase64()
    @IsOptional()
    image: string;
}

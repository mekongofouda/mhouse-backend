import { IsBase64, IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator";

export class AddHomeStandingDto {
    
    @IsString()
    @IsNotEmpty()
    @MaxLength( 32, { message: "La taille maximale du nom est de 32 caractères" })
    type: string;

    @IsBase64()
    @IsOptional()
    image: string;

}

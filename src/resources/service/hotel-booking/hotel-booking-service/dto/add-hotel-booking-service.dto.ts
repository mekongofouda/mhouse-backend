import { IsBase64, IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator";

export class AddHotelBookingServiceDto {
    
    @IsString()
    @IsOptional()
    @MaxLength(64, { message: "La taille maximale du titre est de 64 caractères"})
    title: string;

    @IsString()
    @IsOptional()
    @MaxLength(64, { message: "La taille maximale de la description est de 64 caractères"})
    description: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(16, { message: "La taille maximale du type est de 16 caractères"})
    type: string;

    @IsBase64()
    @IsOptional()
    image: string;
}

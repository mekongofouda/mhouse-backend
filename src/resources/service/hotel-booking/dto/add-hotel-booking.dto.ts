import { Type } from "class-transformer";
import { IsBase64, IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator";

export class AddHotelBookingDto {

    @IsString()
    @IsOptional()
    @MaxLength(64, { message: "La taille maximale du titre est de 64 caractères"})
    hotelName: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(16, { message: "La taille maximale du type est de 16 caractères"})
    type: string;

    @IsBase64()
    @IsOptional()
    image: string;
    
}

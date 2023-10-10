import { IsBoolean, IsNotEmpty, IsString, MaxLength } from "class-validator";

export class LikeDto {

    @IsString()
    @IsNotEmpty()
    @MaxLength(20, { message: "La taille maximale de la référence est de 20 caractères"})
    refPost: string;

    @IsBoolean()
    @IsNotEmpty()
    isLiked: boolean;
    
}

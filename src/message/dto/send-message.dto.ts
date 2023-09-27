import { IsEmpty, IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator";

export class SendMessageDto {

    @IsString()
    @IsOptional()
    @MaxLength(64, { message: "La taille maximale de la description est de 64 caractères"})
    refUser: string;
    
    @IsString()
    @IsOptional()
    @MaxLength(64, { message: "La taille maximale de la description est de 64 caractères"})
    description: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(64, { message: "La taille maximale de la resource est de 16 caractères"})
    cc: string;

}

import { IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator";

export class SendMessageDto {

    @IsString()
    @IsOptional()
    @MaxLength(20, { message: "La taille maximale de la description est de 20 caractères"})
    refDiscussion: string;
    
    @IsString()
    @IsOptional()
    @MaxLength(128, { message: "La taille maximale de la description est de 128 caractères"})
    description: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(64, { message: "La taille maximale de la resource est de 16 caractères"})
    cc: string;

}

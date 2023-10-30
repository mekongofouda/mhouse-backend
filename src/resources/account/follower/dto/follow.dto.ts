import { IsOptional, IsString, Length, MaxLength } from "class-validator";

export class FollowDto {

    @IsString()
    @IsOptional()
    @MaxLength(20, { message: "La taille maximale de la référence user est de 32 caractères"})
    refAccount: string;
    
}

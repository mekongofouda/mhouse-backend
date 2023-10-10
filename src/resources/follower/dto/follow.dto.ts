import { IsOptional, IsString, Length } from "class-validator";

export class FollowDto {

    @IsString()
    @IsOptional()
    @Length(32, 32, { message: "La taille maximale du titre est de 32 caractères"})
    refAccount: string;
    
}

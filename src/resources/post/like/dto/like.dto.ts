import { Type } from "class-transformer";
import { IsBoolean, IsOptional, IsString } from "class-validator";

export class LikeDto {

    @IsString()
    @IsOptional()
    refPost: string;

    @IsBoolean()
    @IsOptional()
    @Type(()=> Boolean)
    isLiked: boolean;
 
}

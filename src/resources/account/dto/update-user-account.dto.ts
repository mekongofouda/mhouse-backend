import { PartialType } from "@nestjs/mapped-types"
import { RegisterDto } from "src/resources/account/auth/dto/register.dto"

export class UpdateUserAccountDto extends PartialType(RegisterDto) {}

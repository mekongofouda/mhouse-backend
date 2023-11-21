import { PartialType } from '@nestjs/mapped-types';
import { CreateUpgradingDto } from './create-upgrading.dto';

export class UpdateUpgradingDto extends PartialType(CreateUpgradingDto) {}

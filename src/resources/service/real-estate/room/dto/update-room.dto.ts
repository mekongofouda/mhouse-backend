import { PartialType } from '@nestjs/mapped-types';
import {AddRoomDto } from './add-room.dto';

export class UpdateRoomDto extends PartialType(AddRoomDto) {}

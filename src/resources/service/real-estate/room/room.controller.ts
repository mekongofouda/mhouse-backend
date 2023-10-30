import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RoomService } from './room.service';
import { AddRoomDto } from './dto/add-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';

@Controller('room')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Post()
  addRoom(@Body() createRoomDto: AddRoomDto) {
    return this.roomService.addRoom(createRoomDto);
  }

  @Get()
  showRoomList() {
    return this.roomService.showRoomList();
  }

  @Get(':ref')
  showRoomDetail(
    @Param('ref') ref: string) {
    return this.roomService.showRoomDetail(ref);
  }

  @Patch(':ref')
  updateRoom(
    @Param('ref') ref: string, @Body() updateRoomDto: UpdateRoomDto) {
    return this.roomService.updateRoom(ref, updateRoomDto);
  }

  @Delete(':ref')
  delateRoom(
    @Param('ref') ref: string) {
    return this.roomService.delateRoom(ref);
  }
}

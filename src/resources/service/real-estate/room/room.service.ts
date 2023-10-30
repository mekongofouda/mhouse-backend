import { Injectable } from '@nestjs/common';
import { AddRoomDto } from './dto/add-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';

@Injectable()
export class RoomService {
  
  async addRoom(AddRoomDto: AddRoomDto) {
    return 'This action adds a new room';
  }

  async showRoomList() {
    return `This action returns all room`;
  }

  async showRoomDetail(refRoom: string) {
    return `This action returns a #${refRoom} room`;
  }

  async updateRoom(refRoom: string, updateRoomDto: UpdateRoomDto) {
    return `This action updates a #${refRoom} room`;
  }

  async delateRoom(refRoom: string) {
    return `This action removes a #${refRoom} room`;
  }
}

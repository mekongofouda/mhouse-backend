import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, HttpStatus } from '@nestjs/common';
import { RoomService } from './room.service';
import { AddRoomDto } from './dto/add-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { Account } from 'src/decorators/account.decorator';
import { ListRoomDto } from './dto/list-room.dto';
import { MhouseResponseInterface } from 'src/interfaces/mhouse-response.interface';
import { JwtAuthGuard } from 'src/resources/account/auth/auth.guard';

@Controller('room')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async addRoom(
    @Body() addRoomDto: AddRoomDto
    ): Promise<MhouseResponseInterface> {
    const data = await this.roomService.addRoom(addRoomDto);
    return {
      data: data,
      message: "Room ajoutée avec succès",
      code: HttpStatus.OK
    };
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async showRoomList(
    @Query() listRoomDto: ListRoomDto,
    @Account() account
  ): Promise<MhouseResponseInterface> {
    const data = await this.roomService.showRoomList(listRoomDto, account);
    return {
      data: data,
      message: "Partage effectué avec succès",
      code: HttpStatus.OK
    };
  }

  @Get(':ref')
  @UseGuards(JwtAuthGuard)
  async showRoomDetail(
    @Param('ref') ref: string
    ): Promise<MhouseResponseInterface> {
    const data = await this.roomService.showRoomDetail(ref);
    return {
      data: data,
      message: "Partage effectué avec succès",
      code: HttpStatus.OK
    };
  }

  @Patch(':ref')
  @UseGuards(JwtAuthGuard)
  async updateRoom(
    @Param('ref') ref: string, 
    @Body() updateRoomDto: UpdateRoomDto
    ): Promise<MhouseResponseInterface> {
    const data = await this.roomService.updateRoom(ref, updateRoomDto);
    return {
      data: data,
      message: "Partage effectué avec succès",
      code: HttpStatus.OK
    };
  }

  @Delete(':ref')
  @UseGuards(JwtAuthGuard)
  async deleteRoom(
    @Param('ref') ref: string
    ): Promise<MhouseResponseInterface> {
    const data = await this.roomService.deleteRoom(ref);
    return {
      data: data,
      message: "Partage effectué avec succès",
      code: HttpStatus.OK
    };
  }
}

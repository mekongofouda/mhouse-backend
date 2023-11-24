import { BadRequestException, ConflictException, HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { AddRoomDto } from './dto/add-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { Room } from './entities/room.entity';
import { ListRoomDto } from './dto/list-room.dto';
import { AccountEntity } from 'src/resources/account/entities/account.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RealEstate } from '../entities/real-estate.entity';
import { FunctionPrivilegeEnum } from 'src/enums/function.privilege.enum';
import { Utils } from 'src/generics/utils';

@Injectable()
export class RoomService extends Utils {
  
    constructor(  
    @InjectRepository(AccountEntity) 
    private readonly accountRepository: Repository<AccountEntity>,

    @InjectRepository(RealEstate) 
    private readonly realEstateRepository: Repository<RealEstate>,

    @InjectRepository(Room) 
    private readonly roomRepository: Repository<Room>,

  ){
    super()
  }

  async addRoom(addRoomDto: AddRoomDto, account: AccountEntity) {
    
    const userAccount = await this.accountRepository.findOneBy({refAccount: account.refAccount});
    if(userAccount != null) {
      if (this.IsAuthorised(userAccount, FunctionPrivilegeEnum.ADD_DISCUSSION) == false) {
        throw new UnauthorizedException();
      }
    }

    const realEstate = await this.realEstateRepository.findOneBy({refRealEstate: addRoomDto.refRealEstate}); 
    if (realEstate == null) {
      throw new BadRequestException("RealEstate not found");
    }

    const room = await this.roomRepository.create(addRoomDto); 
    if (room == null) {
      throw new BadRequestException("Room not found");
    }
    room.realEstate = realEstate; 

    try {
      await this.roomRepository.save(room);
    } catch (error) {
      throw new ConflictException(error.driverError.detail);
    }

    return room;

  }

  async showRoomList(listRoomDto: ListRoomDto, account: AccountEntity) {

    const userAccount = await this.accountRepository.findOneBy({refAccount: account.refAccount});
    if(userAccount != null) {
      if (this.IsAuthorised(userAccount, FunctionPrivilegeEnum.ADD_DISCUSSION) == false) {
        throw new UnauthorizedException();
      }
    }

    let listRooms: Room[] = [];
    let rooms: Room[] = [];

    if (listRoomDto.refAccount != undefined) {
      const userAccount = await this.accountRepository.findOneBy({refAccount: listRoomDto.refAccount});
      if (userAccount == null) {
        throw new HttpException("Account not found", HttpStatus.NOT_FOUND);
      } 
      userAccount.services.forEach( service => {
        service.realEstate.rooms.forEach( room => {
          listRooms.push(room)
        });
      });
    } else if (listRoomDto.all == 1){
      listRooms = await this.roomRepository.find();
    } else {
      const userAccount = await this.accountRepository.findOneBy({refAccount: account.refAccount});
      if (userAccount == null) {
        throw new HttpException("Account not found", HttpStatus.NOT_FOUND);
      } 
        userAccount.services.forEach( service => {
          service.realEstate.rooms.forEach( room => {
            listRooms.push(room)
          });
        });
      }

    if (listRoomDto.refRealEstate != undefined) {
      const realEstate = await this.realEstateRepository.findOneBy({refRealEstate: listRoomDto.refRealEstate});
      if (realEstate == null) {
        throw new HttpException("RealEstate not found", HttpStatus.NOT_FOUND);
      } 
      rooms = realEstate.rooms;
      listRooms = realEstate.rooms;
    } 
    
    listRooms.filter(realEstate => {
      if (listRoomDto.createdAt != undefined) {
        if (realEstate.createdAt.toDateString() == listRoomDto.createdAt.toDateString()) {
          if (!rooms.includes(realEstate)) {
            rooms.push(realEstate);
          }
        }
      }      
      if (listRoomDto.updatedAt != undefined) {
        if (realEstate.updatedAt.toDateString() == listRoomDto.updatedAt.toDateString()) {
          if (!rooms.includes(realEstate)) {
            rooms.push(realEstate);
          }
        }
      }   
    });

    if ((rooms.length == 0) 
    && ((listRoomDto.createdAt != undefined)
    ||(listRoomDto.updatedAt != undefined)
    )) {
      throw new HttpException("Room not found", HttpStatus.NOT_FOUND);
    } else if (rooms.length != 0) {
      listRooms = rooms;
    }
    return listRooms;
  }

  async showRoomDetail(refRoom: string, account: AccountEntity) {

    const userAccount = await this.accountRepository.findOneBy({refAccount: account.refAccount});
    if(userAccount != null) {
      if (this.IsAuthorised(userAccount, FunctionPrivilegeEnum.ADD_DISCUSSION) == false) {
        throw new UnauthorizedException();
      }
    }

    const room = await this.roomRepository.findOneBy({refRoom});
    if (room == null) {
      throw new HttpException("Room not found", HttpStatus.NOT_FOUND)
    }    

    return room;

  }

  async updateRoom(refRoom: string, updateRoomDto: UpdateRoomDto, account: AccountEntity) {

    const userAccount = await this.accountRepository.findOneBy({refAccount: account.refAccount});
    if(userAccount != null) {
      if (this.IsAuthorised(userAccount, FunctionPrivilegeEnum.ADD_DISCUSSION) == false) {
        throw new UnauthorizedException();
      }
    }

    const room = await this.roomRepository.findOne({where:{refRoom}});
    if (room == null) {
      throw new HttpException("Room not found", HttpStatus.NOT_FOUND)
    }    
    Object.assign(room, updateRoomDto);

    try {
      await this.roomRepository.save(room);
    } catch (error) {
      throw new ConflictException(error.driverError.detail);
    } 

    return room;

  }

  async deleteRoom(refRoom: string, account: AccountEntity) {

    const userAccount = await this.accountRepository.findOneBy({refAccount: account.refAccount});
    if(userAccount != null) {
      if (this.IsAuthorised(userAccount, FunctionPrivilegeEnum.ADD_DISCUSSION) == false) {
        throw new UnauthorizedException();
      }
    }

    const room = await this.roomRepository.findOneBy({refRoom});
    if (room == null) {
      throw new HttpException("Room not found", HttpStatus.NOT_FOUND)
    }   

    try {
      await this.roomRepository.softRemove(room);
    } catch (error) {
      throw new ConflictException(error.driverError.detail);
    } 

    return room;

  }
}

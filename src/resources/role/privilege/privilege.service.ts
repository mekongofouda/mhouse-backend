import { ConflictException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Privilege } from './entities/privilege.entity';
import { Repository } from 'typeorm';
import { ListPrivilegeDto } from './dto/list-privilege.dto';
import { AddPrivilegeDto } from './dto/add-privilege.dto';
import { UpdateDiscussionDto } from 'src/resources/discussion/dto/update-discussion.dto';
import { Role } from 'src/resources/role/entities/role.entity';
import { AccountEntity } from '../../account/entities/account.entity';
import * as bcrypt  from 'bcrypt';

@Injectable()
export class PrivilegeService {

  constructor(
    @InjectRepository(AccountEntity) 
    private readonly accountRepository: Repository<AccountEntity>,

    @InjectRepository(Privilege) 
    private readonly privilegeRepository: Repository<Privilege>,

    @InjectRepository(Role) 
    private readonly roleRepository: Repository<Role>

  ){}

  async addPrivilege(addPrivilegeDto: AddPrivilegeDto) {

    //Find if the role with the given refRole exist
    const role = await this.roleRepository.findOneBy({refRole: addPrivilegeDto.refRole});
    if (role == null) {
      throw new HttpException("Role not found", HttpStatus.NOT_FOUND)
    }

    //Create a privilege to save with the Dto  
    let privilege = await this.privilegeRepository.create({...addPrivilegeDto});
    const saltRounds = 12;
    const salt = await bcrypt.genSalt(saltRounds);
    privilege.roles = [role];

    privilege.code = await bcrypt.hash(privilege.code, salt);
    privilege.resource = await bcrypt.hash(privilege.resource, salt);
    
    try {
      await this.privilegeRepository.save(privilege)
    } catch (error) {
      throw new ConflictException(error.driverError.detail);
    }

    return await privilege;

  }

  async listPrivilege(listPrivilegeDto: ListPrivilegeDto, account: any): Promise<Privilege[]> {

    let listPrivileges: Privilege[];
    let privileges: Privilege[] = [];

    if (listPrivilegeDto.refAccount != undefined) {
      const userAccount = await this.accountRepository.findOneBy({refAccount: listPrivilegeDto.refAccount});
      if (userAccount == null) {
        throw new HttpException("Account not found", HttpStatus.NOT_FOUND);
      } 
      listPrivileges = userAccount.role.privileges;
    } else if (listPrivilegeDto.all == 1){
      listPrivileges = await this.privilegeRepository.find();
    } else {
      listPrivileges = account.role.privileges;
    }

    if (listPrivilegeDto.refRole != undefined) {
      const role = await this.roleRepository.findOneBy({refRole: listPrivilegeDto.refRole});
      if (role == null) {
        throw new HttpException("Service not found", HttpStatus.NOT_FOUND);
      } 

      listPrivileges.filter(privilege => {
        if (privilege.roles.find(currentRole => {
          currentRole = role
        }) ) {
            privileges.push(privilege);
        }      
      });
      listPrivileges = privileges;
    } 
    
    listPrivileges.filter(privilege => {
      if (listPrivilegeDto.createdAt != undefined) {
        if (privilege.createdAt.toDateString() == listPrivilegeDto.createdAt.toDateString()) {
          privileges.push(privilege);
        }
      }      
      if (listPrivilegeDto.updatedAt != undefined) {
        if (privilege.updatedAt.toDateString() == listPrivilegeDto.updatedAt.toDateString()) {
          privileges.push(privilege);
        }
      }   
    });

    if ((privileges.length == 0) 
    && ((listPrivilegeDto.createdAt != undefined)||(listPrivilegeDto.updatedAt != undefined))
    ) {
      throw new HttpException("Message not found", HttpStatus.NOT_FOUND);
    } else if (privileges.length != 0) {
      listPrivileges = privileges;
    }

    return await listPrivileges;
  }

  async showPrivilegeDetail(refPrivilege: string): Promise<Privilege | null> {
    const privilege = await this.privilegeRepository.findOneBy({refPrivilege});
    if (privilege == null) {
      throw new HttpException("Privilege not found", HttpStatus.NOT_FOUND)
    }    
    return privilege;
  }

  async updatePrivilege(refPrivilege: string, updatePrivilegeDto: UpdateDiscussionDto): Promise<Privilege> {
    const privilege = await this.privilegeRepository.findOneBy({refPrivilege});
    if (privilege == null) {
      throw new HttpException("Privilege not found", HttpStatus.NOT_FOUND)
    }    
    Object.assign(privilege, updatePrivilegeDto);
    try {
      await this.privilegeRepository.save(privilege);
    } catch (error) {
      throw new ConflictException(error.driverError.detail);
    }
    return privilege;
  }

  async deletePrivilege(refPrivilege: string) {
    const privilege = await this.privilegeRepository.findOneBy({refPrivilege});
    if (privilege == null) {
      throw new HttpException("Privilege not found", HttpStatus.NOT_FOUND)
    }    
    try {
      await this.privilegeRepository.softRemove(privilege);
    } catch (error) {
      throw new ConflictException(error.driverError.detail);
    }
    return privilege;
  }
}

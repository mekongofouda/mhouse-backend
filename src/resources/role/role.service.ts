import { ConflictException, HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { AddRoleDto } from './dto/add-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { ListRoleDto } from './dto/list-role.dto';
import { Role } from './entities/role.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AccountEntity } from '../account/entities/account.entity';
import { Utils } from 'src/generics/utils';
import { FunctionPrivilegeEnum } from 'src/enums/function.privilege.enum';

@Injectable()
export class RoleService extends Utils{

  constructor(

    @InjectRepository(AccountEntity) 
    private readonly accountRepository: Repository<AccountEntity>,

    @InjectRepository(Role) 
    private readonly roleRepository: Repository<Role>

  ){
    super()
  }

  async addRole(addRoleDto: AddRoleDto, account: AccountEntity) {  

    const userAccount = await this.accountRepository.findOneBy({refAccount: account.refAccount});
    if(userAccount != null) {
      if (this.IsAuthorised(userAccount, FunctionPrivilegeEnum.ADD_ROLE) == false) {
        throw new UnauthorizedException();
      }
    }

    const role = await this.roleRepository.create(addRoleDto);
    try {
      await this.roleRepository.save(role);
    } catch (error) {
      throw new ConflictException(error.driverError.detail);
    }

    return await role;

  }

  async listRole(listRoleDto: ListRoleDto): Promise<Role[]> {

    let listRoles: Role[] = [];
    let roles: Role[] = [];

    if (listRoleDto.all == 1){
      listRoles = await this.roleRepository.find();
    }

    listRoles.filter(role => {
      if (listRoleDto.createdAt != undefined) {
        if (role.createdAt.toDateString() == listRoleDto.createdAt.toDateString()) {
          roles.push(role);
        }
      }      
      if (listRoleDto.updatedAt != undefined) {
        if (role.updatedAt.toDateString() == listRoleDto.updatedAt.toDateString()) {
          roles.push(role);
        }
      }   
    });

    if ((roles.length == 0) 
    && ((listRoleDto.createdAt != undefined)||(listRoleDto.updatedAt != undefined)
    )) {
      throw new HttpException("Role not found", HttpStatus.NOT_FOUND);
    } else if (roles.length != 0) {
      listRoles = roles;
    }

    return await listRoles;

  }

  async showRoleDetail(refRole: string) {

    const role = await this.roleRepository.findOneBy({refRole});
    if (role == null) {
      throw new HttpException("Role not found", HttpStatus.NOT_FOUND)
    }    

    return role;

  }

  async updateRole(refRole: string, updateRoleDto: UpdateRoleDto) {

    const role = await this.roleRepository.findOne({where:{refRole}});
    if (role == null) {
      throw new HttpException("Role not found", HttpStatus.NOT_FOUND)
    }    
    Object.assign(role, updateRoleDto);

    try {
      await this.roleRepository.save(role);
    } catch (error) {
      throw new ConflictException(error.driverError.detail);
    }

    return role;

  }

  async deleteRole(refRole: string) {

    const role = await this.roleRepository.findOneBy({refRole});
    if (role == null) {
      throw new HttpException("Role not found", HttpStatus.NOT_FOUND);
    }    

    try {
      await this.roleRepository.softRemove(role);
    } catch (error) {
      throw new ConflictException(error.driverError.detail);
    }

    return role;
    
  }
}

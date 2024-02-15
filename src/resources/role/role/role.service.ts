import {
  BadRequestException,
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AddRoleDto } from '../dto/add-role.dto';
import { UpdateRoleDto } from '../dto/update-role.dto';
import { ListRoleDto } from '../dto/list-role.dto';
import { Role } from '../entities/role.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AccountEntity } from '../../account/entities/account.entity';
import { Utils } from 'src/generics/utils';
import { FunctionPrivilegeEnum } from 'src/enums/function.privilege.enum';
import { Privilege } from '../privilege/entities/privilege.entity';
import { NotificationService } from 'src/resources/notification/notification.service';
import { UserRoleEnum } from 'src/enums/role.enum';

@Injectable()
export class RoleService extends Utils {
  constructor(
    @InjectRepository(AccountEntity)
    private readonly accountRepository: Repository<AccountEntity>,

    @InjectRepository(Privilege)
    private readonly privilegeRepository: Repository<Privilege>,

    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    private readonly notificationService: NotificationService,

  ) {
    super();
  }

  async addRole(addRoleDto: AddRoleDto, account: AccountEntity) {

    //Get user account object
    const userAccount = await this.accountRepository.findOneBy({
      refAccount: account.refAccount,
    });

    //Autorisation
    if (userAccount != null) {
      if ( userAccount.role.slug != UserRoleEnum.SUPER_ADMIN ) {
        throw new UnauthorizedException();
      }
    }

    //Create a role object to save it
    const role = await this.roleRepository.create(addRoleDto);

    const refPrivileges = addRoleDto.refPrivileges;
    if (refPrivileges == undefined) {
      throw new BadRequestException('References Privileges not found');
    }

    const privileges: Privilege[] = [];
    refPrivileges.forEach(async (refPrivilege) => {
      const privilege = await this.privilegeRepository.findOneBy({
        refPrivilege: refPrivilege,
      });
      if (privilege != null) {
        privileges.push(privilege);
      }
    });

    role.privileges = privileges;

    try {
      await this.roleRepository.save(role);
    } catch (error) {
      throw new ConflictException(error.driverError.detail);
    }
    // await this.notificationService.sendNotification(account);
    return await role;
  }

  async showRoleDetail(refRole: string, account: AccountEntity) {
    const userAccount = await this.accountRepository.findOneBy({
      refAccount: account.refAccount,
    });
    if (userAccount != null) {
      if (
        this.IsAuthorised(userAccount, FunctionPrivilegeEnum.SHOW_ROLE) == false
      ) {
        throw new UnauthorizedException();
      }
    }

    const role = await this.roleRepository.findOneBy({ refRole });
    if (role == null) {
      throw new HttpException('Role not found', HttpStatus.NOT_FOUND);
    }

    return role;
  }
  
  async listRole(
    listRoleDto: ListRoleDto,
    account: AccountEntity,
  ): Promise<Role[]> {
    const userAccount = await this.accountRepository.findOneBy({
      refAccount: account.refAccount,
    });
    if (userAccount != null) {
      if (
        this.IsAuthorised(userAccount, FunctionPrivilegeEnum.LIST_ROLE) == false
      ) {
        throw new UnauthorizedException();
      }
    }

    let listRoles: Role[] = [];
    const roles: Role[] = [];

    if (listRoleDto.all == 1) {
      listRoles = await this.roleRepository.find();
    }

    listRoles.filter((role) => {
      if (listRoleDto.createdAt != undefined) {
        if (
          role.createdAt.toDateString() == listRoleDto.createdAt.toDateString()
        ) {
          roles.push(role);
        }
      }
      if (listRoleDto.updatedAt != undefined) {
        if (
          role.updatedAt.toDateString() == listRoleDto.updatedAt.toDateString()
        ) {
          roles.push(role);
        }
      }
    });

    if (
      roles.length == 0 &&
      (listRoleDto.createdAt != undefined || listRoleDto.updatedAt != undefined)
    ) {
      throw new HttpException('Role not found', HttpStatus.NOT_FOUND);
    } else if (roles.length != 0) {
      listRoles = roles;
    }

    return await listRoles;
  }


  async updateRole(
    refRole: string,
    updateRoleDto: UpdateRoleDto,
    account: AccountEntity,
  ) {
    const userAccount = await this.accountRepository.findOneBy({
      refAccount: account.refAccount,
    });
    if (userAccount != null) {
      if (
        this.IsAuthorised(userAccount, FunctionPrivilegeEnum.UPDATE_ROLE) ==
        false
      ) {
        throw new UnauthorizedException();
      }
    }

    const role = await this.roleRepository.findOne({ where: { refRole } });
    if (role == null) {
      throw new HttpException('Role not found', HttpStatus.NOT_FOUND);
    }
    Object.assign(role, updateRoleDto);

    try {
      await this.roleRepository.save(role);
    } catch (error) {
      throw new ConflictException(error.driverError.detail);
    }
    await this.notificationService.sendNotification(account);

    return role;
  }

  async deleteRole(refRole: string, account) {
    const userAccount = await this.accountRepository.findOneBy({
      refAccount: account.refAccount,
    });
    if (userAccount != null) {
      if (
        this.IsAuthorised(userAccount, FunctionPrivilegeEnum.DELETE_ROLE) ==
        false
      ) {
        throw new UnauthorizedException();
      }
    }

    const role = await this.roleRepository.findOneBy({ refRole });
    if (role == null) {
      throw new HttpException('Role not found', HttpStatus.NOT_FOUND);
    }

    try {
      await this.roleRepository.softRemove(role);
    } catch (error) {
      throw new ConflictException(error.driverError.detail);
    }

    return role;
  }
}

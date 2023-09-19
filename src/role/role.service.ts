import { Injectable } from '@nestjs/common';
import { AddRoleDto } from './dto/add-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { ListRoleDto } from './dto/list-role.dto';
import { Role } from './entities/role.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class RoleService {

  constructor(
    @InjectRepository(Role) 
    private readonly roleRepository: Repository<Role>
  ){}

  addRole(addRoleDto: AddRoleDto) {
    return 'This action adds a new role';
  }

  async listRole(listRoleDto: ListRoleDto): Promise<Role[]> {
    return await this.roleRepository.find();
  }

  showRoleDetail(refRole: string) {
    return `This action returns a #${refRole} role`;
  }

  updateRole(refRole: string, updateRoleDto: UpdateRoleDto) {
    return `This action updates a #${refRole} role`;
  }

  deleteRole(refRole: string) {
    return `This action removes a #${refRole} role`;
  }
}

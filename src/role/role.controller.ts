import { Controller, Get, Post, Body, Patch, Param, Delete, Query, HttpStatus, HttpException, UseGuards } from '@nestjs/common';
import { RoleService } from './role.service';
import { AddRoleDto } from './dto/add-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { ReferencePipe } from 'src/pipes/reference/reference.pipe';
import { ListRoleDto } from './dto/list-role.dto';
import { Role } from './entities/role.entity';
import { SlugPipe } from 'src/pipes/slug/slug.pipe';
import { JwtAuthGuard } from 'src/auth/auth.guard';

@Controller('role')
export class RoleController {

  constructor(
    private readonly roleService: RoleService,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async addRole(
    @Body(ReferencePipe, SlugPipe) addRoleDto: AddRoleDto
    ): Promise<Role> {
    return await this.roleService.addRole(addRoleDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async listRole(
    @Query() listRoleDto: ListRoleDto
  ): Promise<Role[]> {
    return await this.roleService.listRole(listRoleDto);
  }

  @Get(':ref')
  async showRoleDetail(
    @Param('ref') ref: string
    ): Promise<Role> {
    return await this.roleService.showRoleDetail(ref);
  }

  @Patch(':ref')
  async updateRole(
    @Param('ref') ref: string, 
    @Body() updateRoleDto: UpdateRoleDto
  ): Promise<Role> {
    return await this.roleService.updateRole(ref, updateRoleDto);
  }

  @Delete(':ref')
  async deleteRole(
    @Param('ref') ref: string
    ): Promise<Role> {
    return await this.roleService.deleteRole(ref);
  }
}

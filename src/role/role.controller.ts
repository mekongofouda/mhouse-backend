import { Controller, Get, Post, Body, Patch, Param, Delete, Query, HttpStatus, HttpException } from '@nestjs/common';
import { RoleService } from './role.service';
import { AddRoleDto } from './dto/add-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { ReferencePipe } from 'src/pipes/reference/reference.pipe';
import { ListRoleDto } from './dto/list-role.dto';
import { DatePipe } from 'src/pipes/date/date.pipe';

@Controller('role')
export class RoleController {

  constructor(
    private readonly roleService: RoleService,
  ) {}

  @Post()
  addRole(
    @Body(ReferencePipe, DatePipe) addRoleDto: AddRoleDto
    ) {
    return this.roleService.addRole(addRoleDto);
  }

  @Get()
  listRole(
    @Query() listRoleDto: ListRoleDto
  ) {
    if (!this.roleService.listRole(listRoleDto)) {
      throw new HttpException("Role not found", HttpStatus.NOT_FOUND)
    }
    return this.roleService.listRole(listRoleDto);
  }

  @Get(':ref')
  showRoleDetail(
    @Param('ref') ref: string
    ) {
    if (!this.roleService.showRoleDetail(ref)) {
      throw new HttpException("Role not found", HttpStatus.NOT_FOUND)
    }
    return this.roleService.showRoleDetail(ref);
  }

  @Patch(':ref')
  updateRole
  (@Param('ref') ref: string, 
  @Body() updateRoleDto: UpdateRoleDto
  ) {
    return this.roleService.updateRole(ref, updateRoleDto);
  }

  @Delete(':ref')
  deleteRole(
    @Param('ref') ref: string
    ) {
    return this.roleService.deleteRole(ref);
  }
}

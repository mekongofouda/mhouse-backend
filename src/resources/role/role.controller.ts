import { Controller, Get, Post, Body, Patch, Param, Delete, Query, HttpStatus, HttpException, UseGuards } from '@nestjs/common';
import { RoleService } from './role.service';
import { AddRoleDto } from './dto/add-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { ReferencePipe } from 'src/pipes/reference/reference.pipe';
import { ListRoleDto } from './dto/list-role.dto';
import { SlugPipe } from 'src/pipes/slug/slug.pipe';
import { JwtAuthGuard } from 'src/resources/account/auth/auth.guard';
import { Account } from 'src/decorators/account.decorator';
import { MhouseResponseInterface } from 'src/interfaces/mhouse-response.interface';

@Controller('role')
export class RoleController {

  constructor(
    private readonly roleService: RoleService,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async addRole(
    @Body(ReferencePipe, SlugPipe) addRoleDto: AddRoleDto,
    ): Promise<MhouseResponseInterface> {
    const data = await this.roleService.addRole(addRoleDto);
    return {
      data: data,
      message: "Rôle créé avec succès",
      code: HttpStatus.OK
    }
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async listRole(
    @Query() listRoleDto: ListRoleDto,
    @Account() user
  ): Promise<MhouseResponseInterface> {
    const data = await this.roleService.listRole(listRoleDto);
    return {
      data: data,
      message: "Partage effectué avec succès",
      code: HttpStatus.OK
    }
  }

  @Get(':ref')
  async showRoleDetail(
    @Param('ref') ref: string
    ): Promise<MhouseResponseInterface> {
    const data = await this.roleService.showRoleDetail(ref);
    return {
      data: data,
      message: "Partage effectué avec succès",
      code: HttpStatus.OK
    };
  }

  @Patch(':ref')
  async updateRole(
    @Param('ref') ref: string, 
    @Body(SlugPipe) updateRoleDto: UpdateRoleDto
  ): Promise<MhouseResponseInterface> {
    const data = await this.roleService.updateRole(ref, updateRoleDto);
    return {
      data: data,
      message: "Partage effectué avec succès",
      code: HttpStatus.OK
    };
  }

  @Delete(':ref')
  async deleteRole(
    @Param('ref') ref: string
    ): Promise<MhouseResponseInterface> {
    const data = await this.roleService.deleteRole(ref);
    return {
      data: data,
      message: "Partage effectué avec succès",
      code: HttpStatus.OK
    };
  }
}

import { Controller, Get, Post, Body, Patch, Param, Delete, Query, HttpStatus, HttpException, UseGuards } from '@nestjs/common';
import { RoleService } from './role.service';
import { AddRoleDto } from './dto/add-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { ReferencePipe } from 'src/pipes/reference/reference.pipe';
import { ListRoleDto } from './dto/list-role.dto';
import { SlugPipe } from 'src/pipes/slug/slug.pipe';
import { JwtAuthGuard } from 'src/resources/auth/auth.guard';
import { Account } from 'src/decorators/account.decorator';
import { MhouseResponseInterface } from 'src/interfaces/mhouse-response.interface';

@Controller('role')
export class RoleController {

  constructor(
    private readonly roleService: RoleService,
  ) {}

  @Post()
  // @UseGuards(JwtAuthGuard)
  async addRole(
    @Body(ReferencePipe, SlugPipe) addRoleDto: AddRoleDto,
    @Account() user
    ): Promise<MhouseResponseInterface> {
    const data = await this.roleService.addRole(addRoleDto);
    return {
      data: data,
      message: "Rôle créé avec succès",
      code:"200"
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
      code:"200"
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
      code:"200"
    };
  }

  // @Patch(':ref')
  // async updateRole(
  //   @Param('ref') ref: string, 
  //   @Body() updateRoleDto: UpdateRoleDto
  // ): Promise<MhouseResponseInterface> {
  //   return await this.roleService.updateRole(ref, updateRoleDto);
  // }

  // @Delete(':ref')
  // async deleteRole(
  //   @Param('ref') ref: string
  //   ): Promise<MhouseResponseInterface> {
  //   return await this.roleService.deleteRole(ref);
  // }
}

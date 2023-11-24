import { Controller, Get, Post, Body, Patch, Param, Delete, Query, HttpStatus, UseGuards } from '@nestjs/common';
import { RoleService } from './role.service';
import { AddRoleDto } from './dto/add-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { ReferencePipe } from 'src/pipes/reference/reference.pipe';
import { ListRoleDto } from './dto/list-role.dto';
import { SlugPipe } from 'src/pipes/slug/slug.pipe';
import { JwtAuthGuard } from 'src/resources/account/auth/auth.guard';
import { Account } from 'src/decorators/account.decorator';
import { MhouseResponseInterface } from 'src/interfaces/mhouse-response.interface';
import { AccountEntity } from '../account/entities/account.entity';

@Controller('role')
export class RoleController {

  constructor(
    private readonly roleService: RoleService,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async addRole(
    @Body(ReferencePipe, SlugPipe) addRoleDto: AddRoleDto,
    @Account() account: AccountEntity
    ): Promise<MhouseResponseInterface> {

    const data = await this.roleService.addRole(addRoleDto, account);
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
    @Account() account: AccountEntity
  ): Promise<MhouseResponseInterface> {

    const data = await this.roleService.listRole(listRoleDto, account);
    return {
      data: data,
      message: "Liste de roles affichée avec succès",
      code: HttpStatus.OK
    }

  }

  @Get(':ref')
  async showRoleDetail(
    @Param('ref') ref: string, 
    @Account() account: AccountEntity
    ): Promise<MhouseResponseInterface> {

    const data = await this.roleService.showRoleDetail(ref, account);
    return {
      data: data,
      message: "Partage effectué avec succès",
      code: HttpStatus.OK
    };
    
  }

  @Patch(':ref')
  async updateRole(
    @Param('ref') ref: string,
    @Body(SlugPipe) updateRoleDto: UpdateRoleDto,
    @Account() account: AccountEntity
  ): Promise<MhouseResponseInterface> {
    const data = await this.roleService.updateRole(ref, updateRoleDto, account);
    return {
      data: data,
      message: "Partage effectué avec succès",
      code: HttpStatus.OK
    };
  }

  @Delete(':ref')
  async deleteRole(
    @Param('ref') ref: string,
    @Account() account: AccountEntity
    ): Promise<MhouseResponseInterface> {
    const data = await this.roleService.deleteRole(ref, account);
    return {
      data: data,
      message: "Partage effectué avec succès",
      code: HttpStatus.OK
    };
  }
}

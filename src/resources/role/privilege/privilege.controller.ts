import { Controller, Get, Post, Body, Param, Query, HttpStatus, UseGuards, Patch, Delete } from '@nestjs/common';
import { PrivilegeService } from './privilege.service';
import { AddPrivilegeDto } from './dto/add-privilege.dto';
import { ListPrivilegeDto } from './dto/list-privilege.dto';
import { ReferencePipe } from 'src/pipes/reference/reference.pipe';
import { JwtAuthGuard } from 'src/resources/account/auth/auth.guard';
import { MhouseResponseInterface } from 'src/interfaces/mhouse-response.interface';
import { Account } from 'src/decorators/account.decorator';
import { AccountEntity } from '../../account/entities/account.entity';
import { UpdatePrivilegeDto } from './dto/update-privilege.dto';

@Controller('privilege')
export class PrivilegeController {

  constructor(
    private readonly privilegeService: PrivilegeService,
  ) {}

  @Post() 
  @UseGuards(JwtAuthGuard)
  async addPrivilege(
    @Body(ReferencePipe) addPrivilegeDto: AddPrivilegeDto,
    @Account() account: AccountEntity
    ): Promise<MhouseResponseInterface> {
    const data = await this.privilegeService.addPrivilege(addPrivilegeDto, account);
    return {
      data: data,
      message: "Privilège créé avec succès",
      code: HttpStatus.OK
    }
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async listPrivilege(
    @Query() listPrivilegeDto: ListPrivilegeDto,
    @Account() account: AccountEntity
  ): Promise<MhouseResponseInterface> {
    const data = await this.privilegeService.listPrivilege(listPrivilegeDto, account);
    return {
      data: data,
      message: "Liste des privilèges obtenue avec succès",
      code: HttpStatus.OK
    }
  }

  @Get(':ref')
  async showPrivilegeDetail(
    @Param('ref') ref: string, 
    @Account() account: AccountEntity
    ): Promise<MhouseResponseInterface> {
    const data = await this.privilegeService.showPrivilegeDetail(ref, account);
    return {
      data: data,
      message: "Liste des offres obtenue avec succès",
      code: HttpStatus.OK
    };
  }

  @Patch(':ref')
  async updatePrivilege(
    @Param('ref') ref: string, 
    @Body() updatePrivilegeDto: UpdatePrivilegeDto, 
    @Account() account: AccountEntity
  ): Promise<MhouseResponseInterface> {
    const data = await this.privilegeService.updatePrivilege(ref, updatePrivilegeDto, account);
    return {
      data: data,
      message: "Liste des offres obtenue avec succès",
      code: HttpStatus.OK
    };
  }

  @Delete(':ref')
  async deletePrivilege(
    @Param('ref') ref: string, 
    @Account() account: AccountEntity
    ): Promise<MhouseResponseInterface> {
    const data = await this.privilegeService.deletePrivilege(ref, account);
    return {
      data: data,
      message: "Liste des offres obtenue avec succès",
      code: HttpStatus.OK
    };
  }
}

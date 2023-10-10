import { Controller, Get, Post, Body, Patch, Param, Delete, Query, HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { PrivilegeService } from './privilege.service';
import { AddPrivilegeDto } from './dto/add-privilege.dto';
import { UpdatePrivilegeDto } from './dto/update-privilege.dto';
import { ListPrivilegeDto } from './dto/list-privilege.dto';
import { ReferencePipe } from 'src/pipes/reference/reference.pipe';
import { JwtAuthGuard } from 'src/resources/auth/auth.guard';
import { MhouseResponseInterface } from 'src/interfaces/mhouse-response.interface';

@Controller('privilege')
export class PrivilegeController {

  constructor(
    private readonly privilegeService: PrivilegeService,
  ) {}

  @Post() 
  @UseGuards(JwtAuthGuard)
  async addPrivilege(
    @Body(ReferencePipe) addPrivilegeDto: AddPrivilegeDto
    ): Promise<MhouseResponseInterface> {
    const data = await this.privilegeService.addPrivilege(addPrivilegeDto);
    return {
      data: data,
      message: "Privilège créé avec succès",
      code:"200"
    }
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async listPrivilege(
    @Query() listPrivilegeDto: ListPrivilegeDto
  ): Promise<MhouseResponseInterface> {
    const data = await this.privilegeService.listPrivilege(listPrivilegeDto);
    return {
      data: data,
      message: "Liste des privilèges obtenue avec succès",
      code:"200"
    }
  }

  @Get(':ref')
  async showPrivilegeDetail(
    @Param('ref') ref: string
    ): Promise<MhouseResponseInterface> {
    const data = await this.privilegeService.showPrivilegeDetail(ref);
    return {
      data: data,
      message: "Liste des offres obtenue avec succès",
      code:"200"
    };
  }

  // @Patch(':ref')
  // async updatePrivilege(
  //   @Param('ref') ref: string, 
  //   @Body() updatePrivilegeDto: UpdatePrivilegeDto
  // ): Promise<MhouseResponseInterface> {
  //   return await this.privilegeService.updatePrivilege(ref, updatePrivilegeDto);
  // }

  // @Delete(':ref')
  // async deletePrivilege(
  //   @Param('ref') ref: string
  //   ): Promise<MhouseResponseInterface> {
  //   return await this.privilegeService.deletePrivilege(ref);
  //}
}

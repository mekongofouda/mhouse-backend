import { Controller, Get, Post, Body, Patch, Param, Delete, Query, HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { PrivilegeService } from './privilege.service';
import { AddPrivilegeDto } from './dto/add-privilege.dto';
import { UpdatePrivilegeDto } from './dto/update-privilege.dto';
import { ListPrivilegeDto } from './dto/list-privilege.dto';
import { ReferencePipe } from 'src/pipes/reference/reference.pipe';
import { Privilege } from './entities/privilege.entity';
import { JwtAuthGuard } from 'src/auth/auth.guard';

@Controller('privilege')
export class PrivilegeController {

  constructor(
    private readonly privilegeService: PrivilegeService,
  ) {}

  @Post() 
  @UseGuards(JwtAuthGuard)
  async addPrivilege(
    @Body(ReferencePipe) addPrivilegeDto: AddPrivilegeDto
    ): Promise<Privilege> {
    return await this.privilegeService.addPrivilege(addPrivilegeDto);
  }

  // @Get()
  // @UseGuards(JwtAuthGuard)
  // async listPrivilege(
  //   @Query() listPrivilegeDto: ListPrivilegeDto
  // ): Promise<Privilege[]> {
  //   return await this.privilegeService.listPrivilege(listPrivilegeDto);
  // }

  // @Get(':ref')
  // async showPrivilegeDetail(
  //   @Param('ref') ref: string
  //   ): Promise<Privilege> {
  //   return await this.privilegeService.showPrivilegeDetail(ref);
  // }

  // @Patch(':ref')
  // async updatePrivilege(
  //   @Param('ref') ref: string, 
  //   @Body() updatePrivilegeDto: UpdatePrivilegeDto
  // ): Promise<Privilege> {
  //   return await this.privilegeService.updatePrivilege(ref, updatePrivilegeDto);
  // }

  // @Delete(':ref')
  // async deletePrivilege(
  //   @Param('ref') ref: string
  //   ): Promise<Privilege> {
  //   return await this.privilegeService.deletePrivilege(ref);
  //}
}

import { Controller, Get, Post, Body, Patch, Param, Delete, Query, HttpException, HttpStatus, UseInterceptors } from '@nestjs/common';
import { PrivilegeService } from './privilege.service';
import { AddPrivilegeDto } from './dto/add-privilege.dto';
import { UpdatePrivilegeDto } from './dto/update-privilege.dto';
import { ListPrivilegeDto } from './dto/list-privilege.dto';
import { ReferencePipe } from 'src/pipes/reference/reference.pipe';
import { NamePipe } from 'src/pipes/name/name.pipe';
import { DatePipe } from 'src/pipes/date/date.pipe';

@Controller('privilege')
export class PrivilegeController {

  constructor(
    private readonly privilegeService: PrivilegeService,
  ) {}

  @Post()
  addPrivilege(
    @Body(ReferencePipe, NamePipe, DatePipe) addPrivilegeDto: AddPrivilegeDto
    ) {
    return this.privilegeService.addPrivilege(addPrivilegeDto);
  }

  @Get()
  listPrivilege(
    @Query() listPrivilegeDto: ListPrivilegeDto
  ) {
    if (!this.privilegeService.listPrivilege(listPrivilegeDto)) {
      throw new HttpException("Privilege not found", HttpStatus.NOT_FOUND)
    }
    return this.privilegeService.listPrivilege(listPrivilegeDto);
  }

  @Get(':ref')
  showPrivilegeDetail(
    @Param('ref') ref: string
    ) {
    if (!this.privilegeService.showPrivilegeDetail(ref)) {
      throw new HttpException("Privilege not found", HttpStatus.NOT_FOUND)
    }
    return this.privilegeService.showPrivilegeDetail(ref);
  }

  @Patch(':ref')
  updatePrivilege(
    @Param('ref') ref: string, 
    @Body() updatePrivilegeDto: UpdatePrivilegeDto
  ) {
    return this.privilegeService.updatePrivilege(ref, updatePrivilegeDto);
  }

  @Delete(':ref')
  deletePrivilege(
    @Param('ref') ref: string
    ) {
    return this.privilegeService.deletePrivilege(ref);
  }
}

import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, HttpException, HttpStatus } from '@nestjs/common';
import { PrivilegeService } from './privilege.service';
import { AddPrivilegeDto } from './dto/add-privilege.dto';
import { UpdatePrivilegeDto } from './dto/update-privilege.dto';

@Controller('privilege')
export class PrivilegeController {

  constructor(private readonly privilegeService: PrivilegeService) {}

  @Post()
  addPrivilege(@Body() addPrivilegeDto: AddPrivilegeDto) {
    return this.privilegeService.addPrivilege(addPrivilegeDto);
  }

  @Get()
  listPrivilege() {
    if (!this.privilegeService.listPrivilege()) {
      throw new HttpException("Privilege not found", HttpStatus.NOT_FOUND)
    }
    return this.privilegeService.listPrivilege();
  }

  @Get(':ref')
  showPrivilegeDetail(@Param('ref') ref: string) {
    if (!this.privilegeService.showPrivilegeDetail(ref)) {
      throw new HttpException("Privilege not found", HttpStatus.NOT_FOUND)
    }
    return this.privilegeService.showPrivilegeDetail(ref);
  }

  @Patch(':ref')
  updatePrivilege(@Param('ref') ref: string, @Body() updatePrivilegeDto: UpdatePrivilegeDto) {
    return this.privilegeService.updatePrivilege(ref, updatePrivilegeDto);
  }

  @Delete(':ref')
  deletePrivilege(@Param('id') ref: string) {
    return this.privilegeService.deletePrivilege(ref);
  }
}

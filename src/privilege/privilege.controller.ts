import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PrivilegeService } from './privilege.service';
import { AddPrivilegeDto } from './dto/add-privilege.dto';
import { UpdatePrivilegeDto } from './dto/update-privilege.dto';

@Controller('privilege')
export class PrivilegeController {
  constructor(private readonly privilegeService: PrivilegeService) {}

  @Post()
  create(@Body() addPrivilegeDto: AddPrivilegeDto) {
    return this.privilegeService.addPrivilege(addPrivilegeDto);
  }

  @Get()
  findAll() {
    return this.privilegeService.listPrivilege();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.privilegeService.showPrivilegeDetail(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePrivilegeDto: UpdatePrivilegeDto) {
    return this.privilegeService.updatePrivilege(+id, updatePrivilegeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.privilegeService.deletePrivilege(+id);
  }
}

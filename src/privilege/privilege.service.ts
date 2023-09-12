import { Injectable } from '@nestjs/common';
import { AddPrivilegeDto } from './dto/add-privilege.dto';
import { UpdatePrivilegeDto } from './dto/update-privilege.dto';

@Injectable()
export class PrivilegeService {
  addPrivilege(addPrivilegeDto: AddPrivilegeDto) {
    return 'This action adds a new privilege';
  }

  listPrivilege() {
    return `This action returns all privilege`;
  }

  showPrivilegeDetail(id: number) {
    return `This action returns a #${id} privilege`;
  }

  updatePrivilege(id: number, updatePrivilegeDto: UpdatePrivilegeDto) {
    return `This action updates a #${id} privilege`;
  }

  deletePrivilege(id: number) {
    return `This action removes a #${id} privilege`;
  }
}

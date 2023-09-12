import { Injectable } from '@nestjs/common';
import { AddPrivilegeDto } from './dto/add-privilege.dto';
import { UpdatePrivilegeDto } from './dto/update-privilege.dto';

@Injectable()
export class PrivilegeService {

  private privileges = [
    {
      "reference": "AYHUSH",
      "name": "Thomymek",
      "description": "Bla bla bla !!!",
      "resource": "privilege",
      "createdAt": 1694495914096,
      "updatedAt": 1694495914096
    },
    {
      "reference": "FIKDOK",
      "name": "Dodomek",
      "description": "Bla bla bla !!!",
      "resource": "privilege",
      "createdAt": 1694495914096,
      "updatedAt": 1694495914096
    }
  ]
  addPrivilege(addPrivilegeDto) {
    return this.privileges.push(addPrivilegeDto);
  }

  listPrivilege() {
    return this.privileges;
  }

  showPrivilegeDetail(ref: string) {
    return null;
  }

  updatePrivilege(ref: string, updatePrivilegeDto: UpdatePrivilegeDto) {
    return `This action updates a #${ref} privilege`;
  }

  deletePrivilege(ref: string) {
    return `This action removes a #${ref} privilege`;
  }
}

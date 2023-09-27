import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ReferencePipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) { 

    if (metadata.metatype.name == 'RegisterDto') {
      const date = new Date();
      const randNumber  = Math.floor(Math.random() * 100);
      value.refAccount = "RACC"+randNumber.toString()+date.getFullYear()+date.getMonth()+date.getDay()+date.getMonth()+date.getMinutes()+date.getSeconds();
    }

    if (metadata.metatype.name == 'AddRoleDto') {
      const date = new Date();
      const randNumber  = Math.floor(Math.random() * 100);
      value.refRole = "RROL"+randNumber.toString()+date.getFullYear()+date.getMonth()+date.getDay()+date.getMonth()+date.getMinutes()+date.getSeconds();
    }
  
    if (metadata.metatype.name == 'AddPrivilegeDto') {
      const date = new Date();
      const randNumber  = Math.floor(Math.random() * 100);
      value.refPrivilege = "RPRV"+randNumber.toString()+date.getFullYear()+date.getMonth()+date.getDay()+date.getMonth()+date.getMinutes()+date.getSeconds();
    }

    return value; 
  }
}
 
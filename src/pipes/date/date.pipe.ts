import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class DatePipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (value.refPrivilege) {
      //Nom du privilege sur 14 caracteres PRIV-2-000-dateTime{00-00-00}
      value.createdAt = new Date();
      value.updatedAt = new Date();
  
      console.log(value.createdAt,value.updatedAt);
    }
    return value;
  }
}

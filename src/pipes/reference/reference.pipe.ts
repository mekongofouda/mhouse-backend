import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ReferencePipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (!value.refPrivilege) {
      //Référence du privilege sur 14 caracteres REF-1-000-dateTime{00-00-00}
      value.refPrivilege = "REF-1-000-dateTime{00-00-00}";
      console.log(value.refPrivilege);
    }
    return value;
  }
}

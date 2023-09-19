import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class NamePipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (value.refPrivilege) {
      //Nom du privilege sur 14 caracteres PRIV-2-000-dateTime{00-00-00}
      value.name = "PRIV-2-000-dateTime{00-00-00}";
      console.log(value.name);
    }
    return value;
  }
}

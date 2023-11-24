import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class CredentialsPipe implements PipeTransform {

  transform(value: any, metadata: ArgumentMetadata) { 

    if (metadata.metatype.name == 'LoginDtoDto') {

      value.password = value.password.toString();
    
    }
    
    return value; 
  }
}
 
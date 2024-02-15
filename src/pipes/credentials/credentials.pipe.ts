import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class CredentialsPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {

    if (metadata.metatype.name == 'LoginCredentialsDto') {
      //Apply security at this level
    }

    return value;
  }
}

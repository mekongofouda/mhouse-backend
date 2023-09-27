import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class SlugPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    const slug = value.title.toString();
    value.slug = slug.toUpperCase().replaceAll(' ', '_');
    return value;
  }
}

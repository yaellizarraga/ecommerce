import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'validUrl',
  standalone: true
})
export class ValidUrlPipe implements PipeTransform {

    transform(value: string | null | undefined, defaultImage: string = ''): string {
        if (!value) {
          return defaultImage;
        }

    try {
      const url = new URL(value);
      return url.protocol === 'http:' || url.protocol === 'https:' ? value : defaultImage;
    } catch (error) {
      return defaultImage;
    }
  }
}

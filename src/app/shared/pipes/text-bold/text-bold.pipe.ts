import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'textBold'
})
export class TextBoldPipe implements PipeTransform {

    transform(value: string): any {
        console.log(value, 'value');
        return null;
    }

}

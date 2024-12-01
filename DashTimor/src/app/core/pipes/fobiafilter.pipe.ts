import { Pipe, PipeTransform } from '@angular/core';
import { FobiaTimor } from '../interfaces/fobia-timor';

@Pipe({
  name: 'fobiafilter',
  standalone: true
})
export class FobiafilterPipe implements PipeTransform {

  transform(value: FobiaTimor[], args: string): FobiaTimor[] {
    let filter:string=args ?args.toLocaleLowerCase():'';

    return filter? value.filter((usuario:FobiaTimor)=>
      usuario.nombre.toLocaleLowerCase().indexOf(filter)!=-1
      ):value;
  }

}

import { Pipe, PipeTransform } from '@angular/core';
import { UsuariosTimor } from '../interfaces/usuarios-timor';
@Pipe({
  name: 'usuarioFilter',
  standalone: true
})
export class UsuariosFilterPipe implements PipeTransform {

  transform(value: UsuariosTimor[], args: string): UsuariosTimor[] {
    let filter:string=args ?args.toLocaleLowerCase():'';

    return filter? value.filter((usuario:UsuariosTimor)=>
      usuario.nombre.toLocaleLowerCase().indexOf(filter)!=-1
      ):value;
  }

}

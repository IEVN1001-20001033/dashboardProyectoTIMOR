import { Component, OnInit } from '@angular/core';
import { FobiaService } from '../../../core/services/fobia.service';
import { FobiaTimor } from '../../../core/interfaces/fobia-timor';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-agregar',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './agregar.component.html',
  styles: ``
})
export default class AgregarComponent implements OnInit {
  formGroup!: FormGroup;

  regFobia: FobiaTimor = {
    idFobia: 0,
    foto: '',
    nombre: '',
    descripcion: '',
    precio: '',
    activa: 1,
  }
  constructor(private fb: FormBuilder, public fobiaTimor: FobiaService, private router: Router) { }

  ngOnInit(): void {
    this.formGroup = this.initForm();

  }

  initForm(): FormGroup {
    return this.fb.group({
      idFobia: [0],
      nombre: [''],
      correo: [''],
      descripcion: [''],
      foto: [''],
      precio: [''],
      activa: [1],
    })

  }


  selecImg(event: any): void {
    const img = event.target.files[0];
    if (img) {
      const formData = new FormData();
      formData.append('foto', img);
      this.fobiaTimor.subirFoto(formData).subscribe({
        next: (response) => {
          this.regFobia.foto = response.ruta;
          console.log('Imagen subida:', response);
        },
        error: (err) => console.error('Error al subir imagen:', err)
      });
    }
  }



  onSubmit(): void {
    const { idFobia, nombre, descripcion,precio, activa } = this.formGroup.value;

    this.regFobia = {
      idFobia,
      nombre,
      foto: this.regFobia.foto,
      descripcion,
      precio,
      activa,
    };

    this.agregar()

  }

  agregar() {
  const datosUsr = { ...this.regFobia };

    this.fobiaTimor.agregarFobia(datosUsr).subscribe({
      next: () => this.router.navigate(['/perfiles/admin/listafobias']),
    error: (err) => console.error('Error al agregar fobia:', err),
    complete: () => console.info('Fobia agregada con éxito')
 
    })

    this.formGroup.reset({
      idFobia: 0,
      foto: '',
      nombre: '',
      descripcion: '',
      precio: '',
      activa: 1,
    });

    this.regFobia = {
      idFobia: 123,
      foto: '',
      nombre: '',
      descripcion: '',
      precio: '',
      activa: 1,
    };

    // this.router.navigate(['/fobia/listafobias'])

  }

}

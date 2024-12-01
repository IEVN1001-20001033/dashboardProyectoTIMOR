import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule, Location } from '@angular/common';
import { FormGroup, FormBuilder, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FobiaService } from '../../../core/services/fobia.service';
import { FobiaTimor } from '../../../core/interfaces/fobia-timor';
@Component({
  selector: 'app-editar',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule,CommonModule, RouterLink],
  templateUrl: './editar.component.html',
  styles: ``
})
export default class EditarComponent {
  dataSource:any=[];
  formGroup!: FormGroup;
  tem:any;

  regFobia:FobiaTimor={
    idFobia:0,
    nombre:'',
    foto:'',
    descripcion:'',
    precio: '',
    activa: 0,

  }
  constructor(private fb: FormBuilder,private location: Location,public fobiasTimor: FobiaService, private router:Router){}
 
 
  ngOnInit(){
    this.formGroup=this.initForm();
    this.tem = this.location.path().split('/')
    console.log("componente "+this.tem[3])
    this.fobiasTimor.getFobia(parseInt(this.tem[3])).subscribe(
      {
        next: response=>{
 
      this.dataSource=response;
          console.log(this.dataSource)
          this.asignaCampos(this.dataSource)
 
    },
    error: error=>console.log(error)
  }
    );
  }
  initForm():FormGroup{
    return this.fb.group({
      idFobia: [{value:'', disabled:true}],
      nombre: [''],
      correo:[''],
      descripcion: [''],
      foto: [''],
      precio: [''],
      activa: [''],
  })
 
    }

    subirFoto(event: any) {
      const file = event.target.files[0];
      if (file) {
        const formData = new FormData();
        formData.append('foto', file);
    
        this.fobiasTimor.subirFoto(formData).subscribe({
          next: (response) => {
            this.regFobia.foto = response.ruta;
            console.log('Imagen subida:', response);
          },
          error: (err) => console.error('Error al subir imagen:', err)
        });
      }
    }
    
 
  asignaCampos(dataSource:any){
    this.regFobia.idFobia=dataSource.fobia.idFobia
    this.regFobia.nombre=dataSource.fobia.nombre
    this.regFobia.foto=dataSource.fobia.foto
    this.regFobia.descripcion=dataSource.fobia.descripcion
    this.regFobia.precio=dataSource.fobia.precio
    this.regFobia.activa=dataSource.fobia.activa
    
    console.log(dataSource.fobia.idFobia)
 }
 
 modificar(){
  this.fobiasTimor.modificarFobia(this.tem[3],this.regFobia).subscribe({
    next:()=>{ this.router.navigate(['/fobias/listafobias']) },
    error:(e)=> console.error(e),
    complete:()=>console.info()})

 
}
}

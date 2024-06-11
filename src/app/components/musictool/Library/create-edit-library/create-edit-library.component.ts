import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Library } from '../../../../model/Library';
import { LibraryService } from '../../../../services/library.service';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-create-edit-library',
  standalone: true,
  imports: [ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    CommonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatButtonModule,MatIconModule],
  templateUrl: './create-edit-library.component.html',
  styleUrl: './create-edit-library.component.css'
})
export class CreateEditLibraryComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  library : Library = new Library();

  edicion: boolean = false;
  id: number = 0;

  disponible: { value: boolean; viewValue: string }[] = [
    { value: true, viewValue: 'Publica' },
    { value: false, viewValue: 'Privada' },
  ];

  constructor(private formBuilder: FormBuilder,
    private libraryService: LibraryService,
    private router:Router,
    private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      if( this.edicion = data['id'] != null){
        this.init();
      }
    });
    this.form = this.formBuilder.group({
      codigo:[''],  
      disponible: ['', Validators.required],
      nombre: ['',Validators.required],
      descripcion: ['', Validators.required],
    });
  }
  registrar(): void {
    if (this.form.valid) {
      this.library.id=this.form.value.codigo
      this.library.libraryAvailable=this.form.value.disponible
      this.library.libraryName=this.form.value.nombre
      this.library.libraryDescription=this.form.value.descripcion
      this.library.usersId=undefined;
  
      this.libraryService.insert(this.library).subscribe((data)=>{
        this.libraryService.list().subscribe((data)=>{
          this.libraryService.setList(data)
        })
      })
      this.router.navigate(['library'])
    }
  }

  init() {
    if (this.edicion) {
      this.libraryService.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          codigo: new FormControl(data.id),
          disponible: new FormControl(data.libraryAvailable),
          nombre: new FormControl(data.libraryName),
          descripcion: new FormControl(data.libraryDescription)
        });
      });
    }
  }

}

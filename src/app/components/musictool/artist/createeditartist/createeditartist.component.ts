import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule, NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { Artist } from '../../../../model/Artist';
import { ArtistService } from '../../../../services/artist.service';

@Component({
  selector: 'app-createeditartist',
  standalone: true,
  imports: [
    MatIconModule,
    MatFormFieldModule,
    NgIf,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    CommonModule,
    RouterLink,
  ],
  templateUrl: './createeditartist.component.html',
  styleUrl: './createeditartist.component.css'
})
export class CreateeditartistComponent implements OnInit{
  form: FormGroup = new FormGroup({});
  artista: Artist = new Artist();
  edicion: boolean = false;
  id: number = 0;

  constructor(
    private aS:ArtistService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ){}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });
    this.form = this.formBuilder.group({
      codigo: [''],
      nombre: ['', Validators.required],
      desc: ['', Validators.required],
      correo: [
        '',
        [
          Validators.required,
          Validators.pattern(
            '^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,6}$'
          ),
          Validators.min(13),
          Validators.max(80),
        ],
      ],
    });
  }

  registrar(): void {
    if (this.form.valid) {
      console.log(this.form.value);
          this.artista.idArtist = this.form.value.codigo;
          this.artista.nameArtist = this.form.value.nombre;
          if (this.form.value.desc === '') {
            this.artista.descriptionArtist = 'Hola, soy ' + `${this.form.value.nombre}`;
          } else {
            this.artista.descriptionArtist = this.form.value.desc;
          }
          this.artista.emailArtist = this.form.value.correo;
          this.aS.insert(this.artista).subscribe((data) => {
            this.aS.list().subscribe((data) => {
              this.aS.setList(data);
            });
          });
          this.router.navigate(['usuarios']);
    }
  }

  init(){
    if (this.edicion) {
      this.aS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          codigo: new FormControl(data.idArtist),
          nombre: new FormControl(data.nameArtist),
          desc: new FormControl(data.descriptionArtist),
          correo: new FormControl(data.emailArtist)
        });
      });
    }
  }
}

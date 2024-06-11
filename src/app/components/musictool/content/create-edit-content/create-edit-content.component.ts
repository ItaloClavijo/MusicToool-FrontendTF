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
import { MatIconModule } from '@angular/material/icon';
import { MediaService } from '../../../../services/media.service';
import { Content } from '../../../../model/Content';
import { ContentService } from '../../../../services/content.service';
import { ApiImgPipe } from '../../../../../shared/api-img.pipe';
import {MatTooltipModule} from '@angular/material/tooltip';



@Component({
  selector: 'app-create-edit-content',
  standalone: true,
  imports: [ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    CommonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    ApiImgPipe,
    MatTooltipModule],
  templateUrl: './create-edit-content.component.html',
  styleUrl: './create-edit-content.component.css'
})
export class CreateEditContentComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  content: Content = new Content();
  
  edicion: boolean = false;
  id: number = 0;

  free: { value: boolean; viewValue: string }[] = [
    { value: true, viewValue: 'Si' },
    { value: false, viewValue: 'No' },
  ];

  Tipos: { value: string; viewValue: string }[] = [
    { value: "Trompeta", viewValue: 'Trompeta' },
    { value: "Piano", viewValue: 'Piano' },
    { value: "Guittarra", viewValue: 'Guittarra' },
    { value: "Bajo", viewValue: 'Bajo' },
  ];

  constructor(private mediaService: MediaService,
    private formBuilder: FormBuilder,
    private router:Router,
    private route: ActivatedRoute,
    private contentService: ContentService
  ){
  }
  

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      if( this.edicion = data['id'] != null){
        this.init();
      }
    });
    this.form = this.formBuilder.group({
      codigo:[''],  
      titulo: ['', Validators.required],
      descripcion: ['',Validators.required],
      precio: [{ value: '', disabled: false },Validators.required],
      free: ['', Validators.required],
      tipo: ['', Validators.required],
      file: ['', Validators.required],
      cover: ['', Validators.required],
      libreria: [''],
      artist:['']
    });

    this.form.get('free')!.valueChanges.subscribe((isFree: boolean) => {
      const precioControl = this.form.get('precio');
      if (isFree) {
        precioControl!.setValue(0);
        precioControl!.disable();
      } else {
        precioControl!.enable();
      }
    });


  }

  registrar(): void {
    console.log(this.form.value)
    if (this.form.valid) {
      this.content.idContent=this.form.value.codigo
      this.content.descriptionContent=this.form.value.descripcion
      this.content.titleContent=this.form.value.titulo
      this.content.freeContent=this.form.value.free
      if(this.form.value.free){
        this.content.priceContent=0
      }else{
        this.content.priceContent=this.form.value.precio
      }
      this.content.typeContent=this.form.value.tipo
      this.content.fileContent=this.form.value.file
      this.content.coverContent=this.form.value.cover
      this.content.library=undefined
      this.content.artist=undefined
  
      this.contentService.insert(this.content).subscribe((data)=>{
        this.contentService.list().subscribe((data)=>{
          this.contentService.setList(data)
        })
      })
      this.router.navigate(['content'])
    }

  }

  uploadFile(event: any, control: string) {
    const file = event.target.files[0];
  
    if (file) {
      const formData = new FormData();
      formData.append('file', file)
  
      this.mediaService.upload(formData).subscribe(response => {
        console.log('res', response)
        this.form!.get(control)!.setValue(response.path);
      }
      )
    }
  
  }

  

  init() {
    if (this.edicion) {
      this.contentService.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          codigo: new FormControl(data.idContent), 
          titulo: new FormControl(data.titleContent),
          descripcion: new FormControl(data.descriptionContent),
          precio: new FormControl(data.priceContent),
          free: new FormControl(data.freeContent),
          tipo: new FormControl(data.typeContent),
          file: new FormControl(data.fileContent),
          cover: new FormControl(data.coverContent),
          libreria: new FormControl(data.library),
          artist: new FormControl(data.artist),
        });
      });
    }
  }

}



import { Component, OnInit, ViewChild } from '@angular/core';
import { Library } from '../../../../model/Library';
import { LibraryService } from '../../../../services/library.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import {  MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

import {
  MatDialog,
  MatDialogRef,
  MatDialogActions,
  MatDialogClose,
  MatDialogTitle,
  MatDialogContent,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-list-library',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule,MatIconModule,RouterLink],
  templateUrl: './list-library.component.html',
  styleUrl: './list-library.component.css'
})
export class ListLibraryComponent implements OnInit {
  displayedColumns: string[] = [
    'codigo',
    'disponibilidad',
    'nombre',
    'descripcion',
    'accion01',
    'accion02'
  ];
  dataSource: MatTableDataSource<Library> = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private libraryService: LibraryService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.libraryService.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
    this.libraryService.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    })
  }
  eliminar(id: number){

    const dialogRef = this.dialog.open(DialogAnimationsExampleDialog, {
      width: '250px',
      data: { id },
      enterAnimationDuration: '1500ms',
      exitAnimationDuration: '750ms'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Lógica para eliminar el elemento
        this.libraryService.delete(id).subscribe((data)=>{
          this.libraryService.list().subscribe((data)=>{
            this.libraryService.setList(data)
          })
        })
        console.log(`Elemento con ID ${id} eliminado`);
      }
    });
  }

}

@Component({
  selector: 'dialog-animations-example-dialog',
  template: `
  <h1 mat-dialog-title>Confirmar</h1>
  <div mat-dialog-content>
    <p>¿Está seguro de que desea eliminar esta Libreria ??</p>
  </div>
  <div mat-dialog-actions>
    <button mat-button (click)="onCancel()">Cancelar</button>
    <button mat-button (click)="onConfirm()" color="warn">Eliminar</button>
  </div>
`,
  standalone: true,
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent],
})
export class DialogAnimationsExampleDialog {
  constructor(public dialogRef: MatDialogRef<DialogAnimationsExampleDialog>) {
  }
  onCancel(): void {
    this.dialogRef.close(false);
  }

  onConfirm(): void {
    this.dialogRef.close(true);
  }

}


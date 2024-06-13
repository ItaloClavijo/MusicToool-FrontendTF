import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RouterLink } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Users } from '../../../../model/User';
import { UserService } from '../../../../services/user.service';

@Component({
  selector: 'app-listuser',
  standalone: true,
  imports: [
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    RouterLink,
    MatInputModule,
    MatButton
  ],
  templateUrl: './listuser.component.html',
  styleUrl: './listuser.component.css'
})
export class ListuserComponent {
  dataSource: MatTableDataSource<Users> = new MatTableDataSource();
  
  displayedColumns: string[] = [
    'codigo',
    'usuario',
    'activo',
    'correo',
    'desc',
    'accion01',
    'accion02'
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private us:UserService) {}

  ngOnInit(): void {
    this.us.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
    this.us.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
  }

  eliminar(id: number) {
    this.us.eliminar(id).subscribe((data) => {
      this.us.list().subscribe((data) => {
        this.us.setList(data);
      });
    });
  } 
}

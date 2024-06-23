import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { Roles } from '../../../../model/Role';
import { RoleService } from '../../../../services/role.service';

@Component({
  selector: 'app-listrole',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule],
  templateUrl: './listrole.component.html',
  styleUrl: './listrole.component.css'
})
export class ListroleComponent implements OnInit{
  dataSource: MatTableDataSource<Roles> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private rS:RoleService) { }

  ngOnInit(): void {
    this.rS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
    this.rS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
  }
}

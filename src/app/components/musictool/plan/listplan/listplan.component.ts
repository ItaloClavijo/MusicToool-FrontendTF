import { Component, OnInit, ViewChild } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RouterLink } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { Plan } from '../../../../model/Plan';
import { PlanService } from '../../../../services/plan.service';

@Component({
  selector: 'app-listplan',
  standalone: true,
  imports: [MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatFormFieldModule,
    RouterLink,
    MatInputModule,
    MatButton,],
  templateUrl: './listplan.component.html',
  styleUrl: './listplan.component.css'
})
export class ListplanComponent implements OnInit{
  displayedColumns: string[] = [
    'codigo',
    'nombrePlan',
    'precioPlan',
    'descripcionPlan',
    'accion01',
    'accion02',
  ];
  dataSource: MatTableDataSource<Plan> = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private planservice: PlanService) { }
  ngOnInit(): void {
    this.planservice.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
    this.planservice.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
  }
  eliminar(id: number) {
    this.planservice.eliminar(id).subscribe((data) => {
      this.planservice.list().subscribe((data) => {
        this.planservice.setList(data);
      });
    });
  } 
}

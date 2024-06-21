import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Chat } from '../../../../model/Chat';
import { ChatService } from '../../../../services/chat.service';

@Component({
  selector: 'app-listchat',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
  ],
  templateUrl: './listchat.component.html',
  styleUrl: './listchat.component.css'
})
export class ListchatComponent implements OnInit{
  dataSource: MatTableDataSource<Chat> = new MatTableDataSource();
  displayedColumns: string[] = ['codigochat', 'codigochat1', 'codigochat2', 'listamensajes'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private chatservice: ChatService) {}
  ngOnInit(): void {
    this.chatservice.getChats().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
    this.chatservice.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
  }
}

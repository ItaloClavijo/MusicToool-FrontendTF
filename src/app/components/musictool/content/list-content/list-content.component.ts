import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
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
import { Content } from '../../../../model/Content';
import { ContentService } from '../../../../services/content.service';
import { CommonModule } from '@angular/common';
import { ApiImgPipe } from '../../../../../shared/api-img.pipe';
import { Howl } from 'howler';
import { environment } from '../../../../../environments/environment';

interface ContentWithPlayer extends Content {
  isPlaying: boolean;
  duration: number;
  currentTime: number;
  player: Howl | null;
}

@Component({
  selector: 'app-list-content',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatPaginatorModule, MatIconModule, RouterLink, ApiImgPipe],
  templateUrl: './list-content.component.html',
  styleUrls: ['./list-content.component.css']
})
export class ListContentComponent implements OnInit {
  displayedColumns: string[] = [
    'codigo',
    'cover',
    'file',
    'free',
    'precio',
    'tipo',
    'libreria',
    'artista',
    'accion01',
    'accion02'
  ];
  dataSource: MatTableDataSource<ContentWithPlayer> = new MatTableDataSource();
  currentPlaying: ContentWithPlayer | null = null;
  intervalId: any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private contentService: ContentService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.contentService.list().subscribe((data: Content[]) => {
      const extendedData = data.map(item => ({
        ...item,
        isPlaying: false,
        duration: 0,
        currentTime: 0,
        player: null
      })) as ContentWithPlayer[];
      this.dataSource = new MatTableDataSource(extendedData);
      this.dataSource.paginator = this.paginator;
    });

    this.contentService.getList().subscribe((data: Content[]) => {
      const extendedData = data.map(item => ({
        ...item,
        isPlaying: false,
        duration: 0,
        currentTime: 0,
        player: null
      })) as ContentWithPlayer[];
      this.dataSource = new MatTableDataSource(extendedData);
      this.dataSource.paginator = this.paginator;
    });
  }

  togglePlay(element: ContentWithPlayer) {
    if (this.currentPlaying && this.currentPlaying !== element) {
      this.currentPlaying.player?.pause();
      this.currentPlaying.isPlaying = false;
      clearInterval(this.intervalId);
    }

    if (!element.player) {
      element.player = new Howl({
        src: [`${environment.base}/musictool/mediastorage/${element.fileContent}`],
        html5: true,
        onload: () => {
          element.duration = element.player!.duration();
        },
        onplay: () => {
          element.isPlaying = true;
          element.duration = element.player!.duration();
          this.updateProgress(element);
        },
        onend: () => {
          element.isPlaying = false;
          element.currentTime = 0;
          clearInterval(this.intervalId);
        },
        onpause: () => {
          element.isPlaying = false;
          clearInterval(this.intervalId);
        }
      });
    }

    if (element.isPlaying) {
      element.player.pause();
    } else {
      element.player.play();
      this.currentPlaying = element;
    }
  }

  updateProgress(element: ContentWithPlayer) {
    this.intervalId = setInterval(() => {
      element.currentTime = element.player?.seek() as number;
    }, 1000);
  }

  onSeek(event: any, element: ContentWithPlayer) {
    const newTime = event.target.value;
    element.player?.seek(newTime);
  }

  formatTime(seconds: number): string {
    if (isNaN(seconds)) {
      return '0:00';
    }
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  }

  eliminar(id: number) {
    const dialogRef = this.dialog.open(DialogAnimationsExampleDialog, {
      width: '250px',
      data: { id },
      enterAnimationDuration: '1500ms',
      exitAnimationDuration: '750ms'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.contentService.delete(id).subscribe(() => {
          this.contentService.list().subscribe((data: Content[]) => {
            const extendedData = data.map(item => ({
              ...item,
              isPlaying: false,
              duration: 0,
              currentTime: 0,
              player: null
            })) as ContentWithPlayer[];
            this.dataSource.data = extendedData;
          });
        });
        console.log(`Elemento con ID ${id} eliminado`);
      }
    });
  }
}

@Component({
  selector: 'dialog-animations-example-dialog-2',
  template: `
  <h1 mat-dialog-title>Confirmar</h1>
  <div mat-dialog-content>
    <p>¿Está seguro de que desea eliminar este elemento?</p>
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
  constructor(public dialogRef: MatDialogRef<DialogAnimationsExampleDialog>) { }
  
  onCancel(): void {
    this.dialogRef.close(false);
  }

  onConfirm(): void {
    this.dialogRef.close(true);
  }
}

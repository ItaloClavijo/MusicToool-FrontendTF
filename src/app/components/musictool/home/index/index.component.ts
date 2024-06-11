import { Component, OnInit } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { ShowContentService } from '../../../../services/show-content.service';
import { Content } from '../../../../model/Content';
import {MatCardModule} from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ApiImgPipe } from '../../../../../shared/api-img.pipe';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [RouterOutlet,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    ApiImgPipe,
    RouterModule,
    CommonModule],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css'
})
export class IndexComponent implements OnInit {

  constructor(private showContent: ShowContentService){
  }
  contents?: Content[];

  ngOnInit(): void {
    this.showContent.getLastContents().subscribe((contents)=>{
      this.contents=contents;
    })
  }

}

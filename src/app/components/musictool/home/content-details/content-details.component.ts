import { Component, OnInit } from '@angular/core';
import { ShowContentService } from '../../../../services/show-content.service';
import { Content } from '../../../../model/Content';
import { ActivatedRoute } from '@angular/router';
import { ApiImgPipe } from '../../../../../shared/api-img.pipe';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CartService } from '../../../../services/cart.service';

@Component({
  selector: 'app-content-details',
  standalone: true,
  imports: [ApiImgPipe,CommonModule,MatIconModule,MatButtonModule],
  templateUrl: './content-details.component.html',
  styleUrl: './content-details.component.css'
})
export class ContentDetailsComponent implements OnInit{
  content?: Content;
  constructor(private showContent: ShowContentService,
    private route: ActivatedRoute,
    private cartService: CartService){}

  ngOnInit(): void {
    const idString = this.route.snapshot.paramMap.get('id');
    if (idString !== null) {
      const id = parseInt(idString, 10); // Convierte el id a número
      this.showContent.listId(id).subscribe((content)=>{
        this.content = content;
      })
    } else {
      console.error('ID is null');
      console.log('ID is null');
    }

  }

  addContentToCart( content: Content) {
    this.cartService.addContent(content);
  }

  removeContentFromCart(content: Content) {
    this.cartService.removeContent(content);
  }

  contentIsInCart(content: Content) {
    return this.cartService.contentAlreadyExists(content);
  }

}

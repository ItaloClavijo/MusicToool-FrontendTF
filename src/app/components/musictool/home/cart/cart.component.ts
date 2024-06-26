import { Component, OnInit, inject } from '@angular/core';
import { CartService } from '../../../../services/cart.service';
import { ApiImgPipe } from '../../../../../shared/api-img.pipe';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { PurchaseService } from '../../../../services/purchase.service';
import { CheckoutService } from '../../../../services/checkout.service';
import { Content } from '../../../../model/Content';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [ApiImgPipe, CommonModule, MatButtonModule, RouterModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit{
constructor(
  private purchaseService: PurchaseService,
  private checkoutService :CheckoutService,
  private cartService :CartService,
  private route :ActivatedRoute,
  private router: Router,
){}
loading = false;
ngOnInit(): void {
  const token = this.route.snapshot.queryParamMap.get('token');
    const payerId = this.route.snapshot.queryParamMap.get('PayerID');

    if (token && payerId) {
      this.loading = true;

      this.checkoutService.capturePaypalOrder(token)
        .subscribe(response => {
          if (response.completed) {
            this.cartService.clear();
            this.router.navigate(['/purchases', response.purchaseId]);
          }
        })
    }
}
get contentsInCart() {
  return this.cartService.contents();
}

get total() {
  return this.cartService.total();
}

removeContentFromCart(content: Content) {
  this.cartService.removeContent(content);
}

pay() {
  const contentIds = this.cartService.contents().map(item => item.idContent);

  this.loading = true;

  this.purchaseService.create(contentIds)
    .subscribe(purchase => {
      this.checkoutService.createPaypalOrder(purchase.id)
        .subscribe(response => {
          window.location.href = response.paypalUrl;
        })
    })
}
}

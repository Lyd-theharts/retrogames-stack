import {Component, inject} from '@angular/core';
import {CartService} from '../../services/cart-service';

@Component({
  selector: 'app-cart',
  imports: [],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class Cart {
  private readonly cartService: CartService = inject(CartService);
  cartItems = this.cartService.cartItems;
  cartTotal = this.cartService.cartTotal;

  removeItem(id: number){
    this.cartService.removeFromCart(id);
  }
  updateItemQuantity(id: number, event: any){
    const newQuantity = parseInt(event.target.value,10);
    this.cartService.updateQuantity(id, newQuantity);
  }
  goToPay(){
    this.cartService.clearCart();
  }

  ngOnInit() {
    console.log(this.cartItems())
  }

}

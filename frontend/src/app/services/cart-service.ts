import {computed, Injectable, signal, WritableSignal} from '@angular/core';
import {CartItem} from '../common/interface';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItemsSignal: WritableSignal<CartItem[]> = signal<CartItem[]>([]);
  readonly cartItems = this.cartItemsSignal.asReadonly();
  readonly cartTotal = computed(() => {
    return this.cartItems().reduce(
      (sum: number, item: CartItem) => sum + item.precio * item.quantity, 0

    )
  });
  readonly totalItemsCount = computed(() => {
    return this.cartItems().reduce(
      (sum:number, item: CartItem) => sum + item.quantity, 0
    )
  });
  addToCart(product: Omit<CartItem, 'quantity'>): void {
    this.cartItemsSignal.update(items => {
      const existingItem = items.find(i => i.id === product.id);
      if (existingItem){
        return items.map(i => i.id === product.id ? {...i, quantity: i.quantity + 1} : i)
      }else{
        return [...items, {...product, quantity: 1}];
      }
    })

  }
  removeFromCart(itemId: number): void{
    this.cartItemsSignal.update(items =>
      items.filter(item => item.id !== itemId))  ;
  }

  updateQuantity(itemId: number, newQuantity: number): void{
    if (newQuantity <=0){
      this.removeFromCart(itemId);
      return;
    }
    this.cartItemsSignal.update(items => {
      return items.map(item => item.id === itemId ? {...item, quantity: newQuantity} : item);
    });
  }
  clearCart(): void {
    this.cartItemsSignal.set([]);
  }
}

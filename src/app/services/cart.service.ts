import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ToastComponent } from '../shared/components/toast/toast.component';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  // private urlBackend: string = environment.apiUrl + '/theme';
  // private http = inject(HttpClient);

  private CART_KEY = 'cart_items';
  private cartSubject = new BehaviorSubject<any[]>(this.getCart());
  cart$ = this.cartSubject.asObservable();

  private subtotalSubject = new BehaviorSubject<number>(this.calculateSubtotal(this.cartSubject.value));
  subtotal$ = this.subtotalSubject.asObservable();

  private totalItemsSubject = new BehaviorSubject<number>(this.calculateTotalItems(this.cartSubject.value));
  totalItems$ = this.totalItemsSubject.asObservable();

  constructor(
    private toastComponent: ToastComponent,
    private http: HttpClient 
  ) { }

  private updateCart(cart: any[]): void {
    localStorage.setItem(this.CART_KEY, JSON.stringify(cart));
    this.cartSubject.next(cart);
    this.subtotalSubject.next(this.calculateSubtotal(cart));
    this.totalItemsSubject.next(this.calculateTotalItems(cart));
  }

  private calculateSubtotal(cart: any[]): number {
    return cart.reduce((acc, item) => {
      const precioFinal = parseFloat(item.discount) > 0
        ? parseFloat(item.discount)
        : parseFloat(item.price);
      return acc + (precioFinal * item.quantity);
    }, 0);
  }

  // Nueva función para calcular la suma total de cantidades
  private calculateTotalItems(cart: any[]): number {
    return cart.reduce((acc, item) => acc + (item.quantity || 0), 0);
  }

  getCart(): any[] {
    const cart = localStorage.getItem(this.CART_KEY);
    return cart ? JSON.parse(cart) : [];
  }

  addToCart(item: any): void {
    const cart = this.getCart();

    const existingItem = cart.find(prod => prod.id === item.id);

    if (existingItem) {
      existingItem.quantity += item.quantity || 1;
    } else {
      item.quantity = item.quantity || 1;
      cart.push(item);
    }
    this.toastComponent.showToast(
      `Se agregó al carrito ${item.name}`,
      'bottom',
      'success',
      5000,
      true
    );
    this.updateCart(cart);

  }

  removeFromCart(itemId: string | number): void {
    const cart = this.getCart();
    const itemToRemove = cart.find(item => item.id === itemId);
    const updatedCart = cart.filter(item => item.id !== itemId);

    this.toastComponent.showToast(
      `Se eliminó el producto ${itemToRemove?.name || ''}`,
      'bottom',
      'danger',
      5000,
      true
    );
    this.updateCart(updatedCart);

  }

  clearCart(): void {
    localStorage.removeItem(this.CART_KEY);
    this.cartSubject.next([]);
    this.subtotalSubject.next(0);
    this.totalItemsSubject.next(0);
  }

  updateItemQuantity(itemId: string | number, quantity: number): void {
    const cart = this.getCart().map(item => {
      if (item.id === itemId) {
        item.quantity = quantity;
      }
      return item;
    });

    this.updateCart(cart);
  }

  checkStockAvailability(): Observable<any> {
  const cart = this.getCart();

  const productsPayload = cart.map(item => ({
    id: item.id,
    quantity: item.quantity
  }));

  return this.http.post<any[]>(`${environment.apiUrl}/products/stock-check`, {
    products: productsPayload
  });
}

}

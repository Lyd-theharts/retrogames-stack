import {Component, inject, OnInit, signal} from '@angular/core';
import {Games, Toast} from '../../common/interface';
import {DataService} from '../../services/data-service';
import {CartService} from '../../services/cart-service';
import {Router, RouterLink} from '@angular/router';
import {NgbToast} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-games-list',
  imports: [
    RouterLink,
    NgbToast
  ],
  templateUrl: './games-list.html',
  styleUrl: './games-list.css',
})
export class GamesList implements OnInit {
  private readonly dataService: DataService = inject(DataService);
  private readonly cartService: CartService = inject(CartService);
  private readonly router: Router = inject(Router);
  games = signal<Games[]>([]);
  show = false;

  toast: Toast = {
    text: '',
    className: ''
  };

  ngOnInit() {
    this.loadGames();
    this.loadSearch();
  }

  private loadGames() {
    this.dataService.getGames().subscribe(
      {
        next: data => {
          this.toast.className = 'bg-success text-light';
          this.show = true;
          this.toast.text= 'Videojuegos cargados'
          this.games.set(data);
          console.log(this.games());
        },
        error: error => {
          console.error(error);
        }
      }
    )
  }





  delete(game: Games): void {
    if (confirm('Desea borrar el juego: ' + game.titulo + '?' )) {
      if (game){
        this.dataService.deleteGame(game.id).subscribe(
          {
            next: data => {
             // alert(game.titulo + ' Eliminado!');
              this.loadGames();
              this.show = false; // Reset previo
              setTimeout(() => {
                this.toast.className = 'bg-danger text-light';
                this.toast.text = `${game.titulo} eliminado correctamente`;
                this.show = true;
                }, 50);

            },
            error: error => {
              console.error(error);
            }
          }
        )
      }
    }
  }

  addToCart(game: Games) {
    this.cartService.addToCart(game);
    // Forzamos el reinicio si ya estaba visible
    this.show = false;

    setTimeout(() => {
      this.toast.className = 'bg-warning text-dark'; // 'text-dark' suele verse mejor en amarillo
      this.toast.text = `${game.titulo} añadido al carrito`;
      this.show = true;
    }, 10); // Un pequeño delay para que el DOM reaccione
   // alert(game.titulo + ' añadido al carrito!')
    //this.router.navigateByUrl('/cart');
  }
  buscar(event: any){
    const text: string = event.target.value as string;
    if (text === '') {this.loadGames();
    }
    else this.dataService.search(text);
  }

  loadSearch(){
    this.dataService.start().subscribe(
      {
        next: dataAPI => {
          this.games.set(dataAPI);
          this.show = false;
          setTimeout(() => {
            this.toast.className = 'bg-primary text-light';
            this.toast.text = 'Resultados actualizados';
            this.show = true;
          }, 50);

        },
        error: error => {
          console.error(error);
        }
      }
    )
  }
}

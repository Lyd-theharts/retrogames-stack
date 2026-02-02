import { Routes } from '@angular/router';
import {GamesList} from './components/games-list/games-list';
import {GamesDetail} from './components/games-detail/games-detail';
import {Cart} from './components/cart/cart';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'games-list',
    pathMatch: 'full',
  },
  {
    path: 'games-list',
    component: GamesList ,
  },
  {
    path: 'games-detail/:id',
    component: GamesDetail,
  },
  {
    path: 'games/add',
    component: GamesDetail,
  },
  {
    path: 'cart',
    component: Cart,
  }
];

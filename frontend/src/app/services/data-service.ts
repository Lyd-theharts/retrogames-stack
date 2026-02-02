import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, catchError, map, Observable, of, switchAll, switchMap} from 'rxjs';
import {ApiResponse, Games} from '../common/interface';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private readonly http: HttpClient = inject(HttpClient);
  private readonly urlBase = 'http://localhost:9090/api/juegos'
  private text: BehaviorSubject<string> = new BehaviorSubject<string>('');
  private gamesSearched$: Observable<Games[]> = this.text.pipe(
    switchMap(textSearched => {
      if (textSearched === ''){return of([])}
      return this.http.get<Games[]>(this.urlBase + '/buscar/' + textSearched).pipe(
        catchError(error => of([]))
      )
    })
  );

  search(data: string){
    this.text.next(data);
  }
  start(): Observable<Games[]>{
    return this.gamesSearched$;
  }


  getGames(): Observable<Games[]>{
    return this.http.get<Games[]>(this.urlBase);
  }
  getOneGame(id: number): Observable<Games>{
    return this.http.get<Games>(this.urlBase + '/' + id);
  }
  postGame(game: Games): Observable<any>{
    return this.http.post<any>(this.urlBase, game)
  }
  putGame(game: Games): Observable<any>{
    return this.http.put<any>(this.urlBase + '/' + game.id, game)
  }
  deleteGame(id: number): Observable<any>{
    return this.http.delete<any>(this.urlBase + '/' + id);
  }

}

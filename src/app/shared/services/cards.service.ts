import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CardsService {

  private http = inject(HttpClient);
  private header = new HttpHeaders({'x-api-key': environment.api.pokemontcg.apiKey});

  listCards(pageSize: number){
    return this.http.get(`${environment.api.pokemontcg.uri}/cards?pageSize=${pageSize}`, {headers: this.header});
  }

  listNewCards(pageSize: number){
    return this.http.get(`${environment.api.pokemontcg.uri}/cards?pageSize=${pageSize}&orderBy=-set.releaseDate&q=supertype:pokemon`, {headers: this.header});
  }

  listExpensiveCards(pageSize: number){
    return this.http.get(`${environment.api.pokemontcg.uri}/cards?pageSize=${pageSize}&orderBy=-cardmarket.prices.averageSellPrice&q=supertype:pokemon`, {headers: this.header});
  }
  
}

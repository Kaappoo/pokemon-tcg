import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { environment } from '../environments/environment';
import { Card, CardRequest, CardResponse } from '../interfaces/card';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CardsService {

  private http = inject(HttpClient);
  private header = new HttpHeaders({'x-api-key': environment.api.pokemontcg.apiKey});

  listCards(request: CardRequest): Observable<CardResponse>{
    const {first , rows} = request;

    const page = (first/rows) + 1;
    const pageDetails = `pageSize=${rows}&page=${page}`;

    return this.http.get<CardResponse>(`${environment.api.pokemontcg.uri}/cards?${pageDetails}`, {headers: this.header});
  }

  listNewCards(pageSize: number): Observable<CardResponse>{
    return this.http.get<CardResponse>(`${environment.api.pokemontcg.uri}/cards?pageSize=${pageSize}&orderBy=-set.releaseDate&q=supertype:pokemon`, {headers: this.header});
  }

  listExpensiveCards(pageSize: number): Observable<CardResponse>{
    return this.http.get<CardResponse>(`${environment.api.pokemontcg.uri}/cards?pageSize=${pageSize}&orderBy=-cardmarket.prices.averageSellPrice&q=supertype:pokemon`, {headers: this.header});
  }
  
}

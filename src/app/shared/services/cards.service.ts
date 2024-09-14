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
    const {first , rows, set, type, subtype} = request;
    const page = (first/rows) + 1;
    var pageDetails =  `pageSize=${rows}&page=${page}`;

    if(set != '' || type != '' || subtype != '') pageDetails = this.formatRequest(pageDetails, set, type, subtype);

    return this.http.get<CardResponse>(`${environment.api.pokemontcg.uri}/cards?${pageDetails}`, {headers: this.header});
  }

  listNewCards(pageSize: number): Observable<CardResponse>{
    return this.http.get<CardResponse>(`${environment.api.pokemontcg.uri}/cards?pageSize=${pageSize}&orderBy=-set.releaseDate&q=supertype:pokemon`, {headers: this.header});
  }

  listExpensiveCards(pageSize: number): Observable<CardResponse>{
    return this.http.get<CardResponse>(`${environment.api.pokemontcg.uri}/cards?pageSize=${pageSize}&orderBy=-cardmarket.prices.averageSellPrice&q=supertype:pokemon`, {headers: this.header});
  }

  private formatRequest(pageDetails: any, set: any, type: any, subtype: any){
    pageDetails += `&q=`;
    if (set != '') pageDetails =  this.concatParameter(pageDetails, 'set.id', set);
    if (type != '') pageDetails =  this.concatParameter(pageDetails, 'types', type);
    if (subtype != '') pageDetails =  this.concatParameter(pageDetails, 'subtypes', subtype);

    return pageDetails;
  }

  private concatParameter(pageDetails: string, paramName: any, param: any){    
    if(pageDetails.charAt(pageDetails.length  - 1) == '='){
      pageDetails += `${paramName}:"${param}"`
    } else {
      pageDetails += ` AND ${paramName}:"${param}"`
    }

    return pageDetails;
  } 
  
}

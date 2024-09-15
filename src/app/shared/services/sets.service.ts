import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { SetResponse } from '../interfaces/set';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SetsService {

  private http = inject(HttpClient);
  private header = new HttpHeaders({'x-api-key': environment.api.pokemontcg.apiKey});

  getSets(): Observable<SetResponse>{
    return this.http.get<SetResponse>(`${environment.api.pokemontcg.uri}/sets?orderBy=-releaseDate`, {headers: this.header});
  }
}

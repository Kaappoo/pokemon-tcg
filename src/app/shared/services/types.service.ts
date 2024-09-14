import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';
import { TypeResponse } from '../interfaces/type';

@Injectable({
  providedIn: 'root'
})
export class TypesService {

  private http = inject(HttpClient);
  private header = new HttpHeaders({'x-api-key': environment.api.pokemontcg.apiKey});

  getTypes(): Observable<TypeResponse>{
    return this.http.get<TypeResponse>(`${environment.api.pokemontcg.uri}/types`, {headers: this.header});
  }

  getSubtypes(): Observable<TypeResponse>{
    return this.http.get<TypeResponse>(`${environment.api.pokemontcg.uri}/subtypes`, {headers: this.header});
  }
}

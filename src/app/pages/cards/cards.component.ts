import { Component, inject, ViewChild } from '@angular/core';
import { PaginatorModule } from 'primeng/paginator';
import { CardsService } from '../../shared/services/cards.service';
import { Card, CardRequest, CardResponse } from '../../shared/interfaces/card';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { SetsService } from '../../shared/services/sets.service';
import { TypesService } from '../../shared/services/types.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';

interface AutoCompleteEvent {
  originalEvent: Event;
  query: string;
}

@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [PaginatorModule, AutoCompleteModule, MatIconModule, FormsModule],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.scss',
})
export class CardsComponent {
  private cardsService = inject(CardsService);
  private setsService = inject(SetsService);
  private typesService = inject(TypesService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  cards: Card[] = [];
  totalCardsCount = 120;

  routeParam!: 'set'| 'search' | '';
  routeParamId: any;

  sets: any[] = [];
  filteredSets: any[] = [];
  selectedSet = '';
  
  types: any[] = [];
  filteredTypes: any[] = [];
  selectedType = '';
  
  subtypes: any[] = [];
  filteredSubtypes: any[] = [];
  selectedSubtype = '';

  isLoading: boolean = false;
  request: CardRequest = {
    first: 0,
    rows: 20,
    set: '',
    type: '',
    subtype: '',
    search: '',
  };

  searchString = '';

  ngOnInit() {
    if(this.route.snapshot.paramMap.get('search')){
      this.routeParam = this.route.snapshot.paramMap.get('search') as 'set'| 'search';
      this.routeParamId = this.route.snapshot.paramMap.get('id');
      this.router.navigate(['cards']);
    }
    this.getSetsList();
    this.getTypesList();
    this.getSubtypesList();
    this.getCardsList();
  }

  getCardsList() {
    if(this.routeParam) this.request[this.routeParam as 'set'| 'search'] = this.routeParamId;
    this.isLoading = true;
    this.cardsService.listCards(this.request).subscribe((res: CardResponse) => {
      this.cards = res.data;
      this.totalCardsCount = res.totalCount;
      this.isLoading = false;
    });
  }

  getSetsList() {
    this.setsService.getSets().subscribe((res: any) => {
      this.sets = res.data;
      if(this.routeParam == 'set') this.selectedSet = this.sets.find((item: any) => item.id == this.routeParamId);
      this.routeParam = '';
      this.routeParamId = '';
    });
  }

  getTypesList() {
    this.typesService.getTypes().subscribe((res: any) => {
      this.types = res.data;
    });
  }

  getSubtypesList(){
    this.typesService.getSubtypes().subscribe((res: any) => {
      this.subtypes = res.data;
    });
  }

  onPageChange(event: any) {
    this.request.first = event.first;
    this.request.rows = event.rows;

    this.getCardsList();
  }

  filterType(event: AutoCompleteEvent) {
    let filtered: any[] = [];
    let query = event.query;

    for (let i = 0; i < (this.types as any[]).length; i++) {
      let type = (this.types as any[])[i];
      if (type.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(type);
      }
    }

    this.filteredTypes = ['', ...filtered];
  }

  onSelectType(event: any){
    this.request.type = event.value;
    this.getCardsList();
  }

  filterSet(event: AutoCompleteEvent) {
    let filtered: any[] = [];
    let query = event.query;

    for (let i = 0; i < (this.sets as any[]).length; i++) {
      let set = (this.sets as any[])[i];
      if (set.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(set);
      }
    }

    this.filteredSets = ['', ...filtered];
  }

  onSelectSet(event: any){
    this.request.set = event.value.id;
    this.getCardsList();
  }

  filterSubtype(event: AutoCompleteEvent) {
    let filtered: any[] = [];
    let query = event.query;

    for (let i = 0; i < (this.subtypes as any[]).length; i++) {
      let subtype = (this.subtypes as any[])[i];
      if (subtype.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(subtype);
      }
    }

    this.filteredSubtypes = ['', ...filtered];
  }

  onSelectSubtype(event: any){
    this.request.subtype = event.value;
    this.getCardsList();
  }

  viewCard(cardId: any){
    this.router.navigate(['view-card', {id: cardId}])
  }

  onChangeInput(){
    if(this.searchString.length > 2){
      this.request.search = this.searchString;
      return this.getCardsList();
    }
    if(this.searchString.length < 2 && this.request.search != ''){
      this.request.search = ''
      this.getCardsList();
    } 
  }
}

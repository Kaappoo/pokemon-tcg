import { Component, inject, ViewChild } from '@angular/core';
import { PaginatorModule } from 'primeng/paginator';
import { CardsService } from '../../shared/services/cards.service';
import { Card, CardResponse } from '../../shared/interfaces/card';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { SetsService } from '../../shared/services/sets.service';

interface AutoCompleteEvent {
  originalEvent: Event;
  query: string;
}

@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [PaginatorModule, AutoCompleteModule],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.scss',
})
export class CardsComponent {
  private cardsService = inject(CardsService);
  private setsService = inject(SetsService);
  cards: Card[] = [];
  sets: any[] = [];
  filteredSets: any[] = [];
  selectedSet = '';
  isLoading: boolean = false;
  request = {
    first: 0,
    rows: 20
  }

  ngOnInit(){
    this.getCardsList();
    this.getSetsList();
  }


  getCardsList(){
    this.isLoading = true;
    this.cardsService.listCards(this.request).subscribe((res: CardResponse) => {
      
      this.cards = res.data;
      this.isLoading = false;
    })
  }

  getSetsList(){
    this.setsService.getSets().subscribe((res: any) => {
      console.log(res);
      this.sets = res.data;
      
    })
  }

  onPageChange(event: any) {
    this.request.first = event.first;
    this.request.rows = event.rows;
    
    this.getCardsList();
  }

  filterSet(event: AutoCompleteEvent){
    console.log(event);

    let filtered: any[] = [];
        let query = event.query;

        for (let i = 0; i < (this.sets as any[]).length; i++) {
            let set = (this.sets as any[])[i];
            if (set.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                filtered.push(set);
            }
        }

        this.filteredSets = filtered;

  }
}

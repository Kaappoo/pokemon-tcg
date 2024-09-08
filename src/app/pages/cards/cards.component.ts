import { Component, inject } from '@angular/core';
import { PaginatorModule } from 'primeng/paginator';
import { CardsService } from '../../shared/services/cards.service';
import { Card, CardResponse } from '../../shared/interfaces/card';

interface PageEvent {
  first: number;
  rows: number;
  page: number;
  pageCount: number;
}

@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [PaginatorModule],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.scss',
})
export class CardsComponent {
  private cardsService = inject(CardsService);
  cards: Card[] = [];
  isLoading: boolean = false;
  request = {
    first: 0,
    rows: 10
  }

  ngOnInit(){
    this.getCardsList();
  }

  getCardsList(){
    this.isLoading = true;
    this.cardsService.listCards(this.request).subscribe((res: CardResponse) => {
      console.log(res);
      
      this.cards = res.data;
      this.isLoading = false;
    })
  }

  onPageChange(event: any) {
    this.request.first = event.first;
    this.request.rows = event.rows;
    console.log(this.request);
    
    this.getCardsList();
  }
}

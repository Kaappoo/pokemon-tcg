import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CardsService } from '../../shared/services/cards.service';
import { SingularCardResponse } from '../../shared/interfaces/card';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-view-card',
  standalone: true,
  imports: [TableModule],
  templateUrl: './view-card.component.html',
  styleUrl: './view-card.component.scss'
})
export class ViewCardComponent {
  private route = inject(ActivatedRoute);
  private cardService = inject(CardsService);

  cardId: any;
  card: any;
  isLoading = false;

  pricesTCG: any[] = [];
  pricesKeysTCG: any[] = [];
  pricesCM: any[] = [];
  pricesKeysCM: any[] = [];

  ngOnInit(){
    this.cardId = this.route.snapshot.paramMap.get('id');
    this.getCard();
  }

  getCard(){
    this.isLoading = true;
    this.cardService.getCard(this.cardId).subscribe((res: SingularCardResponse) => {
      this.card = res.data;
      this.isLoading = false;
      console.log(this.card);
      this.getPrices();
    })
  }

  getPrices(){
    this.pricesKeysTCG = Object.getOwnPropertyNames(this.card.tcgplayer.prices);
    this.pricesTCG = Object.values(this.card.tcgplayer.prices);
    
    this.pricesKeysCM = Object.getOwnPropertyNames(this.card.cardmarket.prices);
    this.pricesCM = Object.values(this.card.cardmarket.prices);
  }
}

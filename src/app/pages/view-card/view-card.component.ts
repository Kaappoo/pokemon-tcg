import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CardsService } from '../../shared/services/cards.service';
import { SingularCardResponse } from '../../shared/interfaces/card';

@Component({
  selector: 'app-view-card',
  standalone: true,
  imports: [],
  templateUrl: './view-card.component.html',
  styleUrl: './view-card.component.scss'
})
export class ViewCardComponent {
  private route = inject(ActivatedRoute);
  private cardService = inject(CardsService);

  cardId: any;
  card: any;
  isLoading = false;
  ngOnInit(){
    this.cardId = this.route.snapshot.paramMap.get('id');
    this.getCard();
  }

  getCard(){
    this.isLoading = true;
    this.cardService.getCard(this.cardId).subscribe((res: SingularCardResponse) => {
      this.card = res.data;
      this.isLoading = false;
    })
  }
}

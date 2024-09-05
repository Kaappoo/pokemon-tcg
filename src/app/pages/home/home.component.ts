import { Component, inject, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CardsService } from '../../shared/services/cards.service';
import { CarouselComponent } from 'ngx-carousel-ease';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CarouselComponent ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomeComponent {

  private cardsService = inject(CardsService);
  cards: any[] =[];
  recentCards: any[] =[]

  ngOnInit(){
    this.getCards();
    this.getNewCards();
  }

  getCards(){
    this.cardsService.listCards(6).subscribe((res: any) => {
      console.log(res);
      this.cards = res.data;
    })
  }

  getNewCards(){
    this.cardsService.listNewCards(10).subscribe((res: any) => {
      this.recentCards = res.data;
    })
  }

  goToCard(card: any){
    console.log(card);
    
  }
}

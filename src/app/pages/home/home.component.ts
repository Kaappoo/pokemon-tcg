import { Component, inject, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CardsService } from '../../shared/services/cards.service';
import { CarouselComponent } from 'ngx-carousel-ease';
import { RouterModule } from '@angular/router';
import { Card } from '../../shared/interfaces/card';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CarouselComponent, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomeComponent {

  private cardsService = inject(CardsService);
  // cards: Card[] =[];
  recentCards: Card[] =[];
  expensiveCards: Card[] =[];

  ngOnInit(){
    // this.getCards();
    this.getNewCards();
    this.getExpensiveCards();
  }

  // getCards(){
  //   this.cardsService.listCards(6).subscribe((res: any) => {
  //     console.log(res);
  //     this.cards = res.data;
  //   })
  // }

  getNewCards(){
    this.cardsService.listNewCards(20).subscribe((res: any) => {
      this.recentCards = res.data;
    })
  }

  getExpensiveCards(){
    this.cardsService.listExpensiveCards(15).subscribe((res: any) => {
      this.expensiveCards = res.data;
    })
  }

  goToCard(card: any){
    console.log(card);
    
  }
}

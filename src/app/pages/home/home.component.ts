import { Component, inject, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CardsService } from '../../shared/services/cards.service';
import { CarouselComponent } from 'ngx-carousel-ease';
import { Router, RouterModule } from '@angular/router';
import { Card } from '../../shared/interfaces/card';
import { SetsService } from '../../shared/services/sets.service';

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
  private setsService = inject(SetsService);
  private router = inject(Router);

  recentCards: Card[] =[];
  expensiveCards: Card[] =[];

  isLoadingNewCards = false;
  isLoadingExpCards = false;

  ngOnInit(){
    this.getNewCards();
    this.getExpensiveCards();
  }

  getNewCards(){
    this.isLoadingNewCards = true;
    this.cardsService.listNewCards(20).subscribe((res: any) => {
      this.recentCards = res.data;
      this.isLoadingNewCards = false;
    })
  }

  getExpensiveCards(){
    this.isLoadingExpCards = true;
    this.cardsService.listExpensiveCards(15).subscribe((res: any) => {
      this.expensiveCards = res.data;
      this.isLoadingExpCards = false;
    })
  }

  viewCard(cardId: any){
    this.router.navigate(['view-card', {id: cardId}])
  }

  goToNewReleases(){
    this.setsService.getNewestSet().subscribe((res: any) => {
      this.router.navigate(['cards', {search: 'set', id: res.data[0].id}])
    })
  }

  goToPokemon(name: string){
    this.setsService.getNewestSet().subscribe((res: any) => {
      this.router.navigate(['cards', {search: 'search', id: name}])
    })
  }
}

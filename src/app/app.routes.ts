import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CardsComponent } from './pages/cards/cards.component';
import { ViewCardComponent } from './pages/view-card/view-card.component';

export const routes: Routes = [
    // {path: '', redirectTo: '/home', pathMatch: 'full'},
    {path: '', component: HomeComponent},
    {path: 'cards', component: CardsComponent},
    {path: 'view-card', component: ViewCardComponent},
];

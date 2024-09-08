import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CardsComponent } from './pages/cards/cards.component';

export const routes: Routes = [
    // {path: '', redirectTo: '/home', pathMatch: 'full'},
    {path: '', component: HomeComponent},
    {path: 'cards', component: CardsComponent},
];

import { Component, inject } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';
import { SetsService } from '../../shared/services/sets.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatIconModule, RouterModule ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  private setsService = inject(SetsService);
  private router = inject(Router);

  goToNewReleases(){
    this.setsService.getNewestSet().subscribe((res: any) => {
      this.router.navigate(['cards', {search: 'set', id: res.data[0].id}])
    })
  }
}

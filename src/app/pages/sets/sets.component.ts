import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { SetsService } from '../../shared/services/sets.service';
import { PaginatorModule } from 'primeng/paginator';
import { Set, SetRequest } from '../../shared/interfaces/set';

@Component({
  selector: 'app-sets',
  standalone: true,
  imports: [PaginatorModule],
  templateUrl: './sets.component.html',
  styleUrl: './sets.component.scss'
})
export class SetsComponent {
  private setsService = inject(SetsService);
  private router = inject(Router);

  isLoading = false;

  sets: Set[] = [];
  totalSetsCount = 120;

  request: SetRequest = {
    first: 0,
    rows: 20
  }

  ngOnInit(){
    this.getSets();
  }
  
  getSets(){
    this.isLoading = true;
    this.setsService.getSetsPag(this.request).subscribe((res: any) => {
      this.sets = res.data;
      this.totalSetsCount = res.totalCount;
      this.isLoading = false;
    })
  }

  onPageChange(event: any) {
    this.request.first = event.first;
    this.request.rows = event.rows;

    this.getSets();
  }

  goToSet(set: any){
    this.router.navigate(['cards', {search: 'set', id: set.id}])
  }
}

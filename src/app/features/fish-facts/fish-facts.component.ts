import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { FishingResquest } from '../../core/models/deepdive/response/FishingResquest';
import { FishingService } from '../../core/services/fishing/fishing.service';


@Component({
  selector: 'app-fish-facts',
  standalone: true,
  imports: [],
  templateUrl: './fish-facts.component.html',
  styleUrl: './fish-facts.component.css'
})
export class FishFactsComponent {
  fishId: string | undefined;
  fishing: FishingResquest | undefined;
  marcasActivas: boolean = true;
  zone: string | undefined;
  constructor(
    private route: ActivatedRoute,
    private fishingService: FishingService
  ) {

  }

  ngOnInit() {

    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.fishingService.cargarDatosFishing(id).subscribe(
        (response) => {
          this.fishing = response;
          this.zone = response.geographieName.replaceAll("_", " ");
        },
        (error) => {
          console.error('Error fetching data', error);
        }
      );
    }
    
  }
  activarMarcas(){
    this.marcasActivas = !this.marcasActivas;
  }
}

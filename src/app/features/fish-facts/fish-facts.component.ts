import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Fish, FishingResquest, GeographicalLocationResponse } from '../../core/models/deepdive/response/FishingResquest';


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

  constructor(private route: ActivatedRoute) {
    // Inicializa los datos aquí
    this.fishing = new FishingResquest(
      1, 
      new Fish(1, 'Trout', 'Lake', '2024-01-01', '2024-01-15', 'Spring', 'Summer', 'None'),
      'Good catch',
      true,
      2.5,
      new GeographicalLocationResponse(
        1,
        'Isla',
        'Acantilado_Isla_Oeste',
      ),
      45,
      50
    );
  }

  ngOnInit() {
    this.route.paramMap.pipe(
      switchMap(params => {
        const idParam = params.get('id');
        return of(idParam ? +idParam : null); 
      })
    ).subscribe(id => {
      this.fishId = id+"";
      
      console.log(`Fish ID: ${this.fishId}`);
    });
  }
  activarMarcas(){
    this.marcasActivas = !this.marcasActivas;
  }
}

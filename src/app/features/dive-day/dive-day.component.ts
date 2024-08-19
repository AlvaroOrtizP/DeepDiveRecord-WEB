import { Component } from '@angular/core';
import { DiveDayDetailsResponse} from '../../core/models/deepdive/response/DiveDayDetailsResponse';
import { ActivatedRoute, Router } from '@angular/router';
import { DivedayService } from '../../core/services/diveday/diveday.service';

@Component({
  selector: 'app-dive-day',
  standalone: true,
  imports: [

  ],
  templateUrl: './dive-day.component.html',
  styleUrl: './dive-day.component.css'
})
export class DiveDayComponent {

  diveDayResponse: DiveDayDetailsResponse | undefined;
  conditionAmanecer: String | undefined;
  conditionAtardecer: String | undefined;
  marcasActivas: boolean = true;
  zone: string = "";

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private divedayService: DivedayService
  ) { }
  ngOnInit() {
    this.marcasActivas = true;
    this.conditionAmanecer = "despejado";
    this.conditionAtardecer = "chubascos"
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.divedayService.cargarDatosDiveDay(id).subscribe(
        (response) => {
          this.diveDayResponse = response;
          this.zone = this.diveDayResponse.geographicalLocationResponse.name.replaceAll("_", " ");
        },
        (error) => {
          console.error('Error fetching data', error);
        }
      );
    }

  }


  activarMarcas() {
    this.marcasActivas = !this.marcasActivas;
  }
  modificarPez() {
    alert("Modificar")
  }
  eliminarPez() {
    alert("Eliminar")
  }
  verPez(id: number) {
    this.router.navigate(['/fish-facts', id]);
  }
  anadirPez() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.router.navigate(['/fish-form', { diveDayId: id }]);
  }
  modificarDiaBuceo() {
    alert("modificarDiaBuceo")
  }
}

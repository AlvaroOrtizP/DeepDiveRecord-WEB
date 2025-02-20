import { Component } from '@angular/core';
import { DiveDayDetailsResponse} from '../../core/models/deepdive/response/DiveDayDetailsResponse';
import { ActivatedRoute, Router } from '@angular/router';
import { DivedayService } from '../../core/services/diveday/diveday.service';
import { FishingService } from '../../core/services/fishing/fishing.service';
import { InDeleteFishing } from '../../core/models/deepdive/request/InDeleteFishing';

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
    private divedayService: DivedayService,
    private fishingService: FishingService
  ) { }
  ngOnInit() {
    this.marcasActivas = true;
    this.conditionAmanecer = "despejado";
    this.conditionAtardecer = "chubascos"
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.divedayService.cargarDatosDiveDay(id).subscribe({
        next: (response) => {
          if (response) {
            this.diveDayResponse = response;
            this.zone = this.diveDayResponse.geographicalLocationResponse.name.replaceAll("_", " ");
          } else {
            this.mostrarError("El día de buceo no fue encontrado.");
          }
        },
        error: (error) => {
          console.error('Error al obtener datos:', error);
          this.mostrarError("Hubo un problema al cargar los datos.");
        }
      });
    }
  }

  mostrarError(mensaje: string) {
    alert(mensaje); // Puedes reemplazarlo con un popup más elegante si usas Material o SweetAlert2
    this.router.navigate(['/']); // Redirigir al usuario a otra página si el ID no existe
  }

  activarMarcas() {
    this.marcasActivas = !this.marcasActivas;
  }
  modificarPesca(id: number) {
    const diveDayId = Number(this.route.snapshot.paramMap.get('id')); // Obtenemos el diveDayId de la URL actual
    this.router.navigate(['/fishing-edit-form', id, diveDayId]);
  }
  eliminarPez(id: number) {
    const confirmacion = window.confirm('¿Estás seguro de que deseas eliminar este pez?');
    if (confirmacion) {
      const inDelete = new InDeleteFishing();
      inDelete.fishingId = id;
  
      this.fishingService.deleteFishing(inDelete).subscribe({
        next: (response) => {
          console.log('Pez eliminado exitosamente, respuesta:', response);
          // Aquí puedes actualizar la UI, como recargar la lista de peces.
        },
        error: (error) => {
          console.error('Error al eliminar el pez:', error);
          // Manejo de errores.
        },
      });
    }
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

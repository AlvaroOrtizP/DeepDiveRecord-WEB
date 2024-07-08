import { Component } from '@angular/core';
import { InDeepDiveLogger } from '../../core/models/deepdive/request/InDeepDiveLogger';
import { DeepdiveService } from '../../core/services/deepdive.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  data: any; // Variable para almacenar los datos recibidos
  comprobante: boolean = false; // Variable para controlar la muestra de éxito
  ejecucionCargarDatos: boolean = false;

  constructor(private deepdiveService: DeepdiveService, private router: Router) { }

  cargarDatos() {
    const logger: InDeepDiveLogger = new InDeepDiveLogger(
      "487006",
      "play_v2_3900602",
      "Ajo, Cantabria"
    );

    alert("Se ha eliminado esta parte")
    /*this.deepdiveService.cargarDatos(logger).subscribe({
      next: (response: any) => {
        this.ejecucionCargarDatos = true;
        console.log("Entra 1")
        this.comprobante = true;
        this.data = response;
      },
      error: (error) => {
        this.ejecucionCargarDatos = true;
        console.error('Error al cargar los datos:', error);
        this.comprobante = false;
        this.data = undefined;
      }
    });*/
  }
  registrarDatosPesca(){
    alert("En proceso")
  }
  verDatosSemana(){
    this.router.navigate(['/dashboard']);
  }

  verDatosSemana() {
    this.router.navigate(['/dashboard'], {});
  }
}

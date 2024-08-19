import { Component } from '@angular/core';
import { InDeepDiveLogger } from '../../core/models/deepdive/request/InDeepDiveLogger';
import { Router } from '@angular/router';
import { DeepdiveService } from '../../core/services/deepdive.service';

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

  registrarDatosPesca(){
    this.router.navigate(['/formDiveDay']);
  }
  verDatosSemana(){
    this.router.navigate(['/dashboard']);
  }
  verListaBuceos(){
    this.router.navigate(['dive-day-list']);
  }

}

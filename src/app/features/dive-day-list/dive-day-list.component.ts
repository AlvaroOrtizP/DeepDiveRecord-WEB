import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DivedayService } from '../../core/services/diveday/diveday.service';
import { DiveDayResponse } from '../../core/models/deepdive/response/DiveDayResponse';
import { Page } from '../../core/models/deepdive/response/Page';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { GeograficlocationService } from '../../core/services/geograficlocation/geograficlocation.service';
import { GeograficLocationResponse } from '../../core/models/deepdive/response/GeograficLocationResponse';


@Component({
  selector: 'app-dive-day-list',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './dive-day-list.component.html',
  styleUrls: ['./dive-day-list.component.css'] 
})
export class DiveDayListComponent implements OnInit {

  fishingDays: DiveDayResponse[] = []; // Tipo específico para fishingDays
  page: number = 0; // Iniciar en 0 para la paginación
  itemsPerPage: number = 10;
  totalPages: number = 0;

  site: string = '';
  sortBy: string = 'fecha';
  sortDirection: string = 'asc';


  //Geolocalizacion
  geoLocationList: GeograficLocationResponse[] = [];
  uniqueSites: string[] = [];
  geographyName: string = "";
  geographySite: string = "";
  filteredNames: string[] = [];

  // FormGroup para manejar los filtros
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient,
    private diveDayService: DivedayService,
    private geograficlocationService: GeograficlocationService,

  ) {
    // Inicializa el FormGroup con los controles necesarios
    this.form = this.fb.group({
      site: [''],         // Define el control 'site'
      name: [''],         // Define el control 'name'
      sortBy: [''],       // Define el control 'sortBy'
      sortDirection: [''] // Define el control 'sortDirection'
    });
  }

  ngOnInit() {
    this.cargarDatosGeolocalizacion();
    this.cargaInicial();
  }

  onPageChange(page: number) {
    if(this.page===0 && page==-1) {
      console.log("No se puede reducir mas")
    }else{
      this.page = page;
      this.cargaInicial();
    }

  }
  onFilterSubmit() {
    this.page = 0; // Reiniciar a la primera página cuando se aplican nuevos filtros
    this.cargaInicial(); // Volver a cargar los datos con los nuevos filtros
  }
  range(count: number): number[] {
    return Array.from({ length: count }, (_, i) => i);
  }

  cargaInicial() {
    const formValues = this.form.value;

    this.diveDayService.getDiveDays(this.page, this.itemsPerPage, formValues.zona, formValues.sortBy, formValues.sortDirection)
      .subscribe((data: Page<DiveDayResponse>) => { 
        this.fishingDays = data.content;
        this.totalPages = data.totalPages;
        this.page = data.number;
      });
  }

  verDiveDayDetails(id: number) {
    this.router.navigate(['dive-day/', id]);
  }


  cargarDatosGeolocalizacion() {
    this.geograficlocationService.getGeograficLocationList().subscribe(
      (response) => {
        this.geoLocationList = response;
        this.uniqueSites = this.getUniqueSites(response);
        console.log('Datos de geolocalización cargados:', this.geoLocationList);
        console.log('Sitios únicos:', this.uniqueSites);
      },
      (error) => {
        console.error('Error en componente: Error fetching data', error);
      }
    );
  }
  getUniqueSites(locations: GeograficLocationResponse[]): string[] {
    const sites = locations.map(location => location.site);
    return Array.from(new Set(sites));
  }
  onSiteChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    if (target) {
      const selectedSite = target.value;
      this.filterNamesBySite(selectedSite);
      this.form.patchValue({ name: '' });
      this.geographySite = selectedSite;
    }
  }
  filterNamesBySite(site: string) {
    this.filteredNames = this.geoLocationList
      .filter(location => location.site === site)
      .map(location => location.name);
  }
  onGeograficChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    if (target) {
      const selectedName = target.value;
      this.geographyName = selectedName;
      
    }
  }
}
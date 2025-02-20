import { FishingService } from '../../core/services/fishing/fishing.service';
import { FishingResquest } from '../../core/models/deepdive/response/FishingResquest';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InCreateFishing } from '../../core/models/deepdive/request/InCreateFishing';
import { GeograficLocationResponse } from '../../core/models/deepdive/response/GeograficLocationResponse';
import { GeograficlocationService } from '../../core/services/geograficlocation/geograficlocation.service';
import { FishService } from '../../core/services/fish/fish.service';
import { FishResponse } from '../../core/models/deepdive/response/FishResponse';
import { InEditFishing } from '../../core/models/deepdive/request/InEditFishing ';

@Component({
  selector: 'app-fishing-edit-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './fishing-edit-form.component.html',
  styleUrl: './fishing-edit-form.component.css'
})
export class FishingEditFormComponent implements OnInit {
  fishingId: number = 0;
  form: FormGroup;
  markerLat: number | undefined;
  markerLong: number | undefined;
  markerVisible: boolean = false;
  dataList: GeograficLocationResponse[] = [];
  fisList: FishResponse[] = [];
  uniqueSites: string[] = [];
  filteredNames: string[] = [];
  idGeograficLocation: number = 0;
  diveDayId: number = 0;
  geographyName: string = '';
  geographySite: string = '';
  fishing: FishingResquest | undefined;
  zone: string | undefined;

  constructor(
    private fb: FormBuilder, 
    private router: Router,
    private route: ActivatedRoute,
    private geograficlocationService: GeograficlocationService,
    private fishService: FishService,
    private fishingService: FishingService
  ) {
    this.form = this.fb.group({
      fishId: ['', Validators.required],
      caught: [false, Validators.required],
      site: ['ropuevba', Validators.required],
      name: ['', Validators.required],
      lat: ['', Validators.required],
      long: ['', Validators.required],
      notes: [''],
      weight: ['', Validators.required]
    });
  }
  ngOnInit(): void {
    const diveDayId = Number(this.route.snapshot.paramMap.get('diveDayId')); // Obtén el diveDayId
    console.log('Dive Day ID:', diveDayId);
    this.cargarDatosPesca();
    this.cargarDatosGeolocalizacion();
    this.cargarDatosPeces();
    this.diveDayId = diveDayId; // Guarda el diveDayId para usarlo más adelante
  
    
  }
  
  cargarDatosPesca() {
    this.fishingId = Number(this.route.snapshot.paramMap.get('id')); // Obtén el ID de pesca
    if (this.fishingId) {
      this.fishingService.cargarDatosFishing(this.fishingId).subscribe(
        (response) => {
          this.fishing = response;
  
          // Actualiza el formulario con los valores de pesca
          this.form.patchValue({
            fishId: response.fishId || '',
            caught: response.caught || false,
            site: response.site || '', // Asigna el sitio por defecto aquí
            name: response.name || '', // Asigna la zona por defecto aquí
            lat: response.latG || '',
            long: response.logG || '',
            notes: response.notes || '',
            weight: response.weight || ''
          });
  
          // Si el sitio se establece correctamente, filtra las zonas correspondientes
          if (response.site) {
            this.filterNamesBySite(response.site);
          }
        },
        (error) => {
          console.error('Error fetching data', error);
        }
      );
    }
  }
  
  
  

  cargarDatosGeolocalizacion() {
    console.log("cargarDatosGeolocalizacion")
    this.geograficlocationService.getGeograficLocationList().subscribe(
      (response) => {
        this.dataList = response;
        this.uniqueSites = this.getUniqueSites(response);
        console.log('Datos de geolocalización cargados:', this.dataList);
        console.log('Sitios únicos:', this.uniqueSites);
      },
      (error) => {
        console.error('Error en componente: Error fetching data', error);
      }
    );
  }

  cargarDatosPeces() {
    console.log("cargarDatosPeces")
    this.fishService.getAllFishList().subscribe(
      (response) => {
        this.fisList = response;
      },
      (error) => {
        console.error('Error en componente: Error cargarDatosPeces', error);
      }
    );
  }

  getUniqueSites(locations: GeograficLocationResponse[]): string[] {
    console.log("onSitgetUniqueSitesChange")
    const sites = locations.map(location => location.site);
    return Array.from(new Set(sites));
  }

  filterNamesBySite(site: string) {
    console.log("onSfilterNamesBySiteiteChange")
    this.filteredNames = this.dataList
      .filter(location => location.site === site)
      .map(location => location.name);
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
  onGeograficChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    if (target) {
      const selectedName = target.value;
      this.geographyName = selectedName;
      console.log('selectedName ', selectedName)
    }
  }

  onMapClick(event: MouseEvent): void {
    const imageElement = event.target as HTMLImageElement;
    const rect = imageElement.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const lat = (y / rect.height) * 100;
    const long = (x / rect.width) * 100;

    this.markerLat = lat;
    this.markerLong = long;
    this.markerVisible = true;

    this.form.patchValue({
      lat: lat.toFixed(2),
      long: long.toFixed(2)
    });
  }

  onSubmit() {
    console.log('Formulario valores actuales:', this.form.value);
    if (this.form.valid) {
      const fishingData = new InEditFishing(
        this.fishingId,
        this.form.value.fishId,
        this.form.value.caught,
        this.form.value.name,
        this.form.value.site,
        this.form.value.notes,
        this.form.value.weight,
        this.form.value.lat,
        this.form.value.long,
        this.diveDayId,
        this.form.value.sightingTime,
      );
      this.fishingService.editFishing(fishingData).subscribe(
        (diveDayId) => {
          this.router.navigate(['/dive-day', diveDayId]);
        },
        (error) => {
          console.error('Error fetching data', error);
        }
      );
    } else {
      console.log('Formulario inválido:', this.form);
      this.markAllAsTouched();
    }
  }

  markAllAsTouched() {
    this.form.markAllAsTouched();
  }
}

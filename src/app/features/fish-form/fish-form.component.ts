import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { InCreateFishing } from '../../core/models/deepdive/request/InCreateFishing';
import { GeograficLocationResponse } from '../../core/models/deepdive/response/GeograficLocationResponse';
import { GeograficlocationService } from '../../core/services/geograficlocation/geograficlocation.service';
import { FishService } from '../../core/services/fish/fish.service';
import { FishResponse } from '../../core/models/deepdive/response/FishResponse';
import { FishingService } from '../../core/services/fishing/fishing.service';

@Component({
  selector: 'app-fish-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './fish-form.component.html',
  styleUrls: ['./fish-form.component.css']
})
export class FishFormComponent implements OnInit {
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
  geographyName: string = "";
  geographySite: string = "";

  constructor(
    private fb: FormBuilder, 
    private router: Router,
    private route: ActivatedRoute,
    private geograficlocationService: GeograficlocationService,
    private fishService: FishService,
    private fisingService: FishingService
  ) {
    this.form = this.fb.group({
      fishId: ['', Validators.required],
      caught: [false, Validators.required],
      site: ['', Validators.required],
      name: ['', Validators.required],
      lat: ['', Validators.required],
      long: ['', Validators.required],
      notes: [''],
      weight: ['', Validators.required],
      sightingTime : ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.cargarDatosGeolocalizacion();
    this.cargarDatosPeces();
    this.diveDayId = Number(this.route.snapshot.paramMap.get('diveDayId'));  // Obtén el id del dive day de la ruta
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
      console.log("Antes this.form.value.lat")
      const fishingData = new InCreateFishing(
        this.form.value.fishId,
        this.form.value.caught,
        this.form.value.name,
        this.form.value.site,
        this.form.value.lat,
        this.form.value.long,
        this.form.value.notes,
        this.form.value.weight,
        this.diveDayId,
        this.form.value.sightingTime,
      );
      this.fisingService.createFishing(fishingData).subscribe(
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

  cargarDatosGeolocalizacion() {
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
    this.fishService.getAllFishList().subscribe(
      (response) => {
        this.fisList = response;
      },
      (error) =>{
        console.error('Error en componente: Error cargarDatosPeces', error);
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
  onGeograficChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    if (target) {
      const selectedName = target.value;
      this.geographyName = selectedName;
      console.log('selectedName ', selectedName)
    }
  }

  filterNamesBySite(site: string) {
    this.filteredNames = this.dataList
      .filter(location => location.site === site)
      .map(location => location.name);
  }
}

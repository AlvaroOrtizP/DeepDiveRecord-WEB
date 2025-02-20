import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, ReactiveFormsModule } from '@angular/forms';
import { InCreateDailyDiving } from '../../core/models/deepdive/request/InCreateDailyDiving';
import { InFishing } from '../../core/models/deepdive/request/InFishing';
import { Router } from '@angular/router';
import { DivedayService } from '../../core/services/diveday/diveday.service';
import { DiveDayDetailsResponse } from '../../core/models/deepdive/response/DiveDayDetailsResponse';
import { GeograficlocationService } from '../../core/services/geograficlocation/geograficlocation.service';
import { GeograficLocationResponse } from '../../core/models/deepdive/response/GeograficLocationResponse';

@Component({
  selector: 'app-formdiveday',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './formdiveday.component.html',
  styleUrls: ['./formdiveday.component.css']
})
export class FormDiveDayComponent implements OnInit {
  form: FormGroup;
  dataList: GeograficLocationResponse[] = [];
  uniqueSites: string[] = [];
  filteredNames: string[] = [];
  data!: DiveDayDetailsResponse;
  idGeograficLocation: number = 0;

  constructor(
    private geograficlocationService: GeograficlocationService, 
    private fb: FormBuilder, 
    private router: Router, 
    private divedayService: DivedayService
  ) {
    this.form = this.fb.group({
      date: ['', Validators.required],
      beginning: ['', Validators.required],
      end: ['', Validators.required],
      site: ['', Validators.required],
      name: ['', Validators.required], 
      assessment: ['', Validators.required],
      notes: [''],
      medusas: ['', Validators.required],
      visibilidad: ['', Validators.required],
      marDeFondo: ['', Validators.required],
      pecesPasto: ['', Validators.required],
      presenciaPlastico: ['', Validators.required],
      fishingList: this.fb.array([]) // Inicializa un FormArray vacío para la lista de pesca
    });
  }

  ngOnInit(): void {
    console.log('Se procede a obtener los datos de geolocalizacion');
    this.cargarDatosGeolocalizacion();
    this.form.get('site')?.valueChanges.subscribe(site => {
      this.filterNamesBySite(site);
    });
    this.form.get('name')?.valueChanges.subscribe(name => {
      this.logIdByName(name);
    });
  }

  onSubmit() {
    if (this.form.valid) {
      // Obtener los valores del formulario
      const { date, beginning, end, site, name, notes, assessment, medusas, visibilidad, marDeFondo, pecesPasto, presenciaPlastico } = this.form.value;
      console.log("presencePlastic " + presenciaPlastico)
      // Convertir el valor de la fecha a un objeto Date
      const dateObj = new Date(date);
  
      // Extraer día, mes y año
      const day = dateObj.getDate(); // obtiene el día
      const month = dateObj.getMonth() + 1; // getMonth() devuelve el mes de 0 a 11, por eso se suma 1
      const year = dateObj.getFullYear(); // obtiene el año
  
      // Crear un nuevo objeto InCreateDailyDiving
      const newDivingDay = new InCreateDailyDiving(
        day + "",
        month + "", 
        year + "",
        beginning,
        end,
        notes,
        assessment,
        this.idGeograficLocation,
        medusas,
        visibilidad,
        marDeFondo,
        pecesPasto,
        presenciaPlastico
      );
  
      console.log('Nuevo día de buceo:', newDivingDay);
      this.divedayService.createDailyDiving(newDivingDay).subscribe(
        (diveDayId) => {
          // Navega al componente con el ID del diveDay
          this.router.navigate(['/dive-day', diveDayId]);
        },
        (error) => {
          console.error('Error fetching data', error);
        }
      );
    } else {
      console.log('Formulario inválido');
    }
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

  getUniqueSites(locations: GeograficLocationResponse[]): string[] {
    const sites = locations.map(location => location.site);
    return Array.from(new Set(sites));
  }

  filterNamesBySite(site: string) {
    this.filteredNames = this.dataList
      .filter(location => location.site === site)
      .map(location => location.name);
  }
  
  logIdByName(name: string) {
    const location = this.dataList.find(location => location.name === name);
    if (location) {
      this.idGeograficLocation = location.id;
      console.log('ID for selected name:', location.id);
    } else {
      console.log('No ID found for selected name');
    }
  }
}

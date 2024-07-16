import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, ReactiveFormsModule } from '@angular/forms';
import { InCreateDailyDiving } from '../../core/models/deepdive/request/InCreateDailyDiving';
import { InFishing } from '../../core/models/deepdive/request/InFishing';
import { Router } from '@angular/router';

@Component({
  selector: 'app-formdiveday',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './formdiveday.component.html',
  styleUrls: ['./formdiveday.component.css']
})
export class FormDiveDayComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.form = this.fb.group({
      date: ['', Validators.required],
      beginning: ['', Validators.required],
      end: ['', Validators.required],
      site: ['', Validators.required],
      notes: [''],
      fishingList: this.fb.array([]) // Inicializa un FormArray vacío para la lista de pesca
    });
  }

  onSubmit() {
    if (this.form.valid) {
      // Obtener los valores del formulario
      const { date, beginning, end, site, notes } = this.form.value;

      // Convertir el valor de la fecha a un objeto Date
      const dateObj = new Date(date);

      // Extraer día, mes y año
      const day = dateObj.getDate(); //obtiene el dia
      const month = dateObj.getMonth() + 1 ; // getMonth() devuelve el mes de 0 a 11, por eso se suma 1
      const year = dateObj.getFullYear(); //Obtiene el año

      // Crear un nuevo objeto InCreateDailyDiving
      const newDivingDay = new InCreateDailyDiving(
        day+ "",
        beginning,
        end,
        site,
        notes,
        year+ "",
        month + "",
      );

      console.log('Nuevo día de buceo:', newDivingDay);
      //enviar datos a la api
      //Comprobar si fue OK la creaccion del dia de buceo

      //En caso OK redirigir a la pantalla de datos del dia de buceo
      this.router.navigate(['/dashboard']);
    } else {
      console.log('Formulario inválido');
    }
  }
}

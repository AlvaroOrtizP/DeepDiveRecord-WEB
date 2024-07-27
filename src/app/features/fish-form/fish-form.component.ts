import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { InCreateDailyDiving } from '../../core/models/deepdive/request/InCreateDailyDiving';

@Component({
  selector: 'app-fish-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './fish-form.component.html',
  styleUrls: ['./fish-form.component.css']
})
export class FishFormComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.form = this.fb.group({
      date: ['', Validators.required],
      beginning: ['', Validators.required],
      end: ['', Validators.required],
      site: ['', Validators.required],
      notes: ['', Validators.required],
      fishingList: this.fb.array([]) // Inicializa un FormArray vacío para la lista de pesca
    });
  }

  onSubmit() {
    if (this.form.valid) {
      // Obtener los valores del formulario
      const { date, beginning, end, site, notes, valoracion } = this.form.value;

      // Convertir el valor de la fecha a un objeto Date
      const dateObj = new Date(date);

      // Extraer día, mes y año
      const day = dateObj.getDate();
      const month = dateObj.getMonth() + 1;
      const year = dateObj.getFullYear();

      // Crear un nuevo objeto InCreateDailyDiving
      const newDivingDay = new InCreateDailyDiving(
        day + "",
        beginning,
        end,
        site,
        "name",
        notes,
        valoracion,
        year + "",
        month + "",
        0,
        0,
        0,
        0
      );

      console.log('Nuevo día de buceo:', newDivingDay);
      // Enviar datos a la API
      // Comprobar si fue OK la creación del día de buceo

      // En caso OK redirigir a la pantalla de datos del día de buceo
      this.router.navigate(['/dive-day']);
    } else {
      console.log('Formulario inválido');
    }
  }
}

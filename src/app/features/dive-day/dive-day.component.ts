import { Component } from '@angular/core';
import { DiveDayResponse, Fish, Fishing, GeographicalLocationResponse, TideTableResponse, WindCondition } from '../../core/models/deepdive/response/DiveDayResponse';

@Component({
  selector: 'app-dive-day',
  standalone: true,
  imports: [
    
  ],
  templateUrl: './dive-day.component.html',
  styleUrl: './dive-day.component.css'
})
export class DiveDayComponent {
  diveDayResponse: DiveDayResponse | undefined;
  conditionAmanecer: String | undefined;
  conditionAtardecer: String | undefined;
  constructor() {}
  ngOnInit() {
    this.conditionAmanecer = "despejado";
    this.conditionAtardecer = "chubascos"
    this.diveDayResponse = new DiveDayResponse(
      1, // dive_day_id No es necesario mostrar
      15, // day -
      7, // month -
      2024, // year - 
      '08:00', // beginning -
      '14:00', // end -
      '487006', // site - 
      'Muy buena',
      'Agua clara, visibilidad de 15 metros, temperatura del agua 22°C, corriente leve', // notes -- 
      new GeographicalLocationResponse(
        1,
        'Acantilado de Sal',
        'Isla',
      ),
      new TideTableResponse(
        15, // day No es necesario mostrar
        7, // month No es necesario mostrar
        2024, // year No es necesario mostrar
        '487006', //lugar No es necesario mostrar
        3, // moonPhase --
        100, // coefficient0H --
        105, // coefficient12H --
        '06:00', // morningHighTideTime --
        '1.2m', // morningHighTideHeight --
        '18:00', // afternoonHighTideTime --
        '1.4m', // afternoonHighTideHeight --
        '12:00', // morningLowTideTime --
        '0.4m', // morningLowTideHeight --
        '00:00', // afternoonLowTideTime --
        '0.5m' // afternoonLowTideHeight --
      ),

      [//Tabla
        new WindCondition(
          2024, // year --
          7, // month --
          15, // day --
          'Great Barrier Reef', // site --
          8, // timeOfDay --
          15, // wind --
          270, // windDirection --
          'W', // windDirectionNM --
          20, // gustsOfWind (rafagas) --
          '0.5m', // waveHeight --
          5, // wavePeriod --
          '270', // waveDirection --
          'W', // waveDirectionNM --
          25, // earthTemperature  --
          '24°C', // waterTemperature --
          1, // conditionCode
          'Calm' // conditionDescription
        ),
        new WindCondition(
          2024, // year
          7, // month
          15, // day
          'Great Barrier Reef', // site
          12, // timeOfDay
          18, // wind
          280, // windDirection
          'W', // windDirectionNM
          22, // gustsOfWind
          '0.6m', // waveHeight
          6, // wavePeriod
          '280', // waveDirection
          'W', // waveDirectionNM
          26, // earthTemperature
          '25°C', // waterTemperature
          2, // conditionCode
          'Light Breeze' // conditionDescription
        ),
        new WindCondition(
          2024, // year
          7, // month
          15, // day
          'Great Barrier Reef', // site
          16, // timeOfDay
          20, // wind
          290, // windDirection
          'WNW', // windDirectionNM
          25, // gustsOfWind
          '0.7m', // waveHeight
          7, // wavePeriod
          '290', // waveDirection
          'WNW', // waveDirectionNM
          27, // earthTemperature
          '26°C', // waterTemperature
          3, // conditionCode
          'Moderate Breeze' // conditionDescription
        ),
        new WindCondition(
          2024, // year
          7, // month
          15, // day
          'Great Barrier Reef', // site
          8, // timeOfDay
          15, // wind
          270, // windDirection
          'W', // windDirectionNM
          20, // gustsOfWind
          '0.5m', // waveHeight
          5, // wavePeriod
          '270', // waveDirection
          'W', // waveDirectionNM
          25, // earthTemperature
          '24°C', // waterTemperature
          1, // conditionCode
          'Calm' // conditionDescription
        ),
        new WindCondition(
          2024, // year
          7, // month
          15, // day
          'Great Barrier Reef', // site
          12, // timeOfDay
          18, // wind
          280, // windDirection
          'W', // windDirectionNM
          22, // gustsOfWind
          '0.6m', // waveHeight
          6, // wavePeriod
          '280', // waveDirection
          'W', // waveDirectionNM
          26, // earthTemperature
          '25°C', // waterTemperature
          2, // conditionCode
          'Light Breeze' // conditionDescription
        ),
        new WindCondition(
          2024, // year
          7, // month
          15, // day
          'Great Barrier Reef', // site
          16, // timeOfDay
          20, // wind
          290, // windDirection
          'WNW', // windDirectionNM
          25, // gustsOfWind
          '0.7m', // waveHeight
          7, // wavePeriod
          '290', // waveDirection
          'WNW', // waveDirectionNM
          27, // earthTemperature
          '26°C', // waterTemperature
          3, // conditionCode
          'Moderate Breeze' // conditionDescription
        ),
        new WindCondition(
          2024, // year
          7, // month
          15, // day
          'Great Barrier Reef', // site
          8, // timeOfDay
          15, // wind
          270, // windDirection
          'W', // windDirectionNM
          20, // gustsOfWind
          '0.5m', // waveHeight
          5, // wavePeriod
          '270', // waveDirection
          'W', // waveDirectionNM
          25, // earthTemperature
          '24°C', // waterTemperature
          1, // conditionCode
          'Calm' // conditionDescription
        ),
        new WindCondition(
          2024, // year
          7, // month
          15, // day
          'Great Barrier Reef', // site
          12, // timeOfDay
          18, // wind
          280, // windDirection
          'W', // windDirectionNM
          22, // gustsOfWind
          '0.6m', // waveHeight
          6, // wavePeriod
          '280', // waveDirection
          'W', // waveDirectionNM
          26, // earthTemperature
          '25°C', // waterTemperature
          2, // conditionCode
          'Light Breeze' // conditionDescription
        ),
        new WindCondition(
          2024, // year
          7, // month
          15, // day
          'Great Barrier Reef', // site
          16, // timeOfDay
          20, // wind
          290, // windDirection
          'WNW', // windDirectionNM
          25, // gustsOfWind
          '0.7m', // waveHeight
          7, // wavePeriod
          '290', // waveDirection
          'WNW', // waveDirectionNM
          27, // earthTemperature
          '26°C', // waterTemperature
          3, // conditionCode
          'Moderate Breeze' // conditionDescription
        ),
        new WindCondition(
          2024, // year
          7, // month
          15, // day
          'Great Barrier Reef', // site
          16, // timeOfDay
          20, // wind
          290, // windDirection
          'WNW', // windDirectionNM
          25, // gustsOfWind
          '0.7m', // waveHeight
          7, // wavePeriod
          '290', // waveDirection
          'WNW', // waveDirectionNM
          27, // earthTemperature
          '26°C', // waterTemperature
          3, // conditionCode
          'Moderate Breeze' // conditionDescription
        )
      ],

      [
        new Fishing(
          1,
          new Fish(
            1,
            'Clownfish',
            'Great Barrier Reef',
            '2023-01-01',
            '2024-01-01',
            '2023-01-01',
            '2023-12-31',
            'No warnings'
          ),
          'Caught near the coral',
          true,
          0.5
        ),
        new Fishing(
          2,
          new Fish(
            2,
            'Parrotfish',
            'Great Barrier Reef',
            '2023-02-01',
            '2024-02-01',
            '2023-02-01',
            '2023-12-31',
            'No warnings'
          ),
          'Caught near the reef',
          true,
          1.2
        ),
        new Fishing(
          3,
          new Fish(
            3,
            'Snapper',
            'Great Barrier Reef',
            '2023-03-01',
            '2024-03-01',
            '2023-03-01',
            '2023-12-31',
            'No warnings'
          ),
          'Caught in deeper water',
          true,
          2.0
        )
      ]
    );

  }


  modificarPez(){
    alert("Modificar")
  }
  eliminarPez(){
    alert("Eliminar")
  }
  verPez(){
    alert("ver")
  }
  anadirPez(){
    alert("anadirPez")
  }
  modificarDiaBuceo(){
    alert("modificarDiaBuceo")
  }
}

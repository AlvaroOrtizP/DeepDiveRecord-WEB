import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from "../../shared/components/navbar/navbar.component";
import { FooterComponent } from "../../shared/components/footer/footer.component";
import { InGetDataWeek } from '../../core/models/deepdive/request/InGetDataWeek';
import { OutGetData, OutGetDataList } from '../../core/models/deepdive/response/OutGetData';
import { DeepdiveService } from '../../core/services/deepdive.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'], // Corregido a 'styleUrls'
  imports: [NavbarComponent, FooterComponent]
})
export class DashboardComponent implements OnInit { // Implementar OnInit para usar ngOnInit
  data!: OutGetDataList;
  dataList: OutGetData[] = [];
  today: Date= new Date();

  constructor(private deepdiveService: DeepdiveService) { }

  ngOnInit(): void {
    console.log('El componente se ha iniciado');
    this.cargaInicial();
  }

  cargaInicial() {
    const nextWeek: Date = new Date();
    nextWeek.setDate(this.today.getDate() + 7);

    const fromYear: string = this.today.getFullYear().toString();
    const fromMonth: string = (this.today.getMonth() + 1).toString().padStart(2, '0'); 
    const fromDay: string = this.today.getDate().toString().padStart(2, '0');

    const toYear: string = nextWeek.getFullYear().toString();
    const toMonth: string = (nextWeek.getMonth() + 1).toString().padStart(2, '0');
    const toDay: string = nextWeek.getDate().toString().padStart(2, '0');
    
    const inGetDataWeek: InGetDataWeek = {
      page: 0,
      size: 70,
      site: '487006',
      fromYear: fromYear,
      fromMonth: fromMonth,
      fromDay: fromDay,
      toYear: toYear,
      toMonth: toMonth,
      toDay: toDay
    };
    console.log("fromYear " + fromYear);
    console.log("fromMonth " + fromMonth);
    console.log("fromDay " + fromDay);
    this.deepdiveService.getDataWeek(inGetDataWeek).subscribe(
    
      (response) => {
        this.data = response;
        this.dataList = response.outGetDataList;
        console.log(this.data);
      },
      (error) => {
        console.error('Error fetching data', error);
      }
    );
  }
  getDayGroupClass(day: number): string {
    console.log("prueba")
    return day % 2 !== 0 ? 'day-group-1' : 'day-group-2';
  }
}

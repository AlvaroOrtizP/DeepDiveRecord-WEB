import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from "../../shared/components/navbar/navbar.component";
import { FooterComponent } from "../../shared/components/footer/footer.component";
import { InGetDataWeek } from '../../core/models/deepdive/request/InGetDataWeek';
import { OutGetData, OutGetDataList, OutGetDataMedia } from '../../core/models/deepdive/response/OutGetData';
import { DeepdiveService } from '../../core/services/deepdive.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'], 
  imports: []
})
export class DashboardComponent implements OnInit { 
  data!: OutGetDataList;
  dataList: OutGetData[] = [];
  dataMediaList: OutGetDataMedia[] = [];

  today: Date= new Date();
  modo: number = 1;
  dataMediaListGrouped: any[] | undefined;
  constructor(private deepdiveService: DeepdiveService) { }

  ngOnInit(): void {
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
    console.log(inGetDataWeek);
    this.deepdiveService.getDataWeek(inGetDataWeek).subscribe(
        
      (response) => {
        this.data = response;
        this.dataList = response.outGetDataList;
        this.dataMediaList = response.outGetDataMediaList;
        this.dataMediaListGrouped = this.groupDataInPairs(this.dataMediaList, 5);

        console.log(this.dataMediaList);
      },
      (error) => {
        console.error('Error fetching data', error);
      }
    );
  }
  groupDataInPairs(data: any[], maxPairs: number): any[] {
    const grouped = [];
    for (let i = 0; i < data.length && grouped.length < maxPairs; i += 2) {
      grouped.push({
        morning: data[i], 
        afternoon: data[i + 1] ?? null // Manejo de caso impar
      });
    }
    return grouped;
  }
  getDayGroupClass(day: number): string {
    return day % 2 !== 0 ? 'day-group-1' : 'day-group-2';
  }
  cambiarModo(){
    if(this.modo == 0){
      this.modo = 1;
    }else{
      this.modo = 0;
    }
  }
}

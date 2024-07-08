import { Component } from '@angular/core';
import { NavbarComponent } from "../../shared/components/navbar/navbar.component";
import { FooterComponent } from "../../shared/components/footer/footer.component";
import { DeepdiveService } from '../../core/services/deepdive.service';
import { InGetDataWeek } from '../../core/models/deepdive/request/InGetDataWeek';
import { OutGetData, OutGetDataList } from '../../core/models/deepdive/response/OutGetData';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  imports: [NavbarComponent, FooterComponent]
})

export class DashboardComponent {
  constructor(private deepdiveService: DeepdiveService) { }

  data!: OutGetDataList;
  dataList: OutGetData[] = [];
  ngOnInit(): void {

    console.log('El componente se ha iniciado');
    this.miMetodoDeInicio();
  }

  miMetodoDeInicio() {
    const inGetDataWeek: InGetDataWeek = {
      page: 0,
      size: 20,
      site: '487006',
      fromYear: "2024",
      fromMonth: "01",
      fromDay: "07",
      toYear: "2024",
      toMonth: "08",
      toDay: "30"
    };
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
}


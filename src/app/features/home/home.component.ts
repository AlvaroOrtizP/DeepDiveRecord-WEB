import { Component } from '@angular/core';
import { FooterComponent } from "../../shared/components/footer/footer.component";
import { NavbarComponent } from "../../shared/components/navbar/navbar.component";

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
    imports: [FooterComponent, NavbarComponent]
})
export class HomeComponent {
  
  loadData() {
    alert("Cargar datos")
  }
}

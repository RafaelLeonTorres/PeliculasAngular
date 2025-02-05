import { Component, OnInit } from '@angular/core';
import { MenuComponent } from "./compartidos/componentes/menu/menu.component";
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from "./compartidos/componentes/footer/footer.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MenuComponent, RouterOutlet, FooterComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{

}

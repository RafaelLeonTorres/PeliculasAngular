import { Component, OnInit } from '@angular/core';
import { ListadoPeliculasComponent } from "../peliculas/listado-peliculas/listado-peliculas.component";
import { FooterComponent } from "../compartidos/componentes/footer/footer.component";

@Component({
  selector: 'app-landing-page',
  imports: [ListadoPeliculasComponent, FooterComponent],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css'
})
export class LandingPageComponent implements OnInit {
  title: any;

  ngOnInit(): void {
    setTimeout(() => {
      this.peliculasEnCines = [
        {
          titulo: 'Your Name',
          fechaLanzamiento: new Date("2016-08-26"),
          precio: (Math.random() * 20 + 5).toFixed(2),
          poster: "https://upload.wikimedia.org/wikipedia/en/0/0b/Your_Name_poster.png"
        },
        {
          titulo: 'Spirited Away',
          fechaLanzamiento: new Date("2001-07-20"),
          precio: (Math.random() * 20 + 5).toFixed(2),
          poster: "https://upload.wikimedia.org/wikipedia/en/thumb/d/db/Spirited_Away_Japanese_poster.png/220px-Spirited_Away_Japanese_poster.png"
        },
        {
          titulo: 'Princess Mononoke',
          fechaLanzamiento: new Date("1997-07-12"),
          precio: (Math.random() * 20 + 5).toFixed(2),
          poster: "https://upload.wikimedia.org/wikipedia/en/thumb/8/8c/Princess_Mononoke_Japanese_poster.png/220px-Princess_Mononoke_Japanese_poster.png"
        },
        {
          titulo: 'Akira',
          fechaLanzamiento: new Date("1988-07-16"),
          precio: (Math.random() * 20 + 5).toFixed(2),
          poster: "https://upload.wikimedia.org/wikipedia/en/5/5d/AKIRA_%281988_poster%29.jpg"
        },
        {
          titulo: 'My Neighbor Totoro',
          fechaLanzamiento: new Date("1988-04-16"),
          precio: (Math.random() * 20 + 5).toFixed(2),
          poster: "https://upload.wikimedia.org/wikipedia/en/0/02/My_Neighbor_Totoro_-_Tonari_no_Totoro_%28Movie_Poster%29.jpg"
        }
      ];
        this.peliculasProximosEstrenos = [{
          titulo: 'A Silent Voice',
          fechaLanzamiento: new Date("2016-09-17"),
          precio: (Math.random() * 20 + 5).toFixed(2),
          poster: "https://upload.wikimedia.org/wikipedia/en/3/32/A_Silent_Voice_Film_Poster.jpg"
        },
        {
          titulo: 'Howl\'s Moving Castle',
          fechaLanzamiento: new Date("2004-11-20"),
          precio: (Math.random() * 20 + 5).toFixed(2),
          poster: "https://upload.wikimedia.org/wikipedia/en/a/a0/Howls-moving-castleposter.jpg"
        },
        {
          titulo: 'Weathering with You',
          fechaLanzamiento: new Date("2019-07-19"),
          precio: (Math.random() * 20 + 5).toFixed(2),
          poster: "https://upload.wikimedia.org/wikipedia/en/thumb/6/66/Weathering_with_You_Poster.jpg/220px-Weathering_with_You_Poster.jpg"
        },
        {
          titulo: 'Perfect Blue',
          fechaLanzamiento: new Date("1997-08-05"),
          precio: (Math.random() * 20 + 5).toFixed(2),
          poster: "https://upload.wikimedia.org/wikipedia/en/2/2a/Perfectblueposter.png"
        },
        {
          titulo: 'Demon Slayer: Mugen Train',
          fechaLanzamiento: new Date("2020-10-16"),
          precio: (Math.random() * 20 + 5).toFixed(2),
          poster: "https://upload.wikimedia.org/wikipedia/en/thumb/2/21/Kimetsu_no_Yaiba_Mugen_Ressha_Hen_Poster.jpg/220px-Kimetsu_no_Yaiba_Mugen_Ressha_Hen_Poster.jpg"
        }
        // Otros objetos de películas
      ];
    }, 100);
  }
  
  peliculasEnCines!: any[];
  peliculasProximosEstrenos!: any[];
}

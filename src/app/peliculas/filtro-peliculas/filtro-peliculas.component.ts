import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { ListadoPeliculasComponent } from "../listado-peliculas/listado-peliculas.component";
import { FiltroPeliculas } from './filtroPelicula';
import {Location} from '@angular/common'
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-filtro-peliculas',
  imports: [MatButtonModule, MatFormFieldModule, ReactiveFormsModule, MatInputModule, MatSelectModule, MatCheckboxModule, ListadoPeliculasComponent],
  templateUrl: './filtro-peliculas.component.html',
  styleUrl: './filtro-peliculas.component.css'
})
export class FiltroPeliculasComponent implements OnInit {
  ngOnInit(): void {
    this.leerValoresURL();
    this.buscarPeliculas(this.form.value as FiltroPeliculas);
    this.form.valueChanges.subscribe(valores => {
      this.peliculas = this.peliculasOriginal;
      this.buscarPeliculas(valores as FiltroPeliculas);
      this.escribirParametrosBusquedaEnURL(valores as FiltroPeliculas);
    });
  }

  buscarPeliculas(valores: FiltroPeliculas){
    if(valores.titulo){
      this.peliculas = this.peliculas.filter(pelicula => pelicula.titulo.indexOf(valores.titulo) !== -1);
    }
    if(valores.generoId !==0){
      this.peliculas = this.peliculas.filter(pelicula => pelicula.generos.indexOf(valores.generoId) !== -1);
    }
    if(valores.proximosEstrenos){
      this.peliculas = this.peliculas.filter(pelicula => pelicula.proximosEstrenos);
    }
    if(valores.enCines){
      this.peliculas = this.peliculas.filter(pelicula => pelicula.enCines);
    }
  }

  leerValoresURL(){
    this.activateRoute.queryParams.subscribe((params: any) => {
      var objeto: any = {};

      if(params.titulo){
        objeto.titulo = params.titulo;
      }
      if(params.generoId){
        objeto.generoId = Number(params.generoId);
      }
      if(params.proximosEstrenos){
        objeto.proximosEstrenos = params.proximosEstrenos;
      }
      if(params.enCines){
        objeto.enCines = params.enCines;
      }

      this.form.patchValue(objeto);

    })
  }

  limpiar(){
    this.form.patchValue({titulo: '', generoId: 0, proximosEstrenos: false, enCines: false});
  }

  escribirParametrosBusquedaEnURL(valores: FiltroPeliculas){
    let queryStrings = [];

    if(valores.titulo){
      queryStrings.push(`titulo=${encodeURIComponent(valores.titulo)}`);
    }
    if(valores.generoId !== 0){
      queryStrings.push(`generoId=${valores.generoId}`);
    }
    if(valores.proximosEstrenos){
      queryStrings.push(`proximosEstrenos=${valores.proximosEstrenos}`);
    }
    if(valores.enCines){
      queryStrings.push(`enCines=${valores.enCines}`);
    }

    this.location.replaceState('peliculas/filtrar', queryStrings.join('&'));
  }

  private formBuilder = inject(FormBuilder);
  private location = inject(Location);
  private activateRoute = inject(ActivatedRoute);

  form = this.formBuilder.group({
    titulo: '',
    generoId: 0,
    proximosEstrenos: false,
    enCines: false
  })

  generos = [
    {id: 1, nombre: 'Drama'},
    {id: 2, nombre: 'Acción'},
    {id: 3, nombre: 'Comedia'}
  ]

  peliculasOriginal = [
    {
      titulo: 'Your Name',
      fechaLanzamiento: new Date("2016-08-26"),
      precio: (Math.random() * 20 + 5).toFixed(2),
      poster: "https://upload.wikimedia.org/wikipedia/en/0/0b/Your_Name_poster.png",
      generos: [1,2,3],
      enCines: true,
      proximosEstrenos: false
    },
    {
      titulo: 'Spirited Away',
      fechaLanzamiento: new Date("2001-07-20"),
      precio: (Math.random() * 20 + 5).toFixed(2),
      poster: "https://upload.wikimedia.org/wikipedia/en/thumb/d/db/Spirited_Away_Japanese_poster.png/220px-Spirited_Away_Japanese_poster.png",
      generos: [3],
      enCines: true,
      proximosEstrenos: false
    },
    {
      titulo: 'Princess Mononoke',
      fechaLanzamiento: new Date("1997-07-12"),
      precio: (Math.random() * 20 + 5).toFixed(2),
      poster: "https://upload.wikimedia.org/wikipedia/en/thumb/8/8c/Princess_Mononoke_Japanese_poster.png/220px-Princess_Mononoke_Japanese_poster.png",
      generos: [2,3],
      enCines: false,
      proximosEstrenos: true
    },
    {
      titulo: 'Akira',
      fechaLanzamiento: new Date("1988-07-16"),
      precio: (Math.random() * 20 + 5).toFixed(2),
      poster: "https://upload.wikimedia.org/wikipedia/en/5/5d/AKIRA_%281988_poster%29.jpg",
      generos: [1],
      enCines: false,
      proximosEstrenos: false
    },
    {
      titulo: 'My Neighbor Totoro',
      fechaLanzamiento: new Date("1988-04-16"),
      precio: (Math.random() * 20 + 5).toFixed(2),
      poster: "https://upload.wikimedia.org/wikipedia/en/0/02/My_Neighbor_Totoro_-_Tonari_no_Totoro_%28Movie_Poster%29.jpg",
      generos: [1,3],
      enCines: true,
      proximosEstrenos: false
    }, 
    {
      titulo: 'A Silent Voice',
      fechaLanzamiento: new Date("2016-09-17"),
      precio: (Math.random() * 20 + 5).toFixed(2),
      poster: "https://upload.wikimedia.org/wikipedia/en/3/32/A_Silent_Voice_Film_Poster.jpg",
      generos: [2],
      enCines: true,
      proximosEstrenos: false
    },
    {
      titulo: 'Howl\'s Moving Castle',
      fechaLanzamiento: new Date("2004-11-20"),
      precio: (Math.random() * 20 + 5).toFixed(2),
      poster: "https://upload.wikimedia.org/wikipedia/en/a/a0/Howls-moving-castleposter.jpg",
      generos: [],
      enCines: false,
      proximosEstrenos: false
    },
    {
      titulo: 'Weathering with You',
      fechaLanzamiento: new Date("2019-07-19"),
      precio: (Math.random() * 20 + 5).toFixed(2),
      poster: "https://upload.wikimedia.org/wikipedia/en/thumb/6/66/Weathering_with_You_Poster.jpg/220px-Weathering_with_You_Poster.jpg",
      generos: [1,2],
      enCines: false,
      proximosEstrenos: true
    },
    {
      titulo: 'Perfect Blue',
      fechaLanzamiento: new Date("1997-08-05"),
      precio: (Math.random() * 20 + 5).toFixed(2),
      poster: "https://upload.wikimedia.org/wikipedia/en/2/2a/Perfectblueposter.png",
      generos: [1],
      enCines: false,
      proximosEstrenos: true
    },
    {
      titulo: 'Demon Slayer: Mugen Train',
      fechaLanzamiento: new Date("2020-10-16"),
      precio: (Math.random() * 20 + 5).toFixed(2),
      poster: "https://upload.wikimedia.org/wikipedia/en/thumb/2/21/Kimetsu_no_Yaiba_Mugen_Ressha_Hen_Poster.jpg/220px-Kimetsu_no_Yaiba_Mugen_Ressha_Hen_Poster.jpg",
      generos: [2],
      enCines: false,
      proximosEstrenos: true
    }]

  peliculas = this.peliculasOriginal;

}

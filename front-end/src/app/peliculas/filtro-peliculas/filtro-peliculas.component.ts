import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-filtro-peliculas',
  templateUrl: './filtro-peliculas.component.html',
  styleUrls: ['./filtro-peliculas.component.css'],
})
export class FiltroPeliculasComponent implements OnInit {
  form: FormGroup;
  generos = [
    { id: 1, nombre: 'Drama' },
    { id: 2, nombre: 'Acción' },
    { id: 3, nombre: 'Comedia' },
  ];
  peliculas = [
    {
      titulo: 'Spider-Man Far From Home',
      enCines: false,
      proximosEstrenos: true,
      generos: [1, 2],
      poster:
        'https://m.media-amazon.com/images/M/MV5BMGZlNTY1ZWUtYTMzNC00ZjUyLWE0MjQtMTMxN2E3ODYxMWVmXkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_UX182_CR0,0,182,268_AL_.jpg',
    },
    {
      titulo: 'Moana',
      enCines: true,
      proximosEstrenos: false,
      generos: [3],
      poster:
        'https://m.media-amazon.com/images/M/MV5BMjI4MzU5NTExNF5BMl5BanBnXkFtZTgwNzY1MTEwMDI@._V1_UX182_CR0,0,182,268_AL_.jpg',
    },
    {
      titulo: 'Inception',
      enCines: false,
      proximosEstrenos: false,
      generos: [1, 3],
      poster:
        'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_UX182_CR0,0,182,268_AL_.jpg',
    },
  ];
  peliculasOriginal = this.peliculas;
  formularioOriginal = {
    titulo: '',
    generoId: 0,
    proximosEstrenos: false,
    enCines: false,
  };

  constructor(
    private formBuilder: FormBuilder,
    private location: Location,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group(this.formularioOriginal);

    this.leerValoresURL();
    this.buscarPeliculas(this.form.value);

    this.form.valueChanges.subscribe((valores) => {
      this.peliculas = this.peliculasOriginal;
      this.buscarPeliculas(valores);
      this.escribirParametrosBusquedaEnURL();
    });
  }

  buscarPeliculas(valores: any) {
    if (valores.titulo) {
      this.peliculas = this.peliculas.filter((pelicula) => {
        return pelicula.titulo.indexOf(valores.titulo) !== -1;
      });
    }

    if (valores.generoId) {
      this.peliculas = this.peliculas.filter((pelicula) => {
        return pelicula.generos.indexOf(valores.generoId) !== -1;
      });
    }

    if (valores.proximosEstrenos) {
      this.peliculas = this.peliculas.filter((pelicula) => {
        return pelicula.proximosEstrenos;
      });
    }

    if (valores.enCines) {
      this.peliculas = this.peliculas.filter((pelicula) => {
        return pelicula.enCines;
      });
    }
  }

  private leerValoresURL() {
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      const objeto: any = {};

      if (params.titulo) {
        objeto.titulo = params.titulo;
      }

      if (params.generoId) {
        objeto.generoId = +params.generoId;
      }

      if (params.proximosEstrenos) {
        objeto.proximosEstrenos = true;
      }

      if (params.enCines) {
        objeto.enCines = true;
      }

      this.form.patchValue(objeto);
    });
  }

  private escribirParametrosBusquedaEnURL() {
    const queryStrings = [];
    const valoresFormulario = this.form.value;

    if (valoresFormulario.titulo) {
      queryStrings.push(`titulo=${valoresFormulario.titulo}`);
    }

    if (valoresFormulario.generoId !== 0) {
      queryStrings.push(`generoId=${valoresFormulario.generoId}`);
    }

    if (valoresFormulario.proximosEstrenos) {
      queryStrings.push(
        `proximosEstrenos=${valoresFormulario.proximosEstrenos}`
      );
    }

    if (valoresFormulario.enCines) {
      queryStrings.push(`enCines=${valoresFormulario.enCines}`);
    }

    this.location.replaceState('/peliculas/buscar', queryStrings.join('&'));
  }

  limpiar(): void {
    this.form.patchValue(this.formularioOriginal);
  }
}

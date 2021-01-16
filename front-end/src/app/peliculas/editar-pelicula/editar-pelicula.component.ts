import { Component, OnInit } from '@angular/core';
import { PeliculaCreacionDto, PeliculaDto } from '../pelicula';

@Component({
  selector: 'app-editar-pelicula',
  templateUrl: './editar-pelicula.component.html',
  styleUrls: ['./editar-pelicula.component.css'],
})
export class EditarPeliculaComponent implements OnInit {
  modelo: PeliculaDto = {
    titulo: 'Spider-Man',
    resumen: '# Película *itálica*',
    trailer: 'https://www.youtube.com/watch?v=Nt9L1jCKGnE',
    fechaLanzamiento: new Date(),
    enCines: true,
    poster:
      'https://m.media-amazon.com/images/M/MV5BMjMwNDkxMTgzOF5BMl5BanBnXkFtZTgwNTkwNTQ3NjM@._V1_UX182_CR0,0,182,268_AL_.jpg',
  };

  constructor() {}

  ngOnInit(): void {}

  guardarCambios(pelicula: PeliculaCreacionDto) {
    console.log(pelicula);
  }
}

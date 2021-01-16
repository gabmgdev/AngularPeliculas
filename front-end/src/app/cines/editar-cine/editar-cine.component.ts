import { Component, OnInit } from '@angular/core';
import { cineCreacionDto, cineDto } from '../cine';

@Component({
  selector: 'app-editar-cine',
  templateUrl: './editar-cine.component.html',
  styleUrls: ['./editar-cine.component.css'],
})
export class EditarCineComponent implements OnInit {
  modelo: cineDto = {
    nombre: 'Cinemex Altozano',
    latitud: 19.67493699334435,
    longitud: -101.16217374801636,
  };

  constructor() {}

  ngOnInit(): void {}

  guardarCambios(cine: cineCreacionDto) {
    console.log(cine);
  }
}

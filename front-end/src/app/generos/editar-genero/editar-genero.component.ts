import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { generoCreacionDto } from '../genero';

@Component({
  selector: 'app-editar-genero',
  templateUrl: './editar-genero.component.html',
  styleUrls: ['./editar-genero.component.css'],
})
export class EditarGeneroComponent implements OnInit {
  modelo: generoCreacionDto = {
    nombre: 'Acción',
  };

  constructor(private router: Router) {}

  ngOnInit(): void {}

  guardarCambios(genero: generoCreacionDto) {
    console.log(genero);
    this.router.navigate(['/generos']);
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { actorCreacionDto, actorDto } from '../actor';

@Component({
  selector: 'app-editar-actor',
  templateUrl: './editar-actor.component.html',
  styleUrls: ['./editar-actor.component.css'],
})
export class EditarActorComponent implements OnInit {
  modelo: actorDto = {
    nombre: 'Tom Holland',
    fechaNacimiento: new Date(),
    foto:
      'https://m.media-amazon.com/images/M/MV5BNTAzMzA3NjQwOF5BMl5BanBnXkFtZTgwMDUzODQ5MTI@._V1_UY317_CR23,0,214,317_AL_.jpg',
  };

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      console.log(params.id);
    });
  }

  guardarCambios(actor: actorCreacionDto) {
    console.log(actor);
  }
}

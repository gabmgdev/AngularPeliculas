import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Coordenada } from 'src/app/utilidades/mapa/coordenada';
import { cineCreacionDto, cineDto } from '../cine';

@Component({
  selector: 'app-formulario-cine',
  templateUrl: './formulario-cine.component.html',
  styleUrls: ['./formulario-cine.component.css'],
})
export class FormularioCineComponent implements OnInit {
  form: FormGroup;
  coordenadaInicial: Coordenada[] = [];
  @Output()
  guardarCambios: EventEmitter<cineCreacionDto> = new EventEmitter<cineCreacionDto>();
  @Input() modelo: cineDto;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nombre: new FormControl('', {
        validators: [Validators.required],
      }),
      latitud: this.formBuilder.control('', {
        validators: [Validators.required],
      }),
      longitud: this.formBuilder.control('', {
        validators: [Validators.required],
      }),
    });

    if (this.modelo !== undefined) {
      this.form.patchValue(this.modelo);
      this.coordenadaInicial.push({
        latitud: this.modelo.latitud,
        longitud: this.modelo.longitud,
      });
    }
  }

  OnSubmit() {
    this.guardarCambios.emit(this.form.value);
  }

  coordenadaSeleccionada(coordenada: Coordenada) {
    this.form.patchValue(coordenada);
  }
}

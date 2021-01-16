import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { actorCreacionDto, actorDto } from '../actor';

@Component({
  selector: 'app-formulario-actores',
  templateUrl: './formulario-actores.component.html',
  styleUrls: ['./formulario-actores.component.css'],
})
export class FormularioActoresComponent implements OnInit {
  form: FormGroup;
  @Output()
  OnSubmit: EventEmitter<actorCreacionDto> = new EventEmitter<actorCreacionDto>();
  @Input() modelo: actorDto;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nombre: [
        '',
        {
          validators: [Validators.required],
        },
      ],
      fechaNacimiento: '',
      foto: '',
      biografia: '',
    });

    if (this.modelo !== undefined) {
      this.form.patchValue(this.modelo);
    }
  }

  onSubmit() {
    this.OnSubmit.emit(this.form.value);
  }

  archivoSeleccionado(file) {
    this.form.get('foto').setValue(file);
  }

  cambioMarkdown(texto: string) {
    this.form.get('biografia').setValue(texto);
  }
}

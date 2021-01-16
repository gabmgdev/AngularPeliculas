import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { primeraLetraMayuscula } from 'src/app/utilidades/validadores/primeraLetraMayuscula';
import { generoCreacionDto } from '../genero';

@Component({
  selector: 'app-formulario-genero',
  templateUrl: './formulario-genero.component.html',
  styleUrls: ['./formulario-genero.component.css'],
})
export class FormularioGeneroComponent implements OnInit {
  form: FormGroup;
  @Output()
  onSubmit: EventEmitter<generoCreacionDto> = new EventEmitter<generoCreacionDto>();
  @Input() modelo: generoCreacionDto;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nombre: [
        '',
        {
          validators: [Validators.required, primeraLetraMayuscula()],
        },
      ],
    });

    if (this.modelo !== undefined) {
      this.form.patchValue(this.modelo);
    }
  }

  guardarCambios() {
    this.onSubmit.emit(this.form.value);
  }

  obtenerErrorCampoNombre(): string {
    const campo = this.form.get('nombre');
    if (campo.hasError('required')) {
      return 'El campo nombre es requerido';
    }
    if (campo.hasError('primeraLetraMayuscula')) {
      return campo.getError('primeraLetraMayuscula').mensaje;
    }
    return '';
  }
}

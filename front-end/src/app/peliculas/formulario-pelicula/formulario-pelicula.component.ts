import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MultipleSelectorModel } from 'src/app/utilidades/selector-multiple/multipleSelectorModel';
import { PeliculaCreacionDto, PeliculaDto } from '../pelicula';

@Component({
  selector: 'app-formulario-pelicula',
  templateUrl: './formulario-pelicula.component.html',
  styleUrls: ['./formulario-pelicula.component.css'],
})
export class FormularioPeliculaComponent implements OnInit {
  form: FormGroup;
  @Output()
  OnSubmit: EventEmitter<PeliculaCreacionDto> = new EventEmitter<PeliculaCreacionDto>();
  @Input() modelo: PeliculaDto;
  generosNoSeleccionados: MultipleSelectorModel[] = [
    { llave: 1, valor: 'Drama' },
    { llave: 2, valor: 'Acción' },
    { llave: 3, valor: 'Comedia' },
  ];
  generosSeleccionados: MultipleSelectorModel[] = [];
  cinesNoSeleccionados: MultipleSelectorModel[] = [
    { llave: 1, valor: 'Cinemex Altozano' },
    { llave: 2, valor: 'Cinépolis La Huerta' },
    { llave: 3, valor: 'Cinépolis Centro' },
  ];
  cinesSeleccionados: MultipleSelectorModel[] = [];

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      titulo: this.formBuilder.control('', {
        validators: [Validators.required],
      }),
      resumen: '',
      enCines: false,
      fechaLanzamiento: '',
      trailer: '',
      poster: '',
      generosId: '',
      cinesId: '',
    });

    if (this.modelo !== undefined) {
      this.form.patchValue(this.modelo);
    }
  }

  guardarCambios() {
    const generosIds = this.generosSeleccionados.map((val) => val.llave);
    this.form.get('generosId').setValue(generosIds);
    const cinesIds = this.cinesSeleccionados.map((val) => val.llave);
    this.form.get('cinesId').setValue(cinesIds);
    console.log(cinesIds);
    this.OnSubmit.emit(this.form.value);
  }

  archivoSeleccionado(archivo: File) {
    this.form.get('poster').setValue(archivo);
  }

  changeMarkdown(texto: string) {
    this.form.get('resumen').setValue(texto);
  }
}

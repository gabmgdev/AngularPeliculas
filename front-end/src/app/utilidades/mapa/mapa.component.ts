import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { latLng, LeafletMouseEvent, marker, Marker, tileLayer } from 'leaflet';
import { Coordenada } from './coordenada';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css'],
})
export class MapaComponent implements OnInit {
  options = {
    layers: [
      tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '...',
      }),
    ],
    zoom: 14,
    center: latLng(19.69212478265382, -101.18794441223146),
  };
  capas: Marker<any>[] = [];
  @Output()
  coordenadaSeleccionada: EventEmitter<Coordenada> = new EventEmitter<Coordenada>();
  @Input() coordenadasIniciales: Coordenada[] = [];

  constructor() {}

  ngOnInit(): void {
    this.capas = this.coordenadasIniciales.map((valor) => {
      return marker([valor.latitud, valor.longitud]);
    });
  }

  manejarClick(evento: LeafletMouseEvent) {
    const latitud = evento.latlng.lat;
    const longitud = evento.latlng.lng;
    const coordenada: Coordenada = {
      latitud,
      longitud,
    };
    this.capas = [];
    this.capas.push(marker([latitud, longitud]));
    this.coordenadaSeleccionada.emit(coordenada);
  }
}

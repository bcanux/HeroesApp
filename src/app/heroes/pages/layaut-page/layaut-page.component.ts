import { UrlCodec } from '@angular/common/upgrade';
import { Component } from '@angular/core';

@Component({
  selector: 'app-layaut-page',
  templateUrl: './layaut-page.component.html',
  styles: ``
})
export class LayautPageComponent {
  public sidebarItems = [
    {label: 'Listado', icon:'label', URL:'./list'},
    {label: 'Añadir', icon:'add', URL:'./new-hero'},
    {label: 'Buscar', icon:'search', URL:'./search'},
  ]
}

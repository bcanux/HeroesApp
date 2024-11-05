import { UrlCodec } from '@angular/common/upgrade';
import { Component } from '@angular/core';
import {  Router } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';
import { User } from '../../../auth/interfaces/user.interface';

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

  constructor(
    private authService: AuthService,
    private router: Router
  ){}

  get user():User | undefined{
    return this.authService.currentUser;
  }

  onLogout():void{
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }
}

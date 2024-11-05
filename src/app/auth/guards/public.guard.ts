import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanMatch,  Route, UrlSegment, GuardResult, MaybeAsync, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map, Observable, tap } from 'rxjs';

@Injectable({providedIn: 'root'})
export class PublicGuard implements CanMatch, CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  private checkAutStatus(): boolean | Observable<boolean>{
    return this.authService.checkAutenication()
    .pipe(
      tap(isAutenticated =>  console.log('Authenticated: ', isAutenticated)),
      tap(isAutenticated => {
        if(isAutenticated) {
          this.router.navigate(['./'])
        }

      }),
      map(isAutenticated => !isAutenticated)
    )

  }

  canMatch(route: Route, segments: UrlSegment[]): MaybeAsync<GuardResult> {
    console.log('Can Match');
    console.log({route, segments});

    return this.checkAutStatus();
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
    console.log('Can Activate');
    console.log({route, state});

    return this.checkAutStatus();
  }



}

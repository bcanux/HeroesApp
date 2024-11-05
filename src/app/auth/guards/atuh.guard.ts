import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanMatch,  Route, UrlSegment, GuardResult, MaybeAsync, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable, tap } from 'rxjs';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanMatch, CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  private checkAutStatus(): boolean | Observable<boolean>{
    return this.authService.checkAutenication()
    .pipe(
      tap(isAtenticated =>  console.log('Authenticated: ', isAtenticated)),
      tap(isAtenticated => {
        if(!isAtenticated) {
          this.router.navigate(['./auth/login'])
        }
      })

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

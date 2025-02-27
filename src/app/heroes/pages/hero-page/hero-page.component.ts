import { Component, OnInit } from '@angular/core';
import { HeroService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { delay, switchMap } from 'rxjs';
import { Hero } from '../../interfaces/hero.interface';
import { reportUnhandledError } from 'rxjs/internal/util/reportUnhandledError';

@Component({
  selector: 'app-hero-page',
  templateUrl: './hero-page.component.html',
  styles: ``
})
export class HeroPageComponent implements OnInit {

  public hero?:Hero;

  constructor(
    private heroService:HeroService,
    private activatedRoute: ActivatedRoute,
    private router:Router,
  ){}

  ngOnInit(): void {
    this.activatedRoute.params
    .pipe(
      // delay(3000),
      switchMap(({id}) => this.heroService.getHeroById(id)),
    )
    .subscribe(hero => {

      if ( !hero ) return this.router.navigate(['/heroes/list']);

      this.hero = hero;
      console.log({hero});
      return;

    })
  }

  goBack():void{
    this.router.navigateByUrl('heroes/list');
  }

}

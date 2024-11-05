import { Component, OnInit, Pipe } from '@angular/core';
import { HeroService } from '../../services/heroes.service';
import { FormControl } from '@angular/forms';
import { Hero } from '../../interfaces/hero.interface';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Observable, startWith } from 'rxjs';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styles: ``
})
export class SearchPageComponent implements OnInit {

  public searchInput = new FormControl('');
  public heroes: Hero[] = []
  public selectedHero?: Hero;
  public filteredOptions: Observable<Hero[]> | undefined;


  constructor(private heroService:HeroService) {}

  ngOnInit(): void {
    // this.filteredOptions = this.searchInput.Pipe(
    //   startWith(''),
    //   map(value => {
    //     const hero = typeof value === 'string'? value: value?.name;

    //   })
    // );

  }

  searchHero(){
    const value: string = this.searchInput.value || '';

    this.heroService.getSuggestions(value)
    .subscribe( heroes =>  this.heroes = heroes);
    // console.log({value});

  }

  onSelectedOption(event: MatAutocompleteSelectedEvent):void {
    //El backend actualmente no regresa filtrado, hay que validar
    console.log(event.option.value);
    if (!event.option.value){
      this.selectedHero = undefined;
      return;
    }
    const hero:Hero = event.option.value;
    this.searchInput.setValue(hero.superhero);
  }

}

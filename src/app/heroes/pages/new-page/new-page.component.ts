import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';
import { filter, switchMap, tap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';

import { Hero, Publisher } from '../../interfaces/hero.interface';
import { HeroService } from '../../services/heroes.service';

@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styles: ``
})
export class NewPageComponent implements OnInit {

  public heroForm = new FormGroup({
    id: new FormControl(''),
    superhero: new FormControl('', {nonNullable: true}),
    publisher: new FormControl<Publisher>(Publisher.DCComics),
    alter_ego: new FormControl(''),
    first_appearance:new FormControl(''),
    characters: new FormControl(''),
    alt_img: new FormControl('')
  });


  public publishers =[
    {id: 'DC Comics', desc: 'DC - Comics'},
    {id: 'Marvel Comics', desc: 'Marvel - Comics'},
  ];

  constructor(
    private heroService: HeroService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackbar: MatSnackBar,
    private dialog: MatDialog,
  ){}

  get currentHero():Hero{
    const hero = this.heroForm.value as Hero;

    return hero;
  }

  ngOnInit(): void {
    if(!this.router.url.includes('edit')) return;
    this.activatedRoute.params
    .pipe(
      switchMap(({id}) => this.heroService.getHeroById( id )),
    ).subscribe(hero => {

      if(!hero) return this.router.navigateByUrl('/');

      this.heroForm.reset( hero );
      return;
    })
  }

  onSubmit():void {
    if (this.heroForm.invalid) return;

    if(this.currentHero.id){
      this.heroService.updateHero(this.currentHero)
      .subscribe( hero => {
        this.showSnackbar(`${hero.superhero} updated!`);
        // TODO: mostrar snackbar
      });
      return;
    }


    this.heroService.addHero(this.currentHero)
    .subscribe( hero => {
      this.router.navigate(['/edit/edit', hero.id])
      this.showSnackbar(`${hero.superhero} created!`);
      // TODO: Mostrar snackbar y navergar a /heroes/edit/hero.id
    });
    // console.log({
    //   formIsValid:  this.heroForm.valid,
    //   value:  this.heroForm.value
    // });
  }

  onDeleteHero(){
    if(!this.currentHero.id) throw Error('Hero id is required');
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: this.heroForm.value,
    });

    dialogRef.afterClosed()
    .pipe(
      filter((result: Boolean) => result === true ),
      switchMap(()=> this.heroService.deleteHeroById(this.currentHero.id)),
      tap((wasDeleted: boolean)  => wasDeleted)
      // tap(wasDeleted  => console.log({wasDeleted}))

    )
    .subscribe(result => {
      // console.log({result});
      this.router.navigate(['heroes']);
    });

    //Si funciona, pero se comenta por otimización
    // dialogRef.afterClosed().subscribe(result => {
    //   if(!result) return;

    //   this.heroService.deleteHeroById(this.currentHero.id)
    //   .subscribe(wasDeleted => {
    //     this.router.navigate(['heroes']);
    //   });
    // });
  }

  showSnackbar(message: string):void {
    this.snackbar.open(message, 'done',{
      duration: 2500,
    })
  }
}

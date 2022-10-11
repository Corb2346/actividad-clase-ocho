import { Component, OnInit } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { ApiserviceService } from '../../../services/apiservice.service';

@Component({
  selector: 'app-dos',
  templateUrl: './dos.component.html',
  styleUrls: ['./dos.component.scss']
})
export class DosComponent implements OnInit {

  public characterName:string ='Morty';

  public character$!: Observable<any>

  constructor( private ApiserviceService: ApiserviceService) { 
    this.character$ = this.ApiserviceService.searchCharacter(this.characterName).pipe(
     /* map((resp:any) => {
        console.log("trae characters",resp);
      })*/
      tap(console.log)
    )
  }
   
  ngOnInit(): void {
  }

  onChange(){
    console.log(this.characterName);
    this.character$ = this.ApiserviceService.searchCharacter(this.characterName).pipe(
      tap(console.log)
    )
  }

}

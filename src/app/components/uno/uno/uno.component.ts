import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import StorageHelper from 'src/app/libs/helpers/storage.helper';
import { ApiserviceService } from '../../../services/apiservice.service';

@Component({
  selector: 'app-uno',
  templateUrl: './uno.component.html',
  styleUrls: ['./uno.component.scss']
})
export class UnoComponent implements OnInit {

  public username: string ='';
  public password: string ='';

  constructor( private ApiserviceService: ApiserviceService,private router:Router) { }

  ngOnInit(): void {
  }

  onClick(){
    console.log("username",this.username, "password",this.password);
    
    this.ApiserviceService.login(this.username,this.password).subscribe(
      {next : response => {
        StorageHelper.setItem('session',response)
        this.router.navigate(['search'])
      }}
    );
  }

}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {

  constructor( private http: HttpClient) { }

  login(username: string,password:string):Observable<any>{
    return this.http.post('http://ec2-18-116-97-69.us-east-2.compute.amazonaws.com:4001/api/login',
    {
      username, //solo aplica si el parametro se llama igual a la key si no se pone completo
      password
    })
  }

  searchCharacter(characterName:string){
    return this.http.post('http://ec2-18-116-97-69.us-east-2.compute.amazonaws.com:4001/mirror/rickandmorty',
    {
      endpoint: `character/?name=${characterName}` 
    })
    
  }
}

import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class UserStoreService {

  private fullname$ = new BehaviorSubject<string>("");
  private email$ = new BehaviorSubject<string>("");
  private id$ = new BehaviorSubject<number>(0);

  constructor() {}

    public getEmailFromStore(){
      return this.email$.asObservable();
    }

    public setEmailForStore(email:string){
      this.email$.next(email);
    }

    public getFullNameFromStore(){
      return this.fullname$.asObservable();
    }
    public setFullNameForStore(fullname:string){
      this.fullname$.next(fullname);
    }
    public setIdForToken(id:number){
      this.id$.next(id);
    }
    public getFullIdFromStore(){
      return this.id$.asObservable();
    }
    
}

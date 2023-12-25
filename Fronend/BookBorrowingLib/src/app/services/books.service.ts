import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs'
import { HttpClientModule } from '@angular/common/http';
import { Books } from '../model/model';

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  

  constructor(private http:HttpClient) { }
  private Base_Url="https://localhost:7036/api/Books";

  getallbooks(){
    return this.http.get<any[]>(`${this.Base_Url}`);
  }
  getavailablebooks(){
    return this.http.get<any[]>(`${this.Base_Url}/available-books`)
  }
  getbookbyid(id:number):Observable<Books>{
    return this.http.get<Books>(`${this.Base_Url}/${id}`)
  }
  boorowbook(bookid:number,userid:number){
    return this.http.post(`${this.Base_Url}/borrow/${bookid}/${userid}`,{},{responseType:'text'})
  }
  alllent_books(userid:number)
  {
    return this.http.get<any[]>(`${this.Base_Url}/lent-books/${userid}`)
  }
  allborrow_books(userid:number)
  {
    return this.http.get<any[]>(`${this.Base_Url}/Borrow-books/${userid}`)
  }
  addbook(book:Books)
  {
     return this.http.post(`${this.Base_Url}`,book, { observe: 'response' });
  }
  returnbook(bookid:number)
  {
    return this.http.post(`${this.Base_Url}/return/${bookid}`,{},{observe:'response' })
  }
}

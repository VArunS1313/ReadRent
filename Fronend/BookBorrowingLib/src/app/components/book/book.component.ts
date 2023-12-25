import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { Books } from 'src/app/model/model';
import { BooksService } from 'src/app/services/books.service';
import { UserStoreService } from 'src/app/services/user-store.service';
import { UserService } from 'src/app/services/user.service';
//import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {
  id=0;
  userid:number=0;
  book:Books | undefined;
  constructor(private activeRoutes:ActivatedRoute,private router:Router,private bookservise:BooksService,
    private userservice:UserService){
      this.userid=this.userservice.getIdFromToken();
     
    activeRoutes.params.subscribe((paramas)=>{
      if(paramas['id'])
      {
         const ids=paramas['id']
         bookservise.getbookbyid(ids).subscribe((data)=>{
          this.book=data;
         })
         
        this.id=ids}
         
      })
  }
  ngOnInit(): void {
  //  throw new Error('Method not implemented.');
  }
  getStars(rating: number): number[] {
    return Array(rating);
  }
  bookborrow(bookid:number){
    if(this.book?.lent_by_user_id==this.userid)
    {
      alert("It is your Book");

    }
    else{
    this.bookservise.boorowbook(bookid,this.userid).subscribe(
      (res) => {
        alert('Book is Borrowed');
        this.router.navigate(['home']);
      },
      (error) => {
        if (error.status === 400 && error.error === 'User does not have enough tokens to borrow the book.') {
          alert('User does not have enough tokens to borrow the book.');
        } else {
        console.error('Error borrowing book:', error);}
        // Handle errors if necessary
      }
    )}
  }
  // toborrow(id:number){
  //   this.bookservise.boorowbook(id,this.userid).subscribe((data)=>{

  //   })
  //   //this.router.navigate(['/userdash']);//do navigation

  // }



}

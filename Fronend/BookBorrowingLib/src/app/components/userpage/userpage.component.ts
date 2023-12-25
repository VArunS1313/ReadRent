import { Component,OnInit } from '@angular/core';
import { Books, User } from 'src/app/model/model';
import { BooksService } from 'src/app/services/books.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-userpage',
  templateUrl: './userpage.component.html',
  styleUrls: ['./userpage.component.css']
})
export class UserpageComponent implements OnInit{

id:number=0;
userr:User | undefined;
lentBooks:Books[]=[];
borrowBooks:Books[]=[];
constructor(private userservice:UserService,private bookservice:BooksService,
  private router:Router
  ){
  this.id=this.userservice.getIdFromToken();
  this.userservice.getuser(this.id).subscribe((data)=>{
    this.userr=data
    console.log("this.userr "+this.userr);
    //this.userservice.setUsertostorage(this.userr);

  })
  // const user=this.userservice.getUserfromstorege();
  // if (user) {
  //   this.userr=user;
    
  //   console.log('User:', user);
  //   // Use the user object as needed
  // } else {
  //   console.log('User not found in local storage.');
  // }

}
  ngOnInit(): void {
    console.log(this.id);
    this.bookservice.allborrow_books(this.id).subscribe((data)=>{
      this.borrowBooks=data;
    },
    (error) => {
      console.log('No books borrowed.');
      
    if (error.status === 404) {
     
      console.log('No books borrowed.');
      this.router.navigate(['user']);
    } else {
      
      console.log('An error occurred while fetching lent books.');
    }
    })
    this.bookservice.alllent_books(this.id).subscribe((data)=>{
      this.lentBooks=data;
    },
    (error)=>{
      console.log('No books for lent.');
      
      if (error.status === 404) {
       
        console.log('No books lent.');
      }  
    }
    )
    
    

  }

  return(bookId:number)
  {
    this.bookservice.returnbook(bookId).subscribe((res)=>{
     
        alert('Book is return');
        this.router.navigate(['user']);
    
        // Handle unexpected response status
      
      // alert("book is saved");
      // this.router.navigate(['home'])
    },
    (error) => {
      console.error('Error creating books:', error);
      // Handle errors if necessary
    })



  }
}

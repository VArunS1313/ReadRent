import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Books } from 'src/app/model/model';
import { BooksService } from 'src/app/services/books.service';
import { UserStoreService } from 'src/app/services/user-store.service';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit{
  addbookForm!:FormGroup;
  book!:Books;

  isSubmitted = false;
  id:number=0;
 // returnUrl = '';
  constructor(private formBuilder: FormBuilder,
    private bookservise:BooksService,
     private activatedRoute:ActivatedRoute,
     private userstore:UserStoreService,
     private userservice:UserService,
     private router:Router) { }
    

  ngOnInit(): void {
    //this.id=this.userservice.getIdFromToken();
    this.addbookForm = this.formBuilder.group({
      name:['', [Validators.required]],
      author:['', Validators.required],
      genre:['', Validators.required],
      rating:['', [Validators.required,this.ratingValidator()]],
      discription:['', Validators.required],



    });
    this.id=this.userservice.getIdFromToken();
    // this.userstore.getFullIdFromStore().subscribe((val)=>{
    //   this.id=val;
    // })
    console.log(" ID=="+this.id);

   // this.returnUrl = this.activatedRoute.snapshot.queryParams.returnUrl;
  }

  get fc(){
    return this.addbookForm.controls;
  }
  ratingValidator() {
    return (control: { value: any; }) => {
      const rating = control.value;
      if (rating === null || rating === undefined || isNaN(rating)) {
        // Return null if the value is not a number
        return null;
      }

      // Check if the rating is between 1 and 5
      if (rating < 1 || rating > 5) {
        return { invalidRating: true };
      }

      // Return null if the validation passes
      return null;
    };
  }

  submit(){
    this.isSubmitted = true;
    
    if(this.addbookForm.invalid) return;
   
    this.book = {
      bookId:0,
      name: this.fc['name'].value,
      author: this.fc['author'].value,
      genre: this.fc['genre'].value,
      rating: this.fc['rating'].value,
      discription: this.fc['discription'].value,
      is_available:true,
      lent_by_user_id:this.id,
      borrower_user_id:0
      /*is_available:boolean;
    discription:string
    lent_by_user_id :number
    borrower_user_id:number*/


      // Add other properties as needed
    };
    this.bookservise.addbook(this.book).subscribe((res)=>{
      if (res.status === 200||res.status===201) {
        alert('Book is saved');
        this.router.navigate(['home']);
      } else {
        console.error('Unexpected response status:', res.status);
        // Handle unexpected response status
      }
      // alert("book is saved");
      // this.router.navigate(['home'])
    },
    (error) => {
      console.error('Error creating books:', error);
      // Handle errors if necessary
    })


  
    

    console.log( this.book);

    
  }
}



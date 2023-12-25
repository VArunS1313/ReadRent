import { Component ,OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/model/model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit{
  adduserForm!:FormGroup;
  isSubmitted = false;
  user:User | undefined;
  constructor(private formBuilder: FormBuilder,private router:Router,
    private userservice:UserService)
  {

  }
  ngOnInit(): void {
   // throw new Error('Method not implemented.');
   this.adduserForm = this.formBuilder.group({
    username:['', [Validators.required]],
    userEmail:['', [Validators.required,Validators.email]],
    password:['', [Validators.required]]
/*
name:['', [Validators.required]],
      author:['', Validators.required],
      genre:['', Validators.required],
      rating:['', [Validators.required,this.ratingValidator()]],
      discription:['', Validators.required],
      userEmail: string;
    username: string;
    password: string;
*/
   })
  }
  get fc(){
    return this.adduserForm.controls;
  }
  submit(){
    this.isSubmitted=true;
    if(this.adduserForm.invalid) return;

    this.user={
      userId:0,
      username:this.fc['username'].value,
      password:this.fc['password'].value,
      userEmail:this.fc['userEmail'].value,
      lib_token:10,
      books_boorow:[],
      books_lent:[],
      token:""

      /**lib_token:number;
    books_boorow:[];
    books_lent:[];
    token:string; */

    }
    console.log(this.user);
    this.userservice.adduser(this.user).subscribe((res)=>{
      console.log("new user added");
      this.router.navigate(['login']);
    },
    (error)=>{
      console.log(" Error in creating user ",error)
    })



  }


}

import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/model/model';
import { UserStoreService } from 'src/app/services/user-store.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  loginForm!:FormGroup;
  isSubmitted = false;
 // returnUrl = '';
  constructor(private formBuilder: FormBuilder,
     private activatedRoute:ActivatedRoute,
     private router:Router,
     private userservice:UserService,
     private userstore:UserStoreService) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username:['', [Validators.required]],
      password:['', Validators.required]
    });
    console.log(this.userservice.isLoggedin());

   // this.returnUrl = this.activatedRoute.snapshot.queryParams.returnUrl;
  }

  get fc(){
    return this.loginForm.controls;
  }
  email:string="";
  //user!:User;
  logout()
  {
    this.userservice.logOut();
    
  }
  id:number=0;
  userr:User | undefined;
  submit(){
    this.isSubmitted = true;
    if(this.loginForm.invalid) return;
    console.log(this.loginForm.value);
    let user:User ={
      userId: 0,
      username: this.fc['username'].value,
      userEmail: "",
      password: this.fc['password'].value,
      lib_token: 0,
      books_boorow: [],

      token: "",
      books_lent: []
    }
      //console.log(user);
      this.userservice.login(user).subscribe({next:(data:any)=>{
        console.log("data==>>  "+data.username+" jwt  "+data.token);
        this.userservice.storeToken(data.token);
        const tokenPayload = this.userservice.decodeToken();
        console.log(tokenPayload.Name+"  "+tokenPayload.Id+" "+tokenPayload.Email);
        this.id=tokenPayload.Id;
       this.userstore.setFullNameForStore(tokenPayload.Name);
       this.userstore.setIdForToken(tokenPayload.Id);
       this.userstore.setEmailForStore(tokenPayload.Email);
       
       this.userstore.getEmailFromStore().subscribe((email)=>{
        this.email=email;
       });
        this.id=this.userservice.getIdFromToken();
        console.log("id for op "+this.id);
        this.userservice.getuser(this.id).subscribe((data)=>{
          this.userr=data
          console.log("this.userr "+this.userr);
          // this.userservice.setUsertostorage(this.userr);
  
        })
      //  console.log("user detail"+this.email+" id "+id);
       
       
       this.router.navigate(['home']);

      },error: (err) => {
        console.log("Invalid login credatials ");

      }}
      
      )
     

      
    
  }
}

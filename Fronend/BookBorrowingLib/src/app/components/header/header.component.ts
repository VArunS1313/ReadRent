import { Component,OnInit} from '@angular/core';
import { UserStoreService } from 'src/app/services/user-store.service';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  islogin:boolean=false;
  username:string='user name';
  constructor(private userservice:UserService,private userstoreservice:UserStoreService,
    private router:Router){
   
    

    //this.username
    

  }
  ngOnInit(): void {
   // throw new Error('Method not implemented.');
   this.islogin=this.userservice.isLoggedin();
   this.userstoreservice.getFullNameFromStore().subscribe(
    (fullName) => {
      this.username = fullName;
      console.log('Username:', this.username);
    },
    (error) => {
      console.error('Error getting username:', error);
    }
  );
  }
  login()
  {
    if(this.islogin==true)
    {
      this.islogin=false;
      this.userservice.logOut();
      this.router.navigate(['login']);
    }
    else{
    
      this.router.navigate(['home']);
    }
  }

}

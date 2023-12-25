import { Component,OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit{
  ngOnInit(): void {
    //throw new Error('Method not implemented.');
  }
  searchterm='';
  
  constructor(activeroute:ActivatedRoute,private route:Router){
    activeroute.params.subscribe((params)=>{
      if(params['searchterm'])
      {
        this.searchterm =params['searchterm'];
        console.log("asas   "+this.searchterm);
      }
    })

  }
  search(term:string)
  {
    if(term)
    {
      this.route.navigateByUrl('/search/'+term);
    }
  }

}

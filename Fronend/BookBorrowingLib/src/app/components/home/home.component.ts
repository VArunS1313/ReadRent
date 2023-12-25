import { Component,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Books } from 'src/app/model/model';
import { BooksService } from 'src/app/services/books.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  books:Books[]=[]
  searchbooks:Books[]=[];
  keyword:string="";
  constructor(private bookservise:BooksService,private activeroute:ActivatedRoute){

  }
  imgurl="";
 
  ngOnInit(): void {
    
    this.activeroute.params.subscribe((params)=>{
      if(params['searchterm'])
      {
        this.keyword=params['searchterm']
        console.log("search ==="+this.keyword);
    this.bookservise.getavailablebooks().subscribe((data)=>{
      console.log("opp"+ data)

      this.books=data;
      this.books=this.keyword===""?this.books:this.books.filter((element)=>{
        return element.name.toLocaleLowerCase().includes(this.keyword.toLowerCase());
      })
     // console.log("search result"+this.searchbooks);
     // this.books=this.searchbooks
    })
      
       
       // this.books=this.searchbooks

       
      }
      else{
        this.bookservise.getavailablebooks().subscribe((data)=>{
          console.log("opp"+ data)
    
          this.books=data;
        })
      }
      
    }
    )
  
    this.imgurl="/assets/img/2.jpg"
    //console.log(this.books);
    
   // throw new Error('Method not implemented.');
  }
  getStars(rating: number): number[] {
    return Array(rating);
  }


}

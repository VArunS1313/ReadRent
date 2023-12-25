/*
"userId": 1,
  "userEmail": "varun@gmail.com",
  "username": "varun1",
  "password": "varun123",
  "lib_token": 10,
  "books_boorow": null,
  "books_lent": null,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJOYW1lIjoidmFydW4xIiwiSWQiOiIxIiwiRW1haWwiOiJ2YXJ1bkBnbWFpbC5jb20iLCJuYmYiOjE3MDEwODMzOTYsImV4cCI6MTcwMTE2OTc5NSwiaWF0IjoxNzAxMDgzMzk2fQ.HlMmtuJZ4ALG4g-tPVyXHkP2kvHGiqTdomdB0NplsDs"
*/
export interface User {
    userId: number;
    userEmail: string;
    username: string;
    password: string;
    lib_token:number;
    books_boorow:[];
    books_lent:[];
    token:string;
   
  }


  export interface Books{
    bookId:number;
    name:string;
    author:string;
    rating:number;
    genre:string;
    is_available:boolean;
    discription:string
    lent_by_user_id :number
    borrower_user_id:number
  }
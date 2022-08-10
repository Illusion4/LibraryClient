import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Book, BookCreating } from 'src/app/interfaces/Book';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-books-page',
  templateUrl: './books-page.component.html',
  styleUrls: ['./books-page.component.css']
})
export class BooksPageComponent implements OnInit {

  bookCreatingForm: FormGroup = new FormGroup({
    title:new FormControl(null,Validators.required),
    cover:new FormControl(null,Validators.required),
    genre:new FormControl(null,Validators.required),
    author:new FormControl(null,Validators.required),
    content:new FormControl(null,Validators.required)
  });

  selectedFile:string|null = null;

  constructor(private bookService:BookService) { }

  ngOnInit(): void {

  }

  submitBookCreating(){
    let book:BookCreating = {...this.bookCreatingForm.value}
    this.bookService.saveBook(book).subscribe(res=>{
      this.bookService.getBooks();
    });
  }

  uploadFile(event:any){
    let fileReader = new FileReader();
    let file = event.target.files[0];
    
    if(!file.type.startsWith("image/")){
      this.bookCreatingForm.controls['cover'].setErrors({'incorrect': true});
      console.log("invalid file alert")
      return;
    }  
    this.selectedFile = file.name;
    this.bookCreatingForm.controls['cover'].setErrors(null);
    fileReader.readAsDataURL(file);
    fileReader.onload = ()=>{
      this.bookCreatingForm.patchValue({
        cover: fileReader.result
      });
    };
  }

  clearForm(){
    this.bookCreatingForm.reset();
    this.selectedFile = null;
  }

}

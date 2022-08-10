import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from 'src/app/interfaces/Book';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {

  selected:string = "All"

  constructor(public bookService:BookService) { }

  ngOnInit(): void {
    this.bookService.getBooks();
  }

  onSelectionChange(){
    switch(this.selected){
      case 'Recommended':
        this.bookService.getRecommendedBooks();
        console.log(this.selected);
        break;
      case 'All':
        this.bookService.getBooks();
        break;
    }
  }

}

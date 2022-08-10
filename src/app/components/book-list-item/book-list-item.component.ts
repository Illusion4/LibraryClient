import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Book } from 'src/app/interfaces/Book';
import { BookService } from 'src/app/services/book.service';
import { EditBookComponent } from '../edit-book/edit-book.component';
import { ViewBookComponent } from '../view-book/view-book.component';

@Component({
  selector: 'app-book-list-item',
  templateUrl: './book-list-item.component.html',
  styleUrls: ['./book-list-item.component.css']
})
export class BookListItemComponent implements OnInit {

  @Input() book:Book | null = null;

  constructor(public dialog: MatDialog, private bookService:BookService) { }

  openViewDialog() {

    this.dialog.open(ViewBookComponent, {
      data: {
        bookDetails: this.bookService.getBookDetails(this.book!.id),
      },
    });
  }

  openEditDialog(){

    let bookCreatingForm;
    this.bookService.getBookDetails(this.book!.id).subscribe(book=>{
      bookCreatingForm = new FormGroup({
        title:new FormControl(book.title ,Validators.required),
        cover:new FormControl(book.cover,Validators.required),
        genre:new FormControl(book.genre,Validators.required),
        author:new FormControl(book.author,Validators.required),
        content:new FormControl(book.content,Validators.required)
      })
      this.dialog.open(EditBookComponent, {
        data: {
          bookEditForm: bookCreatingForm,
          bookForEdit:  this.book,
        },
      });
    });
  }

  ngOnInit(): void {
  }

}

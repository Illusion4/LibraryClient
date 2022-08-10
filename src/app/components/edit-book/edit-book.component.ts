import { Component, Inject, Injector, OnInit, Optional } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { map, Observable, tap } from 'rxjs';
import { Book, BookCreating } from 'src/app/interfaces/Book';
import { BookDetails } from 'src/app/interfaces/BookDetails';
import { BookService } from 'src/app/services/book.service';
import { ViewBookComponent } from '../view-book/view-book.component';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css']
})
export class EditBookComponent implements OnInit {

  bookForEdit!: Book;

  bookEditForm: FormGroup;
  selectedFile:string|null = null;
  
  private dialogRef;

  constructor(private injector: Injector, private bookService:BookService) {
      this.dialogRef = this.injector.get(MatDialogRef, null);
      this.bookEditForm = this.injector.get(MAT_DIALOG_DATA, null).bookEditForm;
      this.bookForEdit = this.injector.get(MAT_DIALOG_DATA, null).bookForEdit;
    }

  ngOnInit(): void {
  }

  uploadFile(event:any){
    let fileReader = new FileReader();
    let file = event.target.files[0];
    
    if(!file.type.startsWith("image/")){
      this.bookEditForm.controls['cover'].setErrors({'incorrect': true});
      console.log("invalid file alert")
      return;
    }  
    this.selectedFile = file.name;
    this.bookEditForm.controls['cover'].setErrors(null);
    fileReader.readAsDataURL(file);
    fileReader.onload = ()=>{
      this.bookEditForm.patchValue({
        cover: fileReader.result
      });
    };
  }


  submitBookEditing(){
    let book:BookCreating = {id:this.bookForEdit.id, ...this.bookEditForm.value}
    this.bookService.saveBook(book).subscribe(res=>{
      this.bookForEdit.author = book.author;
      this.bookForEdit.title = book.title;
      this.bookForEdit.cover = book.cover;
    });
  }
  clearForm(){
    this.bookEditForm.reset();
    this.selectedFile = null;
  }

}

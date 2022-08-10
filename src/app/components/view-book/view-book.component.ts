import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { BookDetails } from 'src/app/interfaces/BookDetails';


@Component({
  selector: 'app-view-book',
  templateUrl: './view-book.component.html',
  styleUrls: ['./view-book.component.css']
})
export class ViewBookComponent implements OnInit {

  bookDetails!:Observable<BookDetails>;

  constructor(public dialogRef: MatDialogRef<ViewBookComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.bookDetails = (data.bookDetails as Observable<BookDetails>);
     }

  ngOnInit(): void {
  }


}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Book, BookCreating } from '../interfaces/Book';
import { BookDetails } from '../interfaces/BookDetails';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  books!: Observable<Array<Book>>;

  constructor(private httpClient:HttpClient) { }

  getBooks(){
    this.books = this.httpClient.get<Book[]>(`${environment.baseUrl}/books`)
    
    return this.books;
  }

  getRecommendedBooks(){
    this.books = this.httpClient.get<Book[]>(`${environment.baseUrl}/recommended`)
    
    return this.books;
  }

  getBookDetails(bookId:string){
    return this.httpClient.get<BookDetails>(`${environment.baseUrl}/books/${bookId}`);
  }

  saveBook(book:BookCreating){
    return this.httpClient.post<BookCreating>(`${environment.baseUrl}/books/save`, book);
  }

  
}

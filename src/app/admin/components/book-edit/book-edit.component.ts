import { Component, Input, OnInit } from '@angular/core';
import { BookService } from '../../../services/book.service';
import { Book } from '../../../models/book';
import { Observable } from 'rxjs/Observable';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.css']
})
export class BookEditComponent implements OnInit {

  @Input() book: Observable<Book[]>;
  returnUrl: string;
  image: any;
  formData: any;

    constructor(
        private bookService: BookService,
        private route: ActivatedRoute,
        private location: Location,
        private router: Router,
    ) {
        this.formData = new FormData();
    }

  ngOnInit() {
      this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || 'admin/books';
      this.getEditBook();
  }

    getFiles(event) {
        const fileList: FileList = event.target.files;
        if (fileList.length > 0) {
            const file: File = fileList[0];
            const fileSize: number = fileList[0].size;
            if (fileSize <= 31457280) {
                this.formData.append('image', file);
            }
        }
    }

    getEditBook(): void {
        const id = +this.route.snapshot.paramMap.get('id');
        this.bookService.getBook(id)
            .subscribe(
                book => {
                    this.book = book.json();
                });
    }

    postEditBook(form: NgForm): void {
        this.formData.append('title', form.value.title);
        this.formData.append('description', form.value.description);
        this.formData.append('article_old_image', form.value.article_old_image);
        this.formData.append('id', form.value.id);
        this.formData.append('isbn', form.value.isbn);
        this.formData.append('publication_year', form.value.publication_year);
        this.formData.append('price', form.value.price);
        this.formData.append('genre_id', form.value.genre_id);
        this.formData.append('stock_level', form.value.stock_level);
        this.formData.append('type_id', form.value.type_id);
        this.formData.append('publisher_id', form.value.publisher_id);
        this.bookService.postEditBook(this.formData)
            .subscribe(
                book => {
                    this.book = book.json();
                });
        this.router.navigateByUrl(this.returnUrl);
    }

}
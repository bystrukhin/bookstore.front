import {Component, OnInit} from '@angular/core';
import { NewsService } from '../../../services/news.service';
import { Article } from '../../../models/article';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';
import {PaginationService} from '../../../services/pagination.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

    news: Article[];
    returnUrl: string;
    pager: any = {};
    pagedNews: any[];

    constructor(
        private newsService: NewsService,
        private paginationService: PaginationService,
        private route: ActivatedRoute,
        private location: Location,
        private router: Router,
    ) {   }

    ngOnInit() {
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || 'admin/news';
        this.getAllNews();
    }

    getAllNews(): void {
        this.newsService.getNews()
            .subscribe(
                news => {
                    this.news = news.json();
                    this.setPage(1);
                });
    }

    getDeleteArticle(id): void {
        this.newsService.getDeleteArticle(id)
            .subscribe(
                response => {
                    window.location.reload();
                });
    }

    setPage(page: number) {
        if (page < 1 || page > this.pager.totalPages) {
            return;
        }

        this.pager = this.paginationService.getPager(this.news.length, page);

        this.pagedNews = this.news.slice(this.pager.startIndex, this.pager.endIndex + 1);
    }
}

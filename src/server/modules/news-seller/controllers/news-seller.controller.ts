import {Application} from "express";
import {NewsSellerService} from "../services";

export default class NewsSellerController {
    private newsSellerSerivce: NewsSellerService;

    constructor(private app: Application) {
        this.newsSellerSerivce = new NewsSellerService();
        this.newsSellerRoutes();
    }

    private newsSellerRoutes() {
        this.app.route('/api/news').post(this.newsSellerSerivce.subscribeEmailOnNews);
    }
}

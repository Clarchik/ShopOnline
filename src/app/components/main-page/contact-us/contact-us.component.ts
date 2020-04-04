import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NewsSellerService} from '../../../shared/services/newsseller/news-seller.service';
import {ToastrService} from 'ngx-toastr';
import {TranslateService} from '@ngx-translate/core';

@Component({
    selector: 'app-contact-us',
    templateUrl: './contact-us.component.html',
    styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {
    public newsForm: FormGroup;
    constructor(
        private fb: FormBuilder,
        private toastr: ToastrService,
        private newsSellerService: NewsSellerService,
        private translate: TranslateService) {}

    ngOnInit() {
        this.newsForm = this.fb.group({
            email: [
                null,
                [
                    Validators.required,
                    Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')
                ]
            ]
        });
    }

    subscribeOnNews() {
        const {email} = this.newsForm.controls;
        this.newsSellerService.subscribeOnNews(email.value).subscribe({
            next: (response) => {
                this.toastr.success(this.translate.instant(`NewsSeller.${response.message}`), this.translate.instant('Shared.success'));
            },
            error: ({error}) => {
                this.toastr.error(this.translate.instant(`NewsSeller.${error.message}`), this.translate.instant('Shared.error'));
            },
            complete: () => {
                this.newsForm.reset();
            }
        });
    }

}

import {Component, OnInit, Input} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
    public isOpen: boolean = false;
    public searchFormGroup: FormGroup;
    @Input() iconSize: string;
    constructor(
        private fb: FormBuilder,
        private router: Router) { }

    ngOnInit() {
        this.searchFormGroup = this.fb.group({
            search: ['']
        });
    }

    public toggle() {
        this.isOpen = !this.isOpen;
        if (this.isOpen) {
            setTimeout(() => {
                document.getElementById('search').focus();
            }, 400);
        }
    }

    get serachControl() {
        return this.searchFormGroup.controls['search'];
    }

    public search() {
        const {value} = this.serachControl;
        if (value) {
            this.router.navigate(['/products'], {queryParams: {category: 'all', title: value}});
            this.searchCloseAndClear();
        }
    }

    private searchCloseAndClear() {
        this.isOpen = false;
        this.serachControl.setValue(null);
    }

}

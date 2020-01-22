import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
    public isOpen: boolean;
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

    public openSearch() {
        this.isOpen = true;
        setTimeout(() => {
            document.getElementById('search').focus();
        }, 400);
    }

    public focusOut() {
        this.isOpen = false;
        this.search();
    }

    get searchControl() {
        return this.searchFormGroup.controls['search'];
    }

    public search() {
        const { value } = this.searchControl;
        if (value) {
            this.router.navigate(['/products'], { queryParams: { category: 'all', title: String(value).toUpperCase() } });
            this.searchCloseAndClear();
        }
    }

    private searchCloseAndClear() {
        this.isOpen = false;
        this.searchControl.setValue(null);
    }
}

import {Component, OnInit} from '@angular/core';
import {UserRoles} from '../../../../../shared/interfaces/user-roles';

@Component({
    selector: 'app-manager',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

    constructor() {}

    ngOnInit(): void {
    }

    public get adminRole() {
        return [UserRoles.Admin];
    }

}

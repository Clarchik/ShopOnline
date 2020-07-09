import { UserService } from '../../services/user.service';
import { Application } from 'express';
import { verifySession, verifyJWTToken } from '../../../../shared';

export default class UserController {
    private userService: UserService;

    constructor(private app: Application) {
        this.userService = new UserService();
        this.userRoutes();
    }

    public userRoutes() {
        /* VERIFY USER */
        this.app.route('/api/user/verify/:token').get(this.userService.verifyUser);

        /* SIGN UP */
        this.app.route('/api/users/registration').post(this.userService.signUpUser);

        /* SIGN IN */
        this.app.route('/api/users/login').post(this.userService.signInUser);

        /* CHECK IF EMAIL EXISTS */
        this.app.route('/api/users/login/exists').post(this.userService.checkIfUserExists);

        /* SIGN IN FROM SESSION */
        this.app.route('/api/users/login/session').get([verifyJWTToken, verifySession], this.userService.signInFromSession);

        /* UPDATE USER DATA */
        this.app.route('/api/users/update/:id').put([verifyJWTToken, verifySession], this.userService.changeUserProfileData);

        /* UPDATE USER PASSWORD */
        this.app.route('/api/users/updatePassword/:id').put([verifyJWTToken, verifySession], this.userService.changeUserPassword);

        /* GET USER CHANGE RATE */
        this.app.route('/api/exchange').get(this.userService.exchangeRate);
    }
}



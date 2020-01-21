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
        /* SIGN UP */
        this.app.route('/users').post(this.userService.signUpUser);

        /* SIGN IN */
        this.app.route('/users/login').post(this.userService.signInUser);

        /* CHECK IF EMAIL EXISTS */
        this.app.route('/users/login/exists').post(this.userService.checkIfUserExists);

        /* SIGN IN FROM SESSION */
        this.app.route('/users/login/session').get([verifyJWTToken, verifySession], this.userService.signInFromSession);

        /* UPDATE USER DATA */
        this.app.route('/users/update/:id').put([verifyJWTToken, verifySession], this.userService.changeUserProfileData);

        /* UPDATE USER PASSWORD */
        this.app.route('/users/updatePassword/:id').put([verifyJWTToken, verifySession], this.userService.changeUserPassword);

        /* GET USER CHANGE RATE */
        this.app.route('/exchange').get(this.userService.exchangeRate);

        this.app.get('/', (req, res) => res.send(`HELL I'm WORKING`));
    }
}



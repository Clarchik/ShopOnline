import { Request, Response } from 'express';
import { User } from '../models/user';

export class UserService {

    public signUpUser(req: Request, res: Response) {
        const body = req.body;
        if (!body.email || !body.password) {
            res.send(400).send({
                message: 'You didnt provide credentials'
            });
        }

        const newUser = new User(body);
        User.checkIfUserExists(newUser.email).then(() => {
            return newUser.save().then((user) => {
                res.status(200).send({ message: 'Successfuly registered' });
            }).catch((e: any) => {
                res.status(400).send(e);
            });
        }).catch((e: any) => {
            res.status(400).send(e);
        });
    }

    public signInUser(req: Request, res: Response) {
        const email = req.body.email;
        const password = req.body.password;
        if (!email || !password) {
            res.send(400).send({
                message: 'badCredentials'
            });
        }

        User.findByCredentials(email, password).then((foundUser: any) => {
            const refToken = req.get('x-refresh-token');
            const expired = foundUser.checkRefreshTokenOnExpiry(refToken);
            let backFunction;

            if (!refToken || expired) {
                backFunction = foundUser.createSession().then((refreshToken: any) => {
                    return foundUser.generateAccessAuthToken().then((accessToken: any) => {
                        return { accessToken, refreshToken };
                    });
                });
            }

            if (refToken) {
                if (!expired) {
                    const refreshToken = refToken;
                    backFunction = foundUser.generateAccessAuthToken().then((accessToken: any) => {
                        return { accessToken, refreshToken };
                    });
                }
            }

            backFunction.then((authTokens: any) => {
                res
                    .header('x-refresh-token', authTokens.refreshToken)
                    .header('x-access-token', authTokens.accessToken)
                    .status(200)
                    .send(foundUser);
            });
        }).catch((e: any) => {
            res.status(400).send(e);
        });
    }

    public checkIfUserExists(req: Request, res: Response) {
        const { email } = req.body;
        User.checkIfUserExists(email).then(() => {
            res.status(200).send(false);
        }).catch(() => {
            res.status(200).send(true);
        });
    }

    public signInFromSession(req: Request, res: Response) {
        if ((req as any).userObject) {
            res.status(200).send((req as any).userObject);
        } else {
            res.status(200).send({});
        }
    }

    public changeUserProfileData(req: Request, res: Response) {
        const id = req.params.id;
        if (!id) {
            res.status(400).send({
                message: 'ID not defined'
            });
        }
        const { email, name, surname } = req.body;
        if (!email || !name || !surname) {
            res.status(400).send({
                message: 'New data is incorrect'
            });
        }
        User.checkIfUserExists(email).then(() => {
            User.findOne({ _id: id }).then((user) => {
                if (user) {
                    user.name = name;
                    user.surname = surname;
                    user.email = email;
                    user.save().then((updatedUser) => {
                        res.status(200).send(updatedUser);
                    }).catch((err) => {
                        res.status(400).send({
                            message: 'Couldnt update user',
                            err
                        });
                    })
                }
            }).catch(() => {
                res.status(400).send({
                    message: 'User to update not found'
                });
            })
        }).catch(() => {
            res.status(400).send({
                message: 'Email is already taken'
            })
        })
    }
}

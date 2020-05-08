import express, { Request, Response } from 'express';
import * as bcrypt from 'bcryptjs';
import axios from 'axios';
import { User } from '../models';

export class UserService {

    public signUpUser(req: express.Request, res: express.Response) {
        const { body } = req;
        if (!body.email || !body.password) {
            res.send(400).send({
                message: 'You didnt provide credentials'
            });
        }

        const newUser = new User(body);
        User.checkIfUserExists(newUser.email).then(() => {
            newUser.save().then(() => {
                res.status(200).send({ message: 'Successfuly registered' });
            }).catch((e: any) => {
                res.status(400).send(e);
            });
        }).catch((e: any) => {
            res.status(400).send(e);
        });
    }

    public signInUser(req: Request, res: Response) {
        const { email } = req.body;
        const { password } = req.body;
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
                    backFunction = foundUser.generateAccessAuthToken().then((accessToken: any) => {
                        return { accessToken, refreshToken: refToken };
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

    public changeUserProfileData(req: express.Request, res: express.Response) {
        const { id } = req.params;
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
            User.findOne({ _id: id }).then((user: any) => {
                if (user) {
                    user.name = name;
                    user.surname = surname;
                    user.email = email;
                    user.save().then((updatedUser: any) => {
                        res.status(200).send(updatedUser);
                    }).catch((err: any) => {
                        res.status(400).send({
                            message: 'Couldnt update user',
                            err
                        });
                    });
                }
            }).catch(() => {
                res.status(400).send({
                    message: 'User to update not found'
                });
            });
        }).catch(() => {
            res.status(400).send({
                message: 'Email is already taken'
            });
        });
    }

    public changeUserPassword(req: Request, res: Response) {
        const { id } = req.params;
        if (!id) {
            res.status(400).send({
                message: 'ID not defined'
            });
        }

        const { oldPassword, newPassword, newPasswordConfirm } = req.body;
        if (!oldPassword || !newPassword || !newPasswordConfirm) {
            res.status(400).send({
                message: 'New data is incorrect'
            });
        }

        if (newPassword !== newPasswordConfirm) {
            res.status(400).send({
                message: 'New paswords are not the same'
            });
        }

        User.findOne({ _id: id }).then((user: any) => {
            if (!user) {
                res.status(400).send({
                    message: 'User not found'
                });
            } else {
                bcrypt.compare(oldPassword, user.password).then((match) => {
                    if (match) {
                        user.password = newPassword;
                        user.save().then(() => {
                            res.status(200).send({
                                message: 'Password has been updated'
                            });
                        }).catch((err: any) => {
                            res.status(400).send({
                                message: 'Couldnt update user password',
                                err
                            });
                        });
                    } else {
                        res.status(400).send({
                            message: 'Old password doesnt match'
                        });
                    }
                });
            }
        }).catch((err: any) => {
            res.status(400).send({
                message: 'User not found',
                err
            });
        });
    }

    public exchangeRate(req: Request, res: Response) {
        axios.get('https://api.exchangeratesapi.io/latest?base=USD')
            .then((rates) => {
                res.status(200).send(rates.data);
            })
            .catch((err) => {
                res.status(400).send(err);
            });
    }
}

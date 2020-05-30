import * as jwt from 'jsonwebtoken';
import express, { Request, Response } from 'express';

import CONFIG from './config';
import User from '../modules/user/models/user';

const verifyJWTToken = (req: any, res: any, next: any) => {
    const token = req.header('x-access-token');
    // verify the JWT
    jwt.verify(token, CONFIG.jwtSecret, (err: any) => {
        err ? res.status(401).send(err) : next();
    });
};

const verifySession = (req: any, res: any, next: any) => {
    // grab the refresh token from the request header
    const refreshToken = req.header('x-refresh-token');
    // grab the _id from the request header
    const _id = req.header('_id');

    User.findByIdAndToken(_id, refreshToken).then((user: any) => {
        if (!user) {
            // user couldn't be found
            return Promise.reject({
                error: 'User not found. Make sure that the refresh token and user id are correct'
            });
        }
        if (!user.isActive) {
            return Promise.reject({
                error: 'notActivated'
            });
        }
        // if the code reaches here - the user was found
        // therefore the refresh token exists in the database - but we still have to check if it has expired or not

        req.user_id = user._id;
        req.userObject = user;
        req.refreshToken = refreshToken;

        let isSessionValid = false;

        user.sessions.forEach((session: any) => {
            if (session.token === refreshToken) {
                // check if the session has expired
                if (User.hasRefreshTokenExpired(session.expiresAt)) {
                    // refresh token has not expired
                    isSessionValid = true;
                }
            }
        });

        if (isSessionValid) {
            // the session is VALID - call next() to continue with processing this web request
            next();
        } else {
            // the session is not valid
            return Promise.reject({
                error: 'Refresh token has expired or the session is invalid'
            });
        }
    }).catch((e: any) => {
        res.status(401).send(e);
    });
};

// tslint:disable-next-line:ter-arrow-body-style
const verifyUserRole = (roles: string[]) => {
    return (req: express.Request, res: express.Response, next: express.NextFunction) => {
        const {userObject} = req as any;
        if (roles.includes(userObject.role)) {
            next();
        } else {
            res.status(403).send({message: 'Your are not allowed to see this page'});
        }
    };
};


export { verifyJWTToken, verifySession, verifyUserRole };

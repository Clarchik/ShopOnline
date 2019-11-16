import mongoose from 'mongoose';
import CONFIG from '../../../shared/config/config';
import * as jwt from 'jsonwebtoken';
import * as crypto from 'crypto';
import * as bcrypt from 'bcryptjs';
import * as _ from 'lodash';
import { UserModel, UserData } from '../interface/user';

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        minlength: 1,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        trim: true,
        unique: false
    },
    name: {
        type: String,
        required: true,
        minlength: 1,
        trim: true,
        unique: false
    },
    surname: {
        type: String,
        required: true,
        minlength: 1,
        trim: true,
        unique: false
    },
    sessions: [{
        token: {
            type: String,
            required: true
        },
        expiriesAt: {
            type: Number,
            required: true
        }
    }]
});

/* Instance Methods */

UserSchema.methods.toJSON = function() {
    const user = this;
    const userObject = user.toObject();

    return _.omit(userObject, ['password', 'sessions']);
}

UserSchema.methods.generateAccessAuthToken = function() {
    const user = this;

    return new Promise((resolve, reject) => {
        jwt.sign(
            { _id: user._id.toHexString() },
            CONFIG.jwtSecret,
            { expiresIn: CONFIG.accessTokenExpiryTime },
            (err, token) => {
                if (!err) {
                    resolve(token);
                } else {
                    reject();
                }
            });
    });
}

UserSchema.methods.generateRefreshAuthToken = function() {
    return new Promise((resolve, reject) => {
        crypto.randomBytes(128, (err, buf) => {
            if (!err) {
                const token = buf.toString('hex');
                return resolve(token);
            } else {
                return reject({ message: 'Couldnt generate Refresh token' });
            }
        })
    })
}

UserSchema.methods.createSession = function() {
    const user = this;
    return user.generateRefreshAuthToken().then((refreshToken: string) => {
        return saveSessionToDatabase(user, refreshToken);
    }).then((refreshToken: string) => {
        return refreshToken;
    }).catch((e: any) => {
        return Promise.reject({ message: 'Failed to save session to database.\n' + e });
    })
}

UserSchema.methods.checkRefreshTokenOnExpiry = function(token: string) {
    const user = this;
    const foundToken = _.find(user.sessions, (item) => item.token === token);
    if (foundToken) {
        return User.hasRefreshTokenExpired(foundToken.expiriesAt);
    }
    return true;
}

/* Module Methods */

UserSchema.statics.findByIdAndToken = function(_id: string, token: string) {
    const user = this;
    return user.findOne({
        _id,
        'sessions.token': token
    });
};

UserSchema.statics.findByCredentials = function(email: string, password: string) {
    const user = this;
    return user.findOne({ email }).then((foundUser: any) => {
        if (!foundUser) { return Promise.reject({ message: 'User doesnt exists' }); }
        return new Promise((resolve, reject) => {
            bcrypt.compare(password, foundUser.password, (err, res) => {
                res ? resolve(foundUser) : reject({ message: 'Email or password is not correct' });
            });
        });
    });
};

UserSchema.statics.checkIfUserExists = function(email: string) {
    const user = this;
    return user.findOne({ email }).then((foundUser: any) => {
        if (!foundUser) { return Promise.resolve('Email doesnt exists'); }
        return Promise.reject('Email is already in use');
    });
};

UserSchema.statics.hasRefreshTokenExpired = (expiriesAt: number) => {
    const secondsSinceEpoch = Date.now() / 1000;
    return expiriesAt > secondsSinceEpoch ? false : true;
};

UserSchema.statics.getJWTSecret = () => CONFIG.jwtSecret;


/* MiddleWare */

UserSchema.pre('save', function(next) {
    const user: any = this;
    const costFactor = 10;

    if (user.isModified('password')) {
        bcrypt.genSalt(costFactor, (err, salt) => {
            bcrypt.hash(user.password, salt, (err, hash) => {
                user.password = hash;
                next();
            });
        });
    } else {
        next();
    }
});


/* Help Methods */

const generateRefreshTokenExpiryTime = () => {
    const daysUntilExpire: any = CONFIG.refreshTokenExpiryTime;
    const secondsUntilExpire = ((daysUntilExpire * 24) * 60) + 60;
    return ((Date.now() / 1000) + secondsUntilExpire);
};

const saveSessionToDatabase = (user: any, refreshToken: string) => new Promise((resolve, reject) => {
    const expiriesAt = generateRefreshTokenExpiryTime();
    user.sessions.push({ token: refreshToken, expiriesAt });
    user.save()
        .then(() => resolve(refreshToken))
        .catch((e: any) => reject(e));
});

const verifyJWTToken = (req: any, res: any, next: any) => {
    const token = req.header('x-access-token');
    // verify the JWT
    jwt.verify(token, User.getJWTSecret(), (err: any) => {
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

const User = mongoose.model<UserData, UserModel>('User', UserSchema);

export {
    User,
    verifyJWTToken,
    verifySession
}

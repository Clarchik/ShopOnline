const { UserSchema } = require('../../models/user/user.model');
const { CONFIG } = require('../../../shared');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const _ = require('lodash');

/* Instance Methods */

UserSchema.methods.toJSON = function () {
    const user = this;
    const userObject = user.toObject();

    return _.omit(userObject, ['password', 'sessions']);
}

UserSchema.methods.generateAccessAuthToken = function () {
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

UserSchema.methods.generateRefreshAuthToken = function () {
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

UserSchema.methods.createSession = function () {
    const user = this;
    return user.generateRefreshAuthToken().then((refreshToken) => {
        return saveSessionToDatabase(user, refreshToken);
    }).then((refreshToken) => {
        return refreshToken;
    }).catch((e) => {
        return Promise.reject({ message: 'Failed to save session to database.\n' + e });
    })
}

UserSchema.methods.checkRefreshTokenOnExpiry = function (token) {
    const user = this;
    const foundToken = _.find(user.sessions, (item) => item.token === token);
    if (foundToken) {
        return User.hasRefreshTokenExpired(foundToken.expiriesAt);
    }
    return true;
}

/* Module Methods */

UserSchema.statics.findByIdAndToken = function (_id, token) {
    const user = this;
    return user.findOne({
        _id,
        'sessions.token': token
    });
}

UserSchema.statics.findByCredentials = function (email, password) {
    const user = this;
    return user.findOne({ email }).then((user) => {
        if (!user) return Promise.reject({ message: 'User doesnt exists' });
        return new Promise((resolve, reject) => {
            bcrypt.compare(password, user.password, (err, res) => {
                res ? resolve(user) : reject({ message: 'Email or password is not correct' })
            })
        })
    })
}

UserSchema.statics.checkIfUserExists = function (email) {
    const user = this;
    return user.findOne({ email }).then((user) => {
        if (!user) return Promise.resolve('Email doesnt exists');
        return Promise.reject('Email is already in use');
    })
}

UserSchema.statics.hasRefreshTokenExpired = (expiriesAt) => {
    const secondsSinceEpoch = Date.now() / 1000;
    return expiriesAt > secondsSinceEpoch ? false : true;
}

UserSchema.statics.getJWTSecret = () => {
    return CONFIG.jwtSecret;
}

/* MiddleWare */

UserSchema.pre('save', function (next) {
    const user = this;
    const costFactor = 10;

    if (user.isModified('password')) {
        bcrypt.genSalt(costFactor, (err, salt) => {
            bcrypt.hash(user.password, salt, (err, hash) => {
                user.password = hash;
                next();
            })
        })
    } else {
        next();
    }
})


/* Help Methods */

const saveSessionToDatabase = (user, refreshToken) => {
    return new Promise((resolve, reject) => {
        const expiriesAt = generateRefreshTokenExpiryTime();
        user.sessions.push({ 'token': refreshToken, expiriesAt });
        user.save().then(() => {
            return resolve(refreshToken)
        }).catch((e) => {
            reject(e);
        });
    })
}

const generateRefreshTokenExpiryTime = () => {
    const daysUntilExpire = CONFIG.refreshTokenExpiryTime;
    const secondsUntilExpire = ((daysUntilExpire * 24) * 60) + 60;
    return ((Date.now() / 1000) + secondsUntilExpire);
}

const verifyJWTToken = (req, res, next) => {
    const token = req.header('x-access-token');
    // verify the JWT
    jwt.verify(token, User.getJWTSecret(), (err) => {
        err ? res.status(401).send(err) : next();
    });
}

const verifySession = (req, res, next) => {
    // grab the refresh token from the request header
    const refreshToken = req.header('x-refresh-token');
    // grab the _id from the request header
    const _id = req.header('_id');

    User.findByIdAndToken(_id, refreshToken).then((user) => {
        if (!user) {
            // user couldn't be found
            return Promise.reject({
                'error': 'User not found. Make sure that the refresh token and user id are correct'
            });
        }
        // if the code reaches here - the user was found
        // therefore the refresh token exists in the database - but we still have to check if it has expired or not

        req.user_id = user._id;
        req.userObject = user;
        req.refreshToken = refreshToken;

        let isSessionValid = false;

        user.sessions.forEach((session) => {
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
                'error': 'Refresh token has expired or the session is invalid'
            })
        }
    }).catch((e) => {
        res.status(401).send(e);
    })
}


const User = mongoose.model('User', UserSchema);

module.exports = {
    User,
    verifyJWTToken,
    verifySession
};

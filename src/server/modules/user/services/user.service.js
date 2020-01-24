"use strict";
exports.__esModule = true;
var bcrypt = require("bcryptjs");
var axios_1 = require("axios");
var models_1 = require("../models");
var UserService = /** @class */ (function () {
    function UserService() {
    }
    UserService.prototype.signUpUser = function (req, res) {
        var body = req.body;
        if (!body.email || !body.password) {
            res.send(400).send({
                message: 'You didnt provide credentials'
            });
        }
        var newUser = new models_1.User(body);
        models_1.User.checkIfUserExists(newUser.email).then(function () {
            return newUser.save().then(function () {
                res.status(200).send({ message: 'Successfuly registered' });
            })["catch"](function (e) {
                res.status(400).send(e);
            });
        })["catch"](function (e) {
            res.status(400).send(e);
        });
    };
    UserService.prototype.signInUser = function (req, res) {
        var email = req.body.email;
        var password = req.body.password;
        if (!email || !password) {
            res.send(400).send({
                message: 'badCredentials'
            });
        }
        models_1.User.findByCredentials(email, password).then(function (foundUser) {
            var refToken = req.get('x-refresh-token');
            var expired = foundUser.checkRefreshTokenOnExpiry(refToken);
            var backFunction;
            if (!refToken || expired) {
                backFunction = foundUser.createSession().then(function (refreshToken) {
                    return foundUser.generateAccessAuthToken().then(function (accessToken) {
                        return { accessToken: accessToken, refreshToken: refreshToken };
                    });
                });
            }
            if (refToken) {
                if (!expired) {
                    var refreshToken_1 = refToken;
                    backFunction = foundUser.generateAccessAuthToken().then(function (accessToken) {
                        return { accessToken: accessToken, refreshToken: refreshToken_1 };
                    });
                }
            }
            backFunction.then(function (authTokens) {
                res
                    .header('x-refresh-token', authTokens.refreshToken)
                    .header('x-access-token', authTokens.accessToken)
                    .status(200)
                    .send(foundUser);
            });
        })["catch"](function (e) {
            res.status(400).send(e);
        });
    };
    UserService.prototype.checkIfUserExists = function (req, res) {
        var email = req.body.email;
        models_1.User.checkIfUserExists(email).then(function () {
            res.status(200).send(false);
        })["catch"](function () {
            res.status(200).send(true);
        });
    };
    UserService.prototype.signInFromSession = function (req, res) {
        if (req.userObject) {
            res.status(200).send(req.userObject);
        }
        else {
            res.status(200).send({});
        }
    };
    UserService.prototype.changeUserProfileData = function (req, res) {
        var id = req.params.id;
        if (!id) {
            res.status(400).send({
                message: 'ID not defined'
            });
        }
        var _a = req.body, email = _a.email, name = _a.name, surname = _a.surname;
        if (!email || !name || !surname) {
            res.status(400).send({
                message: 'New data is incorrect'
            });
        }
        models_1.User.checkIfUserExists(email).then(function () {
            models_1.User.findOne({ _id: id }).then(function (user) {
                if (user) {
                    user.name = name;
                    user.surname = surname;
                    user.email = email;
                    user.save().then(function (updatedUser) {
                        res.status(200).send(updatedUser);
                    })["catch"](function (err) {
                        res.status(400).send({
                            message: 'Couldnt update user',
                            err: err
                        });
                    });
                }
            })["catch"](function () {
                res.status(400).send({
                    message: 'User to update not found'
                });
            });
        })["catch"](function () {
            res.status(400).send({
                message: 'Email is already taken'
            });
        });
    };
    UserService.prototype.changeUserPassword = function (req, res) {
        var id = req.params.id;
        if (!id) {
            res.status(400).send({
                message: 'ID not defined'
            });
        }
        var _a = req.body, oldPassword = _a.oldPassword, newPassword = _a.newPassword, newPasswordConfirm = _a.newPasswordConfirm;
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
        models_1.User.findOne({ _id: id }).then(function (user) {
            if (!user) {
                res.status(400).send({
                    message: 'User not found'
                });
            }
            else {
                bcrypt.compare(oldPassword, user.password).then(function (match) {
                    if (match) {
                        user.password = newPassword;
                        user.save().then(function () {
                            res.status(200).send({
                                message: 'Password has been updated'
                            });
                        })["catch"](function (err) {
                            res.status(400).send({
                                message: 'Couldnt update user password',
                                err: err
                            });
                        });
                    }
                    else {
                        res.status(400).send({
                            message: 'Old password doesnt match'
                        });
                    }
                });
            }
        })["catch"](function (err) {
            res.status(400).send({
                message: 'User not found',
                err: err
            });
        });
    };
    UserService.prototype.exchangeRate = function (req, res) {
        axios_1["default"].get('https://api.exchangeratesapi.io/latest?base=USD')
            .then(function (rates) {
            res.status(200).send(rates.data);
        })["catch"](function (err) {
            res.status(400).send(err);
        });
    };
    return UserService;
}());
exports.UserService = UserService;

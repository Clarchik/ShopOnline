const { User, verifyJWTToken, verifySession } = require('../../../db/controllers');

module.exports = function (user) {

    /* SIGN UP */
    user.post('/users', (req, res) => {
        const body = req.body;
        if (!body.email || !body.password) {
            res.send(400).send('You didnt provide credentials')
        }

        const newUser = new User(body);
        User.checkIfUserExists(newUser.email).then(() => {
            return newUser.save().then(() => {
                res.status(200).send('Successfuly registered')
            }).catch((e) => {
                res.status(400).send(e);
            });
        }).catch((e) => {
            res.status(400).send(e);
        })
    });

    /* SIGN IN */
    user.post('/users/login', (req, res) => {
        const email = req.body.email;
        const password = req.body.password;
        if (!email || !password) {
            res.send(400).send('You didnt provide credentials')
        }

        User.findByCredentials(email, password).then((user) => {
            const refToken = req.get('x-refresh-token');
            const expired = user.checkRefreshTokenOnExpiry(refToken);

            let backFunction = user.createSession().then((refreshToken) => {
                return user.generateAccessAuthToken().then((accessToken) => {
                    return { accessToken, refreshToken };
                })
            });

            if (refToken) {
                if (!expired) {
                    const refreshToken = refToken;
                    backFunction = user.generateAccessAuthToken().then((accessToken) => {
                        return { accessToken, refreshToken };
                    });
                }
            }
            backFunction.then((authTokens) => {
                res
                    .header('x-refresh-token', authTokens.refreshToken)
                    .header('x-access-token', authTokens.accessToken)
                    .status(200)
                    .send(user)
            })
        }).catch((e) => {
            res.status(400).send(e);
        })
    });

    /* CHECK IF EMAIL EXISTS */
    user.post('/users/login/exists', (req, res) => {
        const { email } = req.body;
        User.checkIfUserExists(email).then(() => {
            res.status(200).send(false);
        }).catch(() => {
            res.status(200).send(true);
        });
    });


    /* SIGN IN FROM SESSION */
    user.get('/users/login/session', [verifyJWTToken, verifySession], (req, res) => {
        if (req.userObject) {
            res.status(200).send(req.userObject);
        } else {
            res.status(200).send({});
        }
    });
}

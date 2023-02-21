const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

// login
// POST /auth
// public
const login = asyncHandler(async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: "All fields are required!" });
    }

    const foundUser = await User.findOne({ username }).lean().exec();

    if (!foundUser) {
        return res.status(401).json({ message: "NoUser" });
    }

    const match = await bcrypt.compare(password, foundUser.password);

    if (!match) {
        return res.status(401).json({ message: "WrongPassword" });
    }

    const refreshToken = jwt.sign(
        {
            UserInfo: {
                user: foundUser._id,
            }
        },
        process.env.REFRESH_TOKEN_SECRET,
    );

    res.json({ foundUser, refreshToken });
});

// refresh
// GET /auth/refresh
// public
const refresh = (req, res) => {
    let refreshToken = req.get("refreshToken");
    if (!refreshToken) {
        return res.status(409).json({ message: "Unauthorized" });
    }

    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        async (err, decoded) => {
            if (err) {
                return res.status(403).json({ message: "Forbidden!" });
            }
            const foundUser = await User.findOne({ _id: decoded.UserInfo.user }).lean().exec();
            res.json(foundUser);
        }
    );
};


// logout
// POST /auth/logout
// public
// delete a cookie
const logout = (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) {
        return res.sendStatus(204);
    }
    res.clearCookie("jwt", {
        httpOnly: true,
        sameSite: "None",
        secure: true,
    });
    return res
        .status(200)
        .json({ message: "Cookie cleared!" });
}

module.exports = {
    login,
    refresh,
    logout,
};
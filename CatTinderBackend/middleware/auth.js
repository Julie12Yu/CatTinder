const admin = require('firebase-admin');
const express = require('express');

const auth = async (req, res, next) => {
    const idToken = req.headers.authorization;

    if (!idToken) {
        return res.status(403).send("Unauthorized");
    }

    try {
        const decodedToken = await admin.auth().verifyIdToken(idToken);
        req.user = decodedToken;
        next();
    } catch (e) {
        res.status(403).send('Unauthorized');
    }
};

module.exports = auth;
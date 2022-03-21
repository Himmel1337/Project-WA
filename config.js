module.exports = {
    jwtConfig: {
        secret: "afasfrqwtr21tfwagsd",
        algorithms: ["HS256"],
    },
    passwordConfig: {
        salt: 'a412rwqetfaq325',
        iterations: 1000,
        keylen: 64,
        digest: 'sha512',
    }
}
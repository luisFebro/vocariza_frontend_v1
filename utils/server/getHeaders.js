// for axios http request
// need be the value of headers: { returnedValue };
exports.chooseHeader = ({ token, needAuth = true }) => {
    if (needAuth) {
        return {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
        };
    } else {
        return undefined; //{ 'Content-type': 'application/json' }
    }
};

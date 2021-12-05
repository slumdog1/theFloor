function getScoreByAttr(att, val) {
    switch (att) {
        case "size":
            if (val >= 1 && val <= 10) return 1
            if (val >= 11 && val <= 100) return 2
            if (val >= 101 && val <= 1000) return 3
            if (val >= 1001) return 4
            break;
        case "funding":
            if (val <= 1000000) return 1
            if (val > 1000000 && val <= 10000000) return 2
            if (val > 10000000 && val <= 100000000) return 3
            if (val > 100000000) return 4
            break;
        case "age":
            if (val <= 1) return 1
            if (val > 1 && val <= 5) return 2
            if (val > 5 && val <= 12) return 3
            if (val > 12) return 4
            break;
        case "userScoring":
            return val.reduce((a, b) => (a + b)) / val.length;
        default:
            return val
    }
}

module.exports = {getScoreByAttr}
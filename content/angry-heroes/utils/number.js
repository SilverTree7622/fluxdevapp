const UtilNumber = {
    convertNum2Alphabet: (value) => {
        return (value + 9 + 1).toString(36).toUpperCase();
    },
    minMaxNum: (value, min, max) => {
        if (value < min)
            return min;
        if (value > max)
            return max;
        return value;
    },
};
window['UtilNumber'] = UtilNumber;

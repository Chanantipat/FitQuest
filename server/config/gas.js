const axios = require("axios");

const GAS_URL =
"https://script.google.com/macros/s/AKfycbyw5RsRBMEJeRz8xDfl34JkwUR4Jg164Huxads787I8ctdpTsrSotcIEBbx_1tKxWPftw/exec";


module.exports = axios.create({

    baseURL: GAS_URL,

});
const axios = require("axios");

const GAS_URL = "https://script.google.com/macros/s/AKfycbyw5RsRBMEJeRz8xDfl34JkwUR4Jg164Huxads787I8ctdpTsrSotcIEBbx_1tKxWPftw/exec";

const getAllHistory = async (req, res) => {

    try {

        const response = await axios.get(
            `${GAS_URL}?action=getHistory`
        );

        res.json(response.data);

    } catch (error) {

        res.status(500).json({
            message: "Error retrieving history"
        });

    }

};

const createHistory = async (req, res) => {

    try {

        const history = req.body;

        const response = await axios.post(
            GAS_URL,
            {
                action: "createHistory",
                data: history
            }
        );

        res.json({
            message: "History created successfully",
            data: response.data
        });

    } catch (error) {

        res.status(500).json({
            message: "Error creating history"
        });

    }

};

module.exports = {
    getAllHistory,
    createHistory
};
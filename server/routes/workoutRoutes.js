const express = require("express");
const router = express.Router();

const gas = require("../config/gas");


router.get("/", async(req,res)=>{

    try{

        const response = await gas.get("", {
            params:{
            action: "getWorkouts"
            }
        });


        console.log(
            "WORKOUT FROM GAS =",
            response.data
        );


        res.json(response.data);


    }
    catch(error){

        console.log(
            "GAS WORKOUT ERROR =",
            error.response?.data
        );


        res.status(500).json({
            error:error.message
        });

    }

});


module.exports = router;
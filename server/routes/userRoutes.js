const express = require("express");
const router = express.Router();

const gas = require("../config/gas");



// ======================
// GET ALL USERS
// ======================

router.get("/", async(req,res)=>{

    try{


        const response =
        await gas.get("",{
            params:{
                action:"getUsers"
            }
        });


        res.json(response.data);


    }
    catch(error){


        console.error(
            "GET USERS ERROR =",
            error.message
        );


        res.status(500)
        .json({
            error:error.message
        });


    }

});


// ======================
// GET USER BY USERNAME
// ======================

router.get("/name/:username", async (req, res) => {
    try {
        const username = req.params.username;

        console.log(
            "CALL GAS:",
            "getUserByUsername",
            username
        );

        const response = await gas.get("", {
            params: {
                action: "getUserByUsername",
                username: username
            }
        });

        console.log(
            "USER BY NAME RESPONSE =",
            response.data
        );

        if (!response.data) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.json(response.data);

    } catch (error) {
        console.error(
            "GET USER BY USERNAME ERROR =",
            error.message
        );

        res.status(500).json({
            error: error.message
        });
    }
});


// ======================
// GET USER BY ID
// ======================

router.get("/:id", async(req,res)=>{
    try{
        console.log(
            "CALL GAS:",
            "getUser",
            req.params.id
        );
        const response =
        await gas.get("",{
            params:{
                action:"getUser",
                id:req.params.id
            }
        });
        console.log(
            "USER RESPONSE =",
            response.data
        );
        res.json(
            response.data
        );
    }
    catch(error){
        console.error(
            "GET USER ERROR =",
            error.message
        );
        res.status(500)
        .json({
            error:error.message
        });
    }
});





// ======================
// CREATE USER
// ======================

router.post("/", async(req,res)=>{

    try{


        const response =
        await gas.post(
            "",
            {
                action:"createUser",
                data:req.body
            }
        );


        console.log(
            "GAS CREATE RESULT",
            response.data
        );


        res.json(response.data);


    }


    catch(error){

console.log(
"URL USED =",
error.config.baseURL
);

console.log(
"REQUEST =",
error.config.url
);


res.status(500).json({
error:error.message
});

}

});





// ======================
// UPDATE USER
// ======================

router.put("/:id", async(req,res)=>{

    try{


        console.log(
            "UPDATE USER ID =",
            req.params.id
        );



        const response =
        await gas.post(
            "",
            {

                action:"updateUser",

                id:req.params.id,

                data:req.body

            }
        );



        console.log(
            "UPDATE RESULT =",
            response.data
        );



        res.json(
            response.data
        );



    }
    catch(error){


        console.error(
            "UPDATE USER ERROR =",
            error.message
        );


        res.status(500)
        .json({
            error:error.message
        });



    }

});





// ======================
// DELETE USER
// ======================

router.delete("/:id", async(req,res)=>{

    try{


        const response =
        await gas.post(
            "",
            {

                action:"deleteUser",

                id:req.params.id

            }
        );



        res.json(
            response.data
        );



    }
    catch(error){


        console.error(
            "DELETE USER ERROR =",
            error.message
        );


        res.status(500)
        .json({
            error:error.message
        });


    }

});
module.exports = router;
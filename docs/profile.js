const API_URL =
    "https://fitquest-api-sbhd.onrender.com/api";

document
.getElementById("profileForm")
.addEventListener("submit", function(e){

    e.preventDefault();


    const userData = {

        username:
        document.getElementById("username").value,

        age:
        Number(document.getElementById("age").value),

        gender:
        document.getElementById("gender").value,

        height:
        Number(document.getElementById("height").value),

        weight:
        Number(document.getElementById("weight").value),

        goal:
        document.getElementById("goal").value,

        fitnessLevel:
        document.getElementById("fitnessLevel").value

    };


    fetch(`${API_URL}/users`,{

        method:"POST",

        headers:{
            "Content-Type":"application/json"
        },

        body:
        JSON.stringify(userData)

    })
    .then(response=>response.json())
    .then(result=>{

        console.log(
            "CREATE USER RESULT =",
            result
        );


        if(result.id){

            localStorage.setItem(
                "userId",
                result.id
            );


            window.location.href =
            "dashboard.html";

        }
        else{

            alert(
                "Cannot get user id"
            );

        }


    })
    .catch(error=>{

        console.error(
            "CREATE USER ERROR =",
            error
        );

    });


});
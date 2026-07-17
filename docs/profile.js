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

const loginForm =
    document.getElementById("loginForm");

const loginMessage =
    document.getElementById("loginMessage");

if (loginForm) {
    loginForm.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();

            const username =
                document
                    .getElementById("loginUsername")
                    .value
                    .trim();

            loginMessage.textContent = "";

            if (!username) {
                loginMessage.textContent =
                    "Please enter your username";

                return;
            }

            try {
                const response = await fetch(
                    `${API_URL}/users/name/${
                        encodeURIComponent(username)
                    }`
                );

                const result =
                    await response.json();

                console.log(
                    "LOGIN RESULT =",
                    result
                );

                if (!response.ok) {
                    throw new Error(
                        result.message ||
                        "User not found"
                    );
                }

                if (!result.id) {
                    throw new Error(
                        "Cannot get user id"
                    );
                }

                localStorage.setItem(
                    "userId",
                    result.id
                );

                window.location.href =
                    "dashboard.html";

            } catch (error) {
                console.error(
                    "LOGIN ERROR =",
                    error
                );

                loginMessage.textContent =
                    "ไม่พบชื่อผู้ใช้นี้ในระบบ";
            }
        }
    );
}
let selectedWorkoutId = null;
let currentWorkouts = [];
let currentUser = null;
const API_URL = "https://fitquest-api-sbhd.onrender.com/api";


const userId = localStorage.getItem("userId");


if(!userId){

    window.location.href = "profile.html";

}



// ==========================
// LOAD USER
// ==========================
console.log("BEFORE UPDATE =", currentUser);
fetch(`${API_URL}/users/${userId}`)

.then(response => response.json())

.then(user => {


    console.log(
        "WORKOUT USER =",
        user
    );


    currentUser = user;



    document.getElementById("username").textContent =
    user.username;



    document.getElementById("recommendText").textContent =
    `${user.fitnessLevel} ${user.goal} Program`;



    loadWorkout(user);



})

.catch(error=>{


    console.error(
        "USER ERROR =",
        error
    );


});




// ==========================
// LOAD WORKOUT
// ==========================


function loadWorkout(user){


const workoutList =
document.getElementById("workoutList");



fetch(`${API_URL}/workouts`)

.then(response=>response.json())


.then(workouts=>{


    console.log(
        "WORKOUT DATA =",
        workouts
    );



    currentWorkouts = workouts;



    const filteredWorkouts =

    workouts.filter(workout =>

        workout.type === user.goal

    );



    if(filteredWorkouts.length === 0){


        workoutList.innerHTML =
        `
        <p>No workout plan found.</p>
        `;


        return;


    }



    workoutList.innerHTML = "";



    filteredWorkouts.forEach(workout=>{


        workoutList.innerHTML +=

        `

        <div class="workout-card">


            <h2>
            ${workout.name}
            </h2>


            <p>
            Duration:
            ${workout.duration}
            minutes
            </p>


            <p>
            EXP:
            ${workout.exp}
            </p>

            <button 
            class="select-btn"
            onclick="selectWorkout(${workout.id}, this)">
            Select Workout
            </button>

        </div>


        `;


    });



})

.catch(error=>{


console.error(
"WORKOUT ERROR =",
error
);


});


}





// ==========================
// SELECT WORKOUT
// ==========================


function selectWorkout(id, button){

    selectedWorkoutId = id;

    document.querySelectorAll(".workout-card")
    .forEach(card=>{
        card.classList.remove("selected");
    });

    document.querySelectorAll(".select-btn")
    .forEach(btn=>{
        btn.classList.remove("selected");
        btn.textContent = "Select Workout";
    });

    button.classList.add("selected");
    button.textContent = "✓ Selected";

    button.closest(".workout-card")
          .classList.add("selected");

    console.log("Selected Workout:", id);

}
// ==========================
// COMPLETE WORKOUT
// ==========================


document
.getElementById("completeWorkout")
.addEventListener("click",function(){



if(!currentUser){


alert(
"User not loaded"
);


return;


}




if(selectedWorkoutId === null){


alert(
"Please select workout"
);


return;


}




// หา workout ที่เลือก

const selectedWorkout =

currentWorkouts.find(

workout =>

workout.id == selectedWorkoutId

);




if(!selectedWorkout){


alert(
"Workout not found"
);


return;


}




// ==========================
// ADD EXP FROM WORKOUT
// ==========================


const expGain =
selectedWorkout.exp;



currentUser.exp += expGain;
currentUser.workoutSessions++;

while(currentUser.exp >= 100){


currentUser.level++;


currentUser.exp -= 100;


}





console.log(
"UPDATED USER =",
currentUser
);





// ==========================
// UPDATE DATA
// ==========================


const updateData = {


username:
currentUser.username,


age:
currentUser.age,


gender:
currentUser.gender,


height:
currentUser.height,


weight:
currentUser.weight,


goal:
currentUser.goal,


fitnessLevel:
currentUser.fitnessLevel,


exp:
currentUser.exp,


level:
currentUser.level,


workoutSessions:
currentUser.workoutSessions


};




console.log(
"UPDATE DATA =",
updateData
);






fetch(`${API_URL}/users/${userId}`,{


method:"PUT",


headers:{


"Content-Type":"application/json"


},


body:

JSON.stringify(updateData)



})



.then(response=>response.json())

.then(result => {

    console.log("UPDATE RESULT =", result);

    // ==========================
    // SAVE WORKOUT HISTORY
    // ==========================

    const historyData = {

        user_id: currentUser.id,

        workout: selectedWorkout.name,

        duration: selectedWorkout.duration,

        exp: selectedWorkout.exp

    };

    fetch(`${API_URL}/history`, {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(historyData)

    })

    .then(response => response.json())

    .then(historyResult => {

        console.log(
            "HISTORY SAVED =",
            historyResult
        );

        alert(`Complete! +${expGain} EXP`);

        window.location.href = "dashboard.html";

    })

    .catch(error => {

        console.error(
            "HISTORY ERROR =",
            error
        );

        alert("Workout completed but history not saved.");

        window.location.href = "dashboard.html";

    });

})

.catch(error=>{


console.error(

"SAVE HISTORY ERROR =",

error

);

alert("Workout completed but history not saved.");

});



});
const hamburger = document.querySelector(".hamburger");
const menu = document.querySelector(".menu");

if (hamburger && menu) {
    hamburger.addEventListener("click", function () {
        menu.classList.toggle("active");

        hamburger.innerHTML =
            menu.classList.contains("active")
                ? "✖"
                : "☰";
    });
}
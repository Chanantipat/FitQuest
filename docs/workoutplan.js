let selectedWorkoutId = null;
let currentWorkouts = [];
let currentUser = null;

const API_URL =
    "https://fitquest-api-sbhd.onrender.com/api";

const userId =
    localStorage.getItem("userId");

const completeButton =
    document.getElementById("completeWorkout");

if (!userId) {
    window.location.href = "profile.html";
}

// ==========================
// LOAD USER
// ==========================

fetch(`${API_URL}/users/${userId}`)
    .then(async response => {
        const result = await response.json();

        if (!response.ok || result.error) {
            throw new Error(
                result.error ||
                result.message ||
                "Cannot load user"
            );
        }

        return result;
    })
    .then(user => {
        console.log("WORKOUT USER =", user);

        currentUser = user;

        document.getElementById("username").textContent =
            user.username;

        document.getElementById("recommendText").textContent =
            `${user.fitnessLevel} ${user.goal} Program`;

        loadWorkout(user);
    })
    .catch(error => {
        console.error("USER ERROR =", error);
        alert("Cannot load user data");
    });

// ==========================
// LOAD WORKOUT
// ==========================

function loadWorkout(user) {
    const workoutList =
        document.getElementById("workoutList");

    fetch(`${API_URL}/workouts`)
        .then(async response => {
            const result = await response.json();

            if (!response.ok || result.error) {
                throw new Error(
                    result.error ||
                    result.message ||
                    "Cannot load workouts"
                );
            }

            return result;
        })
        .then(workouts => {
            console.log("WORKOUT DATA =", workouts);

            currentWorkouts = workouts;

            const filteredWorkouts =
                workouts.filter(workout =>
                    workout.type === user.goal
                );

            if (filteredWorkouts.length === 0) {
                workoutList.innerHTML = `
                    <p>No workout plan found.</p>
                `;

                return;
            }

            workoutList.innerHTML =
                filteredWorkouts.map(workout => `
                    <div class="workout-card">
                        <h2>${workout.name}</h2>

                        <p>
                            Duration:
                            ${workout.duration} minutes
                        </p>

                        <p>
                            EXP:
                            ${workout.exp}
                        </p>

                        <button
                            class="select-btn"
                            onclick="selectWorkout(
                                ${workout.id},
                                this
                            )">
                            Select Workout
                        </button>
                    </div>
                `).join("");
        })
        .catch(error => {
            console.error("WORKOUT ERROR =", error);

            workoutList.innerHTML = `
                <p>Cannot load workout plans.</p>
            `;
        });
}

// ==========================
// SELECT WORKOUT
// ==========================

function selectWorkout(id, button) {
    selectedWorkoutId = id;

    document
        .querySelectorAll(".workout-card")
        .forEach(card => {
            card.classList.remove("selected");
        });

    document
        .querySelectorAll(".select-btn")
        .forEach(btn => {
            btn.classList.remove("selected");
            btn.textContent = "Select Workout";
        });

    button.classList.add("selected");
    button.textContent = "✓ Selected";

    button
        .closest(".workout-card")
        .classList.add("selected");

    if (completeButton) {
        completeButton.disabled = false;
    }

    console.log("Selected Workout =", id);
}

// ==========================
// COMPLETE WORKOUT
// ==========================

if (completeButton) {
    completeButton.addEventListener(
        "click",
        async function () {
            if (!currentUser) {
                alert("User not loaded");
                return;
            }

            if (selectedWorkoutId === null) {
                alert("Please select workout");
                return;
            }

            const selectedWorkout =
                currentWorkouts.find(
                    workout =>
                        String(workout.id) ===
                        String(selectedWorkoutId)
                );

            if (!selectedWorkout) {
                alert("Workout not found");
                return;
            }

            const expGain =
                Number(selectedWorkout.exp) || 0;

            const newUserData = {
                ...currentUser,

                exp:
                    (Number(currentUser.exp) || 0) +
                    expGain,

                level:
                    Number(currentUser.level) || 1,

                workoutSessions:
                    (Number(
                        currentUser.workoutSessions
                    ) || 0) + 1
            };

            while (newUserData.exp >= 100) {
                newUserData.exp -= 100;
                newUserData.level += 1;
            }

            const updateData = {
                username: newUserData.username,
                age: newUserData.age,
                gender: newUserData.gender,
                height: newUserData.height,
                weight: newUserData.weight,
                goal: newUserData.goal,
                fitnessLevel:
                    newUserData.fitnessLevel,
                exp: newUserData.exp,
                level: newUserData.level,
                workoutSessions:
                    newUserData.workoutSessions
            };

            completeButton.disabled = true;
            completeButton.textContent = "Saving...";

            try {
                const updateResponse = await fetch(
                    `${API_URL}/users/${userId}`,
                    {
                        method: "PUT",
                        headers: {
                            "Content-Type":
                                "application/json"
                        },
                        body: JSON.stringify(updateData)
                    }
                );

                const updateResult =
                    await updateResponse.json();

                console.log(
                    "UPDATE STATUS =",
                    updateResponse.status
                );

                console.log(
                    "UPDATE RESULT =",
                    updateResult
                );

                if (
                    !updateResponse.ok ||
                    updateResult.error
                ) {
                    throw new Error(
                        updateResult.error ||
                        updateResult.message ||
                        "Cannot update user"
                    );
                }

                currentUser = newUserData;

                const historyData = {
                    user_id: currentUser.id,
                    workout: selectedWorkout.name,
                    duration:
                        Number(
                            selectedWorkout.duration
                        ) || 0,
                    exp: expGain
                };

                const historyResponse =
                    await fetch(
                        `${API_URL}/history`,
                        {
                            method: "POST",
                            headers: {
                                "Content-Type":
                                    "application/json"
                            },
                            body:
                                JSON.stringify(
                                    historyData
                                )
                        }
                    );

                const historyResult =
                    await historyResponse.json();

                console.log(
                    "HISTORY STATUS =",
                    historyResponse.status
                );

                console.log(
                    "HISTORY RESULT =",
                    historyResult
                );

                if (
                    !historyResponse.ok ||
                    historyResult.error
                ) {
                    throw new Error(
                        historyResult.error ||
                        historyResult.message ||
                        "Cannot save history"
                    );
                }

                alert(
                    `Complete! +${expGain} EXP`
                );

                window.location.href =
                    "dashboard.html";

            } catch (error) {
                console.error(
                    "COMPLETE WORKOUT ERROR =",
                    error
                );

                alert(
                    "Cannot complete workout: " +
                    error.message
                );

                completeButton.disabled = false;
                completeButton.textContent =
                    "Complete Workout";
            }
        }
    );
}

// ==========================
// HAMBURGER
// ==========================

const hamburger =
    document.querySelector(".hamburger");

const menu =
    document.querySelector(".menu");

if (hamburger && menu) {
    hamburger.addEventListener(
        "click",
        function () {
            menu.classList.toggle("active");

            hamburger.innerHTML =
                menu.classList.contains("active")
                    ? "✖"
                    : "☰";
        }
    );
}
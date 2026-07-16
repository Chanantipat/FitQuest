const API_URL = "https://fitquest-api-sbhd.onrender.com";

const userId = localStorage.getItem("userId");

console.log("PROGRESS USER ID =", userId);

if (!userId) {
    window.location.href = "profile.html";
}

async function loadProgress() {

    try {

        const userResponse = await fetch(
            `${API_URL}/users/${userId}`
        );

        if (!userResponse.ok) {
            throw new Error("Cannot load user data");
        }

        const user = await userResponse.json();

        console.log("PROGRESS USER =", user);

        displayUserSummary(user);

        const historyResponse = await fetch(
            `${API_URL}/history`
        );

        if (!historyResponse.ok) {
            throw new Error("Cannot load workout history");
        }

        const historyData = await historyResponse.json();

        console.log("ALL HISTORY =", historyData);

        const userHistory = historyData.filter(history => {

            return String(history.user_id) === String(userId);

        });

        displayHistory(userHistory);

    } catch (error) {

        console.error("PROGRESS ERROR =", error);

        document.getElementById("historyList").innerHTML = `
            <p class="error-text">
                Cannot load progress data
            </p>
        `;

    }

}

function displayUserSummary(user) {

    const weight = Number(user.weight);
    const heightInMeters = Number(user.height) / 100;

    const bmi = weight / (heightInMeters ** 2);

    document.getElementById("currentBMI").textContent =
        bmi.toFixed(1);

    document.getElementById("currentLevel").textContent =
        "Level " + user.level;

    document.getElementById("currentEXP").textContent =
        user.exp + " / 100";

    document.getElementById("workoutSessions").textContent =
        user.workoutSessions;

    document.getElementById("latestWeight").textContent =
        user.weight + " kg";

}

function displayHistory(historyList) {

    const historyContainer =
        document.getElementById("historyList");

    const historyCount =
        document.getElementById("historyCount");

    historyCount.textContent =
        historyList.length + " workouts";

    if (historyList.length === 0) {

        historyContainer.innerHTML = `
            <p class="empty-history">
                No workout history found
            </p>
        `;

        return;

    }

    const newestHistory = [...historyList].reverse();

    historyContainer.innerHTML =
        newestHistory.map(history => {

            return `
                <article class="history-card">

                    <div class="history-workout">

                        <h3>
                            ${history.workout}
                        </h3>

                        <p>
                            Workout ID: ${history.id}
                        </p>

                    </div>

                    <div class="history-info">

                        <p>Duration</p>

                        <strong>
                            ${history.duration} minutes
                        </strong>

                    </div>

                    <div class="history-exp">
                        +${history.exp} EXP
                    </div>

                    <div class="history-info">

                        <p>Date</p>

                        <strong>
                            ${formatDate(history.date)}
                        </strong>

                    </div>

                </article>
            `;

        }).join("");

}

loadProgress();

const hamburger = document.querySelector(".hamburger");
const menu = document.querySelector(".menu");
hamburger.addEventListener("click", function () {
    menu.classList.toggle("active");
    if (menu.classList.contains("active")) {
        hamburger.innerHTML = "✖";
    } else {
        hamburger.innerHTML = "☰";
    }
});

function formatDate(dateValue) {
    return new Date(dateValue).toLocaleString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
    });
}
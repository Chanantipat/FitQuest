const userId = localStorage.getItem("userId");

console.log("User ID =", userId);

if (!userId) {
    window.location.href = "profile.html";
}

fetch(`https://fitquest-api-sbhd.onrender.com/api/users/${userId}`)
    .then(response => {
        if (!response.ok) {
            throw new Error("Cannot load user data");
        }

        return response.json();
    })
    .then(user => {
        console.log("USER DATA =", user);

        document.getElementById("username").textContent =
            user.username;

        document.getElementById("age").textContent =
            user.age;

        document.getElementById("gender").textContent =
            user.gender;

        document.getElementById("height").textContent =
            user.height + " cm";

        document.getElementById("weight").textContent =
            user.weight + " kg";

        document.getElementById("latestWeight").textContent =
            user.weight + " kg";

        document.getElementById("goal").textContent =
            user.goal;

        document.getElementById("fitnessLevel").textContent =
            user.fitnessLevel;

        const level = Number(user.level) || 1;
        const exp = Number(user.exp) || 0;
        const workoutSessions =
            Number(user.workoutSessions) || 0;

        document.getElementById("level").textContent =
            "Level " + level;

        document.getElementById("expText").textContent =
            `${exp} / 100 EXP`;

        document.getElementById("workoutSessions").textContent =
            workoutSessions;

        const weight = Number(user.weight);
        const height = Number(user.height);

        const bmi =
            weight / ((height / 100) ** 2);

        document.getElementById("bmi").textContent =
            bmi.toFixed(1);

        const progressBar =
            document.getElementById("progressFill");

        progressBar.style.width = "0%";

        setTimeout(() => {
            progressBar.style.width =
                `${Math.min(exp, 100)}%`;
        }, 300);
    })
    .catch(error => {
        console.error("DASHBOARD ERROR =", error);
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
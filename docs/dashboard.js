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

    document.getElementById("level").textContent =
        "Level " + user.level;

    document.getElementById("expText").textContent =
        user.exp + " / 100 EXP";

    document.getElementById("workoutSessions").textContent =
        user.workoutSessions;

    const bmi =
        user.weight / ((user.height / 100) ** 2);

    document.getElementById("bmi").textContent =
        bmi.toFixed(1);

    const progress =
        document.getElementById("progressFill");

    progress.style.width = "0%";

    setTimeout(() => {
        progress.style.width = user.exp + "%";
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

        if (menu.classList.contains("active")) {
            hamburger.innerHTML = "✖";
        } else {
            hamburger.innerHTML = "☰";
        }
    });
}
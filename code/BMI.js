function calculateBMI() {
    const height = parseFloat(document.getElementById("height").value);
    const weight = parseFloat(document.getElementById("weight").value);

    const bmiValue = document.getElementById("bmiValue");
    const bmiStatus = document.getElementById("bmiStatus");
    const resultCard = document.getElementById("resultCard");

    if (!height || !weight || height <= 0 || weight <= 0) {
        bmiValue.textContent = "BMI : -";
        bmiStatus.textContent = "Please enter valid height and weight";
        resultCard.className = "result-card show";
        return;
    }

    const bmi = weight / ((height / 100) ** 2);
    let status = "";
    let statusClass = "";

    if (bmi < 18.5) {
        status = "Underweight";
        statusClass = "underweight";
    } else if (bmi < 23) {
        status = "Normal";
        statusClass = "normal";
    } else if (bmi < 25) {
        status = "Overweight";
        statusClass = "overweight";
    } else {
        status = "Obesity";
        statusClass = "obesity";
    }

    bmiValue.textContent = "BMI : " + bmi.toFixed(1);
    bmiStatus.textContent = status;

    resultCard.className = "result-card";
    void resultCard.offsetWidth;
    resultCard.classList.add("show", statusClass);
}

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
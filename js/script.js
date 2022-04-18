// Поля возраст, рост, вес
const age = document.querySelector("#age");
const height = document.querySelector("#height");
const weight = document.querySelector("#weight");
const inputText = document.querySelectorAll('input[type="text"]');

// Поле пол
const male = document.querySelector("#gender-male");
const female = document.querySelector("#gender-female");
const genders = document.querySelectorAll('input[name="gender"]');

let gender = "male";

// Выбор пола
genders.forEach(genderName => {
	genderName.addEventListener("change", event => {
		if (genderName.value == "male") {
			gender = "male"
		} else if (genderName.value == "female") {
			gender = "female"
		}
	})
})

// Активность
const minimal = document.querySelector("#activity-minimal");
const low = document.querySelector("#activity-low");
const medium = document.querySelector("#activity-medium");
const high = document.querySelector("#activity-high");
const maximum = document.querySelector("#activity-maximal");
const allActivities = document.querySelectorAll('input[name="activity"]');

let activityMin = 1.2;

// Выбор активности
allActivities.forEach(activity => {
	activity.addEventListener("change", event => {
		if (activity.id == "activity-minimal") {
			activityMin = 1.2;
		} else if (activity.id == "activity-low") {
			activityMin = 1.375;
		} else if (activity.id == "activity-medium") {
			activityMin = 1.55;
		} else if (activity.id == "activity-high") {
			activityMin = 1.725;
		} else if (activity.id == "activity-maximal") {
			activityMin = 1.9;
		}
	})
})

// Кнопки "рассчитать" и "очистить"
const submitButton = document.querySelector(".form__submit-button");
const resetButton = document.querySelector(".form__reset-button");

// Активность кнопок "рассчитать" и "очистить"
inputText.forEach(input => {
	input.addEventListener("change", event => {
        if (age.value != 0 && height.value != 0 && weight.value != 0) {
			submitButton.disabled = false;
		} else {
			submitButton.disabled = true;
		}
		if (age.value != 0 || height.value != 0 || weight.value != 0) {
			resetButton.disabled = false;
		} else {
			resetButton.disabled = true;
		}
	})
})

// Кнопка "очистить"

resetButton.addEventListener("click", event => {
	activityMin = 1.2;
	age.value = 0;
	weight.value = 0;
	height.value = 0;
	gender = "male";
	submitButton.disabled = true;
	counterResult.classList.add("counter__result--hidden");
})

// Поле результата
const counterResult = document.querySelector(".counter__result");

const caloriesNorm = document.querySelector("#calories-norm");
const caloriesMinimal = document.querySelector("#calories-minimal");
const caloriesMaximal = document.querySelector("#calories-maximal");


// Рассчет калорий
let weightSupport = 0;
let	weightLoss = 0;
let	weightGain = 0;

submitButton.addEventListener("click", event => {
	counterResult.classList.remove("counter__result--hidden");
	
	if (gender == "male") {
		weightSupport = ((10 * weight.value) + (6.25 * height.value) - (5 * age.value) + 5) * activityMin;
	} else if (gender == "female") {
		weightSupport = ((10 * weight.value) + (6.25 * height.value) - (5 * age.value) - 161) * activityMin;
	}
	weightLoss = weightSupport - (weightSupport * 0.15);
	weightGain = weightSupport + (weightSupport * 0.15);

	caloriesNorm.textContent = Math.round(weightSupport);
	caloriesMinimal.textContent = Math.round(weightLoss);
	caloriesMaximal.textContent = Math.round(weightGain);
})


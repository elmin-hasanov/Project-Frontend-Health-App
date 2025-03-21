document.getElementById("calculate")?.addEventListener("click", () => {
  const height = parseFloat(
    (document.getElementById("body") as HTMLInputElement).value
  );
  const age = parseInt(
    (document.getElementById("age") as HTMLInputElement).value
  );
  const weight = parseFloat(
    (document.getElementById("weight") as HTMLInputElement).value
  );
  const gender = (
    document.querySelector("input[name='gender']:checked") as HTMLInputElement
  )?.value;
  const activity = (document.getElementById("activity") as HTMLSelectElement)
    .value;

  if (isNaN(height) || isNaN(age) || isNaN(weight) || !gender) {
    const alarmElement = document.getElementById("alarm") as HTMLElement;

    if (alarmElement) {
      alarmElement.textContent =
        "Please enter valid values for height, age, weight and gender.";

      alarmElement.classList.remove("alarm");

      void alarmElement.offsetWidth;
      alarmElement.classList.add("alarm");
    }

    return;
  }

  let bmr: number;
  if (gender === "male") {
    bmr = 88.36 + 13.4 * weight + 4.8 * height - 5.7 * age;
  } else {
    bmr = 447.6 + 9.2 * weight + 3.1 * height - 4.3 * age;
  }

  const activityMultiplier: Record<string, number> = {
    sedentary: 1.2,
    lightly_active: 1.375,
    moderately_active: 1.55,
    very_active: 1.725,
  };

  const tdee = bmr * (activityMultiplier[activity] || 1.2);

  (document.getElementById("basalkcal") as HTMLElement).textContent =
    bmr.toFixed(2);
  (document.getElementById("basalkJ") as HTMLElement).textContent = (
    bmr * 4.184
  ).toFixed(2);
  (document.getElementById("totalkcal") as HTMLElement).textContent =
    tdee.toFixed(2);
  (document.getElementById("totalkJ") as HTMLElement).textContent = (
    tdee * 4.184
  ).toFixed(2);
});

document.addEventListener("DOMContentLoaded", function () {
  const featuresSection = document.querySelector(".features");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          featuresSection.classList.add("visible");
        }
      });
    },
    { threshold: 0.3 }
  );

  observer.observe(featuresSection);
});

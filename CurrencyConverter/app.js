// const BASE_URL =
//   "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const BASE_URL =
  "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/eur.json";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

// Populate dropdowns with currency options
for (let select of dropdowns) {
  for (currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    if (select.name === "from" && currCode === "USD") {
      newOption.selected = "selected";
    } else if (select.name === "to" && currCode === "INR") {
      newOption.selected = "selected";
    }
    select.append(newOption);
  }

  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}

// Fetch exchange rates and update message
const updateExchangeRate = async () => {
  let amount = document.querySelector(".amount input");
  let amtVal = amount.value;
  if (amtVal === "" || amtVal < 1) {
    amtVal = 1;
    amount.value = "1";
  }

  try {
    let response = await fetch(BASE_URL);
    let data = await response.json();

    // Convert currency values to lowercase for consistency with the API data
    let fromCurrencyCode = fromCurr.value.toLowerCase();
    let toCurrencyCode = toCurr.value.toLowerCase();

    // Get the rates for the selected currencies
    let fromRate = data.eur[fromCurrencyCode]; // 'fromCurr' value relative to EUR
    let toRate = data.eur[toCurrencyCode]; // 'toCurr' value relative to EUR

    // Calculate conversion rate: EUR -> fromCurr and EUR -> toCurr
    let rate = toRate / fromRate;
    let finalAmount = amtVal * rate;

    msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount.toFixed(2)} ${
      toCurr.value
    }`;
  } catch (error) {
    console.error("Error fetching exchange rates:", error);
    msg.innerText = "Error: Unable to retrieve exchange rates.";
  }
};

// Update flag image when currency changes
const updateFlag = (element) => {
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};

btn.addEventListener("click", (evt) => {
  evt.preventDefault();
  updateExchangeRate();
});

window.addEventListener("load", () => {
  updateExchangeRate();
});

//the currency api is now updated ..and this is my code with updatd api and it is working 
//thank you mam for jvascript series you have provided us for free...

BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector(" form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".message");
// for(code in countryList){
//     console.log(code,countryList[code])
// }
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
const updateFlag = (element) => {
  // console.log(element)
  let currCode = element.value;
  // console.log(currCode)
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};

btn.addEventListener("click", async (evt) => {
  // Prevent default form submission behavior
  evt.preventDefault();

  // Get the amount input
  let amount = document.querySelector(".amount input");
  console.log(amount.value);

  // Ensure amount is at least 1
  if (amount.value === "" || amount.value < 1) {
    amount.value = "1";
  }

  // Get the selected currencies
  const fromCurrency = fromCurr.value.toLowerCase();
  const toCurrency = toCurr.value.toLowerCase();

  // Build the URL (ensure backticks are properly used)
  const URL = `${BASE_URL}/${fromCurrency}.json`;

  try {
    // Fetch exchange rate data
    let response = await fetch(URL);
    let data = await response.json();

    // Get the exchange rate
    let rate = data[fromCurrency][toCurrency];

    // Calculate the final converted amount
    let finalAmount = amount.value * rate;

    // Display the result
    msg.innerText = `${amount.value} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
  } catch (error) {
    // Handle any errors in the fetch request
    console.error("Error fetching the exchange rate:", error);
    msg.innerText = "There was an error fetching the exchange rate.";
  }
});


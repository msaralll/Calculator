const display = document.querySelector(".calculator-input");
const keys = document.querySelector(".calculator-keys");

let displayValue = "0"; // Başlangıç Değerimizi 0 Yaptık.
let firstValue = null;
let operator = null;
let waitingForSecondValue = false;

function updateDisplay() {
  display.value = displayValue;
} // Display değerine de Başlangıç değerimizi atadık.

updateDisplay(); // Fonksiyonu Çalıştırdık.

keys.addEventListener("click", function (e) {
  const element = e.target;

  if (!element.matches("button")) return; // Sadece Butonlara click atmak istedğimiz için elementlerde target'ı button olmayanları yazdırmadık return ederek de devamını getirtmedik.

  if (element.classList.contains("operator")) {
    // console.log("operator", element.value);
    handleOperator(element.value);
    updateDisplay();
    return;
  }
  if (element.classList.contains("decimal")) {
    // console.log("decimal", element.value);
    inputDecimal();
    updateDisplay();
    return;
  }
  if (element.classList.contains("clear")) {
    // console.log("clear", element.value);
    clear();
    updateDisplay();
    return;
  }
  //   console.log("number", element.value);

  inputNumber(element.value);
  updateDisplay();
});

function handleOperator(nextOperator) {
  const value = parseFloat(displayValue);

  if (firstValue === null) {
    firstValue = value;
  } else if (operator) {
    const result = calculate(firstValue, value, operator);

    displayValue = `${parseFloat(result.toFixed(7))}`;
    firstValue = result;
  }

  waitingForSecondValue = true;
  operator = nextOperator;
}

function inputNumber(num) {
  if (waitingForSecondValue) {
    displayValue = num;
    waitingForSecondValue = false;
  } else {
    displayValue = displayValue === "0" ? num : displayValue + num; // Değerimiz 0 ise clicklediğimiz sayıyı ekrana yazdırıyoruz eğer değilse ekrandaki sayının yanına clicklediğimiz numarayı ekliyoruz.
  }
}

function calculate(first, second, operator) {
  if (operator === "+") {
    return first + second;
  } else if (operator === "-") {
    return first - second;
  } else if (operator === "*") {
    return first * second;
  } else if (operator === "/") {
    return first / second;
  }
  return second;
}

function inputDecimal() {
  if (!displayValue.includes(".")) {
    displayValue += ".";
  } // Nokta koyulmadan önce kontrol ediyoruz. Eğer Ana değerimizde önceden nokta kullanılmadıysa değere noktayı yazdırabiliriz.
}

function clear() {
  displayValue = "0";
}

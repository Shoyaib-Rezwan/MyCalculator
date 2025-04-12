import { isOperator, evaluate } from "./Calculations.js"

let str = ""

//handle event when a button is clicked
function buttonClicked(e) {
  //e is an event object
  //if you click the image on the cross button, the button will not work
  //so always choose the closest button.
  e = e.target.closest("button") //e is now the target of the event object
  if (e.tagName == "BUTTON") {
    let className = e.className
    if (className == "c") str = "0"
    else if (className == "cross") {
      if (str.length == 1) str = "0"
      else str = str.slice(0, str.length - 1)
    } else if (e.className == "=") {
      str = evaluate(str)
    } else {
      if (str == "0") str = ""
      str += className
    }
    document.querySelector(".display").innerHTML = str
  }
}

//handle event when a button is pressed
function buttonPressed(e) {
  if (e.key == "=") {
    str = evaluate(str)
  }
  if (e.key == "Delete") {
    str = "0"
  } else if (e.key == "Backspace") {
    if (str.length == 1) str = "0"
    else str = str.slice(0, str.length - 1)
  } else if (
    (e.key >= "0" && e.key <= "9") ||
    isOperator(e.key) ||
    e.key == "."
  ) {
    if (str == "0") str = ""
    str += e.key
  }
  document.querySelector(".display").innerHTML = str
}

//event listener for button clicks
document.querySelector(".buttons").addEventListener("click", buttonClicked)

//event listener for button pressed from keyboard
document.addEventListener("keydown", buttonPressed)

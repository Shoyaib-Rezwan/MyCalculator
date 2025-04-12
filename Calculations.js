//a utility function to tract whether the character is an operator
export function isOperator(s) {
  return s == "+" || s == "-" || s == "*" || s == "^" || s == "/"
}

//evaluate the function s
export function evaluate(s) {
  //convert s into an array of strings so that you can evaluate it as a postfix notation
  let arr = []
  arr = convert(s)
  //Now evaluate the postfix expression
  let stack = []
  for (let x of arr) {
    //for(let x in arr)--here x is the indices of arr
    //for(let x of arr)--here x is elements of arr
    if (!isOperator(x)) {
      stack.push(parseFloat(x))
    } else {
      let b = stack.pop()
      let a = stack.pop()
      if (x == "+") stack.push(a + b)
      else if (x == "-") stack.push(a - b)
      else if (x == "*") stack.push(a * b)
      else if (x == "/") stack.push(a / b)
      else if (x == "^") stack.push(a ** b)
    }
  }
  return String(stack.pop())
}

//converts 's' into an array of string
function convert(s) {
  let arr = []
  let i = 0
  while (i < s.length) {
    if (isOperator(s[i])) {
      arr.push(s[i])
      i++
    } else {
      let temp = ""
      while (i < s.length && !isOperator(s[i])) {
        temp += s[i]
        i++
      }
      arr.push(temp)
    }
  }
  //here arr is an infix expression. So convert it to a postfix expression
  let temp = [],
    stack = []
  for (let x of arr) {
    if (!isOperator(x)) temp.push(x)
    else {
      while (
        (stack.length > 0 &&
          precedence(stack[stack.length - 1]) > precedence(x)) ||
        (precedence(stack[stack.length - 1]) == precedence(x) &&
          isLeftAssociative(x))
      ) {
        temp.push(stack.pop())
      }
      stack.push(x)
    }
  }
  while (stack.length > 0) {
    temp.push(stack.pop())
  }
  return temp
}

//utility function to return precedence
function precedence(opr) {
  switch (opr) {
    case "^":
      return 3
      break

    case "*":
    case "/":
      return 2
      break

    case "+":
    case "-":
      return 1
      break

    default:
      return -1
      break
  }
}

//utility function to check if it's left associative or not
function isLeftAssociative(opr) {
  return opr != "^"
}

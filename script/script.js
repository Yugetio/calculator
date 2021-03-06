"use strict";

var input = document.querySelector('#input'),		
		clearAll = document.querySelector('.c'),
		backspace = document.querySelector('.backspace'),
		plusMinus = document.querySelector('.plus-minus'),
		one = document.querySelector('.one'),
		two = document.querySelector('.two'),
		three = document.querySelector('.three'),
		four = document.querySelector('.four'),
		five = document.querySelector('.five'),
		six = document.querySelector('.six'),
		seven = document.querySelector('.seven'),
		eight = document.querySelector('.eight'),
		nine = document.querySelector('.nine'),
		zero = document.querySelector('.zero'),
		point = document.querySelector('.point'),
		brOpen = document.querySelector('.bracketOpen'),
		brClose = document.querySelector('.bracketClose'),
		result = document.querySelector('.result'), //qd
		add = document.querySelector('.add'),
		subt = document.querySelector('.subt'),
		dvsn = document.querySelector('.dvsn'),
		mult = document.querySelector('.mult'),
		body = document.querySelector('body'),
		mainBoxMessage = document.querySelector('.message'),
		boxMsg = document.querySelector('.boxMsg');

//begin in/out and delete func
one.addEventListener("click", forOne, false);
two.addEventListener("click", forTwo, false);
three.addEventListener("click", forThree, false);
four.addEventListener("click", forFour, false);
five.addEventListener("click", forFive, false);
six.addEventListener("click", forSix, false);
seven.addEventListener("click", forSeven, false);
eight.addEventListener("click", forEight, false);
nine.addEventListener("click", forNine, false);
zero.addEventListener("click", forZero, false);
point.addEventListener("click", forPoint, false);
add.addEventListener("click", forPlus, false);
subt.addEventListener("click", forMinus, false);
dvsn.addEventListener("click", forDivision, false);
mult.addEventListener("click", forMultipl, false);
plusMinus.addEventListener("click", plMinus, false);
backspace.addEventListener("click", backsp, false);
clearAll.addEventListener("click", btnDelete, false);
brOpen.addEventListener("click", bracketOpen, false);
brClose.addEventListener("click", bracketClose, false);
result.addEventListener("click", answer, false);

function forOne() {numPushIn(1);}
function forTwo() {numPushIn(2);}
function forThree() {numPushIn(3);}
function forFour() {numPushIn(4);}
function forFive() {numPushIn(5);}
function forSix() {numPushIn(6);}
function forSeven() {numPushIn(7);}
function forEight() {numPushIn(8);}
function forNine() {numPushIn(9);}
function forZero() {numPushIn(0);}
function forMultipl() {testSign("×");}
function forPlus() {testSign("+");}
function forMinus() {testSign("-");}
function forDivision() {
	var str = input.value,
			i = searchIndexOf(/\×|\+|\-|\÷|\(/, str),
			pointIndex;

	i = i !== -1 ? i+1 : 0;
	if (str.length > 1 && i !== 0) {
		str = str.slice(i, str.length);
	}
	pointIndex = searchIndexOf(/\./, str)
	if (pointIndex !== -1) {
		if (pointIndex === 1 && str[pointIndex-1] !== "0" || pointIndex > 1) {
			testSign("÷");
		} else {	
			var rightArr = str.slice(pointIndex+1, str.length);
			if (rightArr.length > 1) {
				var countPoint = rightArr.length;
				for (var i = rightArr.length - 1; i >= 0; i--) {
					if (rightArr[i] === "0") {
						countPoint--;
					}
					if (i === 0 && countPoint !== 0) {
						testSign("÷");
					} else if(i === 0 && countPoint === 0){
						showMessage("You can't do this!");
					}
				}
			} else if (rightArr[0] !== "0") {
				testSign("÷");
			} else {
				showMessage("You can't do this!");
			}
		} 
	} else if (str[0] !== "0") {
		testSign("÷");
	}	else {
		showMessage("You can't do this!");
	}
}

function searchIndexOf(re,str) {
	for (var i = str.length - 1; i >= 0; i--) {
		if (re.test(str[i])) {
			return i;
		} 
	}
	return -1;
}

function bracketOpen () {
	if (!/\d|\.|\)/.test(input.value[input.value.length-1])) {
		input.value += "(";
		focusInput();
	} else {
		showMessage("You can't do this!");
	}
}

function bracketClose () {
	var str = input.value.split("");
	var countOpen = 0,
			countClose = 0;
	if (/\d|\)/.test(str[str.length-1])) {
		str.forEach(function(item){
			if (item === "(") {
				countOpen++;
			} else if (item === ")") {
				countClose++;
			}
		});

		if (countOpen > countClose) {
			input.value += ")";
			focusInput();
		} else {
			showMessage("You can't do this!");
		}
	} else {
		showMessage("You can't do this!");
	}
}

function numPushIn(arg){
	if(!/\)/.test(input.value[input.value.length-1])){
		testZero();
		input.value += arg;
		focusInput();
	} else {
		showMessage("You can't do this!");
	}
}

function testSign(arg) {
	var str = input.value;
	if(/\d|\)/.test(str[str.length-1])) {
		input.value += arg;
	} else if (/\×|\+|\-|\÷/.test(str[str.length-1]) && str[str.length-2] !== " "){
		input.value = str.slice(0, -1) + arg;
	} else {
		showMessage("You can't do this!");
	}
	focusInput();
}

function plMinus() {
	var str = input.value;
	if (str[str.length-1] === "-") {
		str = str.slice(0, -1);
		if (/\d/.test(str[str.length-1])) {
			input.value = str + "+";
		} else if (str[str.length-1] === " "){
			input.value = str.slice(0, -1);
		} else {
			input.value = str;
		}
	} else if (str[str.length-1] === "+") {
		input.value = str.slice(0, -1);
		input.value += "-";
	} else if (str[str.length-1] === "(" || !/\W/.test(str[str.length-1])){
		input.value += "-";
	} else if (/\×|\÷/.test(str[str.length-1])){
		input.value += " -";
	} else {
		showMessage("You can't do this!");
	}
	focusInput();
}

function forPoint() {
	var testPoint;
	if (input.value.length >= 3 && /\d/.test(input.value[input.value.length-1])) {
		testPoint = (function () {
			for (var i = input.value.length - 1; i >= 0; i--) {
				if (input.value[i] === ".") {
					return false;
				} else if (/\×|\+|\-|\÷/.test(input.value[i])) {
					return true;
				} else if (i === 0 && /\d/.test(input.value[i])) {
					return true;
				}
			}
		})(); 
	} else if (/\d/.test(input.value[input.value.length-1])) {
		testPoint = true;
	} else if (input.value.length === 0 || /\×|\+|\-|\÷|\(/.test(input.value[input.value.length-1])) {
		input.value += "0.";
	}
	if (testPoint) {
		input.value += ".";
	}
	focusInput();
}

function backsp() {
	if (input.value[input.value.length-1] === "-" && input.value[input.value.length-2] === " ") {
		input.value = input.value.slice(0, -2);
		focusInput(2);
	} else {
		input.value = input.value.slice(0, -1);
		focusInput(1);
	}
}
function btnDelete() {input.value = "";focusInput("clear");}

body.addEventListener("keypress", function(e) {
	e.preventDefault();
	switch (e.keyCode){
		case 40: bracketOpen();break;
		case 41: bracketClose();break;
		case 42: forMultipl();break;
		case 43: forPlus();break;
		case 45: forMinus();break;
		case 46: forPoint();break;
		case 47: forDivision();break;
		case 48: forZero();break;
		case 49: forOne();break;
		case 50: forTwo();break;
		case 51: forThree();break;
		case 52: forFour();break;
		case 53: forFive();break;
		case 54: forSix();break;
		case 55: forSeven();break;
		case 56: forEight();break;
		case 57: forNine();break;
		case 13: answer();break;
	} 
},false);

body.addEventListener("keydown", function(e) {
	if (e.keyCode === 8) {
		e.preventDefault();
		backsp();
	} else if (e.keyCode === 46) {
		e.preventDefault();
		btnDelete();
	}
},false);

var focusInput = function () {           
  var dop = input.value;
  var oldLenght = dop.length; 
  input.value = "";
  input.value = dop;
  input.focus(); 
  if (arguments[0] && arguments[0] !== "clear") {
  	oldLenght += arguments[0];
  }
  if (dop.length === 21 || arguments[0] && oldLenght === 51) {
  	input.style.fontSize = "1.8rem";
  	input.style.height = "90px";
  } else if (dop.length === 51){
  	input.style.fontSize = "1.3rem";
  	input.style.height = "100px";
  } else if (oldLenght === 21 || arguments[0] === "clear") {
  	input.style.fontSize = "2.3rem";
  	input.style.height = "65px";
  }
}

function testZero() {
	var str = input.value,
			dop = false,
			count = 0;

	var lastI = (function() {
		for (var i = str.length - 1; i >= 0; i--) {
			if (str[i] === ".") {
				return -1;
			} else if (/\×|\+|\-|\÷/.test(str[i])) {
				return i+1;
			}
		}
		if (str.length === 0) {
			return -3;
		} else {
			return -2;
		}
	})();

	if (lastI !== -1 && lastI !== -3) {
		lastI = (lastI !== -2) ? lastI : 0;
		if (str.length-lastI > 1) {
			for (var i = lastI; i < str.length; i++) {
				if (str[i] === "0") {
					count++;
					if (count === str.length){
						input.value = str.slice(0, lastI-1) + "0";
						dop = true;
					}
				} 
			}
		} else if (str[lastI] === "0") {
			dop = true;
		}
		if (str[str.length-1] === "0" && str[str.length-2] !== "." && dop) {
				input.value += ".";
		} 
	}
}

function showMessage(str, check) {
	if (check) {
		boxMsg.style.paddingTop = "5px";
		boxMsg.style.height = "65px";
	} else if (!check) {
		boxMsg.style.paddingTop = "15px";
		boxMsg.style.height = "50px";
	}

	boxMsg.innerHTML = str;
	mainBoxMessage.style.display = "block"; 
	setTimeout(function() {
		mainBoxMessage.style.display = "none"; 
	}, 2000);
}
//end in/out and delete func

// start calculator
function answer() {
	if (/\d|\)/.test(input.value[input.value.length-1])) {
		brCloseAll();
		var arr = input.value.split("");

		if (arr.indexOf("/") !== -1 || arr.indexOf("*") !== -1) {
			arr = replaceSignInArr(arr);
		}

		arr = newArr(arr);
		arr.forEach(function(item, i) {
  		if (/^((\ ?\-)?\d+(\.\d+)?)$/.test(item)) {
  			arr[i] = getNum(item);
  		}
		});
	input.value = culcAnswer(arr);
	focusInput("clear");
	} else {
		showMessage("The syntax of this equation is incorrect!", 1);
	}
}

function brCloseAll() {
	var brOpen = 0, brClose = 0;
	for (var i = input.value.length - 1; i >= 0; i--) {
		if (input.value[i] === "(") {
			brOpen++;
		} else if (input.value[i] === ")") {
			brClose++;
		}
	}
	if (brOpen !== brClose) {
		for (var i = 0; i < brOpen - brClose; i++) {
			input.value += ")";
		}
	}
}

function newArr(arr) {
	if (arr.length === 1) {return arr;}
	var newArr = [],
			str = "",
			checkEnd = false;
	for (var i = 0; i <= arr.length; i++) {
		if (arr[i] === " " || arr[i-1] === " " && arr[i] === "-" || arr[i-1] === "(" && arr[i] === "-" || i === 0 && arr[i] === "-" || checkEnd && /\d|\./.test(arr[i]) || /\d/.test(arr[i])) {
			if (!checkEnd) {checkEnd = true;}
			str += arr[i];
		} else if(/\×|\÷|\+|\-|\(|\)/.test(arr[i]) || checkEnd){
			if (checkEnd) {
				checkEnd = false;
				if (arr[i] === "(") {
					newArr.push("minus");
				} else {
					newArr.push(str);
				}
				str = "";
			}
			if (/\×|\÷|\+|\-|\(|\)/.test(arr[i])) {
				newArr.push(arr[i]);
			}
		}
	}
	return newArr;
}

function replaceSignInArr(arr) {
	var dopArr = [];
	for (var i = 0; i < arr.length; i++) {
		if (arr[i] === "/") {
			dopArr.push("÷");
		} else if (arr[i] === "*") {
			dopArr.push("×");
		} else {
			dopArr.push(arr[i]);
		}
	}

	return dopArr;
}

function getNum(num) {
    if (/^((\ ?\-)?\d+)$/.test(num)) {
			return parseInt(num);        
    } else if (/^((\ ?\-)?\d+\.\d+)$/.test(num)) {
    	return parseFloat(num);  
    }
}

function calc(num1, sing, num2) {
	var count = 1,
			answ = 0;

	if (sing !== "×" && sing !== "÷") {
		if (/\./.test(num1) || /\./.test(num2)) {
			var count1 = 0,
					count2 = 0;
			if (/\./.test(num1)) {count1 = forSearchLengthAfterPoint(num1);}
			if (/\./.test(num1)) {count2 = forSearchLengthAfterPoint(num2);}
			count1 = (count2 >= count1) ? count2 : count1;
			for (var i = count1; i > 0; i--) {count *= 10;}	
			num1 *= count;
			num2 *= count;
		}
	}

	switch (sing) {
		case "×": answ=num1*num2; break;
		case "÷": answ=num1/num2; break;
		case "+": answ=(num1+num2)/count; break;
		case "-": answ=(num1-num2)/count; break;
	}

	if (/\./.test(answ) && forSearchLengthAfterPoint(answ) > 11) {
		answ = getNum(answ.toFixed(11));
	}

	return answ;
}

function forSearchLengthAfterPoint(arg) {
	var arr = (arg+"").split(""),
			indOf = arr.indexOf(".");
	return (arr.length-1) - indOf;
}

function culcAnswer(arr) {
	if (arr.indexOf("(") !== -1) {

		var startIndex = arr.lastIndexOf("("),
				endIndex = forSearchBracketsIndex(arr, startIndex+1),
				finalArr = [],
				lArr = [],
				rArr = [];

		if (startIndex > 0) {lArr = arr.slice(0, startIndex);}
		if (endIndex !== arr.length-1) {rArr = arr.slice(endIndex+1);}
	
		if (lArr.length > 0) {finalArr = finalArr.concat(lArr);}

		if ((endIndex-1) - (startIndex+1) === 0) {
			finalArr = finalArr.concat(arr.slice(startIndex+1, endIndex));
		} else {
			finalArr.push(enumer(arr.slice(startIndex+1, endIndex)));
		}

		if (rArr.length > 0) {finalArr = finalArr.concat(rArr);}
		
		if (finalArr.length > 1) {
			return culcAnswer(finalArr);
		} else {
			return finalArr.join();
		}

	} else if (arr.length > 1){
		return enumer(arr);
	} else {
		return arr.join();
	}
}

function forSearchBracketsIndex(arr, i) {
	var dopArr = arr.slice(i);
	return dopArr.indexOf(")")+i;
}

function enumer(arg) {
		var arr = arg,
				i = -1,
				ii = -1;

		if (arr.indexOf("minus") !== -1) {
			i = arr.indexOf("minus");
		} else if (arr.indexOf("×") !== -1 || arr.indexOf("÷") !== -1) {
			i = arr.indexOf("×");
			ii = arr.indexOf("÷");
			i = (ii === -1 || i < ii && i !== -1) ? i : ii;
		}  else if (arr.indexOf("+") !== -1 || arr.indexOf("-") !== -1) {
			i = arr.indexOf("+");
			ii = arr.indexOf("-");
			i = (ii === -1 || i < ii && i !== -1) ? i : ii;
		}

		arr = forEnumerMinus(i, arr);

		if (arr.length > 1) {
			return enumer(arr);
		} else {
			return (getNum(arr.join()));
		}
}

function forEnumerMinus(i, arr) {
	var mrArr = [],
			mlArr = [],
			dopArr = [];

	if (arr[i] === "minus") {
		if (i !== 0 ) {mlArr = arr.slice(0, i);} 
		if (i !== arr.length-2) {mrArr = arr.slice(i+2);}
	} else {
		if (i !== 1) {mlArr = arr.slice(0, i-1);}
		if (i !== arr.length-2) {mrArr = arr.slice(i+2);}
	}

	if (mlArr.length > 0) {dopArr = dopArr.concat(mlArr);}

	if (arr[i] === "minus") {
		dopArr.push((arr[i+1]*(-1)));
	} else {
		dopArr.push(calc(arr[i-1], arr[i], arr[i+1]));
	}
	if (mrArr.length > 0) {dopArr = dopArr.concat(mrArr);}

	return dopArr;
}
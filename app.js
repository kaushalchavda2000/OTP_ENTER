const allBox = document.getElementsByClassName("box");
let flag = 0;//preventing from entering v

//add paste event and get data which is pasted
Array.from(allBox).forEach(function (element) {
  element.addEventListener("paste", function (evt) {
    let pastedData = evt.clipboardData.getData("text");
    pastedData = pastedData.slice(0, 6);
    let validData = validDigits(pastedData);
    if (validData) {
      pasteData(pastedData);
    }
    else {
      evt.preventDefault();
    }
  });
});

//pasting data on the boxes
function pasteData(otpValue) {
  let counter = 0;
  for (let i = 0; i < 6; i++) {
    if (allBox[i].value == "") {
      allBox[i].focus();
      allBox[i].value = otpValue[counter];
      counter++;
      if (counter >= otpValue.length) {
        break;
      }
    }
  }

}

//validate that pasted data is numbers only
function validDigits(n) {
  const input = n.replace(/[^0-9]+/g, '');
  if (input == n) {
    return Number(input);
  }
  else {
    return false;
  }
}

function isNumber(evt) {
  var keyCode = evt["keyCode"];

  //digit validation and left arrow key validation
  if (keyCode >= 48 && keyCode <= 57 || keyCode == 39) {
    setTimeout(function () {
      if (evt.target.id != "six") {
        evt.target.nextElementSibling.focus();
      }
    }, 0.1);
    flag = 0;
    return true;
  }

  // right arrow key and backspace keypress condition 
  else if (keyCode == 37 || keyCode == 8) {
    setTimeout(function () {
      if (keyCode == 8) {
        let currentelement = evt.target;
        while ( currentelement.id != "six" &&  currentelement.nextElementSibling.value != "") {
          currentelement.value = currentelement.nextElementSibling.value;
          currentelement.nextElementSibling.value = "";
          currentelement = currentelement.nextElementSibling;
        }
      }
      if (evt.target.id != "first") {
        evt.target.previousElementSibling.focus();
      }
    }, 0.1);
    flag = 0;
    return true;
  }

  //delete button press validation 
  else if(keyCode == 46){

    if( evt.target.id == "six" || evt.target.nextElementSibling.value == "" ){
      evt.target.value = "";
    }

    let currentelement = evt.target;
    while ( currentelement.id != "six" &&  currentelement.nextElementSibling.value != "") {
          currentelement.value = currentelement.nextElementSibling.value;
          currentelement.nextElementSibling.value = "";
          currentelement = currentelement.nextElementSibling;
        }
    flag = 0;
    return true;
  }

  //ctrl + v press checking
  else if(keyCode == 17){
    flag = 1;
    evt.target.addEventListener("keyup",function(){
      flag = 0;
    });
    return true;
  }
  else if(flag == 1 && keyCode == 86){
    return true;
  }

  flag = 0;
  return false;

}
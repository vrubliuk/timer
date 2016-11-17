document.getElementById("new").onclick = function () {
  HideNoTimerNote();
  HideNewButton();
  ShowSaveButton();
  ShowBackButton();
  ShowNewTimerNote();
  ShowInputField();
  HideManageButton();
  HideContainer();
};


function HideNoTimerNote() {
  document.getElementById("noTimer").style.display = "none";
}
function HideNewButton() {
  document.getElementById("new").style.display = "none";
}
function ShowNewButton() {
  document.getElementById("new").removeAttribute("style");
}
function HideSaveButton() {
  document.getElementById("save").style.display = "none";
}
function ShowSaveButton() {
  document.getElementById("save").removeAttribute("style");
}
function HideManageButton() {
  document.getElementById("manage").style.display = "none";
}
function ShowManageButton() {
  document.getElementById("manage").removeAttribute("style");
}
function ShowBackButton() {
  document.getElementById("back").removeAttribute("style");
}
function HideBackButton() {
  document.getElementById("back").style.display = "none";
}
function ShowDoneButton() {
  document.getElementById("done").removeAttribute("style");
}
function HideDoneButton() {
  document.getElementById("done").style.display = "none";
}


function ShowNewTimerNote() {
  document.getElementById("newTimer").removeAttribute("style");
}
function HideNewTimerNote() {
  document.getElementById("newTimer").style.display = "none";
}
function ShowInputField() {
  document.getElementById("inputField").removeAttribute("style");
}
function HideInputField() {
  document.getElementById("inputField").style.display = "none";
}
function ShowContainer() {
  document.getElementById("container").removeAttribute("style");
}
function HideContainer() {
  document.getElementById("container").style.display = "none";
}


//INPUT VALIDATION. ONLY DIGITS ARE ALLOWED TO BE ENTERED
$('input').keypress(function (e) {
  if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
    return false;
  }
});


document.getElementById("hoursInput").onfocus = function () {
  var minutes = document.getElementById("hoursInput").value;
  if (parseInt(minutes) === 0) {
    document.getElementById("hoursInput").value = "";
  }
};
document.getElementById("hoursInput").onblur = function () {
  var minutes = document.getElementById("hoursInput").value;
  if (minutes.length === 0) {
    document.getElementById("hoursInput").value = "0";
  }
};
document.getElementById("minutesInput").onfocus = function () {
  var minutes = document.getElementById("minutesInput").value;
  if (parseInt(minutes) === 0) {
    document.getElementById("minutesInput").value = "";
  }
};
document.getElementById("minutesInput").onblur = function () {
  var minutes = document.getElementById("minutesInput").value;
  if (minutes.length === 0) {
    document.getElementById("minutesInput").value = "0";
  }
};
document.getElementById("secondsInput").onfocus = function () {
  var minutes = document.getElementById("secondsInput").value;
  if (parseInt(minutes) === 0) {
    document.getElementById("secondsInput").value = "";
  }
};
document.getElementById("secondsInput").onblur = function () {
  var minutes = document.getElementById("secondsInput").value;
  if (minutes.length === 0) {
    document.getElementById("secondsInput").value = "0";
  }
};



//CORRECTION FOR USER'S INPUT FOR MINUTES AND SECONDS
document.getElementById("minutesInput").onkeypress = function () {
  var minutes = document.getElementById("minutesInput").value;
  if (parseInt(minutes[0]) > 5) {
    document.getElementById("minutesInput").value = 59;
  }
};
document.getElementById("secondsInput").onkeypress = function () {
  var seconds = document.getElementById("secondsInput").value;
  if (parseInt(seconds[0]) > 5) {
    document.getElementById("secondsInput").value = 59;
  }
};


//MAKE SAVE BUTTON ACTIVE ONLY IF TIME IS ENTERED AND MORE THAN ZERO 
function checkHours() {
  var hours = document.getElementById("hoursInput").value;
  if (parseInt(hours) > 0) {
    return true;
  } else if (parseInt(hours) === 0 || hours.length === 0) {
    return false;
  }
}
function checkMinutes() {
  var minutes = document.getElementById("minutesInput").value;
  if (parseInt(minutes) > 0) {
    return true;
  } else if (parseInt(minutes) === 0 || minutes.length === 0) {
    return false;
  }
}
function checkSeconds() {
  var seconds = document.getElementById("secondsInput").value;
  if (parseInt(seconds) > 0) {
    return true;
  } else if (parseInt(seconds) === 0 || seconds.length === 0) {
    return false;
  }
}
document.getElementById("hoursInput").onkeyup = checkEntered;
document.getElementById("minutesInput").onkeyup = checkEntered;
document.getElementById("secondsInput").onkeyup = checkEntered;
function checkEntered() {
  var x = checkHours();
  var y = checkMinutes();
  var z = checkSeconds();
  if (x || y || z) {
    document.getElementById("img-save").setAttribute("src", "images/save-active.png");
  } else if (!x && !y && !z) {
    document.getElementById("img-save").setAttribute("src", "images/save-notactive.png");
  }
}


document.getElementById("save").onmouseover = function () {
  var x = document.getElementById("img-save").getAttribute("src");
  if (x == "images/save-active.png") {
    document.getElementById("save").style.backgroundColor = "#c6c6c6";
  }
};
document.getElementById("save").onmouseout = function () {
  document.getElementById("save").style.backgroundColor = "#dcdcdc";
};


//WHEN CLICK SAVE BUTTON
document.getElementById("save").onclick = function () {
  var x = document.getElementById("img-save").getAttribute("src");
  if (x == "images/save-active.png") {
    HideNewTimerNote();
    HideInputField();
    HideSaveButton();
    ShowNewButton();
    ShowManageButton();
    HideBackButton(); 
    ShowContainer();
  }

  document.getElementById("hoursInput").value = "0";
  document.getElementById("minutesInput").value = "0";
  document.getElementById("secondsInput").value = "0";
  document.getElementById("img-save").setAttribute("src", "images/save-notactive.png");


};

//WHEN CLICK BACK BUTTON
document.getElementById("back").onclick = function () {
  var x = document.getElementById("back").getAttribute("display");
  if (x !== "none") {
    HideNewTimerNote();
    HideInputField();
    HideSaveButton();
    ShowNewButton();
    ShowManageButton();
    HideBackButton(); 
    ShowContainer();
  }
  document.getElementById("hoursInput").value = "0";
  document.getElementById("minutesInput").value = "0";
  document.getElementById("secondsInput").value = "0";
  document.getElementById("img-save").setAttribute("src", "images/save-notactive.png");
};

//WHEN CLICK MANAGE BUTTON
document.getElementById("manage").onclick = function () {
  ShowDoneButton();
  HideNewButton();
  HideManageButton();

  // document.getElementById("edit").setAttribute("visibility", "hidden");
  // document.getElementsByClassName("edit").setAttribute("visibility", "hidden");
document.getElementById("edit").style.visibility = "hidden";
};












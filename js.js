function ShowTimer() {
  document.getElementById("timer").removeAttribute("style");
}
function HideTimer() {
  document.getElementById("timer").style.display = "none";
}
function ShowInputField() {
  document.getElementById("inputField").removeAttribute("style");
}
function HideInputField() {
  document.getElementById("inputField").style.display = "none";
}
function ShowProgressBar() {
  document.getElementById("timeFullBar").removeAttribute("style");
}
function HideProgressBar() {
  document.getElementById("timeFullBar").style.display = "none";
}

window.onload = function () {
  InsertInitialColor();
  ShowTimer();
  InsertNumbers();
  document.getElementById("refresh").style.opacity = "0.2";
};

function Hover(element) {
  document.getElementById(element).onmouseover = function () {
    var x = ElementIsActive(element);
    if (x) {
      document.getElementById(element).style.backgroundColor = "rgba(255,255,255,0.1)";
    } else {
      document.getElementById(element).style.backgroundColor = "rgba(255,255,255,0)";
    }
  };
  document.getElementById(element).onmouseout = function () {
    var x = ElementIsActive(element);
    if (x) {
      document.getElementById(element).style.backgroundColor = "rgba(255,255,255,0)";
    }
    else {
      document.getElementById(element).style.backgroundColor = "rgba(255,255,255,0)";
    }
  };
}

Hover("refresh");
Hover("start-stop");
Hover("edit");

//HIDE HEADER AND FOOTER IF WINDOW IS SMALL
window.addEventListener("resize", function () {
  var h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
  if (h <= 400) {
    document.getElementById("footer").style.display = "none";
    document.getElementById("header").style.display = "none";
  } else {
    document.getElementById("footer").removeAttribute("style");
    document.getElementById("header").removeAttribute("style");
  }
});

function ElementIsActive(element) {
  var x = document.getElementById(element);
  var style = window.getComputedStyle(x);
  var op = style.getPropertyValue('opacity');
  if (op == 1) {
    return true;
  }
}

//WHEN CLICK EDIT/DONE BUTTON
document.getElementById("edit").onclick = function () {
  var x = document.getElementById("img-edit").getAttribute("src");
  var active = ElementIsActive("edit");
  if (x == "images/edit.png" && active) {
    HideTimer();
    ShowInputField();
    HideProgressBar();
    document.getElementById("start-stop").style.opacity = "0.2";
    document.getElementById("img-refresh").setAttribute("src", "images/back.png");
    document.getElementById("img-edit").setAttribute("src", "images/done.png");
    document.getElementById("edit").style.opacity = "0.2";
    document.getElementById("refresh").style.opacity = "1";
  } else if (x == "images/done.png" && active) {
    HideInputField();
    ShowTimer();
    ShowProgressBar();
    document.getElementById("img-refresh").setAttribute("src", "images/refresh.png");
    document.getElementById("img-edit").setAttribute("src", "images/edit.png");
    document.getElementById("start-stop").style.opacity = "1";
    document.getElementById("refresh").style.opacity = "0.2";
    document.getElementById("timeLeftBar").style.width = '100%';
    var hours = document.getElementById("hoursInput").value;
    var minutes = document.getElementById("minutesInput").value;
    var seconds = document.getElementById("secondsInput").value;
    var corectedHours = CorrectInputValue(hours);
    var corectedMinutes = CorrectInputValue(minutes);
    var corectedSeconds = CorrectInputValue(seconds);
    document.getElementById("hours").innerHTML = corectedHours;
    document.getElementById("minutes").innerHTML = corectedMinutes;
    document.getElementById("seconds").innerHTML = corectedSeconds;
    localStorage.setItem("h", corectedHours);
    localStorage.setItem("m", corectedMinutes);
    localStorage.setItem("s", corectedSeconds);
    document.getElementById("hoursInput").value = "0";
    document.getElementById("minutesInput").value = "0";
    document.getElementById("secondsInput").value = "0";
  }

  function CorrectInputValue(value) {
    var x = value.length;
    if (x == 1) {
      value = "0" + value;
      return value;
    } else {
      return value;
    }
  }
};

//WHEN CLICK REFRESH/BACK BUTTON
document.getElementById("refresh").onclick = function () {
  var x = document.getElementById("img-refresh").getAttribute("src");
  var active = ElementIsActive("refresh");
  if (x == "images/back.png" && active) {
    HideInputField();
    ShowTimer();
    ShowProgressBar();
    document.getElementById("img-refresh").setAttribute("src", "images/refresh.png");
    document.getElementById("img-edit").setAttribute("src", "images/edit.png");
    document.getElementById("start-stop").style.opacity = "1";
    document.getElementById("edit").style.opacity = "1";
    document.getElementById("hoursInput").value = "0";
    document.getElementById("minutesInput").value = "0";
    document.getElementById("secondsInput").value = "0";
    var hours = parseInt(document.getElementById("hours").innerHTML);
    var minutes = parseInt(document.getElementById("minutes").innerHTML);
    var seconds = parseInt(document.getElementById("seconds").innerHTML);
    var periodInSeconds = countPeriodInSeconds(hours, minutes, seconds);
    var hoursInitial = parseInt(localStorage.getItem('h'));
    var minutesInitial = parseInt(localStorage.getItem('m'));
    var secondsInitial = parseInt(localStorage.getItem('s'));
    var periodInSecondsInitial = countPeriodInSeconds(hoursInitial, minutesInitial, secondsInitial);
    if (periodInSeconds < periodInSecondsInitial) {
      document.getElementById("refresh").style.opacity = "1";
    } else {
      document.getElementById("refresh").style.opacity = "0.2";
    }
  } else if (x == "images/refresh.png" && active) {
    TimerRefresh();
  }
};

//INPUT VALIDATION. ONLY DIGITS ARE ALLOWED TO BE ENTERED
$('input').keypress(function (e) {
  if (e.which != 8 && e.which !== 0 && (e.which < 48 || e.which > 57)) {
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
    document.getElementById("edit").style.opacity = "1";
  } else if (!x && !y && !z) {
    document.getElementById("edit").style.opacity = "0.2";
  }
}

//INSERT BACKGROUND COLORS
var color = "#0099bc";
function InsertInitialColor() {
  if (localStorage.getItem("color") !== null) {
    color = localStorage.getItem("color");
    if (color === "#e74856") {
      document.getElementById("color1").style.border = "solid rgb(255,255,255) 2px";
    } else if (color === "#69797e") {
      document.getElementById("color2").style.border = "solid rgb(255,255,255) 2px";
    } else if (color === "#0099bc") {
      document.getElementById("color3").style.border = "solid rgb(255,255,255) 2px";
    } else if (color === "#038387") {
      document.getElementById("color4").style.border = "solid rgb(255,255,255) 2px";
    } else if (color === "#ffb900") {
      document.getElementById("color5").style.border = "solid rgb(255,255,255) 2px";
    }
  } else {
    color = "#0099bc";
    document.getElementById("color3").style.border = "solid rgb(255,255,255) 2px";
  }
  localStorage.setItem("color", color);
  document.getElementById("body").style.backgroundColor = color;
  document.getElementById("hoursInput").style.backgroundColor = color;
  document.getElementById("minutesInput").style.backgroundColor = color;
  document.getElementById("secondsInput").style.backgroundColor = color;
}

//CHANGE BACKGROUND COLORS
document.getElementById("color1").onclick = function () {
  color = "#e74856";
  localStorage.setItem("color", color);
  document.getElementById("body").style.backgroundColor = color;
  document.getElementById("hoursInput").style.backgroundColor = color;
  document.getElementById("minutesInput").style.backgroundColor = color;
  document.getElementById("secondsInput").style.backgroundColor = color;
  document.getElementById("color1").style.border = "solid rgb(255,255,255) 2px";
  document.getElementById("color2").style.border = "solid rgba(255,255,255,0.1) 2px";
  document.getElementById("color3").style.border = "solid rgba(255,255,255,0.1) 2px";
  document.getElementById("color4").style.border = "solid rgba(255,255,255,0.1) 2px";
  document.getElementById("color5").style.border = "solid rgba(255,255,255,0.1) 2px";
};
document.getElementById("color2").onclick = function () {
  color = "#69797e";
  localStorage.setItem("color", color);
  document.getElementById("body").style.backgroundColor = color;
  document.getElementById("hoursInput").style.backgroundColor = color;
  document.getElementById("minutesInput").style.backgroundColor = color;
  document.getElementById("secondsInput").style.backgroundColor = color;
  document.getElementById("color1").style.border = "solid rgba(255,255,255,0.1) 2px";
  document.getElementById("color2").style.border = "solid rgb(255,255,255) 2px";
  document.getElementById("color3").style.border = "solid rgba(255,255,255,0.1) 2px";
  document.getElementById("color4").style.border = "solid rgba(255,255,255,0.1) 2px";
  document.getElementById("color5").style.border = "solid rgba(255,255,255,0.1) 2px";
};
document.getElementById("color3").onclick = function () {
  color = "#0099bc";
  localStorage.setItem("color", color);
  document.getElementById("body").style.backgroundColor = color;
  document.getElementById("hoursInput").style.backgroundColor = color;
  document.getElementById("minutesInput").style.backgroundColor = color;
  document.getElementById("secondsInput").style.backgroundColor = color;
  document.getElementById("color1").style.border = "solid rgba(255,255,255,0.1) 2px";
  document.getElementById("color2").style.border = "solid rgba(255,255,255,0.1) 2px";
  document.getElementById("color3").style.border = "solid rgb(255,255,255) 2px";
  document.getElementById("color4").style.border = "solid rgba(255,255,255,0.1) 2px";
  document.getElementById("color5").style.border = "solid rgba(255,255,255,0.1) 2px";
};
document.getElementById("color4").onclick = function () {
  color = "#038387";
  localStorage.setItem("color", color);
  document.getElementById("body").style.backgroundColor = color;
  document.getElementById("hoursInput").style.backgroundColor = color;
  document.getElementById("minutesInput").style.backgroundColor = color;
  document.getElementById("secondsInput").style.backgroundColor = color;
  document.getElementById("color1").style.border = "solid rgba(255,255,255,0.1) 2px";
  document.getElementById("color2").style.border = "solid rgba(255,255,255,0.1) 2px";
  document.getElementById("color3").style.border = "solid rgba(255,255,255,0.1) 2px";
  document.getElementById("color4").style.border = "solid rgb(255,255,255) 2px";
  document.getElementById("color5").style.border = "solid rgba(255,255,255,0.1) 2px";
};
document.getElementById("color5").onclick = function () {
  color = "#ffb900";
  localStorage.setItem("color", color);
  document.getElementById("body").style.backgroundColor = color;
  document.getElementById("hoursInput").style.backgroundColor = color;
  document.getElementById("minutesInput").style.backgroundColor = color;
  document.getElementById("secondsInput").style.backgroundColor = color;
  document.getElementById("color1").style.border = "solid rgba(255,255,255,0.1) 2px";
  document.getElementById("color2").style.border = "solid rgba(255,255,255,0.1) 2px";
  document.getElementById("color3").style.border = "solid rgba(255,255,255,0.1) 2px";
  document.getElementById("color4").style.border = "solid rgba(255,255,255,0.1) 2px";
  document.getElementById("color5").style.border = "solid rgb(255,255,255) 2px";
};

//HOVER FOR COLOR BUTTONS
function HoverForColors(element) {
  document.getElementById(element).onmouseover = function () {
    document.getElementById(element).style.border = "solid white 2px";
  };
  document.getElementById(element).onmouseout = function () {
    var x = document.getElementById(element);
    var styleOfElement = window.getComputedStyle(x);
    var bgcElement = styleOfElement.getPropertyValue('background-color');
    var y = document.getElementById("body");
    var styleOfBody = window.getComputedStyle(y);
    var bgcBody = styleOfBody.getPropertyValue('background-color');
    if (bgcElement == bgcBody) {
      document.getElementById(element).style.border = "solid white 2px";
    } else {
      document.getElementById(element).style.border = "solid rgba(255,255,255,0.1) 2px";
    }
  };
}
HoverForColors("color1");
HoverForColors("color2");
HoverForColors("color3");
HoverForColors("color4");
HoverForColors("color5");


//TIMER LOGIC
var h;
var m;
var s;

function InsertNumbers() {
  function InsertHours() {
    if (localStorage.getItem("h") !== null) {
      h = localStorage.getItem('h');
    } else {
      h = '00';
    }
    localStorage.setItem("h", h);
    document.getElementById("hours").innerHTML = h;
  }
  function InsertMinutes() {
    if (localStorage.getItem("m") !== null) {
      m = localStorage.getItem('m');
    } else {
      m = '25';
    }
    localStorage.setItem("m", m);
    document.getElementById("minutes").innerHTML = m;
  }
  function InsertSeconds() {
    if (localStorage.getItem("s") !== null) {
      s = localStorage.getItem('s');
    } else {
      s = '00';
    }
    localStorage.setItem("s", s);
    document.getElementById("seconds").innerHTML = s;

  }
  InsertHours();
  InsertMinutes();
  InsertSeconds();
}

//WHEN CLICK START-STOP BUTTON
document.getElementById("start-stop").onclick = function () {
  var x = document.getElementById("img-start").getAttribute("src");
  var active = ElementIsActive("start-stop");
  if (x == "images/start.png" && active) {
    document.getElementById("img-start").setAttribute("src", "images/stop.png");
    document.getElementById("edit").style.opacity = "0.2";
    document.getElementById("refresh").style.opacity = "1";
    TimerWork();
  } else if (x == "images/stop.png" && active) {
    document.getElementById("img-start").setAttribute("src", "images/start.png");
    document.getElementById("edit").style.opacity = "1";
    TimerPause();
  }
};

var pause = false;
var refresh = false;

function countPeriodInSeconds(hours, minutes, seconds) {
  var PeriodInSeconds = hours * 3600 + minutes * 60 + seconds;
  return PeriodInSeconds;
}

function TimerWork() {
  pause = false;
  refresh = false;
  var hours = parseInt(document.getElementById("hours").innerHTML);
  var minutes = parseInt(document.getElementById("minutes").innerHTML);
  var seconds = parseInt(document.getElementById("seconds").innerHTML);
  var periodInSeconds = countPeriodInSeconds(hours, minutes, seconds);
  var timeEnd = Date.now() + periodInSeconds * 1000;
  var hoursInitial = parseInt(localStorage.getItem('h'));
  var minutesInitial = parseInt(localStorage.getItem('m'));
  var secondsInitial = parseInt(localStorage.getItem('s'));
  var periodInSecondsInitial = countPeriodInSeconds(hoursInitial, minutesInitial, secondsInitial);
  var element = document.getElementById("timeLeftBar");
  var x = window.setInterval(function () {
    var timeLeft = Math.floor((timeEnd - Date.now()) / 1000);
    var width = (timeLeft / periodInSecondsInitial) * 100;
    element.style.width = width + '%';
    if (timeLeft < 0) {
      PlayAudio();
      clearInterval(x);
      document.getElementById("img-start").setAttribute("src", "images/start.png");
      document.getElementById("refresh").style.opacity = "0.2";
      document.getElementById("edit").style.opacity = "1";
      element.style.width = '100%';
      InsertNumbers();
      return;
    } else if (pause) {
      clearInterval(x);
      return;
    } else if (refresh) {
      clearInterval(x);
      document.getElementById("img-start").setAttribute("src", "images/start.png");
      document.getElementById("refresh").style.opacity = "0.2";
      document.getElementById("edit").style.opacity = "1";
      element.style.width = '100%';
      InsertNumbers();
      return;
    }
    var hoursLeft = Math.floor(timeLeft / 3600);
    var minutesLeft = Math.floor((timeLeft % 3600) / 60);
    var secondsLeft = timeLeft % 60;
    $('#hours').html(hoursLeft < 10 ? '0' + hoursLeft : hoursLeft);
    $('#minutes').html(minutesLeft < 10 ? '0' + minutesLeft : minutesLeft);
    $('#seconds').html(secondsLeft < 10 ? '0' + secondsLeft : secondsLeft);
  }, 200);
}

function TimerPause() {
  pause = true;
  refresh = false;
}

function TimerRefresh() {
  if (!pause) {
    pause = false;
    refresh = true;
  } else if (pause) {
    document.getElementById("img-start").setAttribute("src", "images/start.png");
    document.getElementById("refresh").style.opacity = "0.2";
    document.getElementById("edit").style.opacity = "1";
    document.getElementById("timeLeftBar").style.width = '100%';
    InsertNumbers();
  }
}

//PLAY ALARM WHEN TIMER IS ZERO
function PlayAudio() {
  var x = document.getElementById("alarm");
  x.play();
}
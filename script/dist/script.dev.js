"use strict";

var time = new Date();
var current_item;
window.addEventListener('load', function (event) {
  setTime();
  drawIcons();
  setInterval(function () {
    setTime();
  }, 1000);
  document.getElementById('button_lecture').addEventListener('click', function () {
    buttonShowLecture();
  });
  document.getElementById('button_practice').addEventListener('click', function () {
    buttonShowPractice();
  });
});

function drawIcons() {
  var items = document.querySelectorAll('[id^="item"]');

  for (c = 0; c < items.length; c++) {
    if (localStorage.getItem("note-" + items[c].id) != "" && localStorage.getItem("note-" + items[c].id) != null) {
      items[c].innerHTML += "<i id='icon-" + items[c].id + "' class='material-icons cell_icon'>chat</i>";
    } else {
      items[c].innerHTML += "<i id='icon-" + items[c].id + "' class='material-icons cell_icon'>chat_bubble_outline</i>";
    }
  }
}

function toggleDarken() {
  var darken = document.getElementById("darken");

  if (darken.style.display == "block") {
    darken.style.display = "none";
  } else {
    darken.style.display = "block";
  }
}

function toggleNoteDialog() {
  var note_dialog = document.getElementById("note_dialog");

  if (note_dialog.open) {
    note_dialog.open = false;
    toggleDarken();
  } else {
    toggleDarken();
    note_dialog.open = true;
    note_dialog.style.width = "300px";
    note_dialog.style.height = "100px";
  }
}

function openNoteDialog(item) {
  var note = document.getElementById("note");
  toggleNoteDialog();
  loadNote(item, note);
  current_item = item;
}

function loadNote(item, note) {
  if (localStorage.getItem("note-" + item) !== null) {
    note.value = localStorage.getItem("note-" + item);
  } else {
    note.value = "";
  }
}

function saveNote() {
  if (note.value === "") {
    localStorage.setItem("note-" + current_item, null);
    updateIcon("chat_bubble_outline");
  } else {
    localStorage.setItem("note-" + current_item, note.value);
    updateIcon("chat");
  }

  toggleNoteDialog();
}

function updateIcon(icon) {
  var current_item_icon = document.getElementById("icon-" + current_item);
  current_item_icon.innerHTML = icon;
}

function setTime() {
  time = new Date();
  if (time) setPin(time);
  document.getElementById('time').innerText = time.toLocaleString();
}

function buttonShowLecture() {
  var items = document.getElementsByClassName('lecture');
  var pale_items = document.getElementsByClassName('lecture pale');
  var button_lecture = document.getElementById('button_lecture');

  if (pale_items.length > 0) {
    button_lecture.classList.remove('button_lecture_inactive');

    for (i = 0; i < items.length; i++) {
      items[i].classList.remove('pale');
    }
  } else {
    button_lecture.classList.add('button_lecture_inactive');

    for (i = 0; i < items.length; i++) {
      items[i].classList.add('pale');
    }
  }
}

function buttonShowPractice() {
  var items = document.getElementsByClassName('practice');
  var pale_items = document.getElementsByClassName('practice pale');
  var button_practice = document.getElementById('button_practice');

  if (pale_items.length > 0) {
    button_practice.classList.remove('button_practice_inactive');

    for (i = 0; i < items.length; i++) {
      items[i].classList.remove('pale');
    }
  } else {
    button_practice.classList.add('button_practice_inactive');

    for (i = 0; i < items.length; i++) {
      items[i].classList.add('pale');
    }
  }
}

function setPin(time) {
  var pin = document.getElementById('pin');
  var pin_height = pin.offsetHeight;
  pin.style.top = pin_height * time.getDay() + 'px';
  var table_cell_width = document.getElementById('first_cell').offsetWidth;
  var secs = time.getSeconds() + 60 * time.getMinutes() + 60 * 60 * time.getHours();
  var secs_in_timetable = 30600;
  var secs_until_timetable = 26100;

  if (secs < secs_until_timetable || secs > secs_until_timetable + secs_in_timetable) {
    pin.style.display = 'none';
  } else {
    pin.style.left = (document.getElementById('timetable').offsetWidth - table_cell_width) / secs_in_timetable * (secs - secs_until_timetable) + table_cell_width + 'px';
  }
}
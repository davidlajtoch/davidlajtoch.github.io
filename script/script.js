var time = new Date();
var current_item;
window.addEventListener('load', function (event) {

    setTime();

    setInterval(function () {
        setTime();
    }, 1000);

    document.getElementById('button_lecture').addEventListener('click', function () {
        buttonShowLecture()
    });
    document.getElementById('button_practice').addEventListener('click', function () {
        buttonShowPractice()
    });

})

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

    if (localStorage.getItem("note-" + item) != null) {
        loadNote(item, note);
    }
    current_item = item;
}

function loadNote(item, note) {
    note.value = localStorage.getItem("note-" + item);
}

function saveNote() {
    localStorage.setItem("note-" + current_item, note.value);
    toggleNoteDialog();
}

function setTime() {
    time = new Date();

    if (time)

        setPin(time);
    document.getElementById('time').innerText = time.toLocaleString();
}

function buttonShowLecture() {
    var items = document.getElementsByClassName('lecture');
    var pale_items = document.getElementsByClassName('lecture pale');
    var button_lecture = document.getElementById('button_lecture');

    if (pale_items.length > 0) {

        button_lecture.classList.remove('button_lecture_inactive')
        for (i = 0; i < items.length; i++) {
            items[i].classList.remove('pale');
        }


    } else {
        button_lecture.classList.add('button_lecture_inactive')
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

        button_practice.classList.remove('button_practice_inactive')
        for (i = 0; i < items.length; i++) {
            items[i].classList.remove('pale');
        }


    } else {
        button_practice.classList.add('button_practice_inactive')
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
    var secs = time.getSeconds() + (60 * time.getMinutes()) + (60 * 60 * time.getHours());

    const secs_in_timetable = 30600;
    const secs_until_timetable = 26100;

    if (secs < secs_until_timetable || secs > secs_until_timetable + secs_in_timetable) {
        pin.style.display = 'none';
    } else {
        pin.style.left = ((document.getElementById('timetable').offsetWidth - table_cell_width) / secs_in_timetable) * (secs - secs_until_timetable) + table_cell_width + 'px';

    }
}
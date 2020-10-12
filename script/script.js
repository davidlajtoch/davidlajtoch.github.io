var time = new Date();
window.addEventListener('load', function(event){


    setTime();

    setInterval(function(){
            setTime();
    }, 1000);

    document.getElementById('button_lecture').addEventListener('click', function(){buttonShowLecture()});
    document.getElementById('button_practice').addEventListener('click', function(){buttonShowPractice()});

})

function setTime(){
    time = new Date();
    document.getElementById('time').innerText = time.toLocaleString();
}

function buttonShowLecture(){
    var items = document.getElementsByClassName('lecture');
    var pale_items = document.getElementsByClassName('lecture pale');
    var button_lecture = document.getElementById('button_lecture');

    if(pale_items.length > 0){

        button_lecture.classList.remove('button_lecture_inactive')
        for(i = 0; i < items.length; i++){
            items[i].classList.remove('pale');
        }
        
        
    } else {
        button_lecture.classList.add('button_lecture_inactive')
        for(i = 0; i < items.length; i++){
            items[i].classList.add('pale');
        }
        
    }
}

function buttonShowPractice(){
    var items = document.getElementsByClassName('practice');
    var pale_items = document.getElementsByClassName('practice pale');
    var button_practice = document.getElementById('button_practice');

    if(pale_items.length > 0){

        button_practice.classList.remove('button_practice_inactive')
        for(i = 0; i < items.length; i++){
            items[i].classList.remove('pale');
        }
        
        
    } else {
        button_practice.classList.add('button_practice_inactive')
        for(i = 0; i < items.length; i++){
            items[i].classList.add('pale');
        }
        
    }
}
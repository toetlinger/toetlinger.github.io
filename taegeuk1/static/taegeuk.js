document.addEventListener('DOMContentLoaded', (event) => {

    document.querySelector('#playbutton').addEventListener('click', playVid);


    function playVid() {

        var vid = document.getElementById('video')
        vid.controls = false;
        vid.play();
    }

})
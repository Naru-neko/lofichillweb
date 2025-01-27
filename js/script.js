const audioPlayer = document.getElementById('audioPlayer');

const volumeText = document.getElementById('volumeText');
const volumeBar = document.getElementById('volumeBar');

const albumArt = document.getElementById('albumArt');

var playState = false;

var setWinState = false;

var volumeSlider = document.getElementById('volumeSlider');

var currentVol = audioPlayer.volume;

setInterval(refreshDisplay, 100);

window.onload = function() {
    audioPlayer.volume = volumeSlider.value / 300;
    albumArt.src = 'images/Scene-Ver.2.png';
    document.getElementById('audioTitle').textContent = 'Scene-Ver.2';

    document.getElementById('work-hour').value = workHour;
    document.getElementById('work-minute').value = workMinute;
    document.getElementById('work-second').value = workSecond;

    document.getElementById('rest-hour').value = restHour;
    document.getElementById('rest-minute').value = restMinute;
    document.getElementById('rest-second').value = restSecond;
}

document.addEventListener('keydown', event => {
    if (event.code === 'Space') {
        doPlay();
    } else if (event.code === 'ArrowUp') {
        if (volumeSlider.value < 100) {
            volumeSlider.value = parseInt(volumeSlider.value) + 1;
        } else {
            volumeSlider.value = 100;
        }
        audioPlayer.volume = volumeSlider.value / 300;
    } else if (event.code === 'ArrowDown') {
        if (volumeSlider.value > 0) {
            volumeSlider.value = parseInt(volumeSlider.value) - 1;
        } else {
            volumeSlider.value = 0;
        }
        audioPlayer.volume = volumeSlider.value / 300;
    }
    console.log(volumeSlider.value);
});

volumeSlider.addEventListener('input', function() {
    audioPlayer.volume = this.value / 300;
});

document.getElementById('bgm-button').addEventListener('click', function() {
    showWindow();
    document.getElementById('bgm-settings').style.display = 'block';
    document.getElementById('bg-settings').style.display = 'none';
});

document.getElementById('fs-button').addEventListener('click', function() {
    if( document.fullscreenElement || document.mozFullscreenElement || document.webkitFullscreenElement || document.msFullscreenElement ) {
        if( document.exitFullscreen ) {
            document.exitFullscreen();
          } else if( document.mozCancelFullScreen ) {
            document.mozCancelFullScreen();
          } else if( document.webkitCancelFullScreen ) {
            document.webkitCancelFullScreen();
          } else if( document.msExitFullscreen ) {
            document.msExitFullscreen();
          }
    } else {
        if( document.body.requestFullscreen ) {
            document.body.requestFullscreen();
          } else if( document.body.mozRequestFullScreen ) {
            document.body.mozRequestFullScreen();
          } else if( document.body.webkitRequestFullscreen ) {
            document.body.webkitRequestFullscreen();
          } else if( document.body.msRequestFullscreen ) {
            document.body.msRequestFullscreen();
          }
    }
});

function refreshDisplay() {
    volumeText.textContent = Math.round(audioPlayer.volume * 100 * 3) + '%';
    if (audioPlayer.paused) {
        document.getElementById('play-icon').src = 'images/play-button.svg';
    } else {
        document.getElementById('play-icon').src = 'images/pause.svg';
    }
}

function showWindow() {
    if (setWinState == false) {
        document.getElementById('center-window').style.display = 'block';
        setWinState = true;
    } else {
        document.getElementById('center-window').style.display = 'none';
        setWinState = false;
    }
}

function doPlay() {
    if (playState == false) {
        playState = true;
        document.getElementById('audioPlayer').play();
        document.getElementById('play-icon').src = 'images/pause.svg';
    } else {
        playState = false;
        document.getElementById('audioPlayer').pause();
        document.getElementById('play-icon').src = 'images/play-button.svg';
    }
}

function changeBGM(fname) {
    var url = 'bgm/' + fname + '.mp3';
    fetch(url)
        .then(response => response.blob())
        .then(file => {
            console.log(file);
            loadSmb(file);
            audioPlayer.src = URL.createObjectURL(file);
            console.log(audioPlayer.src);

            var audioTitle = document.getElementById('audioTitle');
            audioTitle.textContent = fname;

            if ((60 / fname.length) > 2.6) {
                audioTitle.style.fontSize = '2.6vw';
            } else {
                audioTitle.style.fontSize = (60 / fname.length) + 'vw';
            }
        });
}

function loadSmb(file) {
    jsmediatags.read(file, {
        onSuccess: function(tag) {
            const picture = tag.tags.picture;
            if (picture) {
                const base64String = `data:${picture.format};base64,${arrayBufferToBase64(picture.data)}`;
                albumArt.src = base64String;
                albumArt.style.display = 'block';
            } else {
                albumArt.src = 'images/smb.jpg';
                console.log("ジャケット画像が見つかりませんでした");
            }
        },
        onError: function(error) {
            console.log("エラー:", error.type, error.info);
        }
    });
}

function arrayBufferToBase64(buffer) {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
}
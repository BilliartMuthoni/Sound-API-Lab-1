const audio = document.getElementById('custom-audio');
const fileInput = document.getElementById('audio-upload');
const songTitle = document.getElementById('song-title');
const btnPlay = document.getElementById('btn-play');
const volSlider = document.getElementById('vol-slider');
const progressFill = document.getElementById('progress-fill');

// Calculating to minutes and seconds to display on the Audio record player
const formatTime = (s) => isNaN(s) ? "0:00" : Math.floor(s/60) + ":" + Math.floor(s%60).toString().padStart(2, '0');

// Load the file from the file explorer
fileInput.addEventListener('change', function() {
    const file = this.files[0];
    if (file) {
        audio.src = URL.createObjectURL(file);
        audio.load();
        songTitle.textContent = "Title : " + file.name.replace(/\.[^/.]+$/, "");

        this.blur();
        
        console.log("File loaded successfully");
    }
});

// Incase you press play and have not input the file, the page throws an error
btnPlay.addEventListener('click', () => {
    if (!audio.src) return alert("Please upload an audio file to play a track");
    audio.paused ? audio.play() : audio.pause();
});

// Play and pause toggling
audio.addEventListener('play', () => btnPlay.textContent = "PAUSE");
audio.addEventListener('pause', () => btnPlay.textContent = "PLAY");

// As the record plays, to display the time it has played
audio.addEventListener('timeupdate', () => {
    const pct = (audio.currentTime / audio.duration) * 100 || 0;
    progressFill.style.width = pct + "%";
    document.getElementById('current-time').textContent = formatTime(audio.currentTime);
    document.getElementById('total-time').textContent = formatTime(audio.duration);
});

// Adjust the volume
volSlider.addEventListener('input', () => audio.volume = volSlider.value);

// Skipping 10 seconds before or after
document.getElementById('btn-skip-back').onclick = () => audio.currentTime -= 10;
document.getElementById('btn-skip-fwd').onclick = () => audio.currentTime += 10;

// Looping the record that is playing
document.getElementById('btn-loop').onclick = function() {
    audio.loop = !audio.loop;
    this.classList.toggle('active');
};

// Mute and unmute toggling
document.getElementById('btn-mute').onclick = function() {
    audio.muted = !audio.muted;
    this.classList.toggle('active');
};

// We can use the spacebar to toggle between play and pause like a movie where press once checks if it was plying or paused
document.addEventListener('keydown', (e) => {
    if (e.code === 'Space' && e.target.tagName !== 'INPUT' && e.target.tagName !== "BUTTON") {
        e.preventDefault();
        btnPlay.click();
    }
});
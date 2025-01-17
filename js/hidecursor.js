var timer;
window.addEventListener('mousemove', function() {
    document.body.classList.remove("hideCursor");
    clearTimeout(timer);
    timer = setTimeout(function() {
    document.body.classList.add("hideCursor");
    }, 1000);
});
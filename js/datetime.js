window.setInterval(showTime, 1000);

function showTime() {
    var now = new Date();
    var year = now.getFullYear();
    var month = now.getMonth() + 1;
    var day = now.getDate();
    var nowhour = now.getHours();
    nowhour = nowhour < 10 ? '0' + nowhour : nowhour;
    var nowminutes = now.getMinutes();
    nowminutes = nowminutes < 10 ? '0' + nowminutes : nowminutes;
    var nowseconds = now.getSeconds();
    nowseconds = nowseconds < 10 ? '0' + nowseconds : nowseconds;

    var dateText = year + "-" + month + "-" + day;

    document.querySelector("#date p").innerHTML = dateText;
    document.querySelector("#hour").innerHTML = nowhour;
    document.querySelector("#minute").innerHTML = nowminutes;
    document.querySelector("#second").innerHTML = nowseconds;
}
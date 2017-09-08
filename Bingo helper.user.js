// ==UserScript==
// @name         Bingo helper
// @namespace    https://github.com/EnderPon/
// @version      1.0
// @description  Подсветка предметов подходящих для бинго
// @author       Рандомайзер
// @match        https://godville.net/*
// @match        http://godville.net/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    function updateBingo(){
        var bgn = document.getElementById("bgn");
        var items = bgn.getElementsByTagName("span");
        var strItems = [/*"ыыы"*/]; // для тестов, не забыть убрать
        if(document.getElementById("l_rank").style != "display:none;"){ // если видна строка "На сегодня все" - значит бинго закрыто
            for(var i=0; i<items.length; i++){
                if (items[i].className != "bgnk"){ // проверка заполненности ячеек
                    strItems.push(items[i].innerHTML);
                }
            }
        }
        localStorage.setItem("bingo", JSON.stringify(strItems));
        localStorage.setItem("bingoTime", Date.now());
    }
    function buttonUpdate(){
        setTimeout(updateBingo, 1000);
    }
    function newsPage(){
        var bgnUse = document.getElementById("bgn_use");
        updateBingo();
        bgnUse.addEventListener("click", buttonUpdate);
    }
    
    function needUpdate(){
        var lastUpdate = parseInt(localStorage.getItem("bingoTime"));
        if (!lastUpdate){
            return true;
        }
        var lastUpdateMSK = new Date(lastUpdate+(3600*3+60*10)*1000); // прибавляем 3 часа и 10 минут (обновление газеты не ровно в полночь)
        var dateMSK = new Date(Date.now()+(3600*3+60*10)*1000);
        if (lastUpdateMSK.getUTCDate() != dateMSK.getUTCDate()){
            return true;
        }
        return false;
    }
    function rmElem(elem){
        elem.remove();
    }
    function getBingo(){
        console.log("geting bingo");
        var ifrm = document.createElement("iframe");
        ifrm.setAttribute("src", window.location.protocol.toString()+"//godville.net/news");
        ifrm.style.display = "none";
        document.body.appendChild(ifrm);
        setTimeout(rmElem, 1000, ifrm);
    }
    function heroPage(){
        var inventory = document.getElementById("inventory");
        if (needUpdate()){
            getBingo();
        }
        if (!inventory) {
            heroLoop.stop();
            console.log("stopped");
            return;
        }
        var items = inventory.getElementsByTagName("li");
        var bingo = JSON.parse(localStorage.getItem("bingo"));
        var skip;
        for(var i=0; i < items.length; i++){
            items[i].classList.remove("bingo");
            for(var j=0; j<bingo.length; j++){
                if(items[i].innerHTML.toLowerCase().indexOf(bingo[j]) >= 0){
                    items[i].classList.add("bingo");
                }
            }
        }
    }

    if (window.location.pathname.toString() == "/news"){
        newsPage();
    }
    if (window.location.pathname.toString() == "/superhero"){
        var heroLoop = window.setInterval(heroPage, 1000);
    }
})();

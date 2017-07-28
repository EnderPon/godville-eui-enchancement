// ==UserScript==
// @name         gv avatar
// @namespace    https://github.com/EnderPon/
// @version      0.2
// @description  увеличение аватара по клику
// @author       Рандомайзер
// @match        https://godville.net/gods/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
  
    function big_avatar(){
        var hero_top = document.getElementById('hero_top');
        var avatar = hero_top.getElementsByTagName('img')[0];
        var es_info = document.getElementById('essential_info');
        avatar.height = 200;
        avatar.width = 200;
        hero_top.style.marginTop = "220px";
        avatar.style.position = "absolute";
        avatar.style.top = "-220px";
        avatar.removeEventListener('click', big_avatar);
        avatar.addEventListener("click", small_avatar);
    }
  
    function small_avatar(){
        var hero_top = document.getElementById('hero_top');
        var avatar = hero_top.getElementsByTagName('img')[0];
        var es_info = document.getElementById('essential_info');
        avatar.height = 50;
        avatar.width = 50;
        hero_top.style.marginTop = "";
        avatar.style.position = "";
        avatar.style.top = "";
        avatar.removeEventListener('click', small_avatar);
        avatar.addEventListener("click", big_avatar);
   }
  
    var hero_top = document.getElementById('hero_top');
    var avatar = hero_top.getElementsByTagName('img')[0];
    avatar.src = avatar.src.slice(0,-2) + "200";
    avatar.addEventListener("click", big_avatar);
})();

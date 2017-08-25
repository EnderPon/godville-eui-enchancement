// ==UserScript==
// @name        Disable useless actions
// @namespace   https://github.com/EnderPon/
// @description Отмечает бесполезные и опасные дествия на боссах и в подземелье
// @include     https://godville.net/superhero
// @include     http://godville.net/superhero
// @version     1
// @grant       none
// ==/UserScript==
/*
Бесполезные действия:
1. лечение на боссе-паразите
2. атаки на боссе-лучике
3. атаки на неверующем
4. гласы на боссе-глушилке
5. гласы на боссе-ушастике

6. влияние в подземке бессилия
*/
(function() {
    'use strict';
    function main(){
        var isReady = document.getElementById('control') || document.getElementById('m_control');
        if (!isReady) { //проверка на готовность страницы (появился Пульт)
          return;
        } else {
            clearInterval(startTimer);
        }
        var css = document.createElement("style");
        css.type = "text/css";
        css.innerHTML = ".disabled { color: grey; }\n";
        document.body.appendChild(css);

        var cntrl1 = document.getElementById("cntrl1");
        var good = cntrl1.getElementsByTagName("a")[0];
        var bad = cntrl1.getElementsByTagName("a")[1];
        var ressurect = cntrl1.getElementsByTagName("a")[2];
        var cntrl2 = document.getElementById("cntrl2");
        var chud = cntrl2.getElementsByClassName("mir_link_wrap")[0].getElementsByTagName("a")[0];
        var voice = document.getElementById("voice_submit_wrap").getElementsByTagName("input")[0];


        var map = document.getElementById("map");
        if (map){
            if(map.innerHTML.match(/бессилия/i)){
                good.classList.add("disabled");
                bad.classList.add("disabled");
                chud.classList.add("disabled");
            }
        }
        var fight = document.getElementById('o_info');
        if (fight){
            if(fight.innerHTML.match(/(лучезарный)|(неверующий)/i)){
                bad.classList.add("disabled");
            }
            if(fight.innerHTML.match(/(паразитирующий)/i)){
                good.classList.add("disabled");
            }
            if(fight.innerHTML.match(/(глушащий)|(ушастый)/i)){
                voice.classList.add("disabled");
            }
        }
    }
    var startTimer = setInterval(main, 200);
})();

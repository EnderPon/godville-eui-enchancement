// ==UserScript==
// @name        eUI+ Towns highlight
// @namespace   https://github.com/EnderPon/
// @version     1.0
// @description Улучшения для списка городов в eui+ 
// @author      Рандомайзер
// @match       https://godville.net/superhero
// @grant       none
// ==/UserScript==

(function(){
    'use strict';

    function showPosition(event){
        var towns = document.getElementById('edst_popover_c');
        var townList = towns.getElementsByClassName('chf_line');
        if(townList.length === 0){
            return; //блок пустой, если список городов скрыт
        }
        var position = document.getElementById('hk_distance');

        // добавляем городам показ пенсии
        var townLines = document.getElementsByClassName('chf_line');
        for(var i = 0; i < townLines.length; i++){
            showPens(townLines[i]);
        }

        var posType = position.getElementsByClassName('l_capt')[0];
        if(posType.innerHTML == "Город"){
            var town = position.getElementsByClassName('l_val')[0].getElementsByTagName('a')[0];
            var townName = town.innerHTML;
            var townsArray = window.townsArray;
            for(var i = 0; i < townsArray.length; i++){
                var iTown = townsArray[i];
                if(iTown.name == townName){
                    town.title = 'Столбы неподалеку: '+iTown.dist1 + "-" + iTown.dist2;
                }
            }
            for(var i = 0; i < townList.length; i++){
                var townListName = townList[i].getElementsByClassName('l')[0].innerHTML;
                if(townListName == townName){
                    townList[i].classList.add("you_are_here");
                } else {
                    townList[i].classList.remove("you_are_here");
                }
            }
        } else {
            var stolb_elem = position.getElementsByClassName('l_val')[0];
            stolb = stolb[1];
            for(var i = 0; i < townList.length; i++){
                var townListName = townList[i].getElementsByClassName('l')[0].innerHTML;
                var posTown = stolb_elem.title.match(/Город неподалеку: (.+)$/)[1];
                if(townListName == posTown){
                    townList[i].classList.add("you_are_here");
                } else {
                    townList[i].classList.remove("you_are_here");
                }
            }
        }
    }

    function getTowns(){
        var towns = document.getElementById('edst_popover_c');
        var townList = towns.getElementsByClassName('chf_line');
        var townsArray = [];
        for(var i = 0; i < townList.length; i++){
            var town = townList[i];
            var name = town.getElementsByClassName('l')[0].innerHTML;
            var dist = town.getElementsByClassName('r')[0].innerHTML;
            var dist1;
            var dist2;
            if(dist.match(/\(\d+\+\)/)){
                dist1 = 701;
                dist2 = Infinity;
            }else{
                dist1 = dist.match(/\((\d+)-(\d+)\)/)[1];
                dist2 = dist.match(/\((\d+)-(\d+)\)/)[2];
            }
             townsArray.push({
                               "name": name,
                               "dist1": dist1,
                               "dist2": dist2
                              });
        }
        window.townsArray = townsArray;
        var dist1 = document.getElementById('hk_distance');
        var distanceButton = dist1.getElementsByClassName('popover-button')[0];
        distanceButton.removeEventListener('click', getTowns);
    }

    function showPens(elem){
        var pensList = {
            'Нижние Котлы': [25, 50],
            'Подмостква': [10, 22],
            'Новогодвилль': [30, 55],
            'Пустосвятово': [18, 40],
            'Большие Бодуны': [39, 76],
            'Злыденьск': [22, 42],
            'Мухомуромск': [22, 43],
            'Торгбург': [20, 41],
            'ЛосАдминос': [33, 64],
            'Храмовище': [20, 45],
            'Скрежетальск': [21, 43],
            'Некропетровск': [21, 41],
            'Хироин': [23, 42],
            'Снаряжуполь': [23, 42],
            'Еретиченск': [22, 42],
            'Пивнотаун': [49, 90],
            'Малые Саппортуны': [31, 62],
            'Храмбург': [19, 40],
            'ЛосДемонос': [23, 44],
            'Средние Гильдюки': [21, 42],
            'Тризвездинск': [36, 66],
            'Ёмаёво': [21, 42],
            'СанСатанос': [23, 44],
            'Геролимп': [21, 36],
            'Някинск': [22, 43],
            'Бугагота': [48, 88],
            'Воблинск': [23, 44],
            'Шиферодвинск': [27, 44],
            'Левелаполь': [22, 42],
            'Догвилль': [22, 42],
            'Шизариумск': [23, 43],
            'Академонгородок': [22, 44],
            'Боянск': [21, 42],
            'Заходилово': [25, 42],
            'Годвильвуд': [20, 39],
            'Богород': [22, 42],
            'Вольнодумск': [27, 43]
        };
      
        var pens = elem.getElementsByClassName('fr_new_badge');
        var town = elem.getElementsByClassName('l')[0].innerHTML;
        if(pens.length > 0){
            pens = pens[0]; //чтобы не создавать новых элементов, когда происходит изменение номера столба
        } else {
            pens = document.createElement('div');
            pens.classList.add('fr_new_badge');
            pens.classList.add('pens_badge');
            pens.style = "margin-left: 50%;";
            elem.appendChild(pens);
        }
        var gold = document.getElementById('hk_gold_we').getElementsByClassName('l_val')[0].innerHTML.match(/\d+/);
        //console.log(gold);
        gold = parseInt(gold);
        var min_pens = (gold*pensList[town][0]/100/1000).toFixed(1);
        var max_pens = (gold*pensList[town][1]/100/1000).toFixed(1);
        var avg_pens = (((+min_pens)+(+max_pens))/2).toFixed(1);
        pens.list = {
            minmax: min_pens+'k-'+max_pens+'k',
            avg: avg_pens+'k'
        };
        pens.innerHTML = pens.list.avg;
        pens.title = pens.list.minmax;
    }

    function main(){
        if(document.getElementById('m_inventory')){ //если нашли "боевой" инвентарь - прекращаем работу
            clearInterval(startTimer);
            return;
        }
        var dist1 = document.getElementById('hk_distance');
        var distanceButton = dist1.getElementsByClassName('popover-button')[0];
        if (!distanceButton) { //проверка на готовность страницы (появилась кнопка "Город")
          return;
        } else {
            clearInterval(startTimer);
        }
        var distanceButton = dist1.getElementsByClassName('popover-button')[0];
        distanceButton.addEventListener('click', getTowns);
        distanceButton.addEventListener('click', showPosition);
        var observer = new MutationObserver(function(mutations) {
               showPosition();
        });
        var config = { attributes: true, childList: true, characterData: true };
        observer.observe(distanceButton, config);
        var css = document.createElement("style");
        css.type = "text/css";
        css.innerHTML = ".you_are_here { background: azure; }\n";
        document.body.appendChild(css);
    }
  
    var startTimer = setInterval(main, 200);
})();

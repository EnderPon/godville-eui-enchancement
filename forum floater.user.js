// ==UserScript==
// @name        Forums floater for eUI+
// @namespace   https://github.com/EnderPon/
// @version     1.0
// @description Добавляет всплывашку с форумными подписками
// @author      Рандомайзер
// @match       https://godville.net/superhero
// @grant       none
// ==/UserScript==

(function() {
    'use strict';
  
    function formateDate(unixtime){
        //http://artkiev.com/blog/strftime-from-javascript.htm
        var d = new Date(unixtime);
        var dd = d.getDate();
        dd = ( dd < 10 ) ? '0' + dd : dd;
        var m = d.getMonth() + 1;
        m = ( m < 10 ) ? '0' + m : m;
        var yyyy = d.getFullYear();
      
        var hh = d.getHours();
        hh = ( hh < 10 ) ? '0' + hh : hh;
        var MM = d.getMinutes();
        MM = ( MM < 10 ) ? '0' + MM : MM;
        var ss = d.getSeconds();
        ss = ( ss < 10 ) ? '0' + ss : ss;
        var ret = hh + ':' + MM + ':' + ss + ' ' + dd + '.' + m + '.' + yyyy;
        return ret;
    }
  
    function addRow(table, data, id){
        console.log(data.posts);
        var posts = data.posts;
        var name = data.name;
        var url = 'https://godville.net/forums/show_topic/' + id;
        var post = posts % 25;
        var page = (posts-post)/25+1;
        var last = url + "?page=" + page + "#guip_" + post;
        var author = data.by;
        var date = formateDate(data.date);

        var row = document.createElement("tr");
        table.appendChild(row);
        var nameTD = document.createElement("td");
        nameTD.innerHTML = '<a href="' + url +'">' + name + '</a>' + ' <small><a href="' + last +'">к концу</a></small>';
        var postsTD = document.createElement("td");
        postsTD.innerHTML = posts;
        var lastTD = document.createElement("td");
        lastTD.innerHTML = '<abbr>' + date + "</abbr><br />от <span class='author'>" + author + "</span>";
        row.appendChild(nameTD);
        row.appendChild(postsTD);
        row.appendChild(lastTD);
    }

    function showSubs(event){
        event.preventDefault();
        var forumOV = document.createElement("div");
        forumOV.setAttribute("id", "floatOverlay");
        document.body.appendChild(forumOV);
        var forum = document.createElement("div");
        forum.setAttribute("id", "floatForum");
        document.body.appendChild(forum);
        var forumTable = document.createElement("table");
        forum.appendChild(forumTable);
        var tableHead = document.createElement("tr");
        tableHead.innerHTML = "<th>Тема</th><th>Постов</th><th>Последнее</th>"
        forumTable.appendChild(tableHead);
        forumOV.addEventListener('click', hideSubs);
      
        var subs = JSON.parse(localStorage.getItem("eGUI_" + GUIp.common.getCurrentGodname() + ':ForumSubscriptions'));
        var sub_keys = Object.keys(subs);
        for(var i = 0; i < sub_keys.length; i++){
            var id = sub_keys[i];
            addRow(forumTable,  subs[id], id)
        }
    }

    function hideSubs(event){
        document.body.removeChild(document.getElementById('floatOverlay'));
        document.body.removeChild(document.getElementById('floatForum'));
    }

    function main(){
        var testForLoad = document.getElementById('e_forecast');
        if(!testForLoad){ //проверяем, загружена ли страница И аддон
          return;
        } else {
          clearInterval(startTimer);
        }
      
        var subs = document.getElementById('e_subs');
        if(!subs){
            return; // если нет подписок, гасим
        }
        subs.addEventListener('click', showSubs);
        var css = document.createElement("style");
        css.type = "text/css";
        css.innerHTML = "#floatForum { position: fixed; width: 620px; height: auto; top: calc(50% - 250px); left: calc(50% - 310px); z-index: 999; min-height: 30px; border: 1px solid rgba(0,0,0,.2); background: white;}\n";
        css.innerHTML += "#floatOverlay { position: fixed; width: 100%; height: 100%; top: 0; left: 0; z-index: 998; background: rgba(255, 255, 255, 0.5);}\n";
        css.innerHTML += "#floatForum table{border-collapse: collapse;}";
        css.innerHTML += "#floatForum td, #floatForum th{border: 1px solid rgba(0,0,0,.2); margin: 5px;}";
        css.innerHTML += "#floatForum th{background: #E0E7EE; color: #003366}";
        css.innerHTML += "#floatForum td small{color: #666 !important;}";
        css.innerHTML += "#floatForum td:nth-child(2){background: #F6F6F9; text-align: center;}";
        css.innerHTML += "#floatForum th:nth-child(2){text-align: center;}";

        document.body.appendChild(css);
    }
    var startTimer = setInterval(main, 200);
})();

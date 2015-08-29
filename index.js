/*! Twitchtv v1.0.0 | (c) 2015 Cirych. | ki-tec.ru
*/
'use strict';
//(function () {

var tv = {
	usernames:	["freecodecamp", "storbeck", "terakilobyte", "habathcx","RobotCaleb","thomasballinger","noobs2ninjas","beohoff","medrybw"],
	streamers:	{},
	url:		"https://api.twitch.tv/kraken/",
};

tv.usernames.forEach(function(username) {
	jsonp('streams', streams, username);
	jsonp('users', users, username);
});

function jsonp(url, callback, username) {
    var id = 'jsonp_' + url + username,
        existing = document.scripts[0],
        script = document.createElement('script');

    script.src = tv.url + url + '/' + username + '?callback=' + id;
    existing.parentNode.insertBefore(script, existing);

    window[id] = function (data) {
      script.parentNode.removeChild(script);
      callback(username, data);
      delete window[id];
    };
};

function streams(user, data) {
	if(!tv.streamers[user]) tv.streamers[user] = {};
	tv.streamers[user].user = user;
	tv.streamers[user].stream = (data.stream===null)?null:data.stream.channel.status;
};
function users(user, data) {
	if(!tv.streamers[user]) tv.streamers[user] = {};
	tv.streamers[user].name = data.display_name;
	tv.streamers[user].logo = data.logo;
};


function isReady(event, f){event()?setTimeout('isReady('+event+','+f+')',9):f()};

function getDOM(){
	tv.controls = {};
	tv.controls.main = document.getElementById("tv_main");
	tv.controls.all = document.getElementById("tv_all");
	tv.controls.on = document.getElementById("tv_on");
	tv.controls.off = document.getElementById("tv_off");
	tv.controls.search = document.getElementById("tv_search");
	tv.controls.search.addEventListener('keyup', function (event) {render();},false);
};

function setDOM(){
	var el = '';
	tv.list = {on:[],off:[]};
	for(var user in tv.streamers) {
		el = ''+
			'<li>'+
			'<a href="http://twitch.tv/'+tv.streamers[user].user+'">'+
			'<div class="tv_row">'+
				'<img src="' + (tv.streamers[user].logo||'http://placehold.it/50x50') + '">'+
				'<div class="tv_name">'+ tv.streamers[user].name + '<div class="tv_stream">' + (tv.streamers[user].stream||'Offline') +'</div></div>'+
				'<i class="material-icons">'+(tv.streamers[user].stream?'videocam':'pause')+'</i>'+
			'</div>'+
			'</a>'+
			'</li>';
			
		tv.list[tv.streamers[user].stream?'on':'off'].push([el,user]);
	}
};

function render(){
	tv.controls.off.innerHTML = "";tv.controls.on.innerHTML = "";
	tv.list.on.filter(function(el){ return (new RegExp(tv.controls.search.value)).test(el[1]);}).forEach(function(el){tv.controls.on.innerHTML+=el[0];});
	tv.list.off.filter(function(el){ return (new RegExp(tv.controls.search.value)).test(el[1]);}).forEach(function(el){tv.controls.off.innerHTML+=el[0];});
	tv.controls.all.innerHTML = tv.controls.on.innerHTML + tv.controls.off.innerHTML;
};

isReady(function(){return /in/.test(document.readyState);},
		function(){
			isReady(function(){return !tv.streamers.freecodecamp;},
			function(){getDOM(); setDOM(); render();});
		}
);

//})();
/*! Twitchtv v1.0.0 | (c) 2015 Cirych. | ki-tec.ru
*/
'use strict';
//(function () {
var host = "https://github.com/Cirych/freecamp-twitchtv/raw/master/";

var tv = {
	usernames:	["freecodecamp", "storbeck", "terakilobyte", "habathcx","RobotCaleb","thomasballinger","noobs2ninjas","beohoff","medrybw"],
	streamers:	{},
	url:		"https://api.twitch.tv/kraken/",
};

tv.usernames.forEach(function(username) {
	//jsonp('streams', streams, username);
	//jsonp('users', users, username);
});
tv = {
"usernames":["freecodecamp","storbeck","terakilobyte","habathcx","RobotCaleb","thomasballinger","noobs2ninjas","beohoff","medrybw"],
"streamers":{"freecodecamp":{"name":"FreeCodeCamp","logo":"http://static-cdn.jtvnw.net/jtv_user_pictures/freecodecamp-profile_image-f1b681380c0b0380-300x300.png","stream":null},"storbeck":{"name":"storbeck","logo":"http://static-cdn.jtvnw.net/jtv_user_pictures/storbeck-profile_image-7ab13c2f781b601d-300x300.jpeg","stream":null},"terakilobyte":{"name":"terakilobyte","logo":null,"stream":null},"habathcx":{"stream":null,"name":"Habathcx","logo":"http://static-cdn.jtvnw.net/jtv_user_pictures/habathcx-profile_image-d75385dbe4f42a66-300x300.jpeg"},"RobotCaleb":{"stream":null,"name":"RobotCaleb","logo":"http://static-cdn.jtvnw.net/jtv_user_pictures/robotcaleb-profile_image-9422645f2f0f093c-300x300.png"},"thomasballinger":{"stream":null,"name":"thomasballinger","logo":null},"noobs2ninjas":{"stream":null,"name":"noobs2ninjas","logo":"http://static-cdn.jtvnw.net/jtv_user_pictures/noobs2ninjas-profile_image-34707f847a73d934-300x300.png"},"beohoff":{"stream":null,"name":"Beohoff","logo":null},"medrybw":{"stream":"24/7 Classic Starcraft VoD stream 2000-2012 (6344 VoDs)","name":"MedryBW","logo":"http://static-cdn.jtvnw.net/jtv_user_pictures/medrybw-profile_image-19fce7e1b0d6c194-300x300.jpeg"}},"url":"https://api.twitch.tv/kraken/"};


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
	tv.controls.on = document.getElementById("tv_on");
	tv.controls.off = document.getElementById("tv_off");
};

function setDOM(){
	var el = '';
	tv.list = {on:[],off:[]};
	for(var user in tv.streamers) {
		el = ''+
			'<a href="http://twitch.tv/'+tv.streamers[user].user+'">'+
			'<div>'+
				'<img src="' + (tv.streamers[user].logo||'http://placehold.it/50x50') + '">'+
				'<div>'+ tv.streamers[user].name + (tv.streamers[user].stream||'') +'</div>'+
				(tv.streamers[user].stream?'V':'!')+
			'</div>'+
			'</a>';
			
		tv.list[tv.streamers[user].stream?'on':'off'].push([el,user]);
	}
};

function render(){
	tv.list.on.forEach(function(el){tv.controls.on.innerHTML+=el[0];});
	tv.list.off.forEach(function(el){tv.controls.off.innerHTML+=el[0];});
};

isReady(function(){return /in/.test(document.readyState);},
		function(){
			isReady(function(){return !tv.streamers.freecodecamp;},
			function(){getDOM(); setDOM(); render();});
		}
);

//})();
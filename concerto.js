// Generated by Haxe 4.0.0-rc.3+e3df7a448
(function ($global) { "use strict";
function $extend(from, fields) {
	var proto = Object.create(from);
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
var Main = function() { };
Main.__name__ = true;
Main.main = function() {
	try {
		var app1 = new app_Application();
	} catch( e ) {
		console.log("src/Main.hx:8:",Std.string(((e) instanceof js__$Boot_HaxeError) ? e.val : e));
	}
};
Math.__name__ = true;
var Std = function() { };
Std.__name__ = true;
Std.string = function(s) {
	return js_Boot.__string_rec(s,"");
};
var app_Application = function() {
	var config = app_ConfigLoader.create(app_Application.DATA_PATH).getConfig();
	var builder = new app_ModelBuilder();
	new app_ModelDirector(config,builder).make();
	var model = builder.getModel();
	var view1 = view_View.create(model);
	model.startConcert();
};
app_Application.__name__ = true;
var app_ConfigLoader = function(dataPath) {
	this.config = null;
	var data = this.load(dataPath);
	this.parse(data);
};
app_ConfigLoader.__name__ = true;
app_ConfigLoader.create = function(dataPath) {
	return new app_JSConfigLoader(dataPath);
};
app_ConfigLoader.prototype = {
	load: function(dataPath) {
		return "";
	}
	,parse: function(data) {
		try {
			var out = JSON.parse(data);
			this.config = out;
		} catch( e ) {
			var e1 = ((e) instanceof js__$Boot_HaxeError) ? e.val : e;
			this.config = null;
		}
	}
	,getConfig: function() {
		return this.config;
	}
};
var app_JSConfigLoader = function(dataPath) {
	app_ConfigLoader.call(this,dataPath);
};
app_JSConfigLoader.__name__ = true;
app_JSConfigLoader.__super__ = app_ConfigLoader;
app_JSConfigLoader.prototype = $extend(app_ConfigLoader.prototype,{
	load: function(dataPath) {
		var xhr = new XMLHttpRequest();
		xhr.open("GET",dataPath,false);
		xhr.send(null);
		if(xhr.status == 200) {
			return xhr.response;
		}
		return "";
	}
});
var app_ModelBuilder = function() {
	this.height = 0;
	this.width = 0;
	this.soundQuality = 0;
	this.coneAngle = 0;
	this.coneRadius = 0;
	this.storePosition = new utils_Point(0,0);
	this.stagePosition = new utils_Point(0,0);
	this.coneDirection = new utils_Point(0,0);
	this.storeItems = new haxe_ds_List();
	this.musicians = new haxe_ds_List();
	this.listeners = new haxe_ds_List();
	this.musicianPrototype = { x : 0, y : 0, name : "", tuneUpDuration : 0, songs : null};
	this.songsPrototype = new haxe_ds_List();
};
app_ModelBuilder.__name__ = true;
app_ModelBuilder.prototype = {
	setSize: function(width,height) {
		this.width = width;
		this.height = height;
		return this;
	}
	,setStorePosition: function(x,y) {
		this.storePosition.set_x(x);
		this.storePosition.set_y(y);
		return this;
	}
	,addItemToStore: function(price,quality) {
		this.storeItems.add({ _price : price, _quality : quality});
		return this;
	}
	,setStagePosition: function(x,y) {
		this.stagePosition.set_x(x);
		this.stagePosition.set_y(y);
		return this;
	}
	,setConeRadius: function(radius) {
		this.coneRadius = radius;
		return this;
	}
	,setConeAngle: function(angle) {
		this.coneAngle = angle;
		return this;
	}
	,setConeDirection: function(x,y) {
		this.coneDirection.set_x(x);
		this.coneDirection.set_y(y);
		return this;
	}
	,setSoundQuality: function(quality) {
		this.soundQuality = quality;
		return this;
	}
	,setMusicianData: function(x,y,name,tuneUpDuration) {
		this.musicianPrototype.x = x;
		this.musicianPrototype.y = y;
		this.musicianPrototype.name = name;
		this.musicianPrototype.tuneUpDuration = tuneUpDuration;
		return this;
	}
	,cleanUpMusician: function() {
		this.setMusicianData(0,0,"",0);
		this.clearSongList();
		return this;
	}
	,addSongToList: function(name,duration,quality) {
		this.songsPrototype.add({ _name : name, _duration : duration, _quality : quality});
		return this;
	}
	,clearSongList: function() {
		this.songsPrototype = new haxe_ds_List();
		return this;
	}
	,addMusician: function() {
		this.musicians.add({ x : this.musicianPrototype.x, y : this.musicianPrototype.y, name : this.musicianPrototype.name, tuneUpDuration : this.musicianPrototype.tuneUpDuration, songs : this.songsPrototype});
		this.cleanUpMusician();
		return this;
	}
	,addListener: function(x,y,mood,money) {
		this.listeners.add({ _x : x, _y : y, _mood : mood, _money : money});
		return this;
	}
	,getModel: function() {
		var store = new model_entities_MerchStore(this.storePosition.x,this.storePosition.y);
		var _g_head = this.storeItems.h;
		while(_g_head != null) {
			var val = _g_head.item;
			_g_head = _g_head.next;
			var v = val;
			store.addItem(new model_entities_Merchandise(v._price,v._quality));
		}
		var stage = new model_entities_Stage(this.stagePosition.x,this.stagePosition.y);
		stage.setCone(new model_entities_SoundPropagationCone(this.coneRadius,this.coneAngle,this.coneDirection));
		stage.set_soundQuality(this.soundQuality);
		var venue = new model_MusicVenue(store,stage,this.width,this.height);
		var _g1_head = this.musicians.h;
		while(_g1_head != null) {
			var val1 = _g1_head.item;
			_g1_head = _g1_head.next;
			var v1 = val1;
			var musician = new model_entities_members_Musician(v1.x,v1.y,v1.name,v1.tuneUpDuration,stage);
			var _g1_head1 = v1.songs.h;
			while(_g1_head1 != null) {
				var val2 = _g1_head1.item;
				_g1_head1 = _g1_head1.next;
				var s = val2;
				musician.addSong(new model_entities_members_Song(s._name,s._duration,s._quality));
			}
			venue.addMusician(musician);
		}
		var _g2_head = this.listeners.h;
		while(_g2_head != null) {
			var val3 = _g2_head.item;
			_g2_head = _g2_head.next;
			var v2 = val3;
			venue.addListener(new model_entities_members_Listener(v2._x,v2._y,v2._mood,v2._money,stage,store));
		}
		return venue;
	}
};
var app_ModelDirector = function(config,builder) {
	this.config = config;
	this.builder = builder;
};
app_ModelDirector.__name__ = true;
app_ModelDirector.prototype = {
	make: function() {
		this.builder.setSize(this.config.width,this.config.height);
		this.builder.setStorePosition(this.config.store.x,this.config.store.y);
		var _g = 0;
		var _g1 = this.config.store.items;
		while(_g < _g1.length) {
			var v = _g1[_g];
			++_g;
			this.builder.addItemToStore(v.price,v.quality);
		}
		this.builder.setStagePosition(this.config.stage.x,this.config.stage.y).setConeRadius(this.config.stage.radius).setConeAngle(this.config.stage.angle).setConeDirection(this.config.stage.directionX,this.config.stage.directionY).setSoundQuality(this.config.stage.soundQuality);
		var i = 1;
		var _g2 = 0;
		var _g3 = this.config.musicians;
		while(_g2 < _g3.length) {
			var v1 = _g3[_g2];
			++_g2;
			var x = i * 45;
			var y = 35;
			this.builder.setMusicianData(x,y,v1.name,v1.tuneUp);
			var _g21 = 0;
			var _g31 = v1.songs;
			while(_g21 < _g31.length) {
				var s = _g31[_g21];
				++_g21;
				this.builder.addSongToList(s.name,s.duration,s.quality);
			}
			this.builder.addMusician();
			++i;
		}
		var listenersCount = utils_Random.randomize(this.config.minListeners,this.config.maxListeners);
		var _g4 = 0;
		var _g5 = listenersCount;
		while(_g4 < _g5) {
			var i1 = _g4++;
			var isVerticalArrangement = Math.random() > 0.5;
			var x1 = isVerticalArrangement ? Math.random() > 0.5 ? 0 : this.config.width : utils_Random.randomizeF(0,this.config.width);
			var y1 = isVerticalArrangement ? utils_Random.randomizeF(0,this.config.height) : Math.random() > 0.5 ? 0 : this.config.height;
			var mood = 40;
			var money = utils_Random.randomize(this.config.minListenerMoney,this.config.maxListenerMoney);
			this.builder.addListener(x1 + Math.random() * 128 - 64,y1 + Math.random() * 128 - 64,mood,money);
		}
	}
};
var haxe_ds_GenericCell = function(elt,next) {
	this.elt = elt;
	this.next = next;
};
haxe_ds_GenericCell.__name__ = true;
var haxe_ds_GenericStack = function() {
};
haxe_ds_GenericStack.__name__ = true;
var haxe_ds_List = function() {
	this.length = 0;
};
haxe_ds_List.__name__ = true;
haxe_ds_List.prototype = {
	add: function(item) {
		var x = new haxe_ds__$List_ListNode(item,null);
		if(this.h == null) {
			this.h = x;
		} else {
			this.q.next = x;
		}
		this.q = x;
		this.length++;
	}
	,remove: function(v) {
		var prev = null;
		var l = this.h;
		while(l != null) {
			if(l.item == v) {
				if(prev == null) {
					this.h = l.next;
				} else {
					prev.next = l.next;
				}
				if(this.q == l) {
					this.q = prev;
				}
				this.length--;
				return true;
			}
			prev = l;
			l = l.next;
		}
		return false;
	}
};
var haxe_ds__$List_ListNode = function(item,next) {
	this.item = item;
	this.next = next;
};
haxe_ds__$List_ListNode.__name__ = true;
var js__$Boot_HaxeError = function(val) {
	Error.call(this);
	this.val = val;
	if(Error.captureStackTrace) {
		Error.captureStackTrace(this,js__$Boot_HaxeError);
	}
};
js__$Boot_HaxeError.__name__ = true;
js__$Boot_HaxeError.__super__ = Error;
js__$Boot_HaxeError.prototype = $extend(Error.prototype,{
});
var js_Boot = function() { };
js_Boot.__name__ = true;
js_Boot.__string_rec = function(o,s) {
	if(o == null) {
		return "null";
	}
	if(s.length >= 5) {
		return "<...>";
	}
	var t = typeof(o);
	if(t == "function" && (o.__name__ || o.__ename__)) {
		t = "object";
	}
	switch(t) {
	case "function":
		return "<function>";
	case "object":
		if(o.__enum__) {
			var e = $hxEnums[o.__enum__];
			var n = e.__constructs__[o._hx_index];
			var con = e[n];
			if(con.__params__) {
				s += "\t";
				var tmp = n + "(";
				var _g = [];
				var _g1 = 0;
				var _g2 = con.__params__;
				while(_g1 < _g2.length) {
					var p = _g2[_g1];
					++_g1;
					_g.push(js_Boot.__string_rec(o[p],s));
				}
				return tmp + _g.join(",") + ")";
			} else {
				return n;
			}
		}
		if(((o) instanceof Array)) {
			var str = "[";
			s += "\t";
			var _g3 = 0;
			var _g11 = o.length;
			while(_g3 < _g11) {
				var i = _g3++;
				str += (i > 0 ? "," : "") + js_Boot.__string_rec(o[i],s);
			}
			str += "]";
			return str;
		}
		var tostr;
		try {
			tostr = o.toString;
		} catch( e1 ) {
			var e2 = ((e1) instanceof js__$Boot_HaxeError) ? e1.val : e1;
			return "???";
		}
		if(tostr != null && tostr != Object.toString && typeof(tostr) == "function") {
			var s2 = o.toString();
			if(s2 != "[object Object]") {
				return s2;
			}
		}
		var str1 = "{\n";
		s += "\t";
		var hasp = o.hasOwnProperty != null;
		var k = null;
		for( k in o ) {
		if(hasp && !o.hasOwnProperty(k)) {
			continue;
		}
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
			continue;
		}
		if(str1.length != 2) {
			str1 += ", \n";
		}
		str1 += s + k + " : " + js_Boot.__string_rec(o[k],s);
		}
		s = s.substring(1);
		str1 += "\n" + s + "}";
		return str1;
	case "string":
		return o;
	default:
		return String(o);
	}
};
var model_MusicVenue = function(store,stage,width,height) {
	if(height == null) {
		height = 600;
	}
	if(width == null) {
		width = 800;
	}
	this.width = width;
	this.height = height;
	this.store = store;
	this.stage = stage;
	this.members = new haxe_ds_List();
};
model_MusicVenue.__name__ = true;
model_MusicVenue.prototype = {
	update: function() {
		var _g_head = this.members.h;
		while(_g_head != null) {
			var val = _g_head.item;
			_g_head = _g_head.next;
			var v = val;
			v.update();
			if(v.isDisposed == true) {
				this.members.remove(v);
			}
		}
	}
	,startConcert: function() {
		if(this.stage != null) {
			this.stage.callCurrentMusicianToScene();
		}
	}
	,addListener: function(listener) {
		this.members.add(listener);
		listener.setStage(this.stage);
		listener.setStore(this.store);
	}
	,addMusician: function(musician) {
		this.members.add(musician);
		this.stage.enrollMusician(musician);
		musician.setStage(this.stage);
	}
	,getStore: function() {
		return this.store;
	}
	,getStage: function() {
		return this.stage;
	}
	,getMembers: function() {
		return this.members;
	}
};
var model_entities_ConcertMember = function(x,y,stage) {
	this.objectType = "";
	this.position = new utils_Point(x,y);
	this.spawnPosition = new utils_Point(x,y);
	if(stage != null) {
		this.stage = stage;
	}
	this.isDisposed = false;
};
model_entities_ConcertMember.__name__ = true;
model_entities_ConcertMember.prototype = {
	update: function() {
	}
	,getStage: function() {
		return this.stage;
	}
	,setStage: function(stage) {
		this.stage = stage;
	}
	,dispose: function() {
		this.isDisposed = true;
	}
	,getSpawnPosition: function() {
		return this.spawnPosition;
	}
	,get_x: function() {
		return this.position.x;
	}
	,set_x: function(_x) {
		return this.position.set_x(_x);
	}
	,get_y: function() {
		return this.position.y;
	}
	,set_y: function(_y) {
		return this.position.set_y(_y);
	}
};
var model_entities_MerchStore = function(x,y) {
	this.position = new utils_Point(x,y);
	this.merchandise = new haxe_ds_List();
};
model_entities_MerchStore.__name__ = true;
model_entities_MerchStore.prototype = {
	getMerchandise: function() {
		return this.merchandise;
	}
	,dispense: function(merch) {
		var correct = this.merchandise.remove(merch);
		if(correct) {
			return merch;
		}
		return null;
	}
	,addItem: function(merch) {
		this.merchandise.add(merch);
	}
	,get_x: function() {
		return this.position.x;
	}
	,get_y: function() {
		return this.position.y;
	}
};
var model_entities_Merchandise = function(price,quality) {
	this.quality = 0;
	this.price = 0;
	this.set_price(price);
	this.set_quality(quality);
};
model_entities_Merchandise.__name__ = true;
model_entities_Merchandise.prototype = {
	set_price: function(_price) {
		if(_price >= 0) {
			this.price = _price;
		}
		return this.price;
	}
	,set_quality: function(_quality) {
		if(_quality >= 0) {
			this.quality = _quality;
		}
		return this.quality;
	}
};
var model_entities_SoundPropagationCone = function(radius,angle,direction) {
	this.angle = 0;
	this.radius = 0;
	this.set_radius(radius);
	this.set_angle(angle);
	this.direction = direction;
};
model_entities_SoundPropagationCone.__name__ = true;
model_entities_SoundPropagationCone.prototype = {
	getDirection: function() {
		return new utils_Point(this.direction.x,this.direction.y);
	}
	,set_radius: function(_radius) {
		if(_radius >= 0) {
			this.radius = _radius;
		}
		return this.radius;
	}
	,set_angle: function(_angle) {
		if(_angle >= 0 && _angle < Math.PI) {
			this.angle = _angle;
		}
		return this.angle;
	}
};
var model_entities_Stage = function(x,y) {
	this.isInPreparation = false;
	this.listenersCount = 0;
	this.capacity = 0;
	this.soundQuality = 0;
	this.musicQuality = 0;
	this.position = new utils_Point(x,y);
	this.musiciansQueue = new utils_Queue();
};
model_entities_Stage.__name__ = true;
model_entities_Stage.prototype = {
	enrollMusician: function(musician) {
		this.musiciansQueue.push(musician);
	}
	,getCurrentMusician: function() {
		return this.musiciansQueue.first();
	}
	,callCurrentMusicianToScene: function() {
		var musician = this.getCurrentMusician();
		if(musician != null) {
			musician.informAboutPerformance();
		}
	}
	,endMusician: function() {
		return this.musiciansQueue.pop();
	}
	,getCone: function() {
		return this.cone;
	}
	,setCone: function(cone) {
		this.cone = cone;
		this.setCapacity();
	}
	,setCapacity: function() {
		var coneArea = this.cone.angle * this.cone.radius * this.cone.radius / 2;
		this.capacity = Math.round(coneArea * model_entities_Stage.CAPACITY_CONSTRAINT_KOEF);
	}
	,set_musicQuality: function(_musicQuality) {
		if(_musicQuality >= 0) {
			this.musicQuality = _musicQuality;
		}
		return this.musicQuality;
	}
	,set_soundQuality: function(_soundQuality) {
		if(_soundQuality >= 0) {
			this.soundQuality = _soundQuality;
		}
		return this.soundQuality;
	}
	,get_x: function() {
		return this.position.x;
	}
	,get_y: function() {
		return this.position.y;
	}
	,set_listenersCount: function(_listenersCount) {
		if(_listenersCount >= 0) {
			this.listenersCount = _listenersCount;
		}
		return this.listenersCount;
	}
};
var model_entities_members_Listener = function(x,y,mood,money,stage,store) {
	this.boughtItem = false;
	model_entities_ConcertMember.call(this,x,y,stage);
	if(store != null) {
		this.store = store;
	}
	this.set_mood(mood);
	this.set_money(money);
	this.objectType = model_entities_members_Listener.TYPE;
	this.fsm = new utils_StateMachineOf(this);
	this.fsm.setState(new model_states_ListenerWalkToSceneState(this.fsm));
};
model_entities_members_Listener.__name__ = true;
model_entities_members_Listener.__super__ = model_entities_ConcertMember;
model_entities_members_Listener.prototype = $extend(model_entities_ConcertMember.prototype,{
	update: function() {
		this.fsm.update();
	}
	,getStore: function() {
		return this.store;
	}
	,setStore: function(store) {
		this.store = store;
	}
	,set_mood: function(_mood) {
		if(_mood >= 0) {
			this.mood = _mood;
		}
		return this.mood;
	}
	,set_money: function(_money) {
		if(_money >= 0) {
			this.money = _money;
		}
		return this.money;
	}
});
var model_entities_members_Musician = function(x,y,name,duration,stage) {
	if(duration == null) {
		duration = 0;
	}
	model_entities_ConcertMember.call(this,x,y,stage);
	this.name = name;
	this.set_tuneUpDuration(duration);
	this.objectType = model_entities_members_Musician.TYPE;
	this.songs = new utils_Queue();
	this.fsm = new utils_StateMachineOf(this);
};
model_entities_members_Musician.__name__ = true;
model_entities_members_Musician.__super__ = model_entities_ConcertMember;
model_entities_members_Musician.prototype = $extend(model_entities_ConcertMember.prototype,{
	update: function() {
		this.fsm.update();
	}
	,addSong: function(song) {
		this.songs.push(song);
	}
	,getCurrentSong: function() {
		return this.songs.first();
	}
	,hasSongs: function() {
		return !this.songs.isEmpty();
	}
	,endCurrentSong: function() {
		this.songs.pop();
	}
	,informAboutPerformance: function() {
		this.fsm.setState(new model_states_MusicianWalkState(this.fsm));
	}
	,set_tuneUpDuration: function(_duration) {
		if(_duration >= 0) {
			this.tuneUpDuration = _duration;
		}
		return this.tuneUpDuration;
	}
});
var model_entities_members_Song = function(name,duration,quality) {
	this.quality = 0;
	this.duration = 0;
	this.name = name;
	this.set_duration(duration);
	this.set_quality(quality);
};
model_entities_members_Song.__name__ = true;
model_entities_members_Song.prototype = {
	set_duration: function(_duration) {
		if(_duration >= 0) {
			this.duration = _duration;
		}
		return this.duration;
	}
	,set_quality: function(_quality) {
		if(_quality >= 0) {
			this.quality = _quality;
		}
		return this.quality;
	}
};
var utils_StateOf = function(fsm) {
	this.setFSM(fsm);
	this.setOwner(fsm.getOwner());
};
utils_StateOf.__name__ = true;
utils_StateOf.prototype = {
	update: function() {
	}
	,setOwner: function(owner) {
		this.owner = owner;
	}
	,setFSM: function(fsm) {
		this.fsm = fsm;
	}
};
var model_states_ListenerLeaveState = function(fsm) {
	utils_StateOf.call(this,fsm);
	this.destination = this.owner.getSpawnPosition();
};
model_states_ListenerLeaveState.__name__ = true;
model_states_ListenerLeaveState.__super__ = utils_StateOf;
model_states_ListenerLeaveState.prototype = $extend(utils_StateOf.prototype,{
	update: function() {
		var vecX = this.destination.x - this.owner.get_x();
		var vecY = this.destination.y - this.owner.get_y();
		var length = Math.sqrt(vecX * vecX + vecY * vecY);
		if(length <= model_states_ListenerLeaveState.MIN_DISTANCE) {
			this.fsm.setState(null);
			this.owner.dispose();
			return;
		}
		var _g = this.owner;
		_g.set_x(_g.get_x() + vecX / length);
		var _g1 = this.owner;
		_g1.set_y(_g1.get_y() + vecY / length);
	}
});
var model_states_ListenerListenState = function(fsm) {
	this.waitingMoodDecay = 0.;
	this.elapsed = 0;
	utils_StateOf.call(this,fsm);
	this.stage = this.owner.getStage();
	this.cone = this.stage.getCone();
};
model_states_ListenerListenState.__name__ = true;
model_states_ListenerListenState.__super__ = utils_StateOf;
model_states_ListenerListenState.prototype = $extend(utils_StateOf.prototype,{
	update: function() {
		if(this.stage.getCurrentMusician() == null || this.owner.mood == 0) {
			var _g = this.stage;
			_g.set_listenersCount(_g.listenersCount - 1);
			this.fsm.setState(new model_states_ListenerLeaveState(this.fsm));
			return;
		}
		if(this.owner.mood >= model_entities_members_Listener.HOT_MOOD_THRESHOLD && !this.owner.boughtItem) {
			var _g1 = this.stage;
			_g1.set_listenersCount(_g1.listenersCount - 1);
			this.fsm.setState(new model_states_ListenerWalkToStoreState(this.fsm));
			return;
		}
		if(this.elapsed >= model_states_ListenerListenState.MOOD_REFRESH_INTERVAL) {
			var _g2 = this.owner;
			_g2.set_mood(_g2.mood + ((this.stage.soundQuality - model_states_ListenerListenState.SOUND_QUALITY_PENALTY) / 10 | 0));
			if(this.stage.isInPreparation) {
				this.waitingMoodDecay += model_states_ListenerListenState.WAITING_STEP;
				var _g3 = this.owner;
				_g3.set_mood(_g3.mood - (1 / (model_states_ListenerListenState.MAXIMAL_WAITING_DURATION - this.waitingMoodDecay) - 1 / model_states_ListenerListenState.MAXIMAL_WAITING_DURATION | 0));
			} else {
				if(this.waitingMoodDecay != 0) {
					this.waitingMoodDecay = 0;
				}
				var _g4 = this.owner;
				_g4.set_mood(_g4.mood + ((this.stage.musicQuality - model_states_ListenerListenState.MUSIC_QUALITY_PENALTY) / 10 | 0));
				var distanceX = this.stage.get_x() - this.owner.get_x();
				var distanceY = this.stage.get_y() - this.owner.get_y();
				var distanceToScene = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
				if(distanceToScene > this.cone.radius) {
					var _g5 = this.owner;
					_g5.set_mood(_g5.mood - (distanceToScene / this.cone.radius * 5 | 0));
				}
			}
			this.elapsed = 0;
		}
		this.elapsed += model_states_ListenerListenState.TIME_STAMP;
	}
});
var model_states_ListenerWalkToSceneState = function(fsm) {
	utils_StateOf.call(this,fsm);
	this.stage = this.owner.getStage();
	this.cone = this.stage.getCone();
	this.minDistance = this.cone.radius;
	this.calculateAngles();
};
model_states_ListenerWalkToSceneState.__name__ = true;
model_states_ListenerWalkToSceneState.__super__ = utils_StateOf;
model_states_ListenerWalkToSceneState.prototype = $extend(utils_StateOf.prototype,{
	calculateAngles: function() {
		var dirLen = Math.sqrt(this.cone.getDirection().x * this.cone.getDirection().x + this.cone.getDirection().y * this.cone.getDirection().y);
		var dirAngle = Math.acos(this.cone.getDirection().x / dirLen);
		this.minAngle = dirAngle - this.cone.angle / 2;
		this.maxAngle = dirAngle + this.cone.angle / 2;
	}
	,update: function() {
		if(this.stage.getCurrentMusician() == null) {
			this.fsm.setState(new model_states_ListenerLeaveState(this.fsm));
			return;
		}
		var vecX = this.stage.get_x() - this.owner.get_x();
		var vecY = this.stage.get_y() - this.owner.get_y();
		var length = Math.sqrt(vecX * vecX + vecY * vecY);
		if(length <= this.minDistance) {
			var _g = this.stage;
			_g.set_listenersCount(_g.listenersCount + 1);
			var angle = utils_Random.randomizeF(this.minAngle,this.maxAngle);
			var radius = this.stage.capacity == 0 || this.cone.angle == 0 ? 5 : this.stage.listenersCount / this.stage.capacity * Math.sqrt(2 * this.stage.capacity / (model_entities_Stage.CAPACITY_CONSTRAINT_KOEF * this.cone.angle));
			if(radius < 30 && radius < this.cone.radius) {
				radius = this.cone.radius / 2 + radius * 0.25;
			}
			var x = Math.cos(angle) * radius;
			var y = Math.sin(angle) * radius;
			this.owner.set_x(this.stage.get_x() + x);
			this.owner.set_y(this.stage.get_y() + y);
			this.fsm.setState(new model_states_ListenerListenState(this.fsm));
			return;
		}
		var _g1 = this.owner;
		_g1.set_x(_g1.get_x() + vecX / length);
		var _g2 = this.owner;
		_g2.set_y(_g2.get_y() + vecY / length);
	}
});
var model_states_ListenerWalkToStoreState = function(fsm) {
	utils_StateOf.call(this,fsm);
	this.stage = this.owner.getStage();
	this.store = this.owner.getStore();
};
model_states_ListenerWalkToStoreState.__name__ = true;
model_states_ListenerWalkToStoreState.__super__ = utils_StateOf;
model_states_ListenerWalkToStoreState.prototype = $extend(utils_StateOf.prototype,{
	update: function() {
		if(this.stage.getCurrentMusician() == null) {
			this.fsm.setState(new model_states_ListenerLeaveState(this.fsm));
			return;
		}
		var vecX = this.store.get_x() - this.owner.get_x();
		var vecY = this.store.get_y() - this.owner.get_y();
		var length = Math.sqrt(vecX * vecX + vecY * vecY);
		if(length <= model_states_ListenerWalkToStoreState.MIN_DISTANCE) {
			var merch = this.store.getMerchandise();
			var _g_head = merch.h;
			while(_g_head != null) {
				var val = _g_head.item;
				_g_head = _g_head.next;
				var v = val;
				if(v.price <= this.owner.money) {
					var item = this.store.dispense(v);
					var _g = this.owner;
					_g.set_money(_g.money - item.price);
					var _g1 = this.owner;
					_g1.set_mood(_g1.mood + item.quality);
					break;
				}
			}
			this.owner.boughtItem = true;
			this.fsm.setState(new model_states_ListenerWalkToSceneState(this.fsm));
			return;
		}
		var _g2 = this.owner;
		_g2.set_x(_g2.get_x() + vecX / length);
		var _g3 = this.owner;
		_g3.set_y(_g3.get_y() + vecY / length);
	}
});
var model_states_MusicianLeaveState = function(fsm) {
	utils_StateOf.call(this,fsm);
	this.destination = this.owner.getSpawnPosition();
};
model_states_MusicianLeaveState.__name__ = true;
model_states_MusicianLeaveState.__super__ = utils_StateOf;
model_states_MusicianLeaveState.prototype = $extend(utils_StateOf.prototype,{
	update: function() {
		var vecX = this.destination.x - this.owner.get_x();
		var vecY = this.destination.y - this.owner.get_y();
		var length = Math.sqrt(vecX * vecX + vecY * vecY);
		if(length <= model_states_MusicianLeaveState.MIN_DISTANCE) {
			this.fsm.setState(null);
			this.owner.dispose();
			return;
		}
		var _g = this.owner;
		_g.set_x(_g.get_x() + vecX / length);
		var _g1 = this.owner;
		_g1.set_y(_g1.get_y() + vecY / length);
	}
});
var model_states_MusicianPlaySetState = function(fsm) {
	this.currentSong = null;
	this.songElapsed = 0;
	utils_StateOf.call(this,fsm);
	this.currentSong = this.owner.getCurrentSong();
	if(this.currentSong != null) {
		this.owner.getStage().set_musicQuality(this.currentSong.quality);
	}
};
model_states_MusicianPlaySetState.__name__ = true;
model_states_MusicianPlaySetState.__super__ = utils_StateOf;
model_states_MusicianPlaySetState.prototype = $extend(utils_StateOf.prototype,{
	update: function() {
		if(this.owner.hasSongs() == false) {
			this.owner.getStage().set_musicQuality(0);
			this.owner.getStage().endMusician();
			this.owner.getStage().callCurrentMusicianToScene();
			this.fsm.setState(new model_states_MusicianLeaveState(this.fsm));
			return;
		}
		if(this.songElapsed >= this.currentSong.duration) {
			this.songElapsed = 0;
			this.owner.endCurrentSong();
			this.currentSong = this.owner.getCurrentSong();
			if(this.currentSong != null) {
				this.owner.getStage().set_musicQuality(this.currentSong.quality);
			}
			return;
		}
		this.songElapsed += model_states_MusicianPlaySetState.TIME_STAMP;
	}
});
var model_states_MusicianTuneUpState = function(fsm) {
	this.elapsed = 0;
	utils_StateOf.call(this,fsm);
};
model_states_MusicianTuneUpState.__name__ = true;
model_states_MusicianTuneUpState.__super__ = utils_StateOf;
model_states_MusicianTuneUpState.prototype = $extend(utils_StateOf.prototype,{
	update: function() {
		if(this.elapsed >= this.owner.tuneUpDuration) {
			this.owner.getStage().isInPreparation = false;
			this.fsm.setState(new model_states_MusicianPlaySetState(this.fsm));
			return;
		}
		this.elapsed += model_states_MusicianTuneUpState.TIME_STAMP;
	}
});
var model_states_MusicianWalkState = function(fsm) {
	utils_StateOf.call(this,fsm);
	this.stage = this.owner.getStage();
	this.stage.isInPreparation = true;
};
model_states_MusicianWalkState.__name__ = true;
model_states_MusicianWalkState.__super__ = utils_StateOf;
model_states_MusicianWalkState.prototype = $extend(utils_StateOf.prototype,{
	update: function() {
		var vecX = this.stage.get_x() - this.owner.get_x();
		var vecY = this.stage.get_y() - this.owner.get_y();
		var length = Math.sqrt(vecX * vecX + vecY * vecY);
		if(length <= model_states_MusicianWalkState.MIN_DISTANCE) {
			this.fsm.setState(new model_states_MusicianTuneUpState(this.fsm));
			return;
		}
		var _g = this.owner;
		_g.set_x(_g.get_x() + vecX / length);
		var _g1 = this.owner;
		_g1.set_y(_g1.get_y() + vecY / length);
	}
});
var utils_Point = function(x,y) {
	this.set_x(x);
	this.set_y(y);
};
utils_Point.__name__ = true;
utils_Point.prototype = {
	set_x: function(_x) {
		return this.x = _x;
	}
	,set_y: function(_y) {
		return this.y = _y;
	}
};
var utils_Queue = function() {
	this.leftStack = new haxe_ds_GenericStack();
	this.rightStack = new haxe_ds_GenericStack();
};
utils_Queue.__name__ = true;
utils_Queue.prototype = {
	push: function(v) {
		var _this = this.leftStack;
		_this.head = new haxe_ds_GenericCell(v,_this.head);
	}
	,transferValues: function() {
		while(this.leftStack.head != null) {
			var _this = this.rightStack;
			var _this1 = this.leftStack;
			var k = _this1.head;
			var item;
			if(k == null) {
				item = null;
			} else {
				_this1.head = k.next;
				item = k.elt;
			}
			_this.head = new haxe_ds_GenericCell(item,_this.head);
		}
	}
	,pop: function() {
		if(this.rightStack.head != null) {
			var _this = this.rightStack;
			var k = _this.head;
			if(k == null) {
				return null;
			} else {
				_this.head = k.next;
				return k.elt;
			}
		}
		this.transferValues();
		var _this1 = this.rightStack;
		var k1 = _this1.head;
		if(k1 == null) {
			return null;
		} else {
			_this1.head = k1.next;
			return k1.elt;
		}
	}
	,first: function() {
		if(this.rightStack.head != null) {
			var _this = this.rightStack;
			if(_this.head == null) {
				return null;
			} else {
				return _this.head.elt;
			}
		}
		this.transferValues();
		var _this1 = this.rightStack;
		if(_this1.head == null) {
			return null;
		} else {
			return _this1.head.elt;
		}
	}
	,isEmpty: function() {
		if(this.leftStack.head == null) {
			return this.rightStack.head == null;
		} else {
			return false;
		}
	}
};
var utils_Random = function() { };
utils_Random.__name__ = true;
utils_Random.randomize = function(min,max) {
	return min + Math.round(Math.random() * (max - min));
};
utils_Random.randomizeF = function(min,max) {
	return min + Math.random() * (max - min);
};
var utils_StateMachineOf = function(owner) {
	this.state = null;
	this.owner = owner;
};
utils_StateMachineOf.__name__ = true;
utils_StateMachineOf.prototype = {
	update: function() {
		if(this.state != null) {
			this.state.update();
		}
	}
	,setState: function(state) {
		this.state = state;
	}
	,getOwner: function() {
		return this.owner;
	}
};
var view_JSImage = function(path,context) {
	this.context = context;
	this.concreteImage = new Image();
	this.concreteImage.src = path;
};
view_JSImage.__name__ = true;
view_JSImage.prototype = {
	draw: function(x,y,width,height) {
		if(width == null || height == null) {
			this.context.drawImage(this.concreteImage,x - this.concreteImage.width / 2,y - this.concreteImage.height / 2);
		} else {
			this.context.drawImage(this.concreteImage,x - width / 2,y - height / 2,width,height);
		}
	}
};
var view_View = function(venue) {
	this.venue = venue;
	this.init();
	this.loadAssets();
};
view_View.__name__ = true;
view_View.create = function(venue) {
	return new view_JSView(venue);
};
view_View.prototype = {
	init: function() {
		throw new js__$Boot_HaxeError("Error: unimplemented method init");
	}
	,loadAssets: function() {
		this.stageDisplay = this.loadImage("assets/stage.png");
		this.storeDisplay = this.loadImage("assets/store.png");
		this.listenerSadDisplay = this.loadImage("assets/listener-sad.png");
		this.listenerNormalDisplay = this.loadImage("assets/listener-normal.png");
		this.listenerEngagedDisplay = this.loadImage("assets/listener-engaged.png");
		this.listenerHotDisplay = this.loadImage("assets/listener-hot.png");
		this.bandDisplay = this.loadImage("assets/band.png");
		this.toolDisplay = this.loadImage("assets/tool.png");
		this.creamDisplay = this.loadImage("assets/cream.png");
	}
	,loadImage: function(path) {
		throw new js__$Boot_HaxeError("Error: unimplemented method loadImage");
	}
	,update: function() {
		this.venue.update();
		this.draw();
	}
	,draw: function() {
		this.clearScene();
		this.storeDisplay.draw(this.venue.getStore().get_x(),this.venue.getStore().get_y());
		this.stageDisplay.draw(this.venue.getStage().get_x(),this.venue.getStage().get_y());
		this.drawCone();
		this.drawMembers();
		var musician = this.venue.getStage().getCurrentMusician();
		this.printText(10,this.venue.height - 50,"Musician: " + (musician == null ? "none" : musician.name));
		var song = musician == null ? null : musician.getCurrentSong();
		this.printText(10,this.venue.height - 20,"Song: " + (song == null ? "none" : song.name));
	}
	,clearScene: function() {
		throw new js__$Boot_HaxeError("Error: unimplemented method clearScene");
	}
	,drawCone: function() {
		throw new js__$Boot_HaxeError("Error: unimplemented method drawCone");
	}
	,printText: function(x,y,caption) {
		throw new js__$Boot_HaxeError("Error: unimplemented method printText");
	}
	,drawMembers: function() {
		var _g_head = this.venue.getMembers().h;
		while(_g_head != null) {
			var val = _g_head.item;
			_g_head = _g_head.next;
			var v = val;
			switch(v.objectType) {
			case model_entities_members_Musician.TYPE:
				var musician = v;
				if(musician.name == "Cream") {
					this.creamDisplay.draw(musician.get_x(),musician.get_y());
				} else if(musician.name == "Tool") {
					this.toolDisplay.draw(musician.get_x(),musician.get_y());
				} else {
					this.bandDisplay.draw(musician.get_x(),musician.get_y());
				}
				break;
			case model_entities_members_Listener.TYPE:
				var listener = v;
				if(listener.mood >= model_entities_members_Listener.HOT_MOOD_THRESHOLD) {
					this.listenerHotDisplay.draw(listener.get_x(),listener.get_y());
				} else if(listener.mood >= model_entities_members_Listener.ENGAGED_MOOD_THRESHOLD && listener.mood < model_entities_members_Listener.HOT_MOOD_THRESHOLD) {
					this.listenerEngagedDisplay.draw(listener.get_x(),listener.get_y());
				} else if(listener.mood >= model_entities_members_Listener.NORMAL_MOOD_THRESHOLD && listener.mood < model_entities_members_Listener.ENGAGED_MOOD_THRESHOLD) {
					this.listenerNormalDisplay.draw(listener.get_x(),listener.get_y());
				} else {
					this.listenerSadDisplay.draw(listener.get_x(),listener.get_y());
				}
				break;
			}
		}
	}
};
var view_JSView = function(venue) {
	view_View.call(this,venue);
};
view_JSView.__name__ = true;
view_JSView.__super__ = view_View;
view_JSView.prototype = $extend(view_View.prototype,{
	init: function() {
		var _gthis = this;
		this.canvas = window.document.createElement("canvas");
		this.canvas.id = "concerto_canvas";
		this.canvas.width = this.venue.width | 0;
		this.canvas.height = this.venue.height | 0;
		this.canvas.style.backgroundColor = "#f1f1f1";
		this.context = this.canvas.getContext("2d",null);
		this.context.imageSmoothingEnabled = false;
		this.calculateConeData();
		window.onload = function(e) {
			window.document.body.appendChild(_gthis.canvas);
			window.requestAnimationFrame($bind(_gthis,_gthis.loop));
		};
	}
	,loop: function(f) {
		this.update();
		window.requestAnimationFrame($bind(this,this.loop));
	}
	,loadImage: function(path) {
		return new view_JSImage(path,this.context);
	}
	,clearScene: function() {
		this.context.clearRect(0,0,this.canvas.width,this.canvas.height);
	}
	,calculateConeData: function() {
		var cone = this.venue.getStage().getCone();
		this.centerX = this.venue.getStage().get_x();
		this.centerY = this.venue.getStage().get_y();
		var dirLen = Math.sqrt(cone.getDirection().x * cone.getDirection().x + cone.getDirection().y * cone.getDirection().y);
		var dirAngle = Math.acos(cone.getDirection().x / dirLen);
		this.startAngle = dirAngle - cone.angle / 2;
		this.endAngle = dirAngle + cone.angle / 2;
	}
	,drawCone: function() {
		this.context.fillStyle = "rgba(0, 255, 0, 0.5)";
		this.context.strokeStyle = "rgb(0, 255, 0)";
		this.context.lineWidth = 1;
		this.context.beginPath();
		this.context.moveTo(this.centerX,this.centerY);
		this.context.arc(this.centerX,this.centerY,this.venue.getStage().getCone().radius,this.startAngle,this.endAngle);
		this.context.lineTo(this.centerX,this.centerY);
		this.context.fill();
		this.context.stroke();
	}
	,printText: function(x,y,caption) {
		this.context.font = "20px Sans-serif";
		this.context.strokeStyle = "black";
		this.context.lineWidth = 4;
		this.context.strokeText(caption,x,y + 10);
		this.context.fillStyle = "white";
		this.context.fillText(caption,x,y + 10);
	}
});
var $_;
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $global.$haxeUID++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = m.bind(o); o.hx__closures__[m.__id__] = f; } return f; }
if(typeof $global.$haxeUID == "undefined") $global.$haxeUID = 0;
String.__name__ = true;
Array.__name__ = true;
Object.defineProperty(js__$Boot_HaxeError.prototype,"message",{ get : function() {
	return String(this.val);
}});
js_Boot.__toStr = ({ }).toString;
app_Application.DATA_PATH = "assets/data.json";
model_entities_Stage.CAPACITY_CONSTRAINT_KOEF = 0.00778;
model_entities_members_Listener.TYPE = "Listener";
model_entities_members_Listener.NORMAL_MOOD_THRESHOLD = 40;
model_entities_members_Listener.ENGAGED_MOOD_THRESHOLD = 60;
model_entities_members_Listener.HOT_MOOD_THRESHOLD = 80;
model_entities_members_Musician.TYPE = "Musician";
model_states_ListenerLeaveState.MIN_DISTANCE = 5;
model_states_ListenerListenState.MOOD_REFRESH_INTERVAL = 5;
model_states_ListenerListenState.TIME_STAMP = 0.05;
model_states_ListenerListenState.SOUND_QUALITY_PENALTY = 20;
model_states_ListenerListenState.MUSIC_QUALITY_PENALTY = 30;
model_states_ListenerListenState.MAXIMAL_WAITING_DURATION = 60;
model_states_ListenerListenState.WAITING_STEP = 0.05;
model_states_ListenerWalkToStoreState.MIN_DISTANCE = 5;
model_states_MusicianLeaveState.MIN_DISTANCE = 5;
model_states_MusicianPlaySetState.TIME_STAMP = 0.75;
model_states_MusicianTuneUpState.TIME_STAMP = 0.75;
model_states_MusicianWalkState.MIN_DISTANCE = 5;
Main.main();
})(typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this);
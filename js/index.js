

let userLocation = [];
let kazu = 0;

var firebaseConfig = {
    apiKey: "AIzaSyARmTaggGBWnkJvS2Stc-H4wsJeejpcR_8",
    authDomain: "dev18-chat-15a8a.firebaseapp.com",
    databaseURL: "https://dev18-chat-15a8a.firebaseio.com",
    projectId: "dev18-chat-15a8a",
    storageBucket: "dev18-chat-15a8a.appspot.com",
    messagingSenderId: "79031230023",
    appId: "1:79031230023:web:55ef84d4199bad079f1b62"
};
firebase.initializeApp(firebaseConfig);
const newPostRef = firebase.database().ref("user");

function userlogin(){
  let username = $("#username").val();
  if(username != ""){
    localStorage.setItem("names",username);
    return true;
  }else{
    var timer;
    $("#in").click(function() {
      var count = $("#in").length;
      var index = 0;
      timer = setInterval(function() {
        $("#in").eq(index).show(300);
        index ++;
        if(index == count) {
          clearInterval(timer);
        };
      }, 500);   
    });
    $("#in").html("なまえいれてね");
    function out(){
      $("#in").html("");
    }
    setTimeout(out,3000);
    return false;
  }
}

let map,directionsManager;
//1．位置情報の取得に成功した時の処理
function mapsInit(position) {
    

    //lat=緯度、lon=経度 を取得
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    
    
    map = new Microsoft.Maps.Map('#myMap', {
        center: new Microsoft.Maps.Location(lat, lon),
        zoom: 15,
        showMapTypeSelector:false
        // mapTypeId: Microsoft.Maps.MapTypeId.aerial
    });
    //Load the directions module.
    //ここから経路案内処理
      Microsoft.Maps.loadModule('Microsoft.Maps.Directions', function () {
        //Create an instance of the directions manager.
        directionsManager = new Microsoft.Maps.Directions.DirectionsManager(map);

        //Specify where to display the route instructions.
        directionsManager.setRenderOptions({itineraryContainer: '#directionsItinerary'});

        //Specify the where to display the input panel
        directionsManager.showInputPanel('directionsPanel');
      });
      //ここまで経路案内処理
      
    newPostRef.on("child_added", function (users){
      userLocation.push([users.val()]);
      let v = users.val();
      let k = users.key;
      
      // if(v.name == h){
      //   newPostRef.child(k).update({
      //     lat: lat,
      //     lon: lon
      //   });
      // }
      let key;
      let h;
      for(var i = 0; i < localStorage.length; i++){
        key = localStorage.key(i);
        h = localStorage.getItem(key);
        if(v.name == h){
          newPostRef.child(k).update({
            name: h,
            lat: lat,
            lon: lon
          });
        }
      }
      
      

      let place1 = `${v.lat}`;
      let place2 = `${v.lon}`;
      //Create a pushpin.
      let pin = new Microsoft.Maps.Pushpin(new Microsoft.Maps.Location(place1,place2));
      map.entities.push(pin); //Add pin to Map
    });

    let key;
    let h;
    
    for(var i = 0; i < localStorage.length; i++){
      key = localStorage.key(i);
      if(key == "names" && kazu == 0){
        h = localStorage.getItem(key);
        console.log(h);
        newPostRef.push({
          name: h,
          lat: lat+10,
          lon: lon+10
        });
        kazu++;
      }
    }
    
};
    

//2． 位置情報の取得に失敗した場合の処理
function mapsError(error) {
  let e = "";
  if (error.code == 1) { //1＝位置情報取得が許可されてない（ブラウザの設定）
    e = "位置情報が許可されてません";
  }
  if (error.code == 2) { //2＝現在地を特定できない
    e = "現在位置を特定できません";
  }
  if (error.code == 3) { //3＝位置情報を取得する前にタイムアウトになった場合
    e = "位置情報を取得する前にタイムアウトになりました";
  }
  alert("エラー：" + e);
};

//3.位置情報取得オプション
const set ={
  enableHighAccuracy: true, //より高精度な位置を求める
  maximumAge: 20000,        //最後の現在地情報取得が20秒以内であればその情報を再利用する設定
  timeout: 10000,            //10秒以内に現在地情報を取得できなければ、処理を終了
};

//Main:位置情報を取得する処理 //getCurrentPosition :or: watchPosition
function GetMap() {
    navigator.geolocation.watchPosition(mapsInit, mapsError, set);
}
//後から使う

// newPostRef.on("child_added", function (users){
//   userLocation.push([users.val()]);
//   let v = users.val();
//   let k = users.key;
//   $("#place").append(`<button onclick="getplace(${v.name})">おす</button>:${v.name}`);
// });

// function getplace(e){
//   let i = e;
//   console.log(i);
// }

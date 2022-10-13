(function(){"use strict";var e={6134:function(e,a,n){var t=n(144),o=function(){var e=this,a=e._self._c;return a("div",{attrs:{id:"app"}},[a("KakaoMap")],1)},r=[],i=function(){var e=this,a=e._self._c;return a("div",{staticClass:"map_wrap"},[a("div",{attrs:{id:"map"}}),a("input",{directives:[{name:"model",rawName:"v-model.trim",value:e.keyWord,expression:"keyWord",modifiers:{trim:!0}}],staticClass:"col form-control",attrs:{type:"text"},domProps:{value:e.keyWord},on:{keyup:function(a){return!a.type.indexOf("key")&&e._k(a.keyCode,"enter",13,a.key,"Enter")?null:e.keyWordSearch.apply(null,arguments)},input:function(a){a.target.composing||(e.keyWord=a.target.value.trim())},blur:function(a){return e.$forceUpdate()}}}),a("button",{staticClass:"col col-lg-2 btn-success",attrs:{type:"submit"},on:{click:e.keyWordSearch}},[e._v(" 검색 ")]),a("hr"),e._m(0)])},s=[function(){var e=this,a=e._self._c;return a("div",{staticClass:"bg_white",attrs:{id:"menu_wrap"}},[a("ul",{attrs:{id:"placesList"}}),a("div",{attrs:{id:"pagination"}})])}],l=(n(7658),{name:"KakaoMap",data(){return{keyWord:"맛집",markers:[],ps:""}},mounted(){if(window.kakao&&window.kakao.maps)this.initMap();else{const e=document.createElement("script");e.onload=()=>kakao.maps.load(this.initMap),e.src="//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=1979f702d77ea0046b74ea7bdfbea8df&libraries=services",document.head.appendChild(e)}},methods:{initMap(){let e=document.getElementById("map"),a={center:new kakao.maps.LatLng(33.450701,126.570667),level:3},n=new kakao.maps.Map(e,a);if(navigator.geolocation)navigator.geolocation.getCurrentPosition((function(e){var a=e.coords.latitude,t=e.coords.longitude,o=new kakao.maps.LatLng(a,t);n.setCenter(o);let r=new kakao.maps.Marker({position:n.setCenter(o)});r.setMap(n)}));else{var t=new kakao.maps.LatLng(33.450701,126.570667);n.setCenter(t);let e=new kakao.maps.Marker({position:n.setCenter(t)});alert("위치 정보를 확인할 수 없습니다."),e.setMap(n)}},keyWordSearch(){let e=[],a=document.getElementById("map"),n={center:new kakao.maps.LatLng(33.450701,126.570667),level:3},t=new kakao.maps.Map(a,n),o=this.keyWord;navigator.geolocation?navigator.geolocation.getCurrentPosition((function(e){var a=e.coords.latitude,n=e.coords.longitude,t=new kakao.maps.LatLng(a,n);s(o,t)})):alert("위치 정보를 확인할 수 없습니다.");let r=new kakao.maps.services.Places,i=new kakao.maps.InfoWindow({zIndex:1});function s(e,a){if(console.log("검색호출",e),!e.replace(/^\s+|\s+$/g,""))return alert("키워드를 입력해주세요!"),!1;r.keywordSearch(e,l,{radius:500,location:a})}function l(e,a,n){if(a===kakao.maps.services.Status.OK)c(e),k(n);else{if(a===kakao.maps.services.Status.ZERO_RESULT)return void alert("검색 결과가 존재하지 않습니다.");if(a===kakao.maps.services.Status.ERROR)return void alert("검색 결과 중 오류가 발생했습니다.")}}function c(e){let a=document.getElementById("placesList"),n=document.getElementById("menu_wrap"),o=document.createDocumentFragment(),r=new kakao.maps.LatLngBounds,s=[];v(a),m();for(let t=0;t<e.length;t++){let a=new kakao.maps.LatLng(e[t].y,e[t].x),n=d(a,t),l=u(t,e[t]);r.extend(a),s.push(e[t].place_name),function(e,a){kakao.maps.event.addListener(e,"mouseover",(function(){f(e,a)})),kakao.maps.event.addListener(e,"mouseout",(function(){i.close()})),l.onmouseover=function(){f(e,a)},l.onmouseout=function(){i.close()}}(n,e[t].place_name),o.appendChild(l)}p(s),a.appendChild(o),n.scrollTop=0,t.setBounds(r)}function u(e,a){var n=document.createElement("li"),t='<span class="markerbg marker_'+(e+1)+'"></span><div class="info"><h5 class="storeName">'+a.place_name+"</h5>";return a.road_address_name?t+="    <span>"+a.road_address_name+'</span>   <span class="jibun gray">'+a.address_name+"</span>":t+="    <span>"+a.address_name+"</span>",t+='  <span class="tel">'+a.phone+"</span></div>",n.innerHTML=t,n.className="item",n}function p(e){console.log("테스트",e)}function d(a,n){var o="https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png",r=new kakao.maps.Size(36,37),i={spriteSize:new kakao.maps.Size(36,691),spriteOrigin:new kakao.maps.Point(0,46*n+10),offset:new kakao.maps.Point(13,37)},s=new kakao.maps.MarkerImage(o,r,i),l=new kakao.maps.Marker({position:a,image:s});return l.setMap(t),e.push(l),l}function m(){for(var a=0;a<e.length;a++)e[a].setMap(null);e=[]}function k(e){var a,n=document.getElementById("pagination"),t=document.createDocumentFragment();while(n.hasChildNodes())n.removeChild(n.lastChild);for(a=1;a<=e.last;a++){var o=document.createElement("a");o.href="#",o.innerHTML=a,a===e.current?o.className="on":o.onclick=function(a){return function(){e.gotoPage(a)}}(a),t.appendChild(o)}n.appendChild(t)}function f(e,a){var n='<div style="padding:5px;z-index:1;">'+a+"</div>";i.setContent(n),i.open(t,e)}function v(e){while(e.hasChildNodes())e.removeChild(e.lastChild)}}}}),c=l,u=n(1001),p=(0,u.Z)(c,i,s,!1,null,null,null),d=p.exports,m={name:"App",components:{KakaoMap:d}},k=m,f=(0,u.Z)(k,o,r,!1,null,null,null),v=f.exports;t.ZP.config.productionTip=!1,new t.ZP({render:e=>e(v)}).$mount("#app")}},a={};function n(t){var o=a[t];if(void 0!==o)return o.exports;var r=a[t]={exports:{}};return e[t](r,r.exports,n),r.exports}n.m=e,function(){var e=[];n.O=function(a,t,o,r){if(!t){var i=1/0;for(u=0;u<e.length;u++){t=e[u][0],o=e[u][1],r=e[u][2];for(var s=!0,l=0;l<t.length;l++)(!1&r||i>=r)&&Object.keys(n.O).every((function(e){return n.O[e](t[l])}))?t.splice(l--,1):(s=!1,r<i&&(i=r));if(s){e.splice(u--,1);var c=o();void 0!==c&&(a=c)}}return a}r=r||0;for(var u=e.length;u>0&&e[u-1][2]>r;u--)e[u]=e[u-1];e[u]=[t,o,r]}}(),function(){n.d=function(e,a){for(var t in a)n.o(a,t)&&!n.o(e,t)&&Object.defineProperty(e,t,{enumerable:!0,get:a[t]})}}(),function(){n.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){n.o=function(e,a){return Object.prototype.hasOwnProperty.call(e,a)}}(),function(){var e={143:0};n.O.j=function(a){return 0===e[a]};var a=function(a,t){var o,r,i=t[0],s=t[1],l=t[2],c=0;if(i.some((function(a){return 0!==e[a]}))){for(o in s)n.o(s,o)&&(n.m[o]=s[o]);if(l)var u=l(n)}for(a&&a(t);c<i.length;c++)r=i[c],n.o(e,r)&&e[r]&&e[r][0](),e[r]=0;return n.O(u)},t=self["webpackChunkslot_map_api"]=self["webpackChunkslot_map_api"]||[];t.forEach(a.bind(null,0)),t.push=a.bind(null,t.push.bind(t))}();var t=n.O(void 0,[998],(function(){return n(6134)}));t=n.O(t)})();
//# sourceMappingURL=app.cc19ac62.js.map
<template>
  <v-container>
    <v-row>
      <v-col>
        <input type="text" id="keyword" value="이태원 맛집" placeholder="sad" />
        <v-btn @click="initMap">dasfd</v-btn>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="10">
        <v-sheet min-height="20vh" rounded="lg"> </v-sheet>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="10">
        <v-sheet min-height="70vh" rounded="lg">
          <!--  -->
          <div id="map" style="min-height: 70vh"></div>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
// import axios from 'axios'
export default {
  data: () => ({
    keyWord: "",
  }),
  mounted() {
    // window 글로벌 객체 kakao 객체가 존재 && 카카오.맵 객체 존재?
    if (window.kakao && window.kakao.maps) {
      this.initMap(); // 존재하면 initMap()실행
    } else {
      // 존재 하지 않으면 script에 kakao스크립트를 헤드에 넣는 것을 함
      const script = document.createElement("script");
      /* global kakao */
      script.onload = () => kakao.maps.load(this.initMap);
      script.src =
        "//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=1979f702d77ea0046b74ea7bdfbea8df&libraries=services,clusterer,drawing";
      document.head.appendChild(script);
    }
  },
  methods: {
    // 현재 위치에서 주변 맛집을 표현해야함
    initMap() {
      const container = document.getElementById("map");
      const option = {
        center: new kakao.maps.LatLng(33.450701, 126.570667),
        level: 10,
      };
      const map = new kakao.maps.Map(container, option);
      // HTML5의 지오로케이션으로 사용할 수 있는 지 확인
      if (navigator.geolocation) {
        // GeoLocation을 이용해서 접속 위치를 얻어옴
        navigator.geolocation.getCurrentPosition(function (position) {
          const lat = position.coords.latitude; // 위도

          const lon = position.coords.longitude; // 경도

          const locPosition = new kakao.maps.LatLng(lat, lon);
          const message = '<div style="padding:5px;">여기에 계신가요?</div>'; // 인포윈도우에 표시될 내용

          // 마커와 인포윈도우를 표시한다.
          displayMarker(locPosition, message);
        });
      } else {
        var locPostion = new kakao.maps.LatLng(33.450701, 126.570667);
        var message = "현재위치를 찾을 수 없습니다.";

        displayMarker(locPostion, message);
      }
      // 지도에 마커와 인포윈도우를 표시하는 함수
      function displayMarker(locPosition, message) {
        const marker = new kakao.maps.Marker({
          map: map,
          position: locPosition,
        });
        const iwContent = message; // 인포윈도우에 표시할 내용
        const iwRemovaable = true;
        // 인포 윈도우 생성
        var infowindow = new kakao.maps.InfoWindow({
          content: iwContent,
          removavle: iwRemovaable,
        });
        infowindow.open(map, marker);

        map.setCenter(locPosition);
      }
    },
    keyWordSearch() {
      // 마커를 클릭하면 장소명을 표출할 인포윈도우 입니다
      var infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });
      // 지도를 표시할 div
      const mapContainer = document.getElementById("map");
      const options = {
        center: new kakao.maps.LatLng(33.664, 6.89),
        level: 10,
      };
      // 지도 생성 -> 나중에 전역변수로 맵을 생성해야함
      const map = new kakao.maps.Map(mapContainer, options);

      // 장소 검색
      const ps = new kakao.maps.services.Places();

      ps.keywordSearch(this.keyWord + "맛집", placesSearchCB);

      // 키워드 검색 완료시 호출되는 콜백함수
      function placesSearchCB(data, status) {
        if (status === kakao.maps.services.Status.OK) {
          // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기 위해 LatLngBounds 객체에 좌표 추가
          // LatBounds 객체에 좌표를 추가
          const bounds = new kakao.maps.LatLngBounds();

          for (var i = 0; i < data.length; i++) {
            displayMarker(data[i]);
            bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
          }
          // 검색된 장소 위치를 기준으로 지도 범위를 재설정
          map.setBounds(bounds);
        }
        // 지도에 마커를 표시하는 함수입니다
        function displayMarker(place) {
          // 마커를 생성하고 지도에 표시합니다
          var marker = new kakao.maps.Marker({
            map: map,
            position: new kakao.maps.LatLng(place.y, place.x),
          });

          // 마커에 클릭이벤트를 등록합니다
          kakao.maps.event.addListener(marker, "click", function () {
            // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
            infowindow.setContent(
              '<div style="padding:5px;font-size:12px;">' +
                place.place_name +
                "</div>"
            );
            infowindow.open(map, marker);
          });
        }
      }
    },
  },
};
</script>

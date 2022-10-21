<template>
  <div class="map_wrap">
    <!-- 결과값 모달창 -->
    <div class="modal">
      <div class="black_bg">
        <div class="white_bg">
          <h4>🔔 도착한 점심 메뉴는?</h4>
          <div class="resultMenu">
            <div>
              <ul id="StoreNameList"></ul>
            </div>
            <div id="pickMenu"></div>
          </div>
          <button id="CloseBtn" class="btn btn-danger btn">창 닫기</button>
        </div>
      </div>
    </div>
    <div id="map"></div>
    <div id="SearchForm">
      <div id="guideScript">
        <span
          ><span class="nyomnyom">목적지 기준</span>으로 주변 음식점이 검색
          됩니다.</span
        >
        <span>목적지를 입력하고 각 메뉴를 클릭하여 음식점을 검색해보세요!</span>
      </div>
      <div id="inputForm">
        <input type="text" v-model="keyWord" />
        <button
          class="btn btn-success"
          type="button"
          @click="keyWordSearch(keyWord, '맛집')"
          value="맛집"
        >
          맛집
        </button>
        <button
          class="btn btn-success"
          type="button"
          @click="keyWordSearch(keyWord, '한식')"
          value="한식"
        >
          한식
        </button>
        <button
          class="btn btn-success"
          type="button"
          @click="keyWordSearch(keyWord, '양식')"
          value="양식"
        >
          양식
        </button>
        <button
          class="btn btn-success"
          type="button"
          @click="keyWordSearch(keyWord, '중식')"
          value="중식"
        >
          중식
        </button>
        <button
          class="btn btn-success"
          type="button"
          @click="keyWordSearch(keyWord, '일식')"
          value="일식"
        >
          일식
        </button>
        <button
          class="btn btn-success"
          type="button"
          @click="keyWordSearch(keyWord, '분식')"
          value="일식"
        >
          분식
        </button>
        <button
          class="btn btn-success"
          type="button"
          @click="keyWordSearch(keyWord, '치킨')"
          value="치킨"
        >
          치킨
        </button>
        <button
          class="btn btn-success"
          type="button"
          @click="keyWordSearch(keyWord, '피자')"
          value="피자"
        >
          피자
        </button>
        <button
          class="btn btn-success"
          type="button"
          @click="keyWordSearch(keyWord, '술집')"
          value="술집"
        >
          술집
        </button>
        <button
          class="btn btn-success"
          type="button"
          @click="keyWordSearch(keyWord, '편의점')"
          value="편의점"
        >
          편의점
        </button>
      </div>
    </div>
    <div id="slotBtnLayer">
      <button id="SlotBtn" class="btn btn-danger">🪐🚀 Go Lunch! 🚀🌌</button>
    </div>
    <div id="menu_wrap">
      <ul id="placesList"></ul>
      <div id="pagination"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "KakaoMap",
  data() {
    return {
      keyWord: "강남",
    };
  },
  components: {},
  mounted() {
    if (window.kakao && window.kakao.maps) {
      this.initMap();
    } else {
      const script = document.createElement("script");
      /* global kakao */
      script.onload = () => kakao.maps.load(this.initMap);
      script.src =
        "//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=1979f702d77ea0046b74ea7bdfbea8df&libraries=services";
      document.body.appendChild(script);
    }
  },
  methods: {
    // 현재 위치 찾기
    initMap() {
      var container = document.getElementById("map"); // 담기
      var options = {
        // 옵션들
        center: new kakao.maps.LatLng(33.450701, 126.570667), // Lat : 위도 Lng : 경도
        level: 3, // 지도의 확대 레벨
      };
      var map = new kakao.maps.Map(container, options); // 지도 생성
      var marker = new kakao.maps.Marker({
        position: map.getCenter(), // 지도의 중심좌표
      });
      marker.setMap(map);
      this.keyWordSearch("강남", "맛집");
    },
    addScript() {
      const script = document.createElement("script");
      script.onload = () => kakao.maps.load(this.initMap);
      script.src =
        "//dapi.kakao.com/v2/maps/sdk.js?appkey1979f702d77ea0046b74ea7bdfbea8df&autoload=false&libraries=services";
      document.head.appendChild(script);
    },

    keyWordSearch(Keyword, menu) {
      var markers = [];
      let userKeyword = `${Keyword} ${menu}`;

      var mapContainer = document.getElementById("map"); // 지도를 표시할 div
      var mapOption = {
        center: new kakao.maps.LatLng(37.566826, 126.9786567), // 지도의 중심좌표
        level: 3, // 지도의 확대 레벨
      };

      // 지도를 생성합니다
      var map = new kakao.maps.Map(mapContainer, mapOption);

      // 장소 검색 객체를 생성합니다
      var ps = new kakao.maps.services.Places();

      // 검색 결과 목록이나 마커를 클릭했을 때 장소명을 표출할 인포윈도우를 생성합니다
      var infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });

      // 키워드로 장소를 검색합니다
      searchPlaces(userKeyword);

      // 키워드 검색을 요청하는 함수입니다
      function searchPlaces(userKeyword) {
        // var keyword = '이태원 맛집'

        if (!userKeyword.replace(/^\s+|\s+$/g, "")) {
          alert("키워드를 입력해주세요!");
          return false;
        }

        // 장소검색 객체를 통해 키워드로 장소검색을 요청합니다
        ps.keywordSearch(userKeyword, placesSearchCB, {
          radius: 1000,
        });
      }

      // 장소검색이 완료됐을 때 호출되는 콜백함수 입니다
      function placesSearchCB(data, status, pagination) {
        if (status === kakao.maps.services.Status.OK) {
          // 정상적으로 검색이 완료됐으면
          // 검색 목록과 마커를 표출합니다
          displayPlaces(data);

          // 페이지 번호를 표출합니다
          displayPagination(pagination);
        } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
          alert("검색 결과가 존재하지 않습니다.");
        } else if (status === kakao.maps.services.Status.ERROR) {
          alert("검색 결과 중 오류가 발생했습니다.");
        }
      }

      // 검색 결과 목록과 마커를 표출하는 함수입니다
      function displayPlaces(places) {
        var listEl = document.getElementById("placesList");
        var menuEl = document.getElementById("menu_wrap");
        var fragment = document.createDocumentFragment();
        var bounds = new kakao.maps.LatLngBounds();
        var listStr = ""; // eslint-disable-line no-unused-vars

        // 검색 결과 목록에 추가된 항목들을 제거합니다
        removeAllChildNods(listEl);

        // 지도에 표시되고 있는 마커를 제거합니다
        removeMarker();

        for (var i = 0; i < places.length; i++) {
          // 마커를 생성하고 지도에 표시합니다
          var placePosition = new kakao.maps.LatLng(places[i].y, places[i].x);
          var marker = addMarker(placePosition, i);
          var itemEl = getListItem(i, places[i]); // 검색 결과 항목 Element를 생성합니다

          // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
          // LatLngBounds 객체에 좌표를 추가합니다
          bounds.extend(placePosition);

          // 마커와 검색결과 항목에 mouseover 했을때
          // 해당 장소에 인포윈도우에 장소명을 표시합니다
          // mouseout 했을 때는 인포윈도우를 닫습니다
          (function (marker, title) {
            kakao.maps.event.addListener(marker, "mouseover", function () {
              displayInfowindow(marker, title);
            });

            kakao.maps.event.addListener(marker, "mouseout", function () {
              infowindow.close();
            });

            itemEl.onmouseover = function () {
              displayInfowindow(marker, title);
            };

            itemEl.onmouseout = function () {
              infowindow.close();
            };
          })(marker, places[i].place_name);

          fragment.appendChild(itemEl);
        }

        // 검색결과 항목들을 검색결과 목록 Elemnet에 추가합니다
        listEl.appendChild(fragment);
        menuEl.scrollTop = 0;

        // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
        map.setBounds(bounds);
      }

      // 검색결과 항목을 Element로 반환하는 함수입니다
      function getListItem(index, places) {
        var el = document.createElement("li");
        var itemStr =
          '<span class="markerbg marker_' +
          (index + 1) +
          '"></span>' +
          '<div class="info">' +
          "   <h5>" +
          places.place_name +
          "</h5>";

        if (places.road_address_name) {
          itemStr +=
            "    <span>" +
            places.road_address_name +
            "</span>" +
            '   <span class="jibun gray">' +
            places.address_name +
            "</span>";
        } else {
          itemStr += "    <span>" + places.address_name + "</span>";
        }

        itemStr += '  <span class="tel">' + places.phone + "</span>" + "</div>";

        el.innerHTML = itemStr;
        el.className = "item";

        return el;
      }

      // 마커를 생성하고 지도 위에 마커를 표시하는 함수입니다
      function addMarker(position, idx, title) {  // eslint-disable-line no-unused-vars
       
        var imageSrc =
          "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png"; // 마커 이미지 url, 스프라이트 이미지를 씁니다
        var imageSize = new kakao.maps.Size(36, 37); // 마커 이미지의 크기
        var imgOptions = {
          spriteSize: new kakao.maps.Size(36, 691), // 스프라이트 이미지의 크기
          spriteOrigin: new kakao.maps.Point(0, idx * 46 + 10), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
          offset: new kakao.maps.Point(13, 37), // 마커 좌표에 일치시킬 이미지 내에서의 좌표
        };
        var markerImage = new kakao.maps.MarkerImage(
          imageSrc,
          imageSize,
          imgOptions
        );
        var marker = new kakao.maps.Marker({
          position: position, // 마커의 위치
          image: markerImage,
        });

        marker.setMap(map); // 지도 위에 마커를 표출합니다
        markers.push(marker); // 배열에 생성된 마커를 추가합니다

        return marker;
      }

      // 지도 위에 표시되고 있는 마커를 모두 제거합니다
      function removeMarker() {
        for (var i = 0; i < markers.length; i++) {
          markers[i].setMap(null);
        }
        markers = [];
      }

      // 검색결과 목록 하단에 페이지번호를 표시는 함수입니다
      function displayPagination(pagination) {
        var paginationEl = document.getElementById("pagination");
        var fragment = document.createDocumentFragment();
        var i;

        // 기존에 추가된 페이지번호를 삭제합니다
        while (paginationEl.hasChildNodes()) {
          paginationEl.removeChild(paginationEl.lastChild);
        }

        for (i = 1; i <= pagination.last; i++) {
          var el = document.createElement("a");
          el.href = "#";
          el.innerHTML = i;

          if (i === pagination.current) {
            el.className = "on";
          } else {
            el.onclick = (function (i) {
              return function () {
                pagination.gotoPage(i);
              };
            })(i);
          }

          fragment.appendChild(el);
        }
        paginationEl.appendChild(fragment);
      }

      // 검색결과 목록 또는 마커를 클릭했을 때 호출되는 함수입니다
      // 인포윈도우에 장소명을 표시합니다
      function displayInfowindow(marker, title) {
        var content = '<div style="padding:5px;z-index:1;">' + title + "</div>";

        infowindow.setContent(content);
        infowindow.open(map, marker);
      }

      // 검색결과 목록의 자식 Element를 제거하는 함수입니다
      function removeAllChildNods(el) {
        while (el.hasChildNodes()) {
          el.removeChild(el.lastChild);
        }
      }
    },
  },
};
</script>

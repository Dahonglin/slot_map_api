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
      <div id="inputForm" class="desInform">
        <div class="input-group has-validation desTit">
          <span class="input-group-text" id="inputGroupPrepend">목적지</span>
          <input
            type="text"
            class="form-control"
            id="validationCustomUsername"
            aria-describedby="inputGroupPrepend"
            v-model="keyWord"
            @submit.prevent="keyWordSearch"
            @keyup.enter="keyWordSearch(keyWord, selected)"
            required
          />
          <div class="invalid-feedback">목적지를 입력해주세요.</div>
        </div>
        <div class="input-group has-validation">
          <span class="input-group-text" id="inputGroupPrepend">메뉴 선택</span>
          <select
            class="form-select"
            id="validationCustom04"
            v-model="selected"
            @change="keyWordSearch(keyWord, selected)"
            required
          ></select>
          <div class="invalid-feedback">메뉴를 선택 해주세요.</div>
        </div>
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
      selected: "맛집",
      seletedTab: [
        "맛집",
        "한식",
        "양식",
        "중식",
        "일식",
        "분식",
        "술집",
        "치킨",
        "피자",
        "카페",
        "편의점",
      ],
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
      this.selectedTab();
    },
    addScript() {
      const script = document.createElement("script");
      script.onload = () => kakao.maps.load(this.initMap);
      script.src =
        "//dapi.kakao.com/v2/maps/sdk.js?appkey1979f702d77ea0046b74ea7bdfbea8df&autoload=false&libraries=services";
      document.head.appendChild(script);
    },

    keyWordSearch(Keyword, menu) {
      console.log("넘어감", Keyword, menu);
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
          storeListSave(data);
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
        var el = document.createElement("li"),
          itemStr =
            '<span class="markerbg marker_' +
            (index + 1) +
            '"></span>' +
            '<div class="info">' +
            '<h5 class="storeName">' +
            places.place_name +
            "</h5>";
        if (places.road_address_name) {
          itemStr +=
            "    <span>" +
            places.road_address_name +
            "</span>" +
            '   <span class="jibun gray"> 🏠 : ' +
            places.address_name +
            "</span>";
        } else {
          itemStr += "    <span>" + places.address_name + "</span>";
        }

        itemStr += `  <span class="tel">📞 : <a href='tel:${places.phone}'>${places.phone}</span></div>`;

        el.innerHTML = itemStr;
        el.className = "item";
        return el;
      }

      // 모달창에 검색 된 식당 리스트 생성
      function storeListSave(storeList) {
        let StoreNameList = document.getElementById("StoreNameList");
        let pickMenu = document.getElementById("pickMenu");
        let storeName = [];
        let Storetemp = ""; //임시 변수 선언 + 초기화

        for (let i = 0; i < storeList.length; i++) {
          storeName.push(storeList[i].place_name);
        }
        for (let x in storeName) {
          Storetemp += `<li>${storeName[x]}</li>`;
        }
        StoreNameList.innerHTML = Storetemp;

        // 랜덤 추첨 결과 작성
        let SlotBtn = document.getElementById("SlotBtn");
        let CloseBtn = document.getElementById("CloseBtn");
        let modalWindow = document.querySelector(".modal");

        // 메뉴 발사 버튼 클릭 시
        SlotBtn.onclick = function () {
          if (storeList.length > 1) {
            modalWindow.className = "modal display";
            pickMenu.innerText = storePick(storeList);
          } else {
            window.alert("검색 된 식당이 2개 이상일 경우에만 추첨 가능합니다!");
          }
        };

        // 닫기 버튼 클릭 시
        CloseBtn.onclick = function () {
          modalWindow.className = "modal";
        };
      }
      // 식당 목록 중 당첨 추첨
      function storePick(storeList) {
        let prePicked = storeList;
        let picked = [];
        if (storeList.length > 1) {
          // 랜덤 추첨
          let random = Math.floor(Math.random() * storeList.length);
          // 이전 값과 같으면 다를 때까지 계속 랜덤 수 생성
          while (random === prePicked) {
            random = Math.floor(Math.random() * storeList.length);
          }
          // 이전 숫자에 현재 랜덤 수 더해줌
          prePicked = random;
          // 추첨 완료
          picked = storeList[random];
          return picked.place_name;
        }
      }

      // 마커를 생성하고 지도 위에 마커를 표시하는 함수입니다
      function addMarker(position, idx) {
        // eslint-disable-line no-unused-vars

        var imageSrc = "./marker_number_rocket.png"; // 마커 이미지 url, 스프라이트 이미지를 씁니다
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
    selectedTab() {
      console.log("셀렉트 생성됨");
      let tabs = document.querySelector(".form-select");
      let temp = "";
      temp = `<option selected disabled value="">검색할 메뉴를 선택해주세요!</option>`;
      for (let x in this.seletedTab) {
        temp += `<option value='${this.seletedTab[x]}'>${this.seletedTab[x]}</option>`;
      }
      tabs.innerHTML = temp;
    },
  },
};
</script>

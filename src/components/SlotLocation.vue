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
    <!-- 맵 영역 -->
    <div id="map"></div>
    <!-- 입력 폼 영역 -->
    <div id="SearchForm">
      <div id="guideScript">
        <span
          ><span class="nyomnyom">현재 위치</span>를 기준으로 주변 음식점이 검색
          됩니다.</span
        >
        <span
          >각 메뉴 버튼을 눌러
          <span class="nyomnyom">음식점을 검색</span> 해보세요!</span
        >
      </div>
      <div id="inputForm">
        <button
          class="btn btn-success"
          type="button"
          @click="keyWordSearch('맛집')"
          value="맛집"
        >
          맛집
        </button>
        <button
          class="btn btn-success"
          type="button"
          @click="keyWordSearch('한식')"
          value="한식"
        >
          한식
        </button>
        <button
          class="btn btn-success"
          type="button"
          @click="keyWordSearch('양식')"
          value="양식"
        >
          양식
        </button>
        <button
          class="btn btn-success"
          type="button"
          @click="keyWordSearch('중식')"
          value="중식"
        >
          중식
        </button>
        <button
          class="btn btn-success"
          type="button"
          @click="keyWordSearch('일식')"
          value="일식"
        >
          일식
        </button>
        <button
          class="btn btn-success"
          type="button"
          @click="keyWordSearch('분식')"
          value="분식"
        >
          분식
        </button>
        <button
          class="btn btn-success"
          type="button"
          @click="keyWordSearch('치킨')"
          value="치킨"
        >
          치킨
        </button>
        <button
          class="btn btn-success"
          type="button"
          @click="keyWordSearch('피자')"
          value="피자"
        >
          피자
        </button>
        <button
          class="btn btn-success"
          type="button"
          @click="keyWordSearch('술집')"
          value="술집"
        >
          술집
        </button>
        <button
          class="btn btn-success"
          type="button"
          @click="keyWordSearch('카페')"
          value="카페"
        >
          카페
        </button>
        <button
          class="btn btn-success"
          type="button"
          @click="keyWordSearch('편의점')"
          value="편의점"
        >
          편의점
        </button>
      </div>
    </div>
    <!-- 추첨 버튼 레이어 -->
    <div id="slotBtnLayer">
      <button id="SlotBtn" class="btn btn-danger">🪐🚀 Go Lunch! 🚀🌌</button>
    </div>
    <!-- 식당 목록 영역 -->
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
      keyWord: "",
    };
  },
  components: {},
  mounted() {
    // 카카오 api 스크립트 로드
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
    initMap() {
      let container = document.getElementById("map");
      let options = {
        center: new kakao.maps.LatLng(33.450701, 126.570667),
        level: 3,
      };

      //지도 객체를 등록합니다.
      //지도 객체는 반응형 관리 대상이 아니므로 initMap에서 선언합니다.
      let map = new kakao.maps.Map(container, options);

      // HTML5의 geolocation으로 사용할 수 있는지 확인합니다
      if (navigator.geolocation) {
        // GeoLocation을 이용해서 접속 위치를 얻어옵니다
        navigator.geolocation.getCurrentPosition(function (position) {
          var lat = position.coords.latitude; // 위도
          var lon = position.coords.longitude; // 경도
          var locPosition = new kakao.maps.LatLng(lat, lon); // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합니다
          map.setCenter(locPosition);
          let marker = new kakao.maps.Marker({
            position: map.setCenter(locPosition), // 지도의 중심좌표
          });
          marker.setMap(map);
        });
        // 기본 키워드 '맛집' 세팅
        this.keyWordSearch("맛집");
      } else {
        // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다
        var locPosition = new kakao.maps.LatLng(33.450701, 126.570667);
        map.setCenter(locPosition);
        let marker = new kakao.maps.Marker({
          position: map.setCenter(locPosition), // 지도의 중심좌표
        });
        alert("위치 정보를 확인할 수 없습니다.");
        marker.setMap(map);
        // 기본 키워드 '맛집' 세팅
        this.keyWordSearch("맛집");
      }
    },
    keyWordSearch(val) {
      let markers = [];
      let mapContainer = document.getElementById("map"); // 지도를 표시할 div
      let mapOption = {
        center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
        level: 3, // 지도의 확대 레벨
      };
      // 지도를 생성합니다
      let map = new kakao.maps.Map(mapContainer, mapOption);
      let keyWordTemp = val;

      // HTML5의 geolocation으로 사용할 수 있는지 확인합니다
      if (navigator.geolocation) {
        // GeoLocation을 이용해서 접속 위치를 얻어옵니다
        navigator.geolocation.getCurrentPosition(function (position) {
          var lat = position.coords.latitude; // 위도
          var lon = position.coords.longitude; // 경도
          var locPosition = new kakao.maps.LatLng(lat, lon); // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합니다

          // 키워드로 장소를 검색합니다
          // 입력 받은 키워드 + 현재 위치 전달
          searchPlaces(keyWordTemp, locPosition);
        });
      } else {
        alert("위치 정보를 확인할 수 없습니다.");
      }
      // 장소 검색 객체를 생성합니다
      let ps = new kakao.maps.services.Places();

      // 검색 결과 목록이나 마커를 클릭했을 때 장소명을 표출할 인포윈도우를 생성합니다
      let infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });

      // 키워드 검색을 요청하는 함수입니다
      function searchPlaces(keyword, locPosition) {
        // 장소검색 객체를 통해 키워드로 장소검색을 요청합니다
        ps.keywordSearch(keyword, placesSearchCB, {
          radius: 1000,
          location: locPosition,
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
          // 모달창에 검색 결과에 해당하는 목록 생성
          storeListSave(data);
        } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
          alert("검색 결과가 존재하지 않습니다.\n다른 키워드로 검색 해주세요.");
          // 해당 키워드로 검색 실패 시 새로고침으로 리셋
          window.location.reload(true);
        } else if (status === kakao.maps.services.Status.ERROR) {
          alert("검색 결과 중 오류가 발생했습니다.");
          // 해당 키워드로 검색 실패 시 새로고침으로 리셋
          window.location.reload(true);
        }
      }

      // 검색 결과 목록과 마커를 표출하는 함수입니다
      function displayPlaces(places) {
        let listEl = document.getElementById("placesList");
        let menuEl = document.getElementById("menu_wrap");
        let fragment = document.createDocumentFragment();
        let bounds = new kakao.maps.LatLngBounds();

        // 검색 결과 목록에 추가된 항목들을 제거합니다
        removeAllChildNods(listEl);

        // 지도에 표시되고 있는 마커를 제거합니다
        removeMarker();

        for (let i = 0; i < places.length; i++) {
          // 마커를 생성하고 지도에 표시합니다
          let placePosition = new kakao.maps.LatLng(places[i].y, places[i].x);
          let marker = addMarker(placePosition, i);
          let itemEl = getListItem(i, places[i]); // 검색 결과 항목 Element를 생성합니다
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

        // 검색결과 항목들을 검색결과 목록 Element에 추가합니다
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
        var imageSrc = "./marker_number_rocket.png", // 마커 이미지 url, 스프라이트 이미지를 씁니다
          imageSize = new kakao.maps.Size(36, 37), // 마커 이미지의 크기
          imgOptions = {
            spriteSize: new kakao.maps.Size(36, 691), // 스프라이트 이미지의 크기
            spriteOrigin: new kakao.maps.Point(0, idx * 46 + 10), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
            offset: new kakao.maps.Point(13, 37), // 마커 좌표에 일치시킬 이미지 내에서의 좌표
          },
          markerImage = new kakao.maps.MarkerImage(
            imageSrc,
            imageSize,
            imgOptions
          ),
          marker = new kakao.maps.Marker({
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
        var paginationEl = document.getElementById("pagination"),
          fragment = document.createDocumentFragment(),
          i;

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

# Slot🚀Luncher - 점심 메뉴 추첨기 (v2.0)
### _**🎰 Lunch menu slot selector**_  
당신의 주변 혹은 원하는 곳의 맛집을 찾아 대신 선택해드립니다!

<img alt="Vue.JS" src ="https://img.shields.io/badge/vue.Js-4FC08D.svg?&style=for-the-badge&logo=Vue.js&logoColor=white"/>  <img alt="JavaScript" src ="https://img.shields.io/badge/JavaScriipt-F7DF1E.svg?&style=for-the-badge&logo=JavaScript&logoColor=black"/> <img alt="HTML5" src ="https://img.shields.io/badge/HTML5-E34F26.svg?&style=for-the-badge&logo=HTML5&logoColor=white"/> <img alt="Css" src ="https://img.shields.io/badge/CSS3-1572B6.svg?&style=for-the-badge&logo=CSS3&logoColor=white"/> <img alt="Css" src ="https://img.shields.io/badge/Bootstrap-7952B3.svg?&style=for-the-badge&logo=Bootstrap&logoColor=white"/>   
<br>


### 🔖 목차
* [프로젝트 개발 이유](#❓프로젝트-개발-이유)
* [사용 환경](#🌐-사용-환경)
* 사용 방법
  * [내주변 맛집 뽑기](#1️⃣-내주변-맛집-뽑기)
  * [목적지 맛집 뽑기](#2️⃣-목적지-맛집-뽑기)
* [개발 사항](#🛠-개발-사항)

<br>

---

<br>

### ❓프로젝트 개발 이유
> **[v1.0의 슬롯런처](https://dahonglin.github.io/SlotLuncher/)** 개발 후 사용하던 지인들에게 <br>
> _'내 주변 맛집이나 원하는 지역 맛집에서 뽑아 주면 좋겠어!'_ <br>
> 라는 ~~필사적인~~ 정성어린 피드백을 받았다. <br>
> 자타공인 **점.정.녀**인 나, 이대로 가만히 있을 수 없다! <br>
> 무작정 v2.0 슬롯런처 개발에 돌입한다!

<br>

---

<br>

### 🌐 사용 환경  
**[Slot🚀luncher v2.0](https://dahonglin.github.io/slot_map_api/)**  
URL 접속 시 사용 가능하며, PC & 모바일 상관 없이 이용 가능.

<br>

---

<br>

### 🕹 사용 방법
![image](https://raw.githubusercontent.com/Dahonglin/slot_map_api/master/mdimg/guide1.jpg)
* 메인 화면
  * 1️⃣ 클릭 시 내주변 맛집 뽑기 화면으로 이동한다.
  * 2️⃣ 클릭 시 목적지 맛집 뽑기 화면으로 이동한다.

<br><br>

#### 1️⃣ 내주변 맛집 뽑기
<details>
<summary>접기/펼치기</summary>

![image](https://raw.githubusercontent.com/Dahonglin/slot_map_api/master/mdimg/guide2.jpg)
   * 1️⃣ 상단 네비게이션 바
     - 메인 페이지 클릭 시 해당 화면으로 이동
     - 목적지 맛집 뽑기 클릭 시 해당 화면으로 이동 


   * 2️⃣ 검색 된 위치 지도
     - 위치 추적 기능 허용 후 내 위치로 맵이 출력 됨.
     - 내 위치 주변의 '맛집'이 기본적으로 검색 됨.
     - 하단의 메뉴 카테고리 선택 시 해당 카테고리에 맞는 식당이 검색 되어 마커가 출력 됨.


   * 3️⃣ 검색 가능한 메뉴 카테고리
     - 기본값은 '맛집'으로 설정 되어 있음.
     - 각 키워드 클릭 시 해당 키워드로 검색 되어 맵(2️⃣)에 마커가 출력 됨.


   * 4️⃣ 메뉴 추첨
     - 검색 되어 음식점 목록(5️⃣)에 출력 된 식당 기준으로 추첨 됨.
 ![image](https://raw.githubusercontent.com/Dahonglin/slot_map_api/master/mdimg/guide4.jpg)
     - 클릭 시 추첨 모달창이 팝업 되어 결과를 보여줌.
     - 클릭 시 마다 추첨 결과는 달라짐. 
     - 창 닫기 클릭 시 모달 창 닫힘.


   * 5️⃣ 검색 된 음식점 목록
     - 키워드(3️⃣)클릭 시 검색 된 식당 목록이 출력 됨.


   * 6️⃣ 검색 목록 페이지 이동
     - 음식점 목록(5️⃣)에 검색 된 결과 중 15개 이후의 검색 결과를 페이지 이동하여 볼 수 있음.
     - 한번에 15개씩 3페이지, 최대 45개 검색 됨.
</details>
<br>

#### 2️⃣ 목적지 맛집 뽑기
<details>
<summary>접기/펼치기</summary>

![image](https://raw.githubusercontent.com/Dahonglin/slot_map_api/master/mdimg/guide3.jpg)
   * 1️⃣ 상단 네비게이션 바
     - 메인 페이지 클릭 시 해당 화면으로 이동
     - 내주변 맛집 뽑기 클릭 시 해당 화면으로 이동 


   * 2️⃣ 검색 된 위치 지도
     - 목적지 기준 주변 맵이 출력 됨.
     - 목적지 '강남', 메뉴 '맛집' 이 기본적으로 검색 됨.
     - 목적지 입력 후 메뉴를 선택하면 해당 목적지의 메뉴가 검색 됨.


   * 3️⃣ 목적지와 메뉴 카테고리 선택
     - 기본값은 목적지 '강남', 메뉴 '맛집'으로 선택 되어 있음.
     - 목적지 입력 후 메뉴를 선택하면 맵(2️⃣)에 마커로 출력 됨.


   * 4️⃣ 메뉴 추첨
     - 검색 되어 음식점 목록(5️⃣)에 출력 된 식당 기준으로 추첨 됨.
 ![image](https://raw.githubusercontent.com/Dahonglin/slot_map_api/master/mdimg/guide4.jpg)
     - 클릭 시 추첨 모달창이 팝업 되어 결과를 보여줌.
     - 클릭 시 마다 추첨 결과는 달라짐. 
     - 창 닫기 클릭 시 모달 창 닫힘.


   * 5️⃣ 검색 된 음식점 목록
     - 목적지와 메뉴 선택(3️⃣) 시 검색 된 식당 목록이 출력 됨.


   * 6️⃣ 검색 목록 페이지 이동
     - 음식점 목록(5️⃣)에 검색 된 결과 중 15개 이후의 검색 결과를 페이지 이동하여 볼 수 있음.
     - 한번에 15개씩 3페이지, 최대 45개 검색 됨.
</details>

<br>

---

<br>

### 🛠 개발 사항

<br>

#### 현재 개발 사항
- [x] [카카오맵 API](https://apis.map.kakao.com/)를 사용하여 Vue CLI로 개발.
- [x] 내주변 맛집 뽑기의 경우 geoLocation API를 추가로 사용해 개발.
- [x] Vue를 사용하여 SPA방식으로 개발.
- [x] 기본 레이아웃과 디자인은 Bootstrap을 사용.

#### 추가 개발 사항
- [ ] 기능별 컴포넌트 분할.
- [ ] 내주변 맛집 뽑기 화면 맵 이동 시 새로운 좌표로 목록 받기.
- [ ] 모달 창 뽑기 완료 시 이펙트 추가.

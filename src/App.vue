<template>
  <div id="app" class="container">
    <div v-if="page === 'main'" id="intro">
      <div class="mainIntro">
        <h1>Slot 🚀 Luncher</h1>
        <h2><span class="nyamnyam">냠냠로켓</span>의 메뉴 추천!</h2>
        <h3>어디 맛집을 찾나요?</h3>
        <div class="mainIcon">
          <div class="naviBtn" @click="goLocation">
            <div class="bi bi-geo-alt-fill"></div>
            <div class="naviTxt">내주변 맛집 뽑기</div>
          </div>
          <div class="naviBtn" @click="goDestination">
            <div class="bi bi-flag-fill"></div>
            <div class="naviTxt">목적지 맛집 뽑기</div>
          </div>
        </div>
      </div>
    </div>
    <div id="naviIcon" v-if="page !== 'main'">
      <div class="naviBtn" @click="goMain">
        <div class="bi bi-house-heart-fill"></div>
        <div class="naviTxt">메인 페이지</div>
      </div>
      <div class="naviBtn" v-if="page !== 'location'" @click="goLocation">
        <div class="bi bi-geo-alt-fill"></div>
        <div class="naviTxt">내주변 맛집 뽑기</div>
      </div>
      <div class="naviBtn" v-if="page !== 'destination'" @click="goDestination">
        <div class="bi bi-flag-fill"></div>
        <div class="naviTxt">목적지 맛집 뽑기</div>
      </div>
    </div>
    <div
      v-if="page !== 'main'"
      class="TopTitle"
      :class="{ blue: page === 'destination' }"
    >
      <span><h1>Slot 🚀 Luncher</h1></span>
      <span
        ><h2>
          🚀<span class="nyamnyam">냠냠로켓</span>에게 오늘의 메뉴를 요청하자!🍴
        </h2></span
      >
    </div>
    <SlotLocation v-if="page === 'location'" />
    <SlotDestination v-if="page === 'destination'" />
  </div>
</template>

<script>
import SlotLocation from "./components/SlotLocation";
import SlotDestination from "./components/SlotDestination";

export default {
  name: "App",
  components: {
    SlotLocation,
    SlotDestination,
  },
  data() {
    return {
      page: "main",
    };
  },
  methods: {
    goMain() {
      this.page = "main";
    },
    goLocation() {
      this.page = "location";
    },
    goDestination() {
      this.page = "destination";
    },
    TopTitle() {},
  },
};
</script>

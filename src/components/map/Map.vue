<template>

<div class="map_wrap">
  <div id="map" ref="map"></div>
  
<ul id="category">
  <li id="BK9" data-order="0"> 
      <span class="category_bg bank"></span>
      은행
  </li>       
  <li id="MT1" data-order="1"> 
      <span class="category_bg mart"></span>
      마트
  </li>  
  <li id="PM9" data-order="2"> 
      <span class="category_bg pharmacy"></span>
      약국
  </li>  
  <li id="OL7" data-order="3"> 
      <span class="category_bg oil"></span>
      주유소
  </li>  
  <li id="CE7" data-order="4"> 
      <span class="category_bg cafe"></span>
      카페
  </li>  
  <li id="CS2" data-order="5"> 
      <span class="category_bg store"></span>
      편의점
  </li>      
</ul>
  <p id="inputtag">
    <input type="checkbox" id="chkUseDistrict" @click="setOverlayMapTypeId" /><label for="chkUseDistrict"> 지적편집도</label>
    <input type="checkbox" id="chkTerrain" @click="setOverlayMapTypeId" /><label for="chkTerrain"> 지형정보</label>
    <input type="checkbox" id="chkTraffic" @click="setOverlayMapTypeId" /><label for="chkTraffic"> 교통정보</label>
    <input type="checkbox" id="chkBicycle" @click="setOverlayMapTypeId" /><label for="chkBicycle"> 자전거도로</label>
  </p>
</div>

</template>

<script>
import categoryMap from "@/assets/js/map.js";

export default {

  mounted() {
    let container = this.$refs.map;

    this.$parent.$on('refresh', (e) => {
      console.log(e);
      this.refresh(e);
    });

    this.$parent.$on('changedFilter', (filter) => {
      this.filter = filter;
      function between(value, arr) {
        return +value >= arr[0] && +value <= arr[1];
      }
      console.log(filter);

      for (let marker of this.markerList) {
        let e = marker.data;
        if (e.BUILD_TYPE == filter.method && (e.BUILD_TYPE !== '월세' || between(e.APT_DEPOSIT, filter.deposit)) && between(e.APT_AREA, filter.area) && between(e.APT_PRICE, filter.price)) {
          marker.setImage(this.markerImage.booking);
        } else {
          marker.setImage(this.markerImage.normal);
        }
      }
    });

    (async () => {
      navigator.geolocation.getCurrentPosition(position => {
        let options = {
          center: new kakao.maps.LatLng(position.coords.latitude, position.coords.longitude),
          level: 5,
        };
    
        this.map = new kakao.maps.Map(container, options);
        
        // 추가
        var centerXY = this.map.getCenter(); 
        
        // 주소-좌표 변환 객체를 생성합니다
        var geocoder = new kakao.maps.services.Geocoder();
        
        // 좌표로 법정동 상세 주소 정보를 요청합니다
        this.geocoderAddr = geocoder.coord2Address(centerXY.getLng(), centerXY.getLat(), async (result, status) => {
          if (status !== kakao.maps.services.Status.OK) return;

          let rankList = (await axios({
            url: `${this.serverLocation}/getPopulAptRank?si=${result[0].address.region_1depth_name}&gu=${result[0].address.region_2depth_name}&dong=${result[0].address.region_3depth_name}`,
            method: 'GET',
          })).data;

          console.log('ranklist', rankList);

          this.$parent.$emit('rankList', rankList);

        });
        categoryMap(this.map);

        // 일반 지도와 스카이뷰로 지도 타입을 전환할 수 있는 지도타입 컨트롤을 생성합니다
        var mapTypeControl = new kakao.maps.MapTypeControl();

        // 지도에 컨트롤을 추가해야 지도위에 표시됩니다
        // kakao.maps.ControlPosition은 컨트롤이 표시될 위치를 정의하는데 TOPRIGHT는 오른쪽 위를 의미합니다
        this.map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

        // 지도 확대 축소를 제어할 수 있는  줌 컨트롤을 생성합니다
        var zoomControl = new kakao.maps.ZoomControl();
        this.map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

        this.cluster = new kakao.maps.MarkerClusterer({
            map: this.map,
            averageCenter: true,
            minLevel: 6
        });

        this.refresh();
        kakao.maps.event.addListener(this.map, 'dragend', this.refresh);
        
        // 움직일때마다 실행 이벤트
        kakao.maps.event.addListener(this.map, 'dragend', () => {
          var centerXY = this.map.getCenter(); 
        
          // 주소-좌표 변환 객체를 생성합니다
          var geocoder = new kakao.maps.services.Geocoder();
          
          // 좌표로 법정동 상세 주소 정보를 요청합니다
          this.geocoderAddr = geocoder.coord2Address(centerXY.getLng(), centerXY.getLat(), async (result, status) => {
            if (status !== kakao.maps.services.Status.OK) return;

            let rankList = (await axios({
              url: `${this.serverLocation}/getPopulAptRank?si=${result[0].address.region_1depth_name}&gu=${result[0].address.region_2depth_name}&dong=${result[0].address.region_3depth_name}`,
              method: 'GET',
            })).data;

            this.$parent.$emit('rankList', rankList);
          });
        });
        kakao.maps.event.addListener(this.map, 'zoom_changed', this.refresh);
      }, failur => {
        console.log('only secure origins are alllowed!');
        let options = {
          center: new kakao.maps.LatLng(36.3248296, 127.4179048),
          level: 5,
        };
    
        this.map = new kakao.maps.Map(container, options);
        
        // 추가
        categoryMap(this.map);
        
        // 일반 지도와 스카이뷰로 지도 타입을 전환할 수 있는 지도타입 컨트롤을 생성합니다
        var mapTypeControl = new kakao.maps.MapTypeControl();

        // 지도에 컨트롤을 추가해야 지도위에 표시됩니다
        // kakao.maps.ControlPosition은 컨트롤이 표시될 위치를 정의하는데 TOPRIGHT는 오른쪽 위를 의미합니다
        this.map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

        // 지도 확대 축소를 제어할 수 있는  줌 컨트롤을 생성합니다
        var zoomControl = new kakao.maps.ZoomControl();
        this.map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

        this.cluster = new kakao.maps.MarkerClusterer({
            map: this.map,
            averageCenter: true,
            minLevel: 6
        });

        this.refresh();
        kakao.maps.event.addListener(this.map, 'dragend', this.refresh);
        kakao.maps.event.addListener(this.map, 'zoom_changed', this.refresh);
      });
    })();

    this.$root.$on('centerApt', aptSeq => {
      let target = this.markerList.find(e => e.data.APT_SEQ === aptSeq);

      if (target) {
        this.markerList.forEach(e => {
          e.setImage(this.markerImage.normal);
        });
        target.setImage(this.markerImage.booking);
      }
    });
  },

  data() {
    return {
      map: null,
      cluster: null,
      currentTypeId: '',
      markerImage: {
        normal: new kakao.maps.MarkerImage(`//192.168.0.121:9000/api/file/icon/aptsales_off.png`, new kakao.maps.Size(48, 48), new kakao.maps.Point(0, 0)),
        booking: new kakao.maps.MarkerImage(`//192.168.0.121:9000/api/file/icon/aptsales_on.png`, new kakao.maps.Size(48, 48), new kakao.maps.Point(0, 0)),
      },
      filter: {},
      markerList: [],
      overlayList: [],
      geocoderAddr: [],
    };
  },
  methods: {
    refresh({ arr, filter } = {}) {
      if (filter) {
        this.filter = filter;
      } else {
        filter = this.filter;
      }

      if (this.map.getLevel() > 5) return;
      
      this.cluster.clear();
      let center = this.map.getCenter();
      let position = {
        lng: center.getLng(),
        lat: center.getLat(),
      };

      if (arr) {
        position.lat = arr.LAT;
        position.lng = arr.LNG;
        this.map.setCenter(new kakao.maps.LatLng(arr.LAT, arr.LNG));
      }

      (async () => {
        let addressList = (await axios({
          url: `${this.serverLocation}/c2a?x=${position.lng}&y=${position.lat}&type=${filter.method || ''}`,
          method: 'GET',
          headers: {
            Authorization: 'KakaoAK 3b0fdc6196cbd2de9db95c5bbf5e3969',
            'Content-Type': 'x-www-form-urlencoded',
          }
        })).data.map(e => ({
          ...e,
          MAXPRICE: (e.MAXPRICE / 10000).toFixed(1),
          MINPRICE: (e.MINPRICE / 10000).toFixed(1),
        }));

        let markers = [];

        function between(value, arr) {
          return +value >= arr[0] && +value <= arr[1];
        }

        this.overlayList.forEach(e => {
          e.setMap(null);
        });
        this.overlayList = [];

        for (let e of addressList) {
          let position = new kakao.maps.LatLng(e.APT_LAT, e.APT_LNG);
          const marker = new kakao.maps.Marker({ position });
          const overlay = new kakao.maps.CustomOverlay({
            position,
            content: `<div class="juk-priceBox">${e.MINPRICE}억 <br> ~${e.MAXPRICE}억</div>`,
          });
          overlay.setMap(this.map);
          this.overlayList = [...this.overlayList, overlay];
          marker.data = e;

        
          let bookingCondition = e.BUILD_TYPE;
          if (bookingCondition && between(e.APT_AREA, filter.area)) {
            if (e.BUILD_TYPE === '월세') {
              bookingCondition = between(e.APT_DEPOSIT, filter.price) && between(e.APT_PRICE, filter.deposit);
            } else {
              bookingCondition = between(e.APT_PRICE, filter.price);
            }
          }
          if (bookingCondition) {
            marker.setImage(this.markerImage.booking);
          } else {
            marker.setImage(this.markerImage.normal);
          }

          kakao.maps.event.addListener(marker, 'click', () => {
            this.$parent.$emit('selectApt', e);
          });

          kakao.maps.event.addListener(marker, 'mouseover', () => {
            marker.setOpacity(0.75);
          });

          kakao.maps.event.addListener(marker, 'mouseout', () => {
            marker.setOpacity(1);
          });

          // marker.setMap(this.map);
          markers.push(marker);
        }
        this.markerList = markers;
        this.cluster.addMarkers(markers);
      })();
    }, // 지도 타입 변경하기
    setOverlayMapTypeId() {
      var mapTypes = {
          terrain : kakao.maps.MapTypeId.TERRAIN,    
          traffic :  kakao.maps.MapTypeId.TRAFFIC,
          bicycle : kakao.maps.MapTypeId.BICYCLE,
          useDistrict : kakao.maps.MapTypeId.USE_DISTRICT
      };

      var chkTerrain = document.getElementById('chkTerrain'),  
          chkTraffic = document.getElementById('chkTraffic'),
          chkBicycle = document.getElementById('chkBicycle'),
          chkUseDistrict = document.getElementById('chkUseDistrict');
      
      // 지도 타입을 제거합니다
      for (var type in mapTypes) {
          this.map.removeOverlayMapTypeId(mapTypes[type]);    
      }

      // 지적편집도정보 체크박스가 체크되어있으면 지도에 지적편집도정보 지도타입을 추가합니다
      if (chkUseDistrict.checked) {
          this.map.addOverlayMapTypeId(mapTypes.useDistrict);    
      }
      
      // 지형정보 체크박스가 체크되어있으면 지도에 지형정보 지도타입을 추가합니다
      if (chkTerrain.checked) {
          this.map.addOverlayMapTypeId(mapTypes.terrain);    
      }
      
      // 교통정보 체크박스가 체크되어있으면 지도에 교통정보 지도타입을 추가합니다
      if (chkTraffic.checked) {
          this.map.addOverlayMapTypeId(mapTypes.traffic);    
      }
      
      // 자전거도로정보 체크박스가 체크되어있으면 지도에 자전거도로정보 지도타입을 추가합니다
      if (chkBicycle.checked) {
          this.map.addOverlayMapTypeId(mapTypes.bicycle);    
      }
      
    },
    // ...{ setMapType, zoomIn, zoomOut },
  }

}
</script>

<style>
#map {
  position: fixed;
  top: 0;
  height: 0;
  width: calc(100% - 450px);
  height: 100vh;
}

/* 편의시설 */
.map_wrap, .map_wrap * {margin:0; padding:0;font-size:12px;}
.map_wrap {position:relative;width:100%;height:350px;}
#category {position:absolute;top:5px;right:580px;border-radius: 5px; border:1px solid #909090;box-shadow: 0 1px 1px rgba(0, 0, 0, 0.4);background: #fff;overflow: hidden;z-index: 2;}
#category {padding-left:5px;}
#category li {float:left;list-style: none;width:50px;border-right:1px solid #acacac;padding:10px 0px;text-align: center; cursor: pointer;}
#category li.on {background: #eee;}
#category li:hover {background: #ffe6e6;border-left:1px solid #acacac;margin-left: -1px;}
#category li:last-child{margin-right:0;border-right:0;}
#category li span {display: block;margin:0 auto 3px;width:27px;height: 28px;}
#category li .category_bg {background:url(http://t1.daumcdn.net/localimg/localimages/07/mapapidoc/places_category.png) no-repeat;}
#category li .bank {background-position: -10px 0;}
#category li .mart {background-position: -10px -36px;}
#category li .pharmacy {background-position: -10px -72px;}
#category li .oil {background-position: -10px -108px;}
#category li .cafe {background-position: -10px -144px;}
#category li .store {background-position: -10px -180px;}
#category li.on .category_bg {background-position-x:-46px;}

/* 편의시설 상세 css */
.placeinfo_wrap {position:absolute;bottom:28px;left:-150px;width:300px;}
.placeinfo {position:relative;width:100%;border-radius:6px;border: 1px solid #ccc;border-bottom:2px solid #ddd;padding-bottom: 10px;background: #fff;}
.placeinfo:nth-of-type(n) {border:0; box-shadow:0px 1px 2px #888;}
.placeinfo_wrap .after {content:'';position:relative;margin-left:-12px;left:50%;width:22px;height:12px;background:url('http://t1.daumcdn.net/localimg/localimages/07/mapapidoc/vertex_white.png')}
.placeinfo a, .placeinfo a:hover, .placeinfo a:active{color:#fff;text-decoration: none;}
.placeinfo a, .placeinfo span {display: block;text-overflow: ellipsis;overflow: hidden;white-space: nowrap;}
.placeinfo span {margin:5px 5px 0 5px;cursor: default;font-size:13px;}
.placeinfo .title {font-weight: bold; font-size:14px;border-radius: 6px 6px 0 0;margin: -1px -1px 0 -1px;padding:10px; color: #fff;background: #d95050;background: #d95050 url(http://t1.daumcdn.net/localimg/localimages/07/mapapidoc/arrow_white.png) no-repeat right 14px center;}
.placeinfo .tel {color:#0f7833;}
.placeinfo .jibun {color:#999;font-size:11px;margin-top:0;}

#inputtag{
  width: 420px;
  height: 30px;
  background: rgba(255, 255, 255, 0.8);
  position: relative;
  margin-left: 400px;
  margin-top: 23px;
  padding-left: 10px; 
}

#inputtag label {
  font-size: 1.4em;
  font-weight: bold;
  user-select: none;
}

/* 가격박스 */
.juk-priceBox {
  width: 47px;
  height: 41px;
  background-color: rgba(21, 101, 250, 0.7);
  color: #FFF;
  border-radius: 10px;
  position: absolute;
  top: -47px;
  left: 10px;
  text-align: center;
  padding-top: 3px;
  box-shadow: 1px 1px 2px #888;
}

.juk-priceBox::after {
  content: ' ';
  transform: rotate(45deg);
  width:9px;
  height: 10px;
  position: absolute;
  top: 35px;
  left: 10px;
  background-color: rgba(21, 101, 250, 0.6);
  box-shadow: 1px 1px 2px #888;
}
</style>



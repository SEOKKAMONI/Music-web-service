const mainInput = document.getElementById("__input"); // main input
const mainForm = document.getElementById("__form"); // main form

const mainPg = document.querySelector(".main_pg");
const resultPg = document.getElementById("result_page");
const serachArea = document.querySelector(".search");

const subForm = document.getElementById("sub__form"); // 서브 form
const subInput = document.getElementById("sub__input"); // 서브 input

const searchBtn = document.getElementById("search__btn"); // 메인 검색창 버튼
const subSearchBtn = document.getElementById("sub_search__btn"); // 서브 검색창 버튼


mainForm.addEventListener("submit", inputMain);
subForm.addEventListener("submit", inputSub);

searchBtn.addEventListener("click", inputMain);
subSearchBtn.addEventListener("click", inputSub);

chartTopArtist() // 아티스트 차트
chartTopTrack() // 트랙 차트

function inputMain(e) { // 메인 검색창
  let musicKeyWorld = mainInput.value;
  addMusicList(e, musicKeyWorld);
  artistInformaition(musicKeyWorld);
  similarArtist(musicKeyWorld);
}

function inputSub(e) { // 서브 검색창
  let musicKeyWorld = subInput.value;
  $(".list").remove(); // list 중복 생성 방지

  addMusicList(e, musicKeyWorld);
  
  artistInformaition(musicKeyWorld);
  similarArtist(musicKeyWorld);
}

// 앨범, 음악 정보
// http://ws.audioscrobbler.com/2.0/?method=track.search&track=아이유&api_key=502aca31cb330e8135b04d480caf6a56&format=json
function addMusicList(e, musicKeyWorld) {
  e.preventDefault()
  musicKeyWorld = musicKeyWorld.replace(" ", "");
  $.ajax({
    type: 'GET',
    url: 'http://ws.audioscrobbler.com/2.0/?method=track.search&track=' + musicKeyWorld + '&api_key=502aca31cb330e8135b04d480caf6a56&format=json',
  })
    .done(function (response) {
      mainPg.style.display = "none"; // 검색이 되면 메인페이지를 가리고
      serachArea.style.display = "none"; // 검색창을 가려준다

      let musicList = response["results"]["trackmatches"]["track"];

      // 검색결과가 없을때
      if (musicList.length == 0) {
        let searchResult = document.querySelector(".searchResult"); // 검색결과
        let errorArea = document.querySelector(".errorArea");
        errorArea.style.display = "block";
        searchResult.innerText = musicKeyWorld;
      } else { // 검색결과가 있을때
        resultPg.style.display = "block"; // 검색 결과를 보여준다
      }
      subInput.value = "";
      mainInput.value = "";


      let count = 1;
      for (let i = 0; i < musicList.length; i++) {
        let albumTitle = musicList[i]["name"];
        let albumURL = musicList[i]["url"];
        let albumLikes = musicList[i]["listeners"];

        $(".musicList").append(`
        <li class="list">
          <div class="numberANDtitle">
              <span class="number">${i + 1}.</span>
              <a class="musicName" target="_blank" href="${albumURL}"><span class="albumTitle">${albumTitle}</span></a>
          </div>
          <span class="likers"><span class="like">${albumLikes}</span><span class="heart">❤</span>
        </li>
        `);


      }
    });
}

// 비슷한 아티스트
function similarArtist(musicKeyWorld) {
  $.ajax({
    type: 'GET',
    url: `http://ws.audioscrobbler.com/2.0/?method=artist.getsimilar&artist=${musicKeyWorld}&api_key=502aca31cb330e8135b04d480caf6a56&format=json`
  })
    .done(function (response) {
      let similarArtists = response["similarartists"]["artist"];

      for (let i = 0; i < 3; i++) {
        let similarArtistName = similarArtists[i]["name"];
        let similarArtistURL = similarArtists[i]["url"];
        if (i == 2) { // 마지막은 "," 안나오게 하기 !
          $(".similar_artist").append(`
        <a class="similarArtist" href="${similarArtistURL}">${similarArtistName}</a>
        `)
        } else {
          $(".similar_artist").append(`
        <a class="similarArtist" href="${similarArtistURL}">${similarArtistName},</a>
        `)
        }

      }
    });
}


// 아티스트 정보
// http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=아이유&api_key=502aca31cb330e8135b04d480caf6a56&format=json

const artistName = document.querySelector(".artistNaming"); // 이름부분
const artistDate = document.querySelector(".date"); // 생년월일 부분
const artistPublished = document.querySelector(".published"); // 데뷔 날짜
const detailArea = document.getElementById("datail_area"); // 자세히보기 버튼 넣어줄 구역

function artistInformaition(musicKeyWorld) {
  $.ajax({
    type: 'GET',
    url: 'http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=' + musicKeyWorld + '&api_key=502aca31cb330e8135b04d480caf6a56&format=json'
  })
    .done(function (response) {
      let artist_publish = response["artist"]["bio"]["published"]; // 데뷔날짜
      let artist_name = response["artist"]["name"]; // 이름
      let detail_url = response["artist"]["url"]; // url

      $(".more_btn").attr("href", detail_url); // URL 버튼 href 바꿔주기

      artistName.innerText = artist_name;
      artistPublished.innerText = artist_publish;
    });
}


// 아티스트 차트
function chartTopArtist() {
  $.ajax({
    type: 'GET',
    url: 'http://ws.audioscrobbler.com/2.0/?method=chart.gettopartists&api_key=502aca31cb330e8135b04d480caf6a56&format=json'
  })
    .done(function (response) {
      for (let i = 0; i < 10; i++) {
        let artist = response["artists"]["artist"];

        let topArtistRank = artist[i]["name"];
        let artistURL = artist[i]["url"];
        let listeners = artist[i]["listeners"];
        $(".artist_chart").append(`
        <li class="chartList">
            <div class="artistCharNumber">
              <span class="chart_number">${i + 1}.</span>
              <a href="${artistURL}" target="_blank" class="artistName">${topArtistRank}</a>
            </div>
            <div class="LikersArea">
            <span class="artistLikers">${listeners}</span><span class="heart">❤</span>
          </div>
        </li>
        `);
      }

    });
}

function chartTopTrack() {
  $.ajax({
    type: 'GET',
    url: 'http://ws.audioscrobbler.com/2.0/?method=chart.gettoptracks&api_key=502aca31cb330e8135b04d480caf6a56&format=json'
  })
    .done(function (response) {
      for (let i = 0; i < 10; i++) {
        let track = response["tracks"]["track"];
        let trackTitle = track[i]["name"];
        let trackTitleURL = track[i]["url"];

        let artistName = track[i]["artist"]["name"];
        let artistURL = track[i]["artist"]["url"];
        $(".track_chart").append(`
        <li class="chartList">
          <div class="trackCharNumber">
              <span class="chart_number">${i + 1}.</span>
              <a href="${trackTitleURL}" target="_blank" class="trackTitle">${trackTitle}</a>
            </div>
            <div class="informationArea">
            <a href="${artistURL}" target="_blank" class="artist_name">${artistName}</a>
          </div>
        </li>
        `)
      }

    });
}
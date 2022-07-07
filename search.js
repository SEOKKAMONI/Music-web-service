// 내일 해야할것 중복검색시 중복되는 UI/UX

// http://ws.audioscrobbler.com/2.0/?method=track.search&track=아이유&api_key=502aca31cb330e8135b04d480caf6a56&format=json
const mainInput = document.getElementById("__input"); // main input
const mainForm = document.getElementById("__form"); // main form

const mainPg = document.querySelector(".main_pg");
const resultPg = document.getElementById("result_page");
const serachArea = document.querySelector(".search");

const subForm = document.getElementById("sub__form"); // 서브 form
const subInput = document.getElementById("sub__input"); // 서브 input


mainForm.addEventListener("submit", inputMain);
subForm.addEventListener("submit", inputSub);

function inputMain(e) {
  let musicKeyWorld = mainInput.value;
  addMusicList(e, musicKeyWorld);
}

function inputSub(e) {
  let musicKeyWorld = subInput.value;
  addMusicList(e, musicKeyWorld);
}

// 앨범, 음악 정보
function addMusicList(e, musicKeyWorld) {
  e.preventDefault()
  $.ajax({
    type: 'GET',
    url: 'http://ws.audioscrobbler.com/2.0/?method=track.search&track=' + musicKeyWorld + '&api_key=502aca31cb330e8135b04d480caf6a56&format=json',
  })
    .done(function (response) {
      artistInformaition(musicKeyWorld);
      mainPg.style.display = "none"; // 검색이 되면 메인페이지를 가리고
      serachArea.style.display = "none"; // 검색창을 가려준다

      let musicList = response["results"]["trackmatches"]["track"];

      // 검색결과가 없을때
      if(musicList.length == 0) {
        let searchResult = document.querySelector(".searchResult"); // 검색결과
        let errorArea = document.querySelector(".errorArea");
        errorArea.style.display = "block";
        searchResult.innerText = musicKeyWorld;
      } else { // 검색결과가 있을때
        resultPg.style.display = "block"; // 검색 결과를 보여준다
        artistName.innerText = musicKeyWorld;
      }
      subInput.value = "";
      mainInput.value = "";
      

      let count = 1;
      for (let i = 0; i < 13; i++) {
        let albumTitle = musicList[i]["name"];
        let albumURL = musicList[i]["url"];
        let albumLikes = musicList[i]["listeners"];

        $(".musicList").append(`
        <li class="list">
          <span class="number">${i + 1}.</span>
          <a class="musicName" href="${albumURL}">${albumTitle}</a>
          <span class="likers"><span class="like">${albumLikes}</span> ❤</span>
        </li>
        `);
        

      }
    });
}


// 아티스트 정보
// http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=아이유&api_key=502aca31cb330e8135b04d480caf6a56&format=json

const artistName = document.querySelector(".artist_name"); // 이름부분
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

      console.log(detail_url, artist_publish)

      $("<a>").attr({ // 자세히보기 버튼 생성후 추가
        value: "자세히 보기",
        href: detail_url,
        class: "more_btn",
      }).appendTo($("#detail_area")).text("자세히 보기");

      artistPublished.innerText = artist_publish;
    });
}



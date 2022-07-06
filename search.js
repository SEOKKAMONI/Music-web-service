// 502aca31cb330e8135b04d480caf6a56 
// http://ws.audioscrobbler.com/2.0/?method=track.search&track=아이유&api_key=502aca31cb330e8135b04d480caf6a56&format=json
const mainInput = document.getElementById("__input"); // main input
const mainForm = document.getElementById("__form"); // main form

const mainPg = document.querySelector(".main_pg");
const resultPg = document.getElementById("result_page");
const serachArea = document.querySelector(".search")

mainForm.addEventListener("submit", addMusicList);

// 앨범, 음악 정보
function addMusicList(e) {
  e.preventDefault()
  let musicKeyWorld = mainInput.value;
  $.ajax({
    type: 'GET',
    url: 'http://ws.audioscrobbler.com/2.0/?method=track.search&track='+musicKeyWorld+'&api_key=502aca31cb330e8135b04d480caf6a56&format=json',
    success: function (response) {
      mainPg.style.display = "none"; // 검색이 되면 메인페이지를 가리고
      resultPg.style.display = "block"; // 검색 결과를 보여준다
      serachArea.style.display = "none"; // 검색창을 가려준다


      let musicList =  response["results"]["trackmatches"]["track"];
      for (let i = 0; i < musicList.length; i++) {
        let albumTitle = musicList[i]["name"];
        let albumArtist = musicList[i]["artist"];
      }
      mainInput.value = " "; // 검색창 지워주기
    }
  })
}


// 아티스트 정보
//  /2.0/?method=artist.getinfo&artist=Cher&api_key=YOUR_API_KEY&format=json
<h1>Music-service-Web 현재 구현안 설명</h1>
<h2>🚨 여기 있는 모든것은 언제든지 바뀔수도있습니다 🚨<br><br>
🚨 최종 완성본이 만들어지면 다시 정리해서 올리겠습니다 🚨</h2>
<h2>베타: https://roaring-biscotti-9af959.netlify.app/</h2>
<h3>사용 API</h3>
<h4>last.fm API : https://www.last.fm/api<br>
    MusicBrainz API : https://musicbrainz.org/doc/MusicBrainz_API<br>
    Genius API : https://genius.com/developers</h4>
<hr>
<h3>💙 수정전 레이아웃 💙</h3>
<img src="https://media.discordapp.net/attachments/994402201768300587/994429963421880370/unknown.png?width=829&height=409">

<h3>💙 현재 레이아웃 💙 (수정 07.10)</h3>
<img src="https://media.discordapp.net/attachments/994402201768300587/995681207046111353/unknown.png"?width=828&height=410?width=1356&height=670">

<hr>
<h3>💙 수정전 검색시 결과 💙</h3>
<img src="https://media.discordapp.net/attachments/994402201768300587/994530049938173994/unknown.png?width=831&height=410">

<h3>💙 검색시 결과 💙 (수정 07.10)</h3>
<img src="https://media.discordapp.net/attachments/994402201768300587/995682793155727430/unknown.png?width=825&height=409"?width=1359&height=670">
<hr>
<h3>💙 구현 계획 💙</h3>
<h2>1. last.fm API를 사용하여 검색시 아티스트 정보와 앨범, 노래 따오기 <span style="font-weight: bold;">(완료)</span></h2>
<h3> 🔴 문제점: last.fm API에서 아티스트에 이미지와 앨범 커버 이미지를 규정위반에 의해 지원을 안함<br>
     🟢 방안: 외국계 API인 MusicBrainz API를 사용하여 앨범 커버 이미지와 아티스트에 이미지를 가지고 오기</h3>
<h2>2. 가사를 쳐도 그에 대한 노래가 나오게 하기</h2>
<h3>🟢 방안: Genius API를 이용하여 구현 가능</h3>



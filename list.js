// index.js에서 저장된 전역변수 clickedGuName를 localStorage로 저장했다가 가져오기
document.addEventListener("DOMContentLoaded", function () {
  let clickedGuName = localStorage.getItem('clickedGuName');

  if (clickedGuName) {
    searchList(clickedGuName);
  } else {
    console.error("No guName found in localStorage.");
  }
});
// index.js에서 저장된 전역변수 searchedKeyword localStorage로 저장했다가 가져오기
document.addEventListener("DOMContentLoaded", function () {
  let searchedKeyword = localStorage.getItem('searchedKeyword');

  if (searchedKeyword) {
    directSearchList(searchedKeyword);
  } else {
    console.log("No searchedKeyword found in localStorage.");
  }
});

let clickedKinderName;
localStorage.setItem('clickedKinderName', clickedKinderName);

// 구 버튼 눌렀을 때 clickedGuName을 통해 api를 조회해서 목록을 생성해주는 기능
function searchList(clickedGuName) {
  fetch("./json/kinderGeneral.json")
    .then((response) => response.json())
    .then((data) => {

      const listTitle = `
            <h1>${clickedGuName} 유치원 정보</h1>
          `
      document.querySelector(".list-title")
        .insertAdjacentHTML("beforeend", listTitle);

      for (let i = 0; i < data.DATA.length; i++) {
        if (data.DATA[i].addr.includes(clickedGuName)) {

          const listCard = `
            <div class="list-card" id="list${[i]}">
              <div class="list-contentsGrp">
                <div class="list-contents">
                  <div class="kinder-title">
                    <div class="kinder-tag" id="list-establish${[i]}">
                      ${data.DATA[i].establish}
                    </div>
                    <div class="kinder-name" id="list-name${[i]}">
                      ${data.DATA[i].kindername}
                    </div>
                  </div>
                  <div class="list-infoGrp">
                    <div class="list-info" id="list-num${[i]}">
                    ${data.DATA[i].telno}
                    </div>
                    <div class="list-info" id="list-addr${[i]}">
                      ${data.DATA[i].addr}
                    </div>
                  </div>
                </div>
                <div class="icon">
                  아이콘
                </div>
              </div>
              <div class="divider"></div>
            </div>
            `

          document.querySelector(".list-container")
            .insertAdjacentHTML("beforeend", listCard);

          document.getElementById(`list${[i]}`)
            .addEventListener("click", function () {
              clickedKinderName = document.getElementById(`list-name${[i]}`).textContent;
              localStorage.setItem('clickedKinderName', clickedKinderName);
              location.href = 'detail.html';
            })
        }
      }
    });
};


//검색창에서 검색 했을 때 그 키워드를 포함하는 유치원명을 모두 전역변수 배열로 저장
let searchedArray = [];

//서치 버튼 클릭 시 작동되는 기능
function directSearchList(searchedKeyword){
    fetch("./json/kinderGeneral.json")
    .then((response) => response.json())
    .then((data) => {
        //searchedArray가 push되면서 배열이 계속 쌓이는 현상을 초기화 해줌
        searchedArray = [];

        //인풋에 입력한 searchedKeyword 포함한 모든 유치원명을 searchedArray라는 배열로 넣어줌
        for (let i = 0; i < data.DATA.length; i++) {
            if (data.DATA[i].kindername.includes(searchedKeyword)) {
                searchedArray.push(data.DATA[i].kindername);
            }
        }
        console.log(searchedArray)

        //searchedArray에 있는 유치원명들을 kindername으로 가지고 있는 데이터들을 배열로 가져옴
        let directKinderInfos = data.DATA.filter((item) =>
            searchedArray.includes(item.kindername.trim()) 
        );
        console.log(directKinderInfos)
    })
}

//미입력 검색 시 전목록 나오므로 예외처리필요
//검색결과 없을 때 메시지, 페이지 이동x
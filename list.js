document.addEventListener("DOMContentLoaded", function () {
  let clickedGuName = localStorage.getItem('clickedGuName');
  let searchedKeyword = localStorage.getItem('searchedKeyword');

  // 검색 키워드가 있을 경우 우선 처리
  if (searchedKeyword) {
    directSearchList(searchedKeyword);
    listTitle = `
            <h1>검색된 유치원 정보</h1>
          `;
    document.querySelector(".list-title").insertAdjacentHTML("beforeend", listTitle);
  }
  // 검색 키워드가 없을 때 clickedGuName 처리
  else if (clickedGuName) {
    searchList(clickedGuName);
    listTitle = `
            <h1>${clickedGuName} 유치원 정보</h1>
          `;
    document.querySelector(".list-title").insertAdjacentHTML("beforeend", listTitle);
  }
  else {
    console.log("No guName or searchedKeyword!");
  }
});

let clickedKinderName;
localStorage.setItem('clickedKinderName', clickedKinderName);

let clickedkinderCode;
localStorage.setItem('clickedkinderCode', clickedkinderCode);

// 구 버튼 눌렀을 때 clickedGuName을 통해 api를 조회해서 목록을 생성해주는 기능
function searchList(clickedGuName) {
  fetch("./json/kinderGeneral.json")
    .then((response) => response.json())
    .then((data) => {

      for (let i = 0; i < data.DATA.length; i++) {
        if (data.DATA[i].addr.includes(clickedGuName)) {

          let listCard = `
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

              clickedkinderCode = data.DATA[i].kindercode;
              localStorage.setItem('clickedkinderCode', clickedkinderCode);
              
              location.href = 'detail.html';
            });
        }
      }
    });
};


//검색창에서 검색 했을 때 그 키워드를 포함하는 유치원명을 모두 전역변수 배열로 저장
let searchedArray = [];

//서치 버튼 클릭 시 작동되는 기능
function directSearchList(searchedKeyword) {
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

      //searchedArray에 있는 유치원명들을 kindername으로 가지고 있는 데이터들을 배열로 가져옴
      let directKinderInfos = data.DATA.filter((item) =>
        searchedArray.includes(item.kindername.trim())
      );

      for (let i = 0; i < directKinderInfos.length; i++) {
        if (directKinderInfos) {

          let listCard = `
            <div class="list-card" id="list${[i]}">
              <div class="list-contentsGrp">
                <div class="list-contents">
                  <div class="kinder-title">
                    <div class="kinder-tag" id="list-establish${[i]}">
                      ${directKinderInfos[i].establish}
                    </div>
                    <div class="kinder-name" id="list-name${[i]}">
                      ${directKinderInfos[i].kindername}
                    </div>
                  </div>
                  <div class="list-infoGrp">
                    <div class="list-info" id="list-num${[i]}">
                    ${directKinderInfos[i].telno}
                    </div>
                    <div class="list-info" id="list-addr${[i]}">
                      ${directKinderInfos[i].addr}
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

              clickedkinderCode = directKinderInfos[i].kindercode;
              localStorage.setItem('clickedkinderCode', clickedkinderCode);
              
              location.href = 'detail.html';
            });
        }
      }
      if (searchedArray.length == 0) {
        console.log("검색결과 없음");
      }
    })
}

//서치된 것 없을 때 빈페이지 디자인, 돌아가기 버튼
//검색엔터
// index.js에서 저장된 전역변수 clickedGuName를 localStorage로 저장했다가 가져오기
document.addEventListener("DOMContentLoaded", function () {
  let clickedGuName = localStorage.getItem('clickedGuName');

  if (clickedGuName) {
    searchList(clickedGuName);
  } else {
    console.error("No guName found in localStorage.");
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

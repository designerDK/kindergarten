let currentPage = 1; // 현재 페이지 번호
const itemsPerPage = 10; // 페이지당 표시할 항목 수
let currentList = []; // 현재 목록을 저장할 배열
const maxPageButtons = 10; // 페이지네이션에서 보일 최대 페이지 번호 버튼 수
let startPage = 1; // 페이지 번호 버튼의 시작 페이지
let endPage = maxPageButtons; // 페이지 번호 버튼의 끝 페이지

document.addEventListener("DOMContentLoaded", function () {
  let clickedGuName = localStorage.getItem("clickedGuName");
  let searchedKeyword = localStorage.getItem("searchedKeyword");

  if (searchedKeyword) {
    directSearchList(searchedKeyword);
    let listTitle = `<h1>검색된 유치원 정보</h1>`;
    document.querySelector(".list-title").insertAdjacentHTML("beforeend", listTitle);
  } else if (clickedGuName) {
    searchList(clickedGuName);
    let listTitle = `<h1>${clickedGuName} 유치원 정보</h1>`;
    document.querySelector(".list-title").insertAdjacentHTML("beforeend", listTitle);
  } else {
    console.log("No guName or searchedKeyword!");
  }
});

function searchList(clickedGuName) {
  fetch("./json/kinderGeneral.json")
    .then((response) => response.json())
    .then((data) => {
      currentList = data.DATA.filter((item) => item.addr.includes(clickedGuName));
      renderPage(currentList, currentPage);
      setupPagination(currentList);
    });
}

function directSearchList(searchedKeyword) {
  fetch("./json/kinderGeneral.json")
    .then((response) => response.json())
    .then((data) => {
      currentList = data.DATA.filter((item) => item.kindername.includes(searchedKeyword));
      if (currentList.length > 0) {
        renderPage(currentList, currentPage);
        setupPagination(currentList);
      } else {
        renderNoResults();
      }
    });
}

function renderPage(list, page) {
  const listContainer = document.querySelector(".list-container");
  listContainer.innerHTML = "";
  const start = (page - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const paginatedItems = list.slice(start, end);

  paginatedItems.forEach((item, i) => {
    let listCard = `
      <div class="list-card" id="list${i + start}">
        <div class="list-contentsGrp">
          <div class="list-contents">
            <div class="kinder-title">
              <div class="kinder-tag" id="list-establish${i + start}">
                ${item.establish}
              </div>
              <div class="kinder-name" id="list-name${i + start}">
                ${item.kindername}
              </div>
            </div>
            <div class="list-infoGrp">
              <div class="list-info" id="list-num${i + start}">
                ${item.telno}
              </div>
              <div class="list-info" id="list-addr${i + start}">
                ${item.addr}
              </div>
            </div>
          </div>
          <div class="icon">아이콘</div>
        </div>
        <div class="divider"></div>
      </div>
    `;

    listContainer.insertAdjacentHTML("beforeend", listCard);
    document.getElementById(`list${i + start}`).addEventListener("click", function () {
      clickedKinderName = document.getElementById(`list-name${i + start}`).textContent;
      localStorage.setItem("clickedKinderName", clickedKinderName);
      clickedkinderCode = item.kindercode;
      localStorage.setItem("clickedkinderCode", clickedkinderCode);
      location.href = "detail.html";
    });
  });
}

function renderNoResults() {
  const listContainer = document.querySelector(".list-container");
  listContainer.innerHTML = `
    <div class="empty-contents">
      <div class="empty-msg">
        <div class="empty-img">이미지</div>
        <div class="empty-text">일치하는 유치원명이 없습니다.</div>
      </div>
      <a class="empty-back-btn" href="index.html">돌아가기</a>
    </div>
  `;
}

function setupPagination(list) {
  const paginationContainer = document.querySelector(".pagination");
  paginationContainer.innerHTML = "";
  const pageCount = Math.ceil(list.length / itemsPerPage);

  // 처음 버튼
  let firstPageButton = document.createElement("button");
  firstPageButton.textContent = "처음";
  firstPageButton.disabled = currentPage === 1;
  firstPageButton.addEventListener("click", () => {
    currentPage = 1;
    startPage = 1;
    endPage = maxPageButtons;
    renderPage(currentList, currentPage);
    setupPagination(currentList);
  });
  paginationContainer.appendChild(firstPageButton);

  // 이전 페이지 세트 버튼
  let prevSetButton = document.createElement("button");
  prevSetButton.textContent = "이전";
  prevSetButton.disabled = startPage === 1;
  prevSetButton.addEventListener("click", () => {
    startPage = Math.max(1, startPage - maxPageButtons);
    endPage = startPage + maxPageButtons - 1;
    renderPage(currentList, currentPage);
    setupPagination(currentList);
  });
  paginationContainer.appendChild(prevSetButton);

  // 페이지 번호 버튼 생성
  for (let i = startPage; i <= Math.min(endPage, pageCount); i++) {
    let pageButton = document.createElement("button");
    pageButton.textContent = i;
    if (i === currentPage) pageButton.classList.add("active");
    pageButton.addEventListener("click", () => changePage(i));
    paginationContainer.appendChild(pageButton);
  }

  // 다음 페이지 세트 버튼
  let nextSetButton = document.createElement("button");
  nextSetButton.textContent = "다음";
  nextSetButton.disabled = endPage >= pageCount;
  nextSetButton.addEventListener("click", () => {
    startPage = Math.min(pageCount - maxPageButtons + 1, startPage + maxPageButtons);
    endPage = startPage + maxPageButtons - 1;
    renderPage(currentList, currentPage);
    setupPagination(currentList);
  });
  paginationContainer.appendChild(nextSetButton);

  // 끝 버튼
  let lastPageButton = document.createElement("button");
  lastPageButton.textContent = "끝";
  lastPageButton.disabled = currentPage === pageCount;
  lastPageButton.addEventListener("click", () => {
    currentPage = pageCount;
    startPage = Math.max(1, pageCount - maxPageButtons + 1);
    endPage = pageCount;
    renderPage(currentList, currentPage);
    setupPagination(currentList);
  });
  paginationContainer.appendChild(lastPageButton);
}

function changePage(page) {
  currentPage = page;
  renderPage(currentList, currentPage);
  setupPagination(currentList);
}


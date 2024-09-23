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
    let listTitle = `검색된 유치원 목록입니다.`;
    document.querySelector(".list-title").insertAdjacentHTML("beforeend", listTitle);
  } else if (clickedGuName) {
    searchList(clickedGuName);
    let listTitle = `
    <span class="highlight">${clickedGuName}</span>에 위치한 유치원입니다.
    `;
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
              <div class="kinder-tag text-body-small-sb" id="list-establish${i + start}">
                ${item.establish}
              </div>
              <div class="kinder-name text-body-large-sb" id="list-name${i + start}">
                ${item.kindername}
              </div>
            </div>
            <div class="list-infoGrp">
              <div class="list-info text-body-small-m" id="list-num${i + start}">
                ${item.telno}
              </div>
              <div class="list-divider text-body-small-m">|</div>
              <div class="list-info text-body-small-m" id="list-addr${i + start}">
                ${item.addr}
              </div>
            </div>
          </div>
          <img class="icon" src="/data/icon/chevron-right.svg" alt="">
        </div>
      </div>
    `;
    

    listContainer.insertAdjacentHTML("beforeend", listCard);

    //클릭 이벤트 설정
    document.getElementById(`list${i + start}`).addEventListener("click", function () {
      clickedKinderName = document.getElementById(`list-name${i + start}`).textContent;
      localStorage.setItem("clickedKinderName", clickedKinderName);
      clickedkinderCode = item.kindercode;
      localStorage.setItem("clickedkinderCode", clickedkinderCode);
      location.href = "detail.html";
    });

    // 각 kinder-tag의 배경색 설정
    let kinderTag = document.getElementById(`list-establish${i + start}`);
    if (item.establish === '공립(병설)') {
      kinderTag.style.backgroundColor = 'var(--surface-env2)';
    } else if (item.establish === '사립(사인)') {
      kinderTag.style.backgroundColor = 'var(--surface-env3)';
    } else if (item.establish === '공립(단설)') {
      kinderTag.style.backgroundColor = 'var(--surface-env4)';
    } else if (item.establish === '사립(법인)') {
      kinderTag.style.backgroundColor = 'var(--surface-env1)';
    }
  });
}

function renderNoResults() {
  const listContainer = document.querySelector(".list-container");
  listContainer.innerHTML = `
    <div class="empty-contents">
      <div class="empty-msg">
        <img src="/data/icon/empty.svg" alt="">
        <div class="empty-text text-body-midlarge-m">일치하는 유치원명이 없습니다.</div>
      </div>
      <a class="empty-back-btn text-body-midlarge-m" href="index.html">돌아가기</a>
    </div>
  `;
}

function setupPagination(list) {
  const paginationContainer = document.querySelector(".pagination");
  paginationContainer.innerHTML = "";
  const pageCount = Math.ceil(list.length / itemsPerPage);

  // 처음 버튼
  let firstPageButton = document.createElement("button");
  firstPageButton.innerHTML = '<img src="/data/icon/start.svg" alt="">'
  firstPageButton.classList.add("page-btn");
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
  prevSetButton.innerHTML = '<img src="/data/icon/prev.svg" alt="">'
  prevSetButton.classList.add("page-btn");
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
    pageButton.classList.add("text-body-mid-m");
    pageButton.classList.add("page-num");
    if (i === currentPage) pageButton.classList.add("active");
    pageButton.addEventListener("click", () => changePage(i));
    paginationContainer.appendChild(pageButton);
  }

  // 다음 페이지 세트 버튼
  let nextSetButton = document.createElement("button");
  nextSetButton.innerHTML = '<img src="/data/icon/next.svg" alt="">'
  nextSetButton.classList.add("page-btn");
  nextSetButton.addEventListener("click", () => {
    startPage = Math.min(pageCount - maxPageButtons + 1, startPage + maxPageButtons);
    endPage = startPage + maxPageButtons - 1;
    renderPage(currentList, currentPage);
    setupPagination(currentList);
  });
  paginationContainer.appendChild(nextSetButton);

  // 끝 버튼
  let lastPageButton = document.createElement("button");
  lastPageButton.innerHTML = '<img src="/data/icon/end.svg" alt="">'
  lastPageButton.classList.add("page-btn");
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


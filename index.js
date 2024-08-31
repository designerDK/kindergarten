let guName = 
['강서구', '강남구', '강동구', '광진구', '송파구']

const searchInput = document.querySelector(".input");

//백버튼시 검색 초기화
window.addEventListener("pageshow", function () {
  if (searchInput) {
    searchInput.value = "";
  }
});
//검색버튼을 키보드 엔터 눌렀을 때도 동작하게
searchInput.addEventListener("keyup", function(event){
  if(event.keyCode === 13){
    document.querySelector(".search-btn").click();
  }
});
// 구 버튼을 눌렀을 때 그 텍스트콘텐츠 정보를 clickedGuName이라는 전역변수에 저장하고 다른 페이지에서도 사용하기 위한 코드
let clickedGuName;
localStorage.setItem('clickedGuName', clickedGuName);

//검색한 키워드
let searchedKeyword = "";
localStorage.setItem('searchedKeyword', searchedKeyword);

// 구 버튼을 생성하고 눌렀을 때 서치리스트 기능을 실행
guName.forEach((item) => {
  const guBTN = `
        <button id="gu-btn" onClick="
            clickedGuName = this.textContent;
            localStorage.setItem('clickedGuName', clickedGuName);
            location.href = 'list.html';
        ">${item}</button>
    `;
    document.querySelector(".states-btn-container")
    .insertAdjacentHTML("beforeend", guBTN);
});

// 검색창 인풋값으로 검색해주는 버튼
document.querySelector(".search-btn")
  .addEventListener("click", function () {
    // 인풋 값 가져오기
    searchedKeyword = searchInput.value.trim(); // 공백 제거

    // 인풋이 비어있지 않은 경우에만 검색 수행
    if (searchedKeyword !== "") {  // 부정연산자
      localStorage.setItem('searchedKeyword', searchedKeyword);
      location.href = 'list.html';
    } else {
      // 인풋이 비어있을 때 처리 (선택 사항: 경고 메시지 등을 표시 가능)
      console.log("검색어를 입력해주세요.");
    }
  });
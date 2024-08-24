let guName = 
['강서구', '강남구', '강동구', '광진구', '송파구']

// 구 버튼을 눌렀을 때 그 텍스트콘텐츠 정보를 clickedGuName이라는 전역변수에 저장하고 다른 페이지에서도 사용하기 위한 코드
let clickedGuName;
localStorage.setItem('clickedGuName', clickedGuName);

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
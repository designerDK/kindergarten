// list.js에서 저장된 전역변수들을 localStorage로 저장했다가 가져오기
document.addEventListener("DOMContentLoaded", function () {
    let clickedkinderCode = localStorage.getItem('clickedkinderCode');
    let clickedKinderName = localStorage.getItem('clickedKinderName');

    if (clickedkinderCode, clickedKinderName) {
        searchDetail(clickedkinderCode, clickedKinderName);
    } else {
        console.error("No Name found in localStorage.");
    }
});
 
  function searchDetail(clickedkinderCode, clickedKinderName){
    fetch("./json/kinderGeneral.json")
    .then((response) => response.json())
    .then((data) => {

    // filter: data.DATA 속 kindername이 특정 명칭(clickedKinderName)과 일치하는지 여부를 판단하고 일치하는 것을 배열로 반환
    // .trim().toLowerCase()를 쓰면 띄어쓰기나 대소문자로 인한 불일치를 해소
        let kinderInfos = data.DATA.filter((item) =>
            item.kindername.trim().toLowerCase() === clickedKinderName.trim().toLowerCase()
        );
        console.log(clickedKinderName)
        console.log(clickedkinderCode)
// kinderInfos는 복수의 데이터가 들어올 수 있으므로 clickedkinderCode를 통해 클릭한 리스트의 데이터와 일치하는 데이터만 찾아냄
        let kinderInfoPick = kinderInfos.filter((item) =>
            item.kindercode === clickedkinderCode
        )

        const detailTitle = `
            <h1>${clickedKinderName} 정보</h1>
        `

        const detailBasic = `
        <div class="detail-basicGrp">
            <div class="detail-basic">
                <div class="kinder-title">
                    <div class="kinder-tag">
                        ${kinderInfoPick[0].establish}
                    </div>
                    <div class="kinder-name">
                        ${kinderInfoPick[0].kindername}
                    </div>
                </div>
                <div class="detail-basicInfo">
                    <div class="key-value">
                        <div class="key">
                            전화번호
                        </div>
                        <div class="value">
                            ${kinderInfoPick[0].telno}
                        </div>
                    </div>
                    <div class="key-value">
                        <div class="key">
                            운영시간
                        </div>
                        <div class="value">
                            ${kinderInfoPick[0].opertime}
                        </div>
                    </div>
                </div>
            </div>
            <div class="detail-icon">아이콘</div>
        </div>
        <div class="detail-subInfo">
            <div class="key-value">
                <div class="key">
                    설립일
                </div>
                <div class="value">
                    ${kinderInfoPick[0].edate}
                </div>
            </div>
            <div class="key-value">
                <div class="key">
                    개원일
                </div>
                <div class="value">
                    ${kinderInfoPick[0].odate}
                </div>
            </div>
            <div class="key-value">
                <div class="key">
                    대표자명
                </div>
                <div class="value">
                    ${kinderInfoPick[0].rppnname}
                </div>
            </div>
            <div class="key-value">
                <div class="key">
                    원장명
                </div>
                <div class="value">
                    ${kinderInfoPick[0].ldgrname}
                </div>
            </div>
            <div class="key-value">
                <div class="key">
                    교육청명
                </div>
                <div class="value">
                    ${kinderInfoPick[0].officeedu}
                </div>
            </div>
            <div class="key-value">
                <div class="key">
                    교육지원청명
                </div>
                <div class="value">
                    ${kinderInfoPick[0].subofficeedu}
                </div>
            </div>
            <div class="key-value">
                <div class="key">
                    홈페이지
                </div>
                <div class="value">
                    ${kinderInfoPick[0].hpaddr}
                </div>
            </div>
        </div>
        `

        const classNumData = `
        <div class="data-card">
            <div class="data-contents">
                <div class="data-title">
                    학급수
                </div>
                <div class="data-keyValue-barGraph">
                    <div class="key-value">
                        <div class="key">
                            만 3세 반
                        </div>
                        <div class="value">
                            ${kinderInfoPick[0].clcnt3}
                        </div>
                    </div>
                    <div class="barGraph-container">
                        <div class="barGraph">그래프</div>
                    </div>
                </div>
                <div class="data-keyValue-barGraph">
                    <div class="key-value">
                        <div class="key">
                            만 4세 반
                        </div>
                        <div class="value">
                            ${kinderInfoPick[0].clcnt4}
                        </div>
                    </div>
                    <div class="barGraph-container">
                        <div class="barGraph">그래프</div>
                    </div>
                </div>
                <div class="data-keyValue-barGraph">
                    <div class="key-value">
                        <div class="key">
                            만 5세 반
                        </div>
                        <div class="value">
                            ${kinderInfoPick[0].clcnt5}
                        </div>
                    </div>
                    <div class="barGraph-container">
                        <div class="barGraph">그래프</div>
                    </div>
                </div>
                <div class="data-keyValue-barGraph">
                    <div class="key-value">
                        <div class="key">
                            혼합반
                        </div>
                        <div class="value">
                            ${kinderInfoPick[0].mixclcnt}
                        </div>
                    </div>
                    <div class="barGraph-container">
                        <div class="barGraph">그래프</div>
                    </div>
                </div>
                <div class="data-keyValue-barGraph">
                    <div class="key-value">
                        <div class="key">
                            특수학급
                        </div>
                        <div class="value">
                            ${kinderInfoPick[0].shclcnt}
                        </div>
                    </div>
                    <div class="barGraph-container">
                        <div class="barGraph">그래프</div>
                    </div>
                </div>
            </div>

            <div class="data-totalContainer">
                <div class="data-totalKey">
                    총 학급
                </div>
                <div class="data-totalValue">
                    ${Number(kinderInfoPick[0].clcnt3) + Number(kinderInfoPick[0].clcnt4)
                    + Number(kinderInfoPick[0].clcnt5) + Number(kinderInfoPick[0].mixclcnt)
                    + Number(kinderInfoPick[0].shclcnt)
                    }개
                </div>
            </div>
        </div>
        `
        const kidNumData = `
        <div class="data-card">
            <div class="data-contents">
                <div class="data-title">
                    유아수
                </div>
                <div class="data-keyValue-barGraph">
                    <div class="key-value">
                        <div class="key">
                            만 3세 반
                        </div>
                        <div class="value">
                            ${kinderInfoPick[0].ppcnt3}
                        </div>
                    </div>
                    <div class="barGraph-container">
                        <div class="barGraph">그래프</div>
                    </div>
                </div>
                <div class="data-keyValue-barGraph">
                    <div class="key-value">
                        <div class="key">
                            만 4세 반
                        </div>
                        <div class="value">
                            ${kinderInfoPick[0].ppcnt4}
                        </div>
                    </div>
                    <div class="barGraph-container">
                        <div class="barGraph">그래프</div>
                    </div>
                </div>
                <div class="data-keyValue-barGraph">
                    <div class="key-value">
                        <div class="key">
                            만 5세 반
                        </div>
                        <div class="value">
                            ${kinderInfoPick[0].ppcnt5}
                        </div>
                    </div>
                    <div class="barGraph-container">
                        <div class="barGraph">그래프</div>
                    </div>
                </div>
                <div class="data-keyValue-barGraph">
                    <div class="key-value">
                        <div class="key">
                            혼합반
                        </div>
                        <div class="value">
                            ${kinderInfoPick[0].mixppcnt}
                        </div>
                    </div>
                    <div class="barGraph-container">
                        <div class="barGraph">그래프</div>
                    </div>
                </div>
                <div class="data-keyValue-barGraph">
                    <div class="key-value">
                        <div class="key">
                            특수학급
                        </div>
                        <div class="value">
                            ${kinderInfoPick[0].shppcnt}
                        </div>
                    </div>
                    <div class="barGraph-container">
                        <div class="barGraph">그래프</div>
                    </div>
                </div>
            </div>

            <div class="data-totalContainer">
                <div class="data-totalKey">
                    총 유아수
                </div>
                <div class="data-totalValue">
                    ${Number(kinderInfoPick[0].ppcnt3) + Number(kinderInfoPick[0].ppcnt4)
                    + Number(kinderInfoPick[0].ppcnt5) + Number(kinderInfoPick[0].mixppcnt)
                    + Number(kinderInfoPick[0].shppcnt)
                    }명
                </div>
            </div>
        </div>
        `
        document.querySelector(".detail-title")
            .insertAdjacentHTML("beforeend", detailTitle);
        document.querySelector(".detail-container")
            .insertAdjacentHTML("beforeend", detailBasic);

        document.querySelector(".data-container")
            .insertAdjacentHTML("beforeend", classNumData);

        document.querySelector(".data-container")
            .insertAdjacentHTML("beforeend", kidNumData);
    });
};


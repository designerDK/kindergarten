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

function searchDetail(clickedkinderCode, clickedKinderName) {
    fetch("./json/kinderGeneral.json")
        .then((response) => response.json())
        .then((data) => {

            // filter: data.DATA 속 kindername이 특정 명칭(clickedKinderName)과 일치하는지 여부를 판단하고 일치하는 것을 배열로 반환
            // .trim().toLowerCase()를 쓰면 띄어쓰기나 대소문자로 인한 불일치를 해소
            let kinderInfos = data.DATA.filter((item) =>
                item.kindername.trim().toLowerCase() === clickedKinderName.trim().toLowerCase()
            );
            // kinderInfos는 복수의 데이터가 들어올 수 있으므로 clickedkinderCode를 통해 클릭한 리스트의 데이터와 일치하는 데이터만 찾아냄
            let kinderInfoPick = kinderInfos.filter((item) =>
                item.kindercode === clickedkinderCode
            )

            let kinderImg = kinderInfoPick[0].addr.match(/(\S+구)/); //주소 중 '구'로 끝나는 단어 찾기

            const detailTitle = `
            <span class="highlight">${clickedKinderName}</span> 정보입니다.
            `

            const detailBasic = `
        <div class="detail-basicGrp">
            <div class="detail-basic">
                <div class="kinder-title">
                    <div class="kinder-tag text-body-small-sb">
                        ${kinderInfoPick[0].establish}
                    </div>
                    <div class="kinder-name text-body-large-sb">
                        ${kinderInfoPick[0].kindername}
                    </div>
                </div>
                <div class="detail-basicInfo text-body-small-m">
                    <div class="key-value1 ">
                        <div class="key">
                            전화번호
                        </div>
                        <div class="value">
                            ${kinderInfoPick[0].telno}
                        </div>
                    </div>
                    <div class="key-value1">
                        <div class="key">
                            운영시간
                        </div>
                        <div class="value">
                            ${kinderInfoPick[0].opertime}
                        </div>
                    </div>
                    <div class="key-value1">
                        <div class="key">
                            주소
                        </div>
                        <div class="value">
                            ${kinderInfoPick[0].addr}
                        </div>
                    </div>
                </div>
            </div>
            <img class="states-icon-L" src="/data/statesIcon/${kinderImg[0]}.svg" alt="">
        </div>
        <div class="detail-subInfo text-body-small-m">
            <div class="key-value2">
                <div class="key">
                    설립일
                </div>
                <div class="value">
                    ${kinderInfoPick[0].edate}
                </div>
            </div>
            <div class="key-value2">
                <div class="key">
                    개원일
                </div>
                <div class="value">
                    ${kinderInfoPick[0].odate}
                </div>
            </div>
            <div class="key-value2">
                <div class="key">
                    대표자명
                </div>
                <div class="value">
                    ${kinderInfoPick[0].rppnname}
                </div>
            </div>
            <div class="key-value2">
                <div class="key">
                    원장명
                </div>
                <div class="value">
                    ${kinderInfoPick[0].ldgrname}
                </div>
            </div>
            <div class="key-value2">
                <div class="key">
                    교육청명
                </div>
                <div class="value">
                    ${kinderInfoPick[0].officeedu}
                </div>
            </div>
            <div class="key-value2">
                <div class="key">
                    교육지원청명
                </div>
                <div class="value">
                    ${kinderInfoPick[0].subofficeedu}
                </div>
            </div>
            <div class="key-value3">
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
            <div class="data-grp1">
                <div class="data-title text-body-large-sb">
                    학급수 (총 학급 ${Number(kinderInfoPick[0].clcnt3) + Number(kinderInfoPick[0].clcnt4)
                + Number(kinderInfoPick[0].clcnt5) + Number(kinderInfoPick[0].mixclcnt)
                + Number(kinderInfoPick[0].shclcnt)
                }개)
                </div>
                <div class="data-legends1">
                    <div class="legend">
                        <div class="legend-tag chart1"></div>
                        <div class="legend-text">
                            <div class="key text-body-small-m">
                            만 3세 반
                            </div>
                            <div class="value text-body-small-m">
                            ${kinderInfoPick[0].clcnt3 !== null ? kinderInfoPick[0].clcnt3 : '- '}개
                            </div>
                        </div>
                    </div>
                    <div class="legend">
                        <div class="legend-tag chart2"></div>
                        <div class="legend-text">
                            <div class="key text-body-small-m">
                            만 4세 반
                            </div>
                            <div class="value text-body-small-m">
                            ${kinderInfoPick[0].clcnt4 !== null ? kinderInfoPick[0].clcnt4 : '- '}개
                            </div>
                        </div>
                    </div>
                    <div class="legend">
                        <div class="legend-tag chart3"></div>
                        <div class="legend-text">
                            <div class="key text-body-small-m">
                            만 5세 반
                            </div>
                            <div class="value text-body-small-m">
                            ${kinderInfoPick[0].clcnt5 !== null ? kinderInfoPick[0].clcnt5 : '- '}개
                            </div>
                        </div>
                    </div>
                    <div class="legend">
                        <div class="legend-tag chart4"></div>
                        <div class="legend-text">
                            <div class="key text-body-small-m">
                            혼합반
                            </div>
                            <div class="value text-body-small-m">
                            ${kinderInfoPick[0].mixclcnt !== null ? kinderInfoPick[0].mixclcnt : '- '}개
                            </div>
                        </div>
                    </div>
                    <div class="legend">
                        <div class="legend-tag chart5"></div>
                        <div class="legend-text">
                            <div class="key text-body-small-m">
                            특수학급
                            </div>
                            <div class="value text-body-small-m">
                            ${kinderInfoPick[0].shclcnt !== null ? kinderInfoPick[0].shclcnt : '- '}개
                            </div>
                        </div>
                    </div>
                </div> 
            </div>
            <canvas id="class-chart" width="100%" height="100%"></canvas>
        `
            const kidNumData = `
            <div class="data-title text-body-large-sb">
                    유아수 (총 유아수 ${Number(kinderInfoPick[0].ppcnt3) + Number(kinderInfoPick[0].ppcnt4)
                + Number(kinderInfoPick[0].ppcnt5) + Number(kinderInfoPick[0].mixppcnt)
                + Number(kinderInfoPick[0].shppcnt)
                }명)
            </div>
          
            <div class="data-grp2">
                <div class="data-legends2">
                    <div class="legend">
                 
                        <div class="legend-text">
                            <div class="key text-body-small-m">
                            만 3세 반
                            </div>
                            <div class="value text-body-small-m">
                            ${kinderInfoPick[0].ppcnt3 !== null ? kinderInfoPick[0].ppcnt3 : '- '}명
                            </div>
                        </div>
                    </div>
                    <div class="legend">
             
                        <div class="legend-text">
                            <div class="key text-body-small-m">
                            만 4세 반
                            </div>
                            <div class="value text-body-small-m">
                            ${kinderInfoPick[0].ppcnt4 !== null ? kinderInfoPick[0].ppcnt4 : '- '}명
                            </div>
                        </div>
                    </div>
                    <div class="legend">
                   
                        <div class="legend-text">
                            <div class="key text-body-small-m">
                            만 5세 반
                            </div>
                            <div class="value text-body-small-m">
                            ${kinderInfoPick[0].ppcnt5 !== null ? kinderInfoPick[0].ppcnt5 : '- '}명
                            </div>
                        </div>
                    </div>
                    <div class="legend">
                     
                        <div class="legend-text">
                            <div class="key text-body-small-m">
                            혼합반
                            </div>
                            <div class="value text-body-small-m">
                            ${kinderInfoPick[0].mixppcnt !== null ? kinderInfoPick[0].mixppcnt : '- '}명
                            </div>
                        </div>
                    </div>
                    <div class="legend">
                      
                        <div class="legend-text">
                            <div class="key text-body-small-m">
                            특수학급
                            </div>
                            <div class="value text-body-small-m">
                            ${kinderInfoPick[0].shppcnt !== null ? kinderInfoPick[0].shppcnt : '- '}명
                            </div>
                        </div>
                    </div>
                </div> 
                <canvas id="kidnum-chart"></canvas>
            </div>
        `
            document.querySelector(".detail-title")
                .insertAdjacentHTML("beforeend", detailTitle);
            document.querySelector(".detail-container")
                .insertAdjacentHTML("beforeend", detailBasic);

            document.querySelector(".data-container1")
                .insertAdjacentHTML("beforeend", classNumData);

            document.querySelector(".data-container2")
                .insertAdjacentHTML("beforeend", kidNumData);

            let kinderTag = document.querySelector('.kinder-tag');
            if (kinderInfoPick[0].establish === '공립(병설)') {
                kinderTag.style.backgroundColor = 'var(--surface-env2)';
            } else if (kinderInfoPick[0].establish === '사립(사인)') {
                kinderTag.style.backgroundColor = 'var(--surface-env3)';
            } else if (kinderInfoPick[0].establish === '공립(단설)') {
                kinderTag.style.backgroundColor = 'var(--surface-env4)';
            } else if (kinderInfoPick[0].establish === '사립(법인)') {
                kinderTag.style.backgroundColor = 'var(--surface-env1)';
            }
            kinderInfoPick[0].establish


            // 학급수차트
            new Chart(document.getElementById('class-chart'), {
                type: 'doughnut',
                data: {
                    datasets: [
                        {
                            data: [
                                kinderInfoPick[0].clcnt3 !== null ? kinderInfoPick[0].clcnt3 : '0',
                                kinderInfoPick[0].clcnt4 !== null ? kinderInfoPick[0].clcnt4 : '0',
                                kinderInfoPick[0].clcnt5 !== null ? kinderInfoPick[0].clcnt5 : '0',
                                kinderInfoPick[0].mixclcnt !== null ? kinderInfoPick[0].mixclcnt : '0',
                                kinderInfoPick[0].shclcnt !== null ? kinderInfoPick[0].shclcnt : '0'
                            ],
                            backgroundColor: ['#54E1D8', '#50CBFF', '#4A93FF', '#9A77FF', '#D592FF'],
                            borderWidth: 0 // 흰색 보더를 없애는 설정
                        }
                    ]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            display: false
                        },
                        tooltip: { // 말풍선 정보(Tooltip) 비활성화
                            enabled: false
                        }
            
                    },
                    scales: {
                        x: {
                            grid: { display: false },
                            ticks: { display: false },
                            border: { display: false }
                        },
                        y: {
                            grid: { display: false },
                            ticks: { display: false },
                            border: { display: false }
                        }
                    }
                }
            });

            //유아수차트
            new Chart(document.getElementById('kidnum-chart'), {
                type: 'bar',
                data: {
                    labels: [
                        `만 3세 반 ${kinderInfoPick[0].ppcnt3 !== null ? kinderInfoPick[0].ppcnt3 : '-'}`,
                        `만 4세 반 ${kinderInfoPick[0].ppcnt4 !== null ? kinderInfoPick[0].ppcnt4 : '-'}`,
                        `만 5세 반 ${kinderInfoPick[0].ppcnt5 !== null ? kinderInfoPick[0].ppcnt5 : '-'}`,
                        `혼합반 ${kinderInfoPick[0].mixppcnt !== null ? kinderInfoPick[0].mixppcnt : '-'}`,
                        `특수학급 ${kinderInfoPick[0].shppcnt !== null ? kinderInfoPick[0].shppcnt : '-'}`
                    ], // y축 값
                    datasets: [
                        {
                            data: [
                                kinderInfoPick[0].ppcnt3 !== null ? kinderInfoPick[0].ppcnt3 : '0',
                                kinderInfoPick[0].ppcnt4 !== null ? kinderInfoPick[0].ppcnt4 : '0',
                                kinderInfoPick[0].ppcnt5 !== null ? kinderInfoPick[0].ppcnt5 : '0',
                                kinderInfoPick[0].mixppcnt !== null ? kinderInfoPick[0].mixppcnt : '0',
                                kinderInfoPick[0].shppcnt !== null ? kinderInfoPick[0].shppcnt : '0'
                            ], // x축 값

                            backgroundColor: [
                                '#54E1D8', // 만 3세 반 색상
                                '#50CBFF', // 만 4세 반 색상
                                '#4A93FF', // 만 5세 반 색상
                                '#9A77FF', // 혼합반 색상
                                '#D592FF'  // 특수학급 색상
                            ], // 그래프 각각의 색상 지정
                            // barPercentage: 1,
                            // categoryPercentage: 1,
                            maxBarThickness: 30 // 그래프 최대 두께

                        }
                    ]
                },
                options: {
                    indexAxis: 'y',

                    responsive: true,

                    plugins: {
                        legend: {
                            display: false // 범례 표시 여부 (false로 설정하여 범례 숨김)
                        },
                        tooltip: { // 말풍선 정보(Tooltip) 비활성화
                            enabled: false
                        }            

                    },

                    scales: { // x축과 y축에 대한 설정
                        x: {
                            grid: { // 축에 대한 격자선
                                display: false, // grid 활성화 (기본값 true)
                            },
                            ticks: {
                                display: false // x축 데이터
                            },
                            border: {
                                display: false // x축의 축선 숨김
                            }
                        },
                        y: {
                            grid: { // 축에 대한 격자선
                                display: false, // grid 활성화 (기본값 true)
                            },
                            ticks: {
                                display: false // y축 눈금 텍스트 표시
                            },
                            border: {
                                display: false // y축의 축선 숨김
                            }
                        }
                    }
                }
            });
        });
};


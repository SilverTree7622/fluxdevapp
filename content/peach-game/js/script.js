const peaches=document.querySelector('.peaches');
const imgWrap=document.createElement('div');
imgWrap.setAttribute('class','img_wrap');
const p=document.createElement('p');
const span=document.createElement('span');
imgWrap.append(p);
imgWrap.append(span);
const Ps=document.querySelectorAll('.img_wrap>p');
let imgWraps=new Array();
let selectedWraps=new Array();
let selectedNum=new Array();
let score=document.querySelector('.score');
let scoreNum=0; let num=0;
const mainBtn=document.querySelector('.main');
const resetBtn=document.querySelector('.reset');
let sec=60;
// let sec=5;
const currTimeBar=document.querySelector('.curr');
const barH=currTimeBar.clientHeight;
let currBarH=barH;
const blur=document.querySelector('.blur');
const finalScoreNum=document.querySelector('.final_score_num');
const bestScoreNum=document.querySelector('.best_score>.new');
const replayBtn=document.querySelector('.replay');
const backtomainBtn=document.querySelector('.back_to_main');
const rewardBtn=document.querySelector('.reward');
const localClearBtn=document.querySelector('.local_clear');

let hasUsedReward=false;
let isPending = false;

// 로딩 애니메이션 스프라이트시트 생성
const loadingImg=document.querySelector('.loading-sprite');
// const loadingImg = document.createElement('div');
// loadingImg.setAttribute('class', 'loading-sprite');
loadingImg.style.display = 'none';
loadingImg.style.position = 'absolute';
loadingImg.style.top = '50%';
loadingImg.style.left = '50%';
loadingImg.style.transform = 'translate(-50%, -50%)';
loadingImg.style.width = '40px'; // 1프레임 너비
loadingImg.style.height = '18px';
loadingImg.style.backgroundImage = 'url("img/loading.png")';
loadingImg.style.backgroundSize = '240px 18px';
loadingImg.style.backgroundPosition = '0 0';
loadingImg.style.zIndex = 10;
rewardBtn.style.position = 'relative';

// 스프라이트 애니메이션 함수
let spriteFrame = 0;
let spriteAnimInterval;

for(let i=0; i<170; i++){
	imgWraps.push(imgWrap.cloneNode(true));
}
imgWraps.forEach(el=>{
	peaches.append(el);
	el.style.width=`${Math.floor(peaches.offsetWidth/10)}px`;
	el.style.height=`${Math.floor(peaches.offsetHeight/17)}px`;
});
let spans=document.querySelectorAll('.img_wrap>span');
spans.forEach(el=>{
	el.innerHTML=Math.floor(Math.random()*9+1);
});
const imgCW=imgWraps[0].clientWidth;
const imgCH=imgWraps[0].clientHeight;

const canvas=document.querySelector('canvas');
const ctx=canvas.getContext('2d');
ctx.lineWidth=1;
ctx.strokeStyle='#2F48D1';
ctx.fillStyle='rgba(47,72,209,0.05)';
let startX; let startY;
let leftPos; let topPos;
let endX; let endY;
let selected=new Array();
let draggable=false;

// 캔버스를 전체 화면을 덮도록 스타일 설정
canvas.style.position = 'fixed';
canvas.style.top = '0';
canvas.style.left = '0';
canvas.style.width = '100vw';
canvas.style.height = '100vh';
canvas.style.zIndex = '1';
canvas.style.pointerEvents = 'none'; // 이벤트를 투과시켜 아래 요소들이 이벤트를 받을 수 있게 함

// canvas 이벤트 리스너 제거
canvas.removeEventListener('mousedown', downFunc);
canvas.removeEventListener('mousemove', moveFunc);
canvas.removeEventListener('mouseup', upFunc);
canvas.removeEventListener('mouseleave', leaveFunc);

canvas.removeEventListener('touchstart', downFunc);
canvas.removeEventListener('touchmove', moveFunc);
canvas.removeEventListener('touchend', upFunc);

// document에 이벤트 리스너 추가
document.addEventListener('mousedown', downFunc);
document.addEventListener('mousemove', moveFunc);
document.addEventListener('mouseup', upFunc);
document.addEventListener('mouseleave', leaveFunc);

document.addEventListener('touchstart', downFunc, { passive: false });
document.addEventListener('touchmove', moveFunc, { passive: false });
document.addEventListener('touchend', upFunc, { passive: false });

function updateCanvasSize() {
    // 캔버스 크기를 뷰포트 크기에 맞게 설정
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

// 초기 캔버스 크기 설정
updateCanvasSize();

// 리사이즈 이벤트에 캔버스 크기 업데이트 함수 연결
window.addEventListener('resize', updateCanvasSize);

function getTouchPos(canvas, e) {
    const rect = canvas.getBoundingClientRect();
    const touch = e.touches[0] || e.changedTouches[0];
    return {
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top
    };
}

function downFunc(e) {
    // 버튼 요소인 경우 이벤트 처리를 중단
    if (e.target.closest('.main') || 
        e.target.closest('.reset') || 
        e.target.closest('.replay') || 
        e.target.closest('.back_to_main') || 
        e.target.closest('.reward')) {
        return;
    }
    
    e.preventDefault();
    const rect = canvas.getBoundingClientRect();
    const pos = e.type.includes('touch') 
        ? getTouchPos(canvas, e) 
        : { 
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        };
    
    startX = pos.x;
    startY = pos.y;
    leftPos = pos.x;
    topPos = pos.y;
    draggable = true;
    selected = [];
    selectedWraps = [];
    selectedNum = [];
}

function moveFunc(e) {
    e.preventDefault();
    if (!draggable) return;
    
    const rect = canvas.getBoundingClientRect();
    const pos = e.type.includes('touch')
        ? getTouchPos(canvas, e)
        : {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        };
    
    let nowX = pos.x;
    let nowY = pos.y;
    
    canvasDraw(nowX, nowY);
    
    imgWraps.forEach((el) => {
        const elRect = el.getBoundingClientRect();
        const elLeft = elRect.left - rect.left;
        const elTop = elRect.top - rect.top;
        
        if ((elLeft + 20 > startX && (elLeft + elRect.width) - 20 < nowX) && 
            ((elTop + elRect.height) - 20 < nowY && elTop + 20 > startY)) {
            if (el.firstChild) {
                el.firstChild.style.backgroundImage = "url('img/peachSelected.png')";
            }
        } else if (((elLeft + elRect.width) - 20 < startX && elLeft + 20 > nowX) && 
                   (elTop + elRect.height) - 20 < startY && elTop + 20 > nowY) {
            if (el.firstChild) {
                el.firstChild.style.backgroundImage = "url('img/peachSelected.png')";
            }
        } else {
            if (el.firstChild) {
                el.firstChild.style.backgroundImage = "url('img/peach0.png')";
            }
        }
    });
    
    leftPos = nowX;
    topPos = nowY;
}

function upFunc(e) {
    e.preventDefault();
    const rect = canvas.getBoundingClientRect();
    const pos = e.type.includes('touch')
        ? getTouchPos(canvas, e)
        : {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        };
    
    endX = pos.x;
    endY = pos.y;
    draggable = false;
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    
    imgWraps.forEach((el, idx) => {
        const elRect = el.getBoundingClientRect();
        const elLeft = elRect.left - rect.left;
        const elTop = elRect.top - rect.top;
        
        if ((elLeft + 20 > startX && (elLeft + elRect.width) - 20 < endX) && 
            ((elTop + elRect.height) - 20 < endY && elTop + 20 > startY)) {
            selected.push(idx);
        } else if (((elLeft + elRect.width) - 20 < startX && elLeft + 20 > endX) && 
                   (elTop + elRect.height) - 20 < startY && elTop + 20 > endY) {
            selected.push(idx);
        }
        if (el.firstChild) {
            el.firstChild.style.backgroundImage = "url('img/peach0.png')";
        }
    });
    
    sumCheck(selected);
}

function leaveFunc(){
	draggable=false;
	ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}
function canvasDraw(currX,currY){
	ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
	ctx.strokeRect(startX, startY, currX-startX, currY-startY);
	ctx.fillRect(startX, startY, currX-startX, currY-startY);
}

function resizeGame() {
    const overlay = document.querySelector('.overlay');
    const blur = document.querySelector('.blur');
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    
    // 모바일 화면에서는 더 작은 크기로 조정
    const baseWidth = windowWidth <= 480 ? 360 : 420;
    const aspectRatio = 900/420;
    
    // 화면 너비의 90%를 사용하되 baseWidth를 넘지 않도록
    let gameWidth = Math.min(windowWidth * 0.9, baseWidth);
    let gameHeight = gameWidth * aspectRatio;
    
    // 높이가 화면을 벗어나는 경우 조정
    if (gameHeight > windowHeight * 0.9) {
        gameHeight = windowHeight * 0.9;
        gameWidth = gameHeight / aspectRatio;
    }
    
    // overlay와 blur 크기 조정
    const newStyle = {
        width: `${gameWidth}px`,
        height: `${gameHeight}px`
    };
    
    Object.assign(overlay.style, newStyle);
    if (blur) {
        Object.assign(blur.style, newStyle);
    }
    
    // 캔버스 크기는 updateCanvasSize 함수에서 처리하므로 여기서는 설정하지 않음
    // updateCanvasSize() 함수 호출하여 캔버스 크기 업데이트
    updateCanvasSize();
    
    // 복숭아 컨테이너 크기 조정 (위아래 마진 동적 계산)
    const peachContainer = document.querySelector('.peaches');
    const marginRatio = 0.05; // 위아래 각각 5%의 마진
    const totalMargin = gameHeight * (marginRatio * 2); // 위아래 마진의 총합
    peachContainer.style.width = `${gameWidth}px`;
    peachContainer.style.height = `${gameHeight - totalMargin}px`;
    peachContainer.style.marginTop = `${totalMargin / 2}px`;
    peachContainer.style.marginBottom = `${totalMargin / 2}px`;

    // 각 복숭아 이미지 크기 재조정 - 가로 10개 기준
    const peachWidth = Math.floor(gameWidth/10); // 가로 10개로 고정
    const peachHeight = Math.floor(peachWidth * 1.1);
    
    imgWraps.forEach((el, index) => {
        el.style.width = `${peachWidth}px`;
        el.style.height = `${peachHeight}px`;
        // 가로 10개씩 배치를 위한 위치 계산
        const row = Math.floor(index / 10);
        const col = index % 10;
        el.style.position = 'absolute';
        el.style.left = `${col * peachWidth}px`;
        el.style.top = `${row * peachHeight}px`;
    });
    
    // peaches 컨테이너 스타일 조정
    // peachContainer.style.padding = '20px 10px';
    peachContainer.style.position = 'relative';
    
    // 캔버스 설정 복원
    ctx.lineWidth = 1;
    ctx.strokeStyle = '#2F48D1';
    ctx.fillStyle = 'rgba(47,72,209,0.05)';
    
    // 버튼 위치 조정
    if (mainBtn && resetBtn) {
        mainBtn.style.right = `${gameWidth * 0.39}px`;
        resetBtn.style.right = `${gameWidth * 0.11}px`;
    }
}

// 초기 실행 및 리사이즈 이벤트에 연결
window.addEventListener('resize', resizeGame);
resizeGame();

const chckTouchIsOnBtnOutside = (e, btnElement) => {
    // 터치가 끝났을 때 포인터가 버튼 위에 있는지 확인
    if (!e.changedTouches || e.changedTouches.length === 0) return true;
    
    const rect = btnElement.getBoundingClientRect();
    const touch = e.changedTouches[0];
    const touchX = touch.clientX;
    const touchY = touch.clientY;
    // 터치 위치가 버튼 영역 밖이면 실행 중단
    if (touchX < rect.left || touchX > rect.right || 
        touchY < rect.top || touchY > rect.bottom) {
        return true;
    }
    return false;
}

const sumCheck=(arr)=>{
    if (arr.length == 0) return;
	for(let i=0; i<arr.length; i++){
		if(imgWraps[arr[i]].firstChild!=null){
			selectedWraps.push(imgWraps[arr[i]]);
			let n=Number(imgWraps[arr[i]].childNodes[1].innerHTML);
			selectedNum.push(n);
		}
	}
	num=selectedNum.length;
	let sum=selectedNum.reduce((a,b) => (a+b));
	if(sum==10){
		selectedWraps.forEach(el=>{
			let xpo=parseInt(getComputedStyle(el).left);
			let ypo=parseInt(getComputedStyle(el).top);
			let incX=Math.random()*6+4; //4,5,6,7,8,9
			let incY=-(Math.random()*5+7); //-7,-6,-5,-4,-3
			let direct=Math.random();
			let g=2; //중력
			if(direct<0.5){
				incX=incX;
			}else{
				incX=-incX;
			}
			let moveTimer;
			const curveMoving=()=>{
				ypo+=incY=incY+g;
				xpo+=incX;
				el.style.left=xpo+'px';
				el.style.top=ypo+'px';
				moveTimer=setTimeout(curveMoving,20);
				if(ypo>document.querySelector('.bg').offsetTop+document.querySelector('.bg').clientHeight){
					clearTimeout(moveTimer);
					el.firstChild.remove();
					el.firstChild.remove();
				}
			}
			curveMoving();
		});
		scoreNum+=num;
	}
	score.innerHTML=scoreNum;
}

mainBtn.addEventListener('click',()=>{
    if (isPending) return;
    console.log('mainBtn click');
	window.location.href='index.html';
});
mainBtn.addEventListener('touchend',(e)=>{
    if (isPending) return;
    console.log('mainBtn touchend');
	if (chckTouchIsOnBtnOutside(e, mainBtn)) return;
	
	// 이벤트 전파 방지
	e.preventDefault();
	e.stopPropagation();
	
	window.location.href='index.html';
});
// resetBtn.addEventListener('click',()=>{
// 	imgWraps.forEach(el=>{
// 		if(el.firstChild==null){
// 			const p2=document.createElement('p');
// 			const span2=document.createElement('span');
// 			el.append(p2);
// 			el.append(span2);
// 			el.style.left=0+'px';
// 			el.style.top=0+'px';
// 		}
// 	});
// 	spans=document.querySelectorAll('.img_wrap>span');
// 	spans.forEach(el=>{
// 		el.innerHTML=Math.floor(Math.random()*9+1);
// 	});
// });

function progressBar() {
    const currWidth = currTimeBar.clientWidth;
    const totalWidth = currTimeBar.parentElement.clientWidth;
    const stepWidth = totalWidth * (1/60);
    
    // width를 줄여나가는 방식으로 변경
    currTimeBar.style.width = `${(sec/60) * 100}%`;
    
    setTimeout(progressBar, 1000);
}

function countDown() {
    sec--;
    if(sec <= 0) {
        showGameOver();
    }
}

let timer=setInterval(countDown, 1000);
let progress=setTimeout(progressBar, 0);

replayBtn.addEventListener('click',()=>{
    if (isPending) return;
    window['UtilInternet'].onBeforeUnmount();
    window.location.reload();
});
replayBtn.addEventListener('touchend',(e)=>{
    if (isPending) return;
    if (chckTouchIsOnBtnOutside(e, replayBtn)) return;
    
    // 이벤트 전파 방지
    e.preventDefault();
    e.stopPropagation();
    
    window['UtilInternet'].onBeforeUnmount();
    window.location.reload();
});
backtomainBtn.addEventListener('click',()=>{
    if (isPending) return;
    window['UtilInternet'].onBeforeUnmount();
    window.location.href='index.html';
});
backtomainBtn.addEventListener('touchend',(e)=>{
    if (isPending) return;
    if (chckTouchIsOnBtnOutside(e, backtomainBtn)) return;
    
    // 이벤트 전파 방지
    e.preventDefault();
    e.stopPropagation();
    
    window['UtilInternet'].onBeforeUnmount();
    window.location.href='index.html';
});
// localClearBtn.addEventListener('click',()=>{ localStorage.clear(); });
rewardBtn.addEventListener('click',()=>{
    console.log('rewardBtn click');
    if (hasUsedReward || !window['UtilInternet'].isOnline() || !window['UtilPlatform'].chckIsApp()) return;
    // add pending evt disable all the interactive btns
    if (isPending) return;
    startLoadingAnim();
    window['UtilPlatform'].sendMsg2Parent(
        'ShowRewardVideo',
        {
            reward: () => {},
            dismiss: (isRewarded) => {
                if (!isRewarded) {
                    hasUsedReward = false;
                    stopLoadingAnim();
                    return;
                }
                continuePlayAfterReward();
            },
            error: () => {
                hasUsedReward = false;
                stopLoadingAnim();
                window.location.href ='index.html';
            }
        }
    );
});
rewardBtn.addEventListener('touchend',(e)=>{
    console.log('rewardBtn touchend');
    if (hasUsedReward || !window['UtilInternet'].isOnline() || !window['UtilPlatform'].chckIsApp()) return;
    // add pending evt disable all the interactive btns
    if (isPending) return;
    if (chckTouchIsOnBtnOutside(e, rewardBtn)) return;
    
    // 이벤트 전파 방지
    e.preventDefault();
    e.stopPropagation();
    
    startLoadingAnim();
    window['UtilPlatform'].sendMsg2Parent(
        'ShowRewardVideo',
        {
            reward: () => {},
            dismiss: (isRewarded) => {
                if (!isRewarded) {
                    hasUsedReward = false;
                    stopLoadingAnim();
                    return;
                }
                continuePlayAfterReward();
            },
            error: () => {
                hasUsedReward = false;
                stopLoadingAnim();
                window.location.href ='index.html';
            }
        }
    );
});

const showGameOver = () => {
    canvas.style.opacity = '0';
    canvas.style.visibility = 'hidden';
    canvas.style.pointerEvents = 'none';
    
    clearInterval(timer);
    clearTimeout(progress);
    blur.classList.add('active');
    if (hasUsedReward || !window['UtilInternet'].isOnline() || !window['UtilPlatform'].chckIsApp()) {
        rewardBtn.setAttribute('style', 'background: #fff; color: #787878; margin-top: 10px; pointer-events: none; user-select: none; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none;');
    }
    finalScoreNum.innerHTML = scoreNum;
    if(localStorage.getItem('bestScore') != null) {
        bestScoreNum.innerHTML = localStorage.getItem('bestScore');
    } else {
        bestScoreNum.innerHTML = scoreNum;
        localStorage.setItem('bestScore', scoreNum);
    }
    let bestScore = Number(bestScoreNum.innerHTML);
    if(scoreNum > bestScore) {
        localStorage.setItem('bestScore', scoreNum);
        bestScoreNum.innerHTML = scoreNum;
    }
};

const animateSprite = () => {
    spriteFrame = (spriteFrame + 1) % 6; // 6프레임 순환
    const posX = spriteFrame * 40; // 각 프레임의 x 위치 (48px씩 이동)
    loadingImg.style.backgroundPosition = `-${ posX }px 0`;
}

const startLoadingAnim = () => {
    isPending = true;
    loadingImg.style.display = 'block';
    spriteFrame = 0;
    spriteAnimInterval = setInterval(animateSprite, 60);
    rewardBtn.innerHTML = '';
    rewardBtn.appendChild(loadingImg);
    // set all interactive btns disabled with grey background color
    replayBtn.style.backgroundColor = '#ccc';
    replayBtn.setAttribute('disabled', 'disabled');
    backtomainBtn.style.backgroundColor = '#ccc';
    backtomainBtn.setAttribute('disabled', 'disabled');
    rewardBtn.style.backgroundColor = '#ccc';
    rewardBtn.setAttribute('disabled', 'disabled');
    // mainBtn.style.backgroundColor = '#ccc !important';
    mainBtn.setAttribute('style', 'display: none !important;');
};

const stopLoadingAnim = () => {
    isPending = false;
    loadingImg.style.display = 'none';
    clearInterval(spriteAnimInterval);
    rewardBtn.innerHTML = 'REWARD';
    // set all interactive btns enabled with original background color
    replayBtn.style.backgroundColor = '#ad9beb';
    replayBtn.removeAttribute('disabled');
    backtomainBtn.style.backgroundColor = '#ad9beb';
    backtomainBtn.removeAttribute('disabled');
    rewardBtn.style.backgroundColor = '#ad9beb';
    rewardBtn.removeAttribute('disabled');
    mainBtn.setAttribute('style', 'display: block !important;');
};

const continuePlayAfterReward = () => {
    // 리워드 보상 받았을 때의 처리
    canvas.style.opacity = '1';
    canvas.style.visibility = 'visible';
    canvas.style.pointerEvents = 'none'; // pointer-events는 여전히 none이어야 함
    
    hasUsedReward = true;
    blur.classList.remove('active');
    sec = 60;
    timer=setInterval(countDown, 1000);
    progress=setTimeout(progressBar, 0);
    stopLoadingAnim();
}

// 문서 로드 완료 후 버튼에 z-index 설정
document.addEventListener('DOMContentLoaded', () => {
    // 버튼들의 z-index를 높여서 터치 이벤트 우선순위 설정
    if (mainBtn) mainBtn.style.zIndex = "30";
    if (resetBtn) resetBtn.style.zIndex = "30";
    if (replayBtn) replayBtn.style.zIndex = "30";
    if (backtomainBtn) backtomainBtn.style.zIndex = "30";
    if (rewardBtn) rewardBtn.style.zIndex = "30";
});

window['UtilInternet'].onMounted();
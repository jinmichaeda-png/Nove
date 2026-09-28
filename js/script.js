const reviewSection = document.querySelector("#review");
const reviewSticky = document.querySelector(".review_sticky");

const reviewLeft = document.querySelector(".review_left");
const reviewRight = document.querySelector(".review_right");


// ==========================================================
// REVIEW POSITION
// ==========================================================

let targetLeftY = 0;
let targetRightY = 0;

let currentLeftY = 0;
let currentRightY = 0;

let isFirstLoad = true;


// ==========================================================
// 스크롤 위치 계산
// ==========================================================

function reviewScroll() {

    const rect = reviewSection.getBoundingClientRect();

    const sectionHeight = reviewSection.offsetHeight;

    // 실제 리뷰 화면 높이
    const viewportHeight = reviewSticky.offsetHeight;

    const scrollDistance =
        sectionHeight - window.innerHeight;

    let progress =
        -rect.top / scrollDistance;

    progress = Math.max(0, Math.min(1, progress));


    // ======================================================
    // 처음 화면에서 보이는 양
    //
    // 기존과 동일
    // 숫자가 작을수록 끝부분만 조금 보임
    // ======================================================

    const edge = 100;


    // ======================================================
    // 마지막 화면에서 남겨둘 양
    //
    // 카드 높이 600px 기준
    // 300px = 약 절반
    // ======================================================

    const endVisible = 100;


    // ======================================================
    // LEFT
    //
    // 처음 : 리뷰 1 끝부분만 보임
    // 중간 : 1 → 2 → 3
    // 마지막 : 리뷰 3 약 절반 보임
    // ======================================================

    const leftStart =
        viewportHeight - edge;

    const leftEnd =
        -(reviewLeft.scrollHeight - endVisible);

    targetLeftY =
        leftStart +
        (leftEnd - leftStart) * progress;


    // ======================================================
    // RIGHT
    //
    // 처음 : 리뷰 6 끝부분만 보임
    // 중간 : 6 → 5 → 4
    // 마지막 : 리뷰 4 약 절반 보임
    // ======================================================

    const rightStart =
        -(reviewRight.scrollHeight - edge);

    const rightEnd =
        viewportHeight - endVisible;

    targetRightY =
        rightStart +
        (rightEnd - rightStart) * progress;


    // ======================================================
    // 첫 로딩 시 위치 튐 방지
    // ======================================================

    if (isFirstLoad) {

        currentLeftY = targetLeftY;
        currentRightY = targetRightY;

        reviewLeft.style.transform =
            `translate3d(0, ${currentLeftY}px, 0)`;

        reviewRight.style.transform =
            `translate3d(0, ${currentRightY}px, 0)`;

        isFirstLoad = false;
    }
}


// ==========================================================
// 부드러운 움직임
// ==========================================================

function reviewAnimate() {

    const ease = 0.08;


    currentLeftY +=
        (targetLeftY - currentLeftY) * ease;

    currentRightY +=
        (targetRightY - currentRightY) * ease;


    reviewLeft.style.transform =
        `translate3d(0, ${currentLeftY}px, 0)`;

    reviewRight.style.transform =
        `translate3d(0, ${currentRightY}px, 0)`;


    requestAnimationFrame(reviewAnimate);
}


// ==========================================================
// EVENT
// ==========================================================

window.addEventListener("scroll", reviewScroll);

window.addEventListener("resize", reviewScroll);


// ==========================================================
// START
// ==========================================================

reviewScroll();

reviewAnimate();








const instagramTrack = document.querySelector('.instagram_track');
const instagramGroup = document.querySelector('.instagram_group');

let x = 0;
const speed = 1;

const clone = instagramGroup.cloneNode(true);
clone.setAttribute('aria-hidden', 'true');

instagramTrack.appendChild(clone);

function instagramSlide() {
    x -= speed;

    if (Math.abs(x) >= instagramGroup.offsetWidth) {
        x = 0;
    }

    instagramTrack.style.transform = `translateX(${x}px)`;

    requestAnimationFrame(instagramSlide);
}

instagramSlide();
const popupLinks = document.querySelectorAll('.button');
const body = document.querySelector('body');
const lockPadding = document.querySelectorAll('.lock-padding');

let unlock = true;

const timeOut = 800;

if (popupLinks.length > 0) {
    for (let index = 0; index < popupLinks.length; index++) {
        const popupLink = popupLinks[index];
        popupLink.addEventListener("click", function (e) {
            const popupName = popupLink.getAttribute('href').replace('#', '');
            const curentPopup = document.getElementById(popupName);
            popupOpen(curentPopup);
            e.preventDefault();
        });
    }
}

const popupCloseIcon = document.querySelectorAll('.close-popup');
if (popupCloseIcon.length > 0) {
    for (let index = 0; index < popupCloseIcon.length; index++) {
        const el = popupCloseIcon[index];
        el.addEventListener('click', function (e) {
            popupClose(el.closest('.main__popup'));
            e.preventDefault();
        });
    }
}

function popupOpen(curentPopup) {
    if (curentPopup && unlock) {
        const popupActive = document.querySelector('.main__popup.main__popup_active');
        if (popupActive) {
            popupClose(popupActive, false);
        } else {
            bodyLock();
        }
        curentPopup.classList.add('main__popup_active');
        curentPopup.addEventListener("click", function (e) {
            if (!e.target.closest('.popup__wrap')) {
                popupClose(e.target.closest('.main__popup'))
            }
        });
    }
}

function popupClose(popupActive, doUnlock = true) {
    if (unlock) {
        popupActive.classList.remove('main__popup_active');
        if (doUnlock) {
            bodyUnlock();
        }
    }
}

function bodyLock() {
    const lockPaddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';

    for (let index = 0; index < lockPadding.length; index++) {
        const el = lockPadding[index];
        el.style.paddingRight = lockPaddingValue;
    }
    body.style.paddingRight = lockPaddingValue;
    body.classList.add('lock');

    unlock = false;
    setTimeout(function () {
        unlock = true;
    }, timeOut);
}

function bodyUnlock() {
    setTimeout(function () {
        for (let index = 0; index < lockPadding.length; index++) {
            const el = lockPadding[index];
            el.style.paddingRight = '0px';
        }
        body.style.paddingRight = '0px';
        body.classList.remove('lock');
    }, timeOut);

    unlock = false;
    setTimeout(function () {
        unlock = true;
    }, timeOut);
}

document.addEventListener('keydown', function (e) {
    if (e.which === 27) {
        const popupActive = document.querySelector('.main__popup_active');
        popupClose(popupActive);
    }
});
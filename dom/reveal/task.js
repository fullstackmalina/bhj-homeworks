let discloseQuestions = document.querySelectorAll('.reveal');

document.addEventListener('scroll', function () {
    const viewportHeight = window.innerHeight;

    Array.from(discloseQuestions).forEach(el => {
        const elementTop = el.getBoundingClientRect().top;
        if (elementTop < viewportHeight) {
            el.classList.add('reveal_active');
        } else {
            el.classList.remove('reveal_active');
        }
    }
    )
})
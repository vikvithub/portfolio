$(document).ready(function () {
    gsap.set('.gsap-moving-right', { opacity: 1, x: 0 });
    gsap.from('.gsap-moving-right', 1.5, { opacity: 0, x: -40, ease: 'power1.out' });

    gsap.set('.gsap-moving-infinity', { opacity: 1, x: 0 });
    gsap.from('.gsap-moving-infinity', 1.5, { opacity: 0, x: -40, ease: 'power1.out' });

    var controller = new ScrollMagic.Controller();
    $('.gsap-moving-corner').each(function () {
        var tween = gsap.from($(this), 1.5, {
            y: 100,
            skewY: 7,
            opacity: 0,
            ease: 'power4.out',
        });
        var scene = new ScrollMagic.Scene({
            triggerElement: this,
            triggerHook: 'onEnter',
        })
            .setTween(tween)
            .addTo(controller);
    });

    var once_play = false;
    gsap.set('.stag', { opacity: 0 });
    function onHoverNext(event) {
        if (once_play === false) {
            once_play = true;
            random = [];
            document
                .querySelectorAll('#to_next_proj span')
                .forEach((x) => random.push(x));
            random.sort(function () {
                return 0.5 - Math.random();
            });
            TweenMax.staggerTo(
                random,
                0.4,
                { opacity: 0, ease: 'power2.in' },
                0.05,
                allDoneNext
            );
            gsap.to('.next__subtitle', 0.4, {
                x: (document.getElementById('nom_project').clientWidth + 10) / 2 + 'px',
                delay: 0.4,
                ease: 'power2.out',
            });
            TweenMax.staggerTo(
                '.stag',
                0.4,
                { opacity: 1, delay: 0.4, ease: 'power2.out' },
                -0.02
            );
        }
    }

    function allDoneNext() {
        document.getElementById('to_next_proj').innerHTML = document
            .getElementById('to_next_proj')
            .getAttribute('data-next');
        gsap.set('#to_next_proj span', { opacity: 0 });

        random = [];
        document
            .querySelectorAll('#to_next_proj span')
            .forEach((x) => random.push(x));
        random.sort(function () {
            return 0.5 - Math.random();
        });

        TweenMax.staggerTo(random, 0.4, { opacity: 1, ease: 'power2.out' }, 0.05);
    }
    function offHoverNext(event) {
        if (once_play === true) {
            once_play = false;

            random = [];
            document
                .querySelectorAll('#to_next_proj span')
                .forEach((x) => random.push(x));
            random.sort(function () {
                return 0.5 - Math.random();
            });
            TweenMax.staggerTo(
                random,
                0.4,
                { opacity: 0, ease: 'power2.in' },
                0.05,
                allDoneNext2
            );
        }
    }

    function allDoneNext2() {
        document.getElementById('to_next_proj').innerHTML =
            '<span>N</span><span>e</span><span>x</span><span>t</span>';
        gsap.set('#to_next_proj span', { opacity: 0 });

        random = [];
        document
            .querySelectorAll('#to_next_proj span')
            .forEach((x) => random.push(x));
        random.sort(function () {
            return 0.5 - Math.random();
        });

        TweenMax.staggerTo(random, 0.4, { opacity: 1, ease: 'power2.out' }, 0.05);
        gsap.to('.next__subtitle', 0.4, { x: '0px', ease: 'power2.out' });
        TweenMax.staggerTo(
            '.stag',
            0.4,
            { opacity: 0, ease: Power2.easeOut },
            0.02
        );
    }
    $('#to_next_proj').hover(
        function () {
            onHoverNext(event);
        },
        function () {
            offHoverNext(event);
        }
    );
    $('#to_next_proj').click(function (event) {
        event.preventDefault();
        var href = $(this).attr('href');
        animatePage(href);
    });

    gsap.from('.next', 1, {
        opacity: 0,
        ease: 'power2.inOut',
        delay: 1,
    });

    const animatePage = (href) => {
        gsap.to('.next', 2.5, {
            y: -800,
            ease: 'power2.out',
        });
        gsap.to('.next__heading', 2.5, {
            y: 800,
            ease: 'power2.out',
        });
        gsap.to('.next__heading', 0.4, {
            opacity: 0,
            ease: 'power2.out',
            delay: 2,
            onComplete: function () {
                window.location.href = href;
            },
        });
    };
});

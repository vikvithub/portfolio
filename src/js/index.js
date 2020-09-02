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
});

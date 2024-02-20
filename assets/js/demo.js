/**
 * demo.js
 *
 * Licensed under the MIT license.
 * https://opensource.org/license/mit/
 * 
 * Copyright 2023, WANNABEDEV
 * https://wannabedev.io
 */

const initializeRocketAnimation = () => {
  // Initialize variables
  const rocketTimelineStepFirst = gsap.timeline({ paused: true }),
        rocketTimelineStepSecond = gsap.timeline({ paused: true }),
        rocketTimelineStepLaunch = gsap.timeline({ paused: true }),
        animatedRocket = document.querySelector('.animated-rocket'),
        rocketHolder = document.querySelector('.rocket-holder'),
        formHolder = document.querySelector('.form-holder'),
        line = document.querySelector('.dashed-line'),
        icon = document.querySelectorAll('.icon'),
        form = document.querySelector('form'),
        animatedBCG = document.querySelector('.animated-bcg'),
        progressHolder = document.querySelector('.progress-holder'),
        success = document.querySelector('.success'),
        message = document.querySelector('.message'),
        point = document.querySelector('.point'),
        time = 0.75;

  let fullnameHasValue = false,
      emailHasValue = false;

  // Simple validation function
  const validate = () => {
    const myInputs = document.querySelectorAll("input:not([type='submit'])");
    const inputsWithValues = [...myInputs].filter(input => input.value).length;
    document.querySelector("input[type=submit]").disabled = inputsWithValues !== myInputs.length;
  };

  validate();
  document.querySelectorAll('input').forEach(input => {
    input.addEventListener('change', validate);
    input.addEventListener('keyup', validate);
    input.addEventListener('paste', validate);
  });

  // Fire animation
  const RocketFire = () => {
    const fireTimeline = gsap.timeline();
    fireTimeline
      .to(".fire-1", { duration: 0.75, y: () => Random(-4, 4), rotation: () => Random(-2, 2), ease: 'sine.inOut', onComplete: RocketFire })
      .to(".fire-2", { duration: 0.75, y: () => Random(-10, 6), rotation: () => Random(-2, 2), ease: 'sine.inOut', onComplete: RocketFire });
  };

  // Random function
  const Random = (max, min) => Math.random() * (max - min) + min;

  // Rocket animations - step #1
  rocketTimelineStepFirst
    .to(rocketHolder, { duration: time, y: -64, ease: 'back.out(1.7)' })
    .to(line, { duration: time, height: '192px', ease: 'back.out(1.7)' }, `-=${time}`)
    .to(icon, { duration: time, x: () => Random(-64, 64), y: () => Random(-64, 64), rotation: () => Random(-16, 16), stagger: `-=${time}` }, `-=${time}`);

  // Rocket animations - step #2
  rocketTimelineStepSecond
    .to(rocketHolder, { duration: time, y: -128, ease: 'back.out(1.7)' })
    .to(line, { duration: time, height: '256px', ease: 'back.out(1.7)' }, `-=${time}`)
    .to(icon, { duration: time, x: () => Random(-128, 128), y: () => Random(-128, 128), rotation: () => Random(-16, 16), stagger: `-=${time}` }, `-=${time}`);

  // Rocket animations - launch
  rocketTimelineStepLaunch
    .to(rocketHolder, { duration: time * 2, y: -2192, ease: 'back.out(1.7)' })
    .to(line, { duration: time, height: '2256px', ease: 'back.out(1.7)' }, `-=${time * 2}`)
    .to(icon, { duration: time, x: () => Random(-2048, 2048), y: () => Random(-2048, 2048), rotation: () => Random(-16, 16), stagger: `-=${time * 2}` }, `-=${time * 2}`)
    .to(form, { duration: time, autoAlpha: 0, ease: 'power4.out' }, `-=${time * 2}`)
    .to(animatedRocket, { duration: time, autoAlpha: 0, ease: 'power4.out' }, `-=${time * 2}`)
    .to(animatedBCG, { duration: time, width: '100%', ease: 'power4.out' })
    .to(animatedBCG, { duration: time, zIndex: '12', ease: 'power4.out' })
    .set(formHolder, { className: '+=mobile-helper' })
    .to(formHolder, { duration: time, width: '0%', ease: 'power4.out' }, `-=${time * 2}`)
    .to(progressHolder, { duration: time, autoAlpha: 1, width: '100%', ease: 'power4.out' }, `-=${time * 2}`)
    .to(success.querySelector('img'), { duration: time, margin: 'auto', ease: 'power4.out' }, `-=${time}`)
    .to(message, { duration: time, autoAlpha: 1, ease: 'power4.out' }, `-=${time}`)
    .to(point, { duration: time, autoAlpha: 1, y: -92, ease: 'power4.out' }, `-=${time}`);

  // Change value of the first input
  document.getElementById("fullname").addEventListener("input", function () {
    if (this.value) {
      if (emailHasValue) {
        rocketTimelineStepSecond.play();
      } else {
        rocketTimelineStepFirst.play();
      }
      fullnameHasValue = true;
    } else {
      if (emailHasValue) {
        rocketTimelineStepSecond.reverse();
      } else {
        rocketTimelineStepFirst.reverse();
      }
      fullnameHasValue = false;
    }
  });

  // Change value of the second input
  document.getElementById("email").addEventListener("input", function () {
    if (this.value) {
      if (fullnameHasValue) {
        rocketTimelineStepSecond.play();
      } else {
        rocketTimelineStepFirst.play();
      }
      emailHasValue = true;
    } else {
      rocketTimelineStepSecond.reverse();
      if (fullnameHasValue) {
        rocketTimelineStepSecond.reverse();
      } else {
        rocketTimelineStepFirst.reverse();
      }
      emailHasValue = false;
    }
  });

  // Submit
  document.querySelector('.submit-btn').addEventListener('click', function (e) {
    e.preventDefault();
    rocketTimelineStepLaunch.play();
  });
};

// Run the function when the DOM is ready
document.addEventListener('DOMContentLoaded', initializeRocketAnimation);

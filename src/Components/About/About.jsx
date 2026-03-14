import PhysicsText from '../Animation/PhysicsText';
import RevealLines from '../Animation/RevealLines';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import './style.scss';
import { useEffect, useRef } from 'react';
import useTitleAnimation from '../Animation/useTitleAnimation';

gsap.registerPlugin(ScrollTrigger);

const smoothScrollToId = (id) => {
  const scroller =
    window.innerWidth < 1100
      ? document.querySelector('.scroll-container')
      : window;

  const target = document.getElementById(id);
  if (!target) return;

  const headerEl = document.querySelector('.header');
  const offsetY = headerEl ? headerEl.offsetHeight : 0;

  gsap.to(scroller, {
    duration: 0.8,
    ease: 'power3.out',
    scrollTo: { y: target, offsetY, autoKill: true },
    overwrite: 'auto',
  });
};

const About = () => {
  let wrapperRef = useRef(null);
  useTitleAnimation();

  const handleContactClick = (e) => {
    e.preventDefault();
    smoothScrollToId('footer');
  };

  useEffect(() => {
    gsap.to('.about-first-top span', {
      yPercent: 100,
      stagger: 0.1,
      scrollTrigger: {
        trigger: '.about__wrapper',
        start: 'top -150%',
        end: 'top -200%',
        scrub: 1,
        scroller: window.innerWidth < 1100 ? '.scroll-container' : null,
      },
    });
    gsap.to('.about-second-title', {
      opacity: 1,
      stagger: 0.1,
      scrollTrigger: {
        trigger: '.about__wrapper',
        start: 'top -220%',
        end: 'top -240%',
        scrub: 1,
        scroller: window.innerWidth < 1100 ? '.scroll-container' : null,
      },
    });

    gsap.to('.about-second__top>h4>span', {
      y: 0,
      scrollTrigger: {
        trigger: '.about__wrapper',
        start: 'top -200%',
        end: 'top -250%',
        scrub: 1,
        scroller: window.innerWidth < 1100 ? '.scroll-container' : null,
      },
    });

    gsap.to('.text-first__img>img', {
      y: 0,
      scrollTrigger: {
        trigger: '.about__wrapper',
        start: 'top -200%',
        end: 'top -300%',
        scrub: 1,
        scroller: window.innerWidth < 1100 ? '.scroll-container' : null,
      },
      clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
      scale: 1,
    });

    const lines = gsap.utils.toArray('.text-first__text-wrapper > span');
    gsap.to(lines.reverse(), {
      y: 0,
      rotate: 0,
      duration: 1,
      stagger: 0.2,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.about__wrapper',
        start: 'top -200%',
        end: 'top -300%',
        scrub: true,
        scroller: window.innerWidth < 1100 ? '.scroll-container' : null,
      },
    });

    const linesSecond = gsap.utils.toArray('.text-second__text-wrapper > span');
    gsap.to(linesSecond.reverse(), {
      y: 0,
      rotate: 0,
      duration: 1,
      stagger: 0.2,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.about__wrapper',
        start: 'top -240%',
        end: 'top -300%',
        scrub: true,
        scroller: window.innerWidth < 1100 ? '.scroll-container' : null,
      },
    });

    gsap.to('.text-second h3', {
      opacity: 1,
      scrollTrigger: {
        trigger: '.about__wrapper',
        start: 'top -240%',
        end: 'top -300%',
        scrub: 1,
        scroller: window.innerWidth < 1100 ? '.scroll-container' : null,
      },
    });

    if (window.innerWidth > 1100) {
      gsap.to('.text-third__img img', {
        scrollTrigger: {
          trigger: '.text-third__img',
          start: 'top -250%',
          end: 'top -320%',
          scrub: 1,
          scroller: window.innerWidth < 1100 ? '.scroll-container' : null,
        },
        clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
        scale: 1,
        stagger: 0.2,
      });
    }

    if (window.innerWidth < 1100) {
      gsap.to('.about-mobile-text', {
        opacity: 1,
        scrollTrigger: {
          trigger: '.about-mobile-text',
          start: 'top -150%',
          end: 'top -200%',
          scrub: true,
          scroller: window.innerWidth < 1100 ? '.scroll-container' : null,
        },
      });
      gsap.to('.about-second-title', {
        opacity: 1,
        scrollTrigger: {
          trigger: '.about-second-title',
          start: 'top -150%',
          end: 'top -200%',
          scrub: true,
          scroller: window.innerWidth < 1100 ? '.scroll-container' : null,
        },
      });
    }
  }, []);

  return (
    <>
      <section
        className='about'
        id='about'>
        <h2 className='about-title animation-title'>about me</h2>
        <div
          className='about__wrapper'
          ref={wrapperRef}>
          <div className='container'>
            <div className='about-first__wrapper'>
              <div className='about-first-top'>
                <p>
                  <span>2/5</span>
                </p>
                <p>
                  <span>for me</span>
                </p>
                <p>
                  <span>dsgn/2</span>
                </p>
              </div>
              <div className='about-first-middle'>
                <PhysicsText />
              </div>
            </div>

            <div className='about-second__wrapper'>
              <div className='about-second__top'>
                <h4>
                  <span>about me</span>
                </h4>
                <div className='about-second-text text-first'>
                  <div className='text-first__img'>
                    <img
                      src='./img/olha3.jpg'
                      alt=''
                    />
                  </div>
                  <p className='text-first__text'>
                    <span className='text-first__text-wrapper'>
                      <span>Hello!</span>
                    </span>
                    <span className='text-first__text-wrapper'>
                      <span>I’m Draco Nguyen</span>
                    </span>
                  </p>
                </div>

                <div className='about-second-text text-second'>
                  <h3>
                    my experience
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='21'
                      height='21'
                      viewBox='0 0 21 21'
                      fill='none'>
                      <path
                        d='M1.81213 19.1203L19.4395 1.43779M5.76584 1.24781L19.6484 1.2279L19.6922 15.1104'
                        stroke='#aaaaaa'
                        strokeWidth='2'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                      />
                    </svg>
                  </h3>
                  <div className='text-second__text'>
                    {window.innerWidth > 1100 ? (
                      <>
                        <span className='text-second__text-wrapper'>
                          <span>a Senior UX/UI Designer with over 7</span>
                        </span>
                        <span className='text-second__text-wrapper'>
                          <span>years of experience in creating digital</span>
                        </span>
                        <span className='text-second__text-wrapper'>
                          <span>products for international companies.</span>
                        </span>
                      </>
                    ) : (
                      <p className='about-mobile-text'>
                        a Senior UX/UI Designer with over 5 years of experience
                        in creating digital products for international
                        companies.
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className='about-second-title'>
                <h2>
                  It’s not just a<br />
                  profession &thinsp; - &thinsp; it’s a way
                  <br />
                  of thinking.
                </h2>
              </div>
              <div className='about-second-text text-first abs-t'>
                {window.innerWidth > 1100 ? (
                  <RevealLines
                    lines={[
                      'My work is part of my lifestyle. As',
                      'a UX/UI designer, I am constantly',
                      'observing the world: I notice how',
                      'people interact with space,',
                      'technology, objects.',
                    ]}
                  />
                ) : (
                  <p className='anim-sec'>
                    My work is part of my lifestyle. As a UX/UI designer, I am
                    constantly observing the world: I notice how people interact
                    with space, technology, objects.
                  </p>
                )}
              </div>
              <div className='about-second-text text-second ast-s'>
                <h3>
                  my philosophy
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='21'
                    height='21'
                    viewBox='0 0 21 21'
                    fill='none'>
                    <path
                      d='M1.81213 19.1203L19.4395 1.43779M5.76584 1.24781L19.6484 1.2279L19.6922 15.1104'
                      stroke='#aaaaaa'
                      strokeWidth='2'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                  </svg>
                </h3>
                <>
                  {window.innerWidth > 1100 ? (
                    <RevealLines
                      lines={[
                        'I value clarity, meaning, and',
                        'functionality — both in design and in',
                        'life. I am close to the idea of',
                        '​​conscious minimalism: leaving only what',
                        'makes sense and works for results.',
                        'I love simple interfaces with deep',
                        'meaning — as well as simple things that',
                        'bring true pleasure.',
                      ]}
                    />
                  ) : (
                    <p className='anim-sec'>
                      I value clarity, meaning, and functionality — both in
                      design and in life. I am close to the idea of ​​conscious
                      minimalism: leaving only what makes sense and works for
                      results. I love simple interfaces with deep meaning — as
                      well as simple things that bring true pleasure.
                    </p>
                  )}
                </>
              </div>
              <div className='about-second-text text-third'>
                <div className='text-third__wrapper'>
                  {window.innerWidth > 1100 ? (
                    <>
                      <div className='text-third__img'>
                        <img
                          src='./img/olha.jpg'
                          alt=''
                        />
                      </div>
                      <div className='text-third__img'>
                        <img
                          src='./img/olha2.jpg'
                          alt=''
                        />
                      </div>
                    </>
                  ) : null}
                  <div className='text-third__title'>
                    <h3>
                      my lifestyle
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='21'
                        height='21'
                        viewBox='0 0 21 21'
                        fill='none'>
                        <path
                          d='M1.81213 19.1203L19.4395 1.43779M5.76584 1.24781L19.6484 1.2279L19.6922 15.1104'
                          stroke='#aaaaaa'
                          strokeWidth='2'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                        />
                      </svg>
                    </h3>
                    <>
                      {window.innerWidth > 1100 ? (
                        <RevealLines
                          lines={[
                            'I look for aesthetics everywhere:',
                            'in the forms of nature, in the',
                            'details of architecture, in the',
                            'colors of city streets, and even',
                            'in the simple things of everyday.',
                            'life. It`s not just a hobby - ',
                            "it's a way of seeing the world.",
                          ]}
                        />
                      ) : (
                        <p className='anim-sec'>
                          I look for aesthetics everywhere: in the forms of
                          nature, in the details of architecture, in the colors
                          of city streets, and even in the simple things of
                          everyday life. It's not just a hobby - it's a way of
                          seeing the world.
                        </p>
                      )}
                    </>
                  </div>
                </div>
              </div>
              {window.innerWidth > 1100 ? (
                <div className='about-second-text text-four'>
                  <a
                    href='#footer'
                    onClick={handleContactClick}
                    className='link-line about-link'>
                    lets contact
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='21'
                      height='21'
                      viewBox='0 0 21 21'
                      fill='none'>
                      <path
                        d='M1.81213 19.1203L19.4395 1.43779M5.76584 1.24781L19.6484 1.2279L19.6922 15.1104'
                        stroke='#aaaaaa'
                        strokeWidth='2'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                      />
                    </svg>
                  </a>
                  <p>
                    <RevealLines
                      lines={[
                        'Every project for me is more than',
                        "a task. It's a story that I help",
                        'tell through design.',
                        'I believe that a good interface',
                        'is not just about colors and',
                        'fonts, but about the feelings it',
                        'evokes.',
                      ]}
                    />
                  </p>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;

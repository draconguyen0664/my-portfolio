import React, { useState, useEffect } from 'react';
import useTitleAnimation from '../Animation/useTitleAnimation';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import './style.scss';

gsap.registerPlugin(ScrollTrigger);

const ServicesSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [isDesktop, setIsDesktop] = useState(false);
  useTitleAnimation();

  useEffect(() => {
    gsap.to('.services-block', {
      scrollTrigger: {
        trigger: '.services',
        start: 'top 20%',
        scroller: window.innerWidth < 1100 ? '.scroll-container' : null,
      },
      opacity: 1,
      duration: 1.5,
      stagger: 0.1,
    });
  }, []);

  useEffect(() => {
    const checkWidth = () => setIsDesktop(window.innerWidth > 768);
    checkWidth();
    window.addEventListener('resize', checkWidth);
    return () => window.removeEventListener('resize', checkWidth);
  }, []);

  const handleClick = (i) => {
    if (!isDesktop) {
      setActiveIndex(activeIndex === i ? null : i);
    }
  };

  const blocks = [
    {
      number: '00-1',
      title: 'web design',
      secondTitle: '// web design',
      list: [
        '/ Modern layouts',
        '/ Responsive design',
        '/ SEO-friendly structure',
        '/ Clear navigation',
        '/ Visual storytelling',
      ],
      img: './services-img1.jpg',
      text: 'I create websites that stand out from the competition and bring real value to businesses. Each project combines creativity and functionality to deliver the best digital solutions.',
    },

    {
      number: '00-2',
      title: 'UX/UI design',
      secondTitle: '// UX/UI design',
      list: [
        '/ User flows',
        '/ Wireframes & flows',
        '/ Interactive prototypes',
        '/ Design system',
      ],
      img: './services-img2.jpg',
      text: 'I design interfaces that balance logic and emotion. They are intuitive from the first click, easy to use, and keep users engaged — helping brands build stronger connections.',
    },
    {
      number: '00-3',
      title: 'Creative design',
      secondTitle: '// Creative design',
      list: ['/ Visual design', '/ Social media design', '/ presentation'],
      img: './services-img3.jpg',
      text: 'My creative design is about visuals that speak for the brand. From eye-catching social media and stylish presentations to thoughtful visual concepts — everything is designed to inspire, connect, and deliver the best digital solutions.',
    },

    {
      number: '00-4',
      title: 'product and app design',
      secondTitle: '// product and app design',
      list: [
        '/ Mobile & web apps',
        '/ Design systems',
        '/ Complex interactions',
        '/ Scalable solutions',
      ],
      img: './services-img4.jpg',
      text: 'Product and app design focused on simplicity, consistency, and growth — crafted to deliver the best digital solutions.',
    },

    {
      number: '00-5',
      title: 'development',
      secondTitle: '// development',
      list: [
        '/ Front-end',
        '/ Back-end',
        '/ No-code solutions',
        '/ Optimization',
        '/ Support',
      ],
      img: './services-img5.jpg',
      text: 'Full-cycle development with the best experts — from front-end to back-end. We deliver turnkey projects that are reliable, scalable, and built to last.',
    },
  ];

  return (
    <section
      className='services'
      id='services'>
      <div className='container'>
        <div className='services__title'>
          <h2 className='animation-title'>services</h2>
          <div className='services__title-span'>
            <span>dsgn/4</span>
          </div>
        </div>
      </div>
      <div
        className='services__wrapper'
        onMouseLeave={() => setActiveIndex(null)}>
        {blocks.map((block, i) => (
          <div
            key={i}
            className={`services-block ${!isDesktop ? 'mobile' : ''}`}
            style={
              isDesktop
                ? {
                    width:
                      activeIndex === null
                        ? '384rem'
                        : activeIndex === i
                        ? '730rem'
                        : '300rem',
                  }
                : {
                    maxHeight: activeIndex === i ? '1000px' : '55px',
                    background: activeIndex === i ? undefined : '#f5f5f5',
                  }
            }
            onMouseEnter={() => isDesktop && setActiveIndex(i)}
            onClick={() => handleClick(i)}>
            <h4
              className='services-block__number'
              style={{
                opacity: !isDesktop && activeIndex !== i ? 1 : undefined,
              }}>
              {block.number}
            </h4>

            <h3
              className='services-block__title'
              style={{
                transform:
                  !isDesktop && activeIndex !== i
                    ? 'translate(0, 4px)'
                    : undefined,
              }}>
              <span>{block.title}</span>
            </h3>

            <h3 className='services-block__second-title'>
              <span>
                <span>//</span> {block.title}
              </span>
            </h3>

            <div className='services-block__second-middle'>
              <ul className='services-block__list'>
                {block.list.map((item, idx) => (
                  <li key={idx}>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className='services-block__img'>
                <img
                  src={block.img}
                  alt={block.title}
                />
              </div>
            </div>

            <p className='services-block__text'>{block.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ServicesSection;

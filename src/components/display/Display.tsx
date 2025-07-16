// components/Display.tsx
import React, { useEffect, useRef, useState } from 'react';
import { ChefHat, Sparkles } from 'lucide-react';

const imageData = [
  { src: '/src/assets/foods/arancini.jpg', description: 'Arancini - Fried rice balls stuffed with cheese.' },
  { src: '/src/assets/foods/bruschetta.jpg', description: 'Bruschetta - Grilled bread with tomatoes and basil.' },
  { src: '/src/assets/foods/burger.jpg', description: 'Burger - Juicy beef burger with fresh toppings.' },
  { src: '/src/assets/foods/calamari.jpg', description: 'Calamari - Crispy fried squid rings.' },
  { src: '/src/assets/foods/cheesecake.jpg', description: 'Cheesecake - Creamy dessert with a graham cracker crust.' },
  { src: '/src/assets/foods/coffee.jpg', description: 'Coffee - Rich espresso with a smooth crema.' },
  { src: '/src/assets/foods/craft-beer.jpg', description: 'Craft Beer - Locally brewed golden ale.' },
  { src: '/src/assets/foods/fruit-tart.jpg', description: 'Fruit Tart - Fresh fruits over a creamy custard base.' },
  { src: '/src/assets/foods/lava-cake.jpg', description: 'Lava Cake - Warm chocolate cake with molten center.' },
  { src: '/src/assets/foods/padthai.jpg', description: 'Pad Thai - Stir-fried rice noodles with peanuts and lime.' },
  { src: '/src/assets/foods/risotto.jpg', description: 'Risotto - Creamy Italian rice with parmesan.' },
  { src: '/src/assets/foods/salmon.jpg', description: 'Salmon - Grilled salmon fillet with herbs.' },
  { src: '/src/assets/foods/smoothie.jpg', description: 'Smoothie - Mixed berry smoothie with almond milk.' },
  { src: '/src/assets/foods/steak.jpg', description: 'Steak - Perfectly seared ribeye steak.' },
  { src: '/src/assets/foods/tiramisu.jpg', description: 'Tiramisu - Italian layered coffee dessert.' },
  { src: '/src/assets/foods/wine.jpg', description: 'Wine - Fine red wine served at cellar temperature.' },
  { src: '/src/assets/foods/wings.jpg', description: 'Wings - Spicy buffalo chicken wings.' }
];

const Display: React.FC = () => {
  const [degrees, setDegrees] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setDegrees((prev) => prev - 45);
      setCurrentIndex((prev) => (prev + 1) % imageData.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (boxRef.current) {
      boxRef.current.style.transform = `perspective(1000px) rotateY(${degrees}deg)`;
    }
  }, [degrees]);

  const handleNext = () => {
    setDegrees((d) => d - 45);
    setCurrentIndex((i) => (i + 1) % imageData.length);
  };

  const handlePrev = () => {
    setDegrees((d) => d + 45);
    setCurrentIndex((i) => (i - 1 + imageData.length) % imageData.length);
  };

  const containerStyle: React.CSSProperties = {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  };

  const boxStyle: React.CSSProperties = {
    width: '200px',
    height: '200px',
    position: 'relative',
    transformStyle: 'preserve-3d',
    transform: `perspective(1000px) rotateY(${degrees}deg)`,
    transition: 'transform 1.5s'
  };

  const btnsStyle: React.CSSProperties = {
    position: 'absolute',
    bottom: '-100px',
    left: '50%',
    transform: 'translateX(-50%)',
    display: 'flex',
    gap: '30px'
  };

  const btnStyle: React.CSSProperties = {
    width: '60px',
    height: '60px',
    border: '2px solid #fff',
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    position: 'relative'
  };

  const arrowBase: React.CSSProperties = {
    content: "''",
    position: 'absolute',
    width: '15%',
    height: '15%',
    borderTop: '3px solid #fff',
    borderRight: '3px solid #fff'
  };

  const nextArrow = {
    ...arrowBase,
    transform: 'rotate(45deg) translate(-2.5px, 2.5px)'
  };

  const prevArrow = {
    ...arrowBase,
    transform: 'rotate(225deg) translate(-2.5px, 2.5px)'
  };

  const descriptionStyle: React.CSSProperties = {
    marginTop: '40px',
    padding: '20px',
    maxWidth: '400px',
    textAlign: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    borderRadius: '10px',
    fontSize: '1.1rem',
    fontWeight: 'bold',
    color: '#333'
  };

  return (
    <div
      className="w-full px-4"
      style={{
        margin: 0,
        padding: 0,
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minHeight: '100vh',
        background: `url('src/assets/back/back.jpg') no-repeat center center`,
        backgroundSize: 'cover',
        transformStyle: 'preserve-3d',
        overflow: 'hidden'
      }}
    >
      {/* Intro Section */}
      <div className="text-center mb-8 sm:mb-12 mt-10 animate-fade-in-up">
        <div className="flex items-center justify-center gap-3 mb-6">
          <ChefHat className="w-8 h-8 text-accent" />
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-blue-600 tracking-tight">
            Culinary Showcase
          </h1>
          <Sparkles className="w-8 h-8 text-red-700 animate-pulse" />
        </div>
        <p className="text-white sm:text-lg text-muted-foreground max-w-md mx-auto font-body font-light leading-relaxed">
          A display of our finest dishes, crafted with passion and presented with elegance
        </p>
      </div>

      {/* Carousel Section */}
      <div style={containerStyle}>
        <div ref={boxRef} style={boxStyle}>
          {imageData.map((item, i) => (
            <span
              key={i}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                transformOrigin: 'center',
                transformStyle: 'preserve-3d',
                transform: `rotateY(${(i + 1) * 45}deg) translateZ(300px)`,
                WebkitBoxReflect: 'below 0px linear-gradient(transparent, #0004)'
              }}
            >
              <img
                src={item.src}
                alt={item.description}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  userSelect: 'none'
                }}
              />
            </span>
          ))}
        </div>

        {/* Buttons */}
        <div style={btnsStyle}>
          <div style={btnStyle} onClick={handlePrev}>
            <div style={prevArrow}></div>
          </div>
          <div style={btnStyle} onClick={handleNext}>
            <div style={nextArrow}></div>
          </div>
        </div>

        {/* Description */}
        <div style={descriptionStyle}>
          {imageData[currentIndex].description}
        </div>
      </div>
    </div>
  );
};

export default Display;

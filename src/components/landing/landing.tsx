import type { ReactElement } from 'react';
import { useState, useEffect } from 'react';
import { Navbar, Hero, Footer } from '../../site-pages/landing/index';
import Loading from '../../site-pages/landing/.lo@ding/loading';

function Landing(): ReactElement {
  const [isLoading, setIsLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    
    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
    }, 9500);

    
    const loadTimer = setTimeout(() => {
      setIsLoading(false);
    }, 10000);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(loadTimer);
    };
  }, []);

  if (isLoading) {
    return (
      <div
        style={{
          opacity: fadeOut ? 0 : 1,
          transition: 'opacity 0.5s ease-out',
        }}
      >
        <Loading />
      </div>
    );
  }

  return (
    <main
      style={{
        animation: 'fadeIn 0.5s ease-in',
      }}
    >
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
      <Navbar />
      <Hero />
      <Footer />
    </main>
  );
}

export default Landing;

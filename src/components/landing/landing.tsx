import type { ReactElement } from 'react';
import { Navbar, Hero, Footer } from '../../site-pages/landing/index';

function Landing(): ReactElement {
  return (
    <main>
      <Navbar />
      <Hero />
      <Footer />
    </main>
  );
}

export default Landing;

import React from 'react';
import PageWrapper from '../components/PageWrapper';
import Hero from '../components/Hero';
import About from '../components/About';
import Ecosystem from '../components/Ecosystem';
import CTA from '../components/CTA';

export default function HomePage() {
  return (
    <PageWrapper>
      <Hero />
      <About />
      <Ecosystem />
      <CTA />
    </PageWrapper>
  );
}

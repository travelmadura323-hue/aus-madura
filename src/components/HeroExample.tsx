import HeroSection from './HeroSection';

// Example usage of HeroSection component
const HeroExample = () => {
  const slides = [
    {
      id: 1,
      image: '/images/Meenachi amman temple.png',
      title: 'Explore India',
      subtitle: 'Curated India journeys from Australia — thoughtfully designed around history, culture and regional depth',
      buttons: [
        { text: 'Explore Journeys to India', link: '/destinations/india' }
      ]
    },
    {
      id: 2,
      image: '/images/Austra.png',
      title: 'Explore Australia',
      subtitle: 'From coastlines to desert interiors, Australia revealed through thoughtful design and disciplined execution.',
      buttons: [
        { text: 'Explore Australia Tours', link: '/destinations/australia' }
      ]
    },
    {
      id: 3,
      image: '/images/singapore.jpg',
      title: 'Discover Singapore',
      subtitle: 'Experience the perfect blend of modern architecture and cultural heritage in the Lion City.',
      buttons: [
        { text: 'Explore Singapore', link: '/destinations/singapore' }
      ]
    }
  ];

  return (
    <HeroSection 
      slides={slides}
      autoPlay={true}
      autoPlayInterval={5000}
    />
  );
};

export default HeroExample;

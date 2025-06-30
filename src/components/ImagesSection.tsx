import React from 'react';
import { Card, CardBody, Image } from '@heroui/react';
// import { useScrollReveal } from 'react-bits';

// Temporary fallback for useScrollReveal if not available in 'react-bits'
const useScrollReveal = () => {
  const ref = React.useRef<HTMLElement | null>(null);
  return { ref };
};

const images = [
  { id: 1, alt: 'Hostel Lobby' },
  { id: 2, alt: 'Dormitory Room' },
  { id: 3, alt: 'Common Area' },
  { id: 4, alt: 'Kitchen' },
];

const ImagesSection: React.FC = () => {
  const reveal = useScrollReveal();

  return (
    <section id="gallery" ref={reveal.ref}>
      <Card className="shadow-xl bg-background/90 backdrop-blur-xl">
        <CardBody>
          <h2 className="mb-8 text-4xl font-extrabold tracking-tight text-center text-primary">
            Hostel Gallery
          </h2>

          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {images.map((image) => (
              <div
                key={image.id}
                className="group relative overflow-hidden rounded-2xl shadow-md transition-transform duration-300 hover:scale-[1.02] hover:shadow-lg transform-gpu"
              >
                <Image
                  removeWrapper
                  alt={image.alt}
                  src={`https://img.heroui.chat/image/places?w=800&h=600&u=${image.id}`}
                  className="w-full h-[180px] md:h-[220px] object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 flex items-center justify-center text-sm font-medium text-white transition-opacity duration-300 opacity-0 bg-black/40 group-hover:opacity-100 backdrop-blur-sm">
                  {image.alt}
                </div>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>
    </section>
  );
};

export default ImagesSection;

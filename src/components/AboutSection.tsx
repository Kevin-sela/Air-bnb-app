import React from 'react';
import { Card, CardBody, Image } from '@heroui/react';
const AboutSection: React.FC = () => {

  return (
    <section id="about">
      <Card className="shadow-xl bg-background/90 backdrop-blur-xl transform-gpu transition-all duration-500 hover:scale-[1.01] hover:shadow-2xl">
        <CardBody className="flex flex-col md:flex-row items-center gap-10 p-6 perspective-[1000px]">
          {/* Image with slight 3D tilt on hover */}
          <div className="w-full transition-transform duration-700 md:w-1/2 transform-gpu hover:rotate-y-3">
            <Image
              removeWrapper
              alt="Flos Cottage"
              src="https://img.heroui.chat/image/places?w=800&h=600&u=hostel"
              className="w-full h-[300px] md:h-[400px] object-cover rounded-2xl shadow-md"
            />
          </div>

          {/* Text content */}
          <div className="space-y-4 text-center md:w-1/2 md:text-left">
            <h2 className="text-4xl font-extrabold tracking-tight text-primary">About Flos Cottage</h2>
            <p className="text-lg leading-relaxed text-muted-foreground">
              Discover Flos Cottage — your cozy escape right in the heart of campus. Our rooms are built
              for comfort, community, and connection. Whether you’re a student, visitor, or digital nomad,
              you’ll find space to rest, focus, and belong.
            </p>
            <p className="text-base text-muted-foreground">
              We offer modern amenities like free Wi-Fi, shared kitchens, lounges, and more — all designed
              to give you the feeling of home, with the flexibility of a hostel.
            </p>
          </div>
        </CardBody>
      </Card>
    </section>
  );
};

export default AboutSection;

import React from 'react';
import { Card, CardBody } from '@heroui/react';
import { Icon } from '@iconify/react';

const services = [
  { icon: 'lucide:wifi', name: 'Free Wi-Fi' },
  { icon: 'lucide:utensils', name: 'Shared Kitchen' },
  { icon: 'lucide:coffee', name: 'Breakfast Included' },
  { icon: 'lucide:tv', name: 'Common Room with TV' },
  { icon: 'lucide:washing-machine', name: 'Laundry Facilities' },
  { icon: 'lucide:map-pin', name: 'City Tours' },
];

const ServicesSection: React.FC = () => {
  return (
    <section id="services">
      <h2 className="mb-6 text-3xl font-bold text-center">What We Offer</h2>
      <Card className="shadow-md bg-background/80 backdrop-blur-md">
        <CardBody>
          <div className="grid grid-cols-2 gap-6 md:grid-cols-3">
            {services.map((service, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-3 transition-colors duration-200 rounded-lg hover:bg-muted"
              >
                <Icon icon={service.icon} className="text-2xl text-primary" />
                <span className="text-base font-medium text-foreground">{service.name}</span>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>
    </section>
  );
};

export default ServicesSection;

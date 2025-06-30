import React from 'react';
import { Card, CardBody, CardFooter, Image, Button } from '@heroui/react';
import { Icon } from '@iconify/react';

const rooms = [
  { id: 1, name: 'Single Room', price: 50, capacity: 1 },
  { id: 2, name: 'Double Room', price: 80, capacity: 2 },
  { id: 3, name: 'Dormitory Bed', price: 25, capacity: 1 },
];

interface RoomListingProps {
  onBookNow: () => void;
}

const RoomListing: React.FC<RoomListingProps> = ({ onBookNow }) => {
  return (
    <section id="rooms">
      <h2 className="mb-8 text-3xl font-bold text-center">Available Rooms</h2>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {rooms.map((room) => (
          <Card
            key={room.id}
            className="shadow-md transition-transform hover:scale-[1.02] hover:shadow-lg bg-background/90 backdrop-blur"
          >
            <CardBody className="p-0">
              <Image
                removeWrapper
                alt={`${room.name} image`}
                src={`https://img.heroui.chat/image/places?w=600&h=300&u=${room.id}`}
                className="w-full object-cover h-[200px] rounded-t-lg"
              />
            </CardBody>
            <CardFooter className="flex flex-col items-start gap-2 p-4">
              <h3 className="text-xl font-semibold">{room.name}</h3>
              <p className="text-muted-foreground">${room.price} per night</p>
              <div className="flex items-center text-sm text-muted-foreground">
                <Icon icon="lucide:users" className="mr-2 text-primary" />
                Capacity: {room.capacity}
              </div>
              <Button color="primary" variant="solid" className="w-full mt-4" onPress={onBookNow}>
                Book Now
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default RoomListing;

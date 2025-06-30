import React from 'react';
    import { Card, CardBody, CardHeader, Input, Button, Select, SelectItem } from "@heroui/react";

    const BookingForm: React.FC = () => {
      return (
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <h2 className="text-2xl font-semibold">Book a Room</h2>
          </CardHeader>
          <CardBody>
            <form className="space-y-4">
              <Input
                label="Full Name"
                placeholder="Enter your full name"
                type="text"
              />
              <Input
                label="Email"
                placeholder="Enter your email"
                type="email"
              />
              <Select
                label="Room Type"
                placeholder="Select a room type"
              >
                <SelectItem key="single" value="single">Single Room</SelectItem>
                <SelectItem key="double" value="double">Double Room</SelectItem>
                <SelectItem key="dormitory" value="dormitory">Dormitory Bed</SelectItem>
              </Select>
              <Input
                label="Check-in Date"
                placeholder="Select check-in date"
                type="date"
              />
              <Input
                label="Check-out Date"
                placeholder="Select check-out date"
                type="date"
              />
              <Button color="primary" type="submit" fullWidth>
                Book Now
              </Button>
            </form>
          </CardBody>
        </Card>
      );
    };

    export default BookingForm;
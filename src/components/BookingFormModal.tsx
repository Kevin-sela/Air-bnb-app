import React, { useState } from 'react';
import { Modal, Button, Input } from '@heroui/react';

const BookingFormModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [roomType, setRoomType] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = async () => {
    try {
      const booking = { name, roomType, date };
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(booking),
      });
      if (!response.ok) {
        throw new Error('Failed to submit booking');
      }
      // Optionally, clear form or show success message here
      onClose();
    } catch (error) {
      console.error('Error submitting booking:', error);
      // Optionally, show error message to user
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Book a Room">
      <div className="space-y-4">
        <Input
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
        />
        <Input
          label="Room Type"
          value={roomType}
          onChange={(e) => setRoomType(e.target.value)}
          placeholder="Enter room type"
        />
        <Input
          label="Date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <Button onPress={handleSubmit} color="primary" variant="shadow" className="w-full">
          Submit Booking
        </Button>
      </div>
    </Modal>
  );
};

export default BookingFormModal;

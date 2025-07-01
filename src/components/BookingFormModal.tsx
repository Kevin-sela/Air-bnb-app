import React, { useEffect, useState } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input, Textarea, Select } from '@heroui/react';
import io, { Socket } from 'socket.io-client';

interface Booking {
  name: string;
  email: string;
  roomType: string;
  date: string;
  message: string;
}

const socket: Socket = io('http://localhost:5000'); // Adjust URL as needed
const BookingFormModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState<Booking>({
    name: '',
    email: '',
    roomType: '',
    date: '',
    message: '',
  });

  useEffect(() => {
    socket.on('newBooking', (booking: Booking) => {
      alert(`New booking from ${booking.name} for ${booking.roomType}`);
    });

    return () => {
      socket.off('newBooking');
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        alert('Booking submitted successfully!');
        setFormData({ name: '', email: '', roomType: '', date: '', message: '' });
        onClose();
      } else {
        alert('Failed to submit booking.');
      }
    } catch (error) {
      alert('Error submitting booking.');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader>Book a Room</ModalHeader>
        <ModalBody>
          <form onSubmit={handleSubmit} id="booking-form">
            <Input
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="mb-4"
            />
            <Input
              name="email"
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mb-4"
            />
            <Select
              name="roomType"
              value={formData.roomType}
              onChange={handleChange}
              required
              className="mb-4"
            >
              <option value="" disabled>Select Room Type</option>
              <option value="Single">Single</option>
              <option value="Double">Double</option>
              <option value="Suite">Suite</option>
            </Select>
            <Input
              name="date"
              type="date"
              placeholder="Date"
              value={formData.date}
              onChange={handleChange}
              required
              className="mb-4"
            />
            <Textarea
              name="message"
              placeholder="Message"
              value={formData.message}
              onChange={handleChange}
              className="mb-4"
            />
          </form>
        </ModalBody>
        <ModalFooter>
          <Button type="submit" form="booking-form">Submit</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default BookingFormModal;

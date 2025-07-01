import React, { useState } from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Textarea,
  Select,
  SelectItem,
} from '@heroui/react';

interface BookingFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const roomTypes = [
  { key: 'single', label: 'Single' },
  { key: 'double', label: 'Double' },
  { key: 'suite', label: 'Suite' },
  { key: 'deluxe', label: 'Deluxe' },
  { key: 'family', label: 'Family' },
];

const BookingFormModal: React.FC<BookingFormModalProps> = ({ isOpen, onClose }) => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    roomType: '',
    date: '',
    message: '',
  });

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    try {
      await fetch('http://localhost:5000/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      alert('Booking submitted!');
      setForm({ name: '', email: '', roomType: '', date: '', message: '' });
      onClose();
    } catch (err) {
      alert('Error submitting booking');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="backdrop-blur-sm">
      <ModalContent className="border shadow-xl rounded-xl bg-gradient-to-br from-purple-800 via-indigo-900 to-black border-white/10">
        <ModalHeader className="text-2xl font-semibold text-white">
          Book Your Stay
        </ModalHeader>
        <ModalBody className="space-y-4">
          <Input
            label="Full Name"
            fullWidth
            value={form.name}
            onChange={(e) => handleChange('name', e.target.value)}
          />
          <Input
            label="Email"
            fullWidth
            value={form.email}
            onChange={(e) => handleChange('email', e.target.value)}
          />
          <Select
            className="max-w-xs"
            items={roomTypes}
            label="Room Type"
            placeholder="Select a room type"
            value={form.roomType}
            onChange={(e) => handleChange('roomType', e.target.value)}
          >
            {(room) => <SelectItem>{room.label}</SelectItem>}
          </Select>
          <Input
            label="Date"
            type="date"
            fullWidth
            value={form.date}
            onChange={(e) => handleChange('date', e.target.value)}
          />
          <Textarea
            label="Message"
            fullWidth
            value={form.message}
            onChange={(e) => handleChange('message', e.target.value)}
          />
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            onClick={handleSubmit}
            className="w-full"
          >
            Submit Booking
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default BookingFormModal;

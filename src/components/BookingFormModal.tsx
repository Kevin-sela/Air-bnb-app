import React, { useState } from 'react';
import { Modal, Input } from '@heroui/react';

const BookingFormModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [roomType, setRoomType] = useState('');
  const [date, setDate] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

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
      setErrorMessage('');
      // Optionally, clear form or show success message here
      onClose();
    } catch (error: any) {
      console.error('Error submitting booking:', error);
      setErrorMessage(error.message || 'An error occurred while submitting booking.');
    }
  };

  const handleClose = () => {
    setErrorMessage('');
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Book a Room">
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
          value={date}
          onChange={(e) => setDate(e.target.value)}
          placeholder="Enter date"
        />
        {/* Add any additional form fields or buttons here */}
        {errorMessage && <div className="text-red-500">{errorMessage}</div>}
        <div className="flex justify-end space-x-2">
          <button
            className="btn btn-secondary"
            onClick={handleClose}
            type="button"
          >
            Cancel
          </button>
          <button
            className="btn btn-primary"
            onClick={handleSubmit}
            type="button"
          >
            Book
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default BookingFormModal;

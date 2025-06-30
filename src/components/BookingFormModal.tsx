import React from 'react';
    import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input, Select, SelectItem } from "@heroui/react";

    interface BookingFormModalProps {
      isOpen: boolean;
      onClose: () => void;
    }

    const BookingFormModal: React.FC<BookingFormModalProps> = ({ isOpen, onClose }) => {
      return (
        <Modal 
          isOpen={isOpen} 
          onClose={onClose}
          scrollBehavior="inside"
          size="2xl"
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">Book a Room</ModalHeader>
                <ModalBody>
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
                      <SelectItem key="single">Single Room</SelectItem>
                      <SelectItem key="double">Double Room</SelectItem>
                      <SelectItem key="dormitory">Dormitory Bed</SelectItem>
                    </Select>
                    <div className="grid grid-cols-2 gap-4">
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
                    </div>
                  </form>
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Cancel
                  </Button>
                  <Button color="primary" onPress={onClose}>
                    Book Now
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      );
    };

    export default BookingFormModal;
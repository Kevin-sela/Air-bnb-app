import React, { useEffect, useState } from 'react';
import { Card, CardBody, Table, TableHeader, TableRow, TableCell, TableBody } from '@heroui/react';

interface Booking {
  _id: string;
  name: string;
  email: string;
  roomType: string;
  date: string;
  message: string;
}

interface AdminBookingsProps {
  isAdmin: boolean;
}

const AdminBookings: React.FC<AdminBookingsProps> = ({ isAdmin }) => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isAdmin) return;
    const fetchBookings = async () => {
      try {
        const res = await fetch('/api/bookings');
        if (!res.ok) throw new Error('Failed to fetch bookings');
        const data = await res.json();
        setBookings(data);
      } catch (err: any) {
        setError(err.message || 'Error fetching bookings');
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, [isAdmin]);

  if (!isAdmin) {
    return <p className="font-semibold text-red-600">Access denied. Admins only.</p>;
  }

  return (
    <Card>
      <CardBody>
        <h2 className="mb-4 text-2xl font-semibold">Admin Bookings</h2>
        {loading && <p>Loading bookings...</p>}
        {error && <p className="text-red-600">{error}</p>}
        {!loading && !error && bookings.length === 0 && <p>No bookings found.</p>}
        {!loading && !error && bookings.length > 0 && (
          <Table>
            <TableHeader>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Room Type</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Message</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bookings.map((booking) => (
                <TableRow key={booking._id}>
                  <TableCell>{booking.name}</TableCell>
                  <TableCell>{booking.email}</TableCell>
                  <TableCell>{booking.roomType}</TableCell>
                  <TableCell>{booking.date}</TableCell>
                  <TableCell>{booking.message}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardBody>
    </Card>
  );
};

export default AdminBookings;

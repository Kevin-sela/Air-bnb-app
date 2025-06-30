import React from 'react';
    import { Card, CardBody, Progress } from "@heroui/react";
    import { Icon } from "@iconify/react";
    import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

    const data = [
      { name: 'Jan', bookings: 40 },
      { name: 'Feb', bookings: 30 },
      { name: 'Mar', bookings: 20 },
      { name: 'Apr', bookings: 27 },
      { name: 'May', bookings: 45 },
      { name: 'Jun', bookings: 60 },
    ];

    const AnalyticsDashboard: React.FC = () => {
      return (
        <Card className="mb-8">
          <CardBody>
            <h2 className="text-2xl font-semibold mb-4">Analytics Dashboard</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="flex items-center">
                <Icon icon="lucide:users" className="text-primary mr-2 text-2xl" />
                <div>
                  <p className="text-sm text-default-500">Total Guests</p>
                  <p className="text-lg font-semibold">1,234</p>
                </div>
              </div>
              <div className="flex items-center">
                <Icon icon="lucide:calendar" className="text-primary mr-2 text-2xl" />
                <div>
                  <p className="text-sm text-default-500">Bookings This Month</p>
                  <p className="text-lg font-semibold">156</p>
                </div>
              </div>
              <div className="flex items-center">
                <Icon icon="lucide:percent" className="text-primary mr-2 text-2xl" />
                <div>
                  <p className="text-sm text-default-500">Occupancy Rate</p>
                  <p className="text-lg font-semibold">78%</p>
                </div>
              </div>
            </div>
            <div className="mb-4">
              <p className="text-sm text-default-500 mb-2">Room Availability</p>
              <Progress color="primary" aria-label="Room Availability" value={22} className="max-w-md" />
            </div>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Area type="monotone" dataKey="bookings" stroke="#006FEE" fill="#338ef7" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardBody>
        </Card>
      );
    };

    export default AnalyticsDashboard;
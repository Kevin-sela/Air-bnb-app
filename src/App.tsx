import React, { useEffect, useRef, useState } from 'react';
import { Button, useDisclosure } from '@heroui/react';
/* Removed import of useScrollReveal from 'react-bits' because it is not exported by the package */
// If you need scroll reveal, implement your own hook or use an alternative library.
import io from 'socket.io-client';
import toast, { Toaster } from 'react-hot-toast';

import RoomListing from './components/RoomListing';
import BookingFormModal from './components/BookingFormModal';
import AboutSection from './components/AboutSection';
import ServicesSection from './components/ServicesSection';
import ImagesSection from './components/ImagesSection';
import AnalyticsDashboard from './components/AnalyticsDashboard';
;


interface PushNotificationRegistrationProps {
  token: string;
}
const PushNotificationRegistration: React.FC<PushNotificationRegistrationProps> = ({ token }) => {
  // Your implementation here, you can use the token prop as needed
  return null;
};


const socket = io('https://air-bnb-app-7.onrender.com', { transports: ['websocket'] });
const SectionWrapper = ({ id, children, bg, title }: { id: string; children: React.ReactNode; bg: string; title: string }) => {
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section
      id={id}
      ref={sectionRef}
      className={`relative min-h-screen flex flex-col items-center justify-start px-4 py-20 ${bg} transition-all duration-700 border-t-4 border-transparent ${isInView ? 'rounded-none border-white/40' : 'rounded-t-full'} animate-section-border`}
    >
      <div className={`absolute inset-0 z-0 ${isInView ? 'rounded-none' : 'rounded-t-full'} pointer-events-none border-gradient border-t-4 border-transparent animate-glow-border transition-all duration-700`} />
      <div className="relative z-10 w-full mb-10 max-w-7xl">
        <div
          style={{
            width: isInView ? '100%' : '8rem',
            height: isInView ? 'auto' : '8rem',
            overflow: 'hidden',
            transition: 'all 0.6s ease-in-out',
          }}
          className="flex items-center justify-center p-4 mx-auto rounded-full animate-bounce bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500"
        >
          <span className="block font-bold text-white sm:hidden">{title.charAt(0)}</span>
          <span className="hidden font-bold text-white sm:block">{title}</span>
        </div>
      </div>
      <div className="relative z-10 w-full max-w-7xl animate-fade-in-up">
        {children}
      </div>
    </section>
  );
};

const App = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [token, setToken] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);

  // const navReveal = useScrollReveal({ y: -30, duration: 800, delay: 100 });
  // const navReveal = useScrollReveal({ y: -30, duration: 800, delay: 100 });

  useEffect(() => {
    interface Booking {
      name: string;
      roomType: string;
      date: string;
    }

    socket.on('new-booking', (booking: Booking) => {
      toast.success(`New Booking from ${booking.name} for ${booking.roomType} on ${booking.date}`);
    });

    return () => {
      socket.off('new-booking');
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white scroll-smooth">
      <Toaster position="top-center" reverseOrder={false} />

      <>
      <PushNotificationRegistration token={token ?? ''} />

      <nav
        // ref={navReveal.ref}
        className="fixed top-0 left-0 right-0 z-50 border-b shadow-2xl bg-black/30 backdrop-blur-xl border-white/10"
      >
        <div className="flex items-center justify-between px-6 py-4 mx-auto max-w-7xl">
        <h1 className="text-xl font-extrabold text-transparent text-gradient bg-gradient-to-r from-cyan-400 via-pink-400 to-violet-500 bg-clip-text">
          Hebron Hostel
        </h1>
        <Button
          color="primary"
          variant="shadow"
          className="rounded-full bg-gradient-to-br from-pink-500 to-violet-500 px-6 py-2 text-sm font-semibold text-white shadow-lg hover:scale-[1.05] transition-transform"
          onPress={onOpen}
        >
          Book Now
        </Button>
        </div>
      </nav>

      {/* Hero Banner */}
      <section
        className="relative flex flex-col items-center justify-center h-screen text-center bg-center bg-cover"
        style={{ backgroundImage: `url('https://img.heroui.chat/image/places?w=1600&h=900&u=hebron-hostel')` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/80 backdrop-blur-sm" />
        <div className="relative z-10 max-w-2xl px-4">
        <h1 className="text-5xl font-extrabold text-white drop-shadow-lg animate-fade-in-down">
          Welcome to Hebron Hostel
        </h1>
        <p className="mt-4 text-lg delay-200 text-white/90 animate-fade-in-up">
          Comfortable, futuristic and serene accommodation in the heart of campus.
        </p>
        <Button
          onPress={onOpen}
          className="px-8 py-3 mt-6 text-base font-semibold text-white transition-transform delay-500 shadow-xl bg-gradient-to-r from-fuchsia-500 via-purple-500 to-indigo-500 rounded-xl hover:scale-105 animate-fade-in-up"
        >
          Book a Room
        </Button>
        </div>
      </section>

      {/* Scroll-In Sections with Gradient Backgrounds */}
      <SectionWrapper id="about" bg="bg-gradient-to-br from-white via-pink-50 to-purple-100 text-black" title="About">
        <AboutSection />
      </SectionWrapper>

      <SectionWrapper id="rooms" bg="bg-gradient-to-br from-[#e0c3fc] to-[#8ec5fc] text-black" title="Rooms">
        <RoomListing onBookNow={onOpen} />
      </SectionWrapper>

      <SectionWrapper id="services" bg="bg-gradient-to-br from-[#d9afd9] to-[#97d9e1] text-black" title="Services">
        <ServicesSection />
      </SectionWrapper>

      <SectionWrapper id="gallery" bg="bg-gradient-to-br from-[#fbc2eb] to-[#a6c1ee] text-black" title="Gallery">
        <ImagesSection />
      </SectionWrapper>

      <SectionWrapper id="analytics" bg="bg-gradient-to-br from-[#a1c4fd] to-[#c2e9fb] text-black" title="Analytics">
        <AnalyticsDashboard />
      </SectionWrapper>

      <BookingFormModal isOpen={isOpen} onClose={onClose} />
      </>
    </div>
  );
};

export default App;

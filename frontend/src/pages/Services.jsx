import Navbar from '../components/Navbar';
import ServiceCardsGrid from '../assets/ServiceCardGrid';

const Services = () => {
  return (
    <div className='min-h-screen bg-white'>
      <Navbar />
      <div
        className="h-[40vh] bg-cover bg-center relative flex justify-center items-center"
        style={{ backgroundImage: "url('/images/tools1.webp')" }}
      >
        <div className="text-white text-4xl font-semibold bg-black bg-opacity-50 px-4 py-2 rounded-lg">
          Your To-Do List is on Us
        </div>
      </div>
      <div className='flex text-2xl justify-center items-center font-semibold mt-8 mb-4'>Hire a Trusted Task Performer</div>
      <ServiceCardsGrid />
    </div>
  );
};

export default Services;

// fetchServicesImages.js
const axios = require('axios');
const fs = require('fs');

// Replace with your Pixabay API key
const PIXABAY_API_KEY = '49010757-fcc88edc7c15a1c96447032c1';

// Your services (name + description + optional category)
const services = [
  { name: 'House Cleaning', description: 'Full home deep cleaning with eco-friendly products.' },
  { name: 'Bathroom Cleaning', description: 'Detailed bathroom cleaning with disinfectants.' },
  { name: 'Kitchen Deep Cleaning', description: 'Grease removal and deep sanitization of kitchen.' },
  { name: 'Sofa Cleaning', description: 'Professional upholstery and fabric cleaning service.' },
  { name: 'Carpet Cleaning', description: 'Steam cleaning for carpets and rugs.' },
  { name: 'Window Cleaning', description: 'Exterior and interior window glass cleaning.' },
  { name: 'Electrical Wiring', description: 'Home electrical wiring and rewiring services.' },
  { name: 'Fan Installation', description: 'Ceiling, wall, and exhaust fan installations.' },
  { name: 'Light Fitting', description: 'LED and chandelier light installations.' },
  { name: 'Inverter Repair', description: 'Home inverter installation and repair services.' },
  { name: 'Plumbing Service', description: 'Leak repair, installation, and maintenance.' },
  { name: 'Toilet Repair', description: 'Unclogging and repairing toilet systems.' },
  { name: 'Water Tank Cleaning', description: 'Overhead and underground tank cleaning.' },
  { name: 'Water Purifier Installation', description: 'RO, UV purifier setup and maintenance.' },
  { name: 'AC Repair', description: 'AC gas refill, maintenance, and installation.' },
  { name: 'Refrigerator Repair', description: 'Fridge cooling and compressor repair.' },
  { name: 'Washing Machine Repair', description: 'Front and top-load washing machine service.' },
  { name: 'Microwave Repair', description: 'Microwave heating and electrical fix.' },
  { name: 'TV Mounting', description: 'LED TV wall mounting and setup.' },
  { name: 'Lawn Care', description: 'Trimming, fertilizing, and lawn maintenance.' },
  { name: 'Tree Trimming', description: 'Tree cutting and maintenance services.' },
  { name: 'Pest Control', description: 'Termite, mosquito, and pest extermination.' },
  { name: 'Yoga Instructor', description: 'Personal yoga sessions at your home.' },
  { name: 'Fitness Trainer', description: 'Certified personal training for strength and cardio.' },
  { name: 'Massage Therapy', description: 'Relaxation and therapeutic body massages.' },
  { name: 'Nutritionist Consultation', description: 'Diet and nutrition guidance sessions.' },
  { name: 'Computer Repair', description: 'Laptop and desktop troubleshooting and upgrades.' },
  { name: 'Mobile Repair', description: 'Screen replacement and battery repair.' },
  { name: 'Data Recovery', description: 'Recover lost or corrupted files from devices.' },
  { name: 'CCTV Installation', description: 'Home and office CCTV setup and monitoring.' },
  { name: 'Event Photographer', description: 'Professional photoshoot and event coverage.' },
  { name: 'Makeup Artist', description: 'Bridal and party makeup services.' },
  { name: 'Hair Stylist', description: 'Haircut, coloring, and styling at home.' },
  { name: 'Party Decorator', description: 'Themed event decorations for birthdays and parties.' },
  { name: 'DJ Services', description: 'Professional DJ for events and weddings.' },
];

// Utility functions
function randomPrice(min, max) {
  return `$${Math.floor(Math.random() * (max - min + 1)) + min}`;
}

function randomRating() {
  return (Math.random() * (5 - 4) + 4).toFixed(1); // 4.0 - 5.0
}

// Fetch image from Pixabay API
async function fetchImage(query) {
  try {
    const response = await axios.get('https://pixabay.com/api/', {
      params: {
        key: PIXABAY_API_KEY,
        q: query,
        image_type: 'photo',
        per_page: 3,
        safesearch: true,
      },
    });

    if (response.data.hits && response.data.hits.length > 0) {
      return response.data.hits[0].webformatURL; // pick the first image
    }
    return 'https://via.placeholder.com/400x250?text=No+Image'; // fallback
  } catch (err) {
    console.error('Error fetching image for', query, err.message);
    return 'https://via.placeholder.com/400x250?text=No+Image';
  }
}

// Generate final services JSON with images, prices, ratings
async function generateServices() {
  const servicesWithImages = [];
  for (const service of services) {
    const image = await fetchImage(service.name);
    servicesWithImages.push({
      name: service.name,
      description: service.description,
      image,
      price: randomPrice(50, 200),
      rating: randomRating(),
    });
    console.log(`Processed: ${service.name}`);
  }

  fs.writeFileSync('services.json', JSON.stringify(servicesWithImages, null, 2));
  console.log('services.json created successfully!');
}

// Run the script
generateServices();

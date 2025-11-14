

const ServiceCard = ({ imageUrl, title, subtitle, serviceLinks }) => {
  return (
    <div className="border rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow">
      {imageUrl && (
        <div className="w-full h-48 overflow-hidden">
          <img 
            src={imageUrl} 
            alt={title} 
            className="w-full h-full object-cover"
          />
        </div>
      )}
      
      <div className="p-4">
        {title && <h3 className="text-green-600 font-medium text-lg">{title}</h3>}
        {subtitle && <p className="text-gray-700 mb-4">{subtitle}</p>}
        
        {serviceLinks && serviceLinks.length > 0 && (
          <div className="border-t pt-4 mt-2">
            {serviceLinks.map((link, index) => (
              <a 
                key={index} 
                href={link.url || "#"} 
                className="block py-2 text-green-600 hover:text-green-800 transition-colors"
              >
                {link.text}
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const ServiceCardsGrid = () => {
  const serviceCards = [
    {
      imageUrl: "images/assembly1.webp",
      title: "Furniture Assembly",
      subtitle: "Furniture Assembly",
      serviceLinks: [
        { text: "Furniture Assembly", url: "/furniture-assembly" },
        { text: "Patio Furniture Assembly", url: "/patio-furniture-assembly" },
        { text: "Desk Assembly", url: "/desk-assembly" },
        { text: "Dresser Assembly", url: "/dresser-assembly" },
        { text: "Bed Assembly", url: "/bed-assembly" },
        { text: "Bookshelf Assembly", url: "/bookshelf-assembly" },
        { text: "Couch Assembly", url: "/couch-assembly" },
        { text: "Chair Assembly", url: "/chair-assembly" },
        { text: "Wardrobe Assembly", url: "/wardrobe-assembly" },
        { text: "Table Assembly", url: "/table-assembly" },
        { text: "Disassemble furniture", url: "/disassemble-furniture" }
      ]
    },
    {
      imageUrl: "images/mounting.jpg",
      title: "Mounting & Installation",
      subtitle: "Wall Mounting",
      serviceLinks: [
        { text: "TV Mounting", url: "/tv-mounting" },
        { text: "Install Shelves, Rods & Hooks", url: "/install-shelves" },
        { text: "Ceiling Fan Installation", url: "/ceiling-fan-installation" },
        { text: "Install Blinds & Window Treatments", url: "/install-blinds" },
        { text: "Hang Art, Mirror & Decor", url: "/hang-art" },
        { text: "General Mounting", url: "/general-mounting" },
        { text: "Hang Christmas Lights", url: "/hang-christmas-lights" }
      ]
    },
    {
      imageUrl: "images/cleaning.jpg",
      title: "Cleaning",
      subtitle: "Taskers will make your home sparkle!",
      serviceLinks: [
        { text: "House Cleaning Services", url: "/house-cleaning" },
        { text: "Deep Cleaning", url: "/deep-cleaning" },
        { text: "Disinfecting Services", url: "/disinfecting" },
        { text: "Move In Cleaning", url: "/move-in-cleaning" },
        { text: "Move Out Cleaning", url: "/move-out-cleaning" },
        { text: "Vacation Rental Cleaning", url: "/vacation-rental-cleaning" },
        { text: "Carpet Cleaning Service", url: "/carpet-cleaning" },
        { text: "Garage Cleaning", url: "/garage-cleaning" },
        { text: "One Time Cleaning Services", url: "/one-time-cleaning" },
        { text: "Car Washing", url: "/car-washing" },
        { text: "Laundry Help", url: "/laundry-help" },
        { text: "Pressure Washing", url: "/pressure-washing" },
        { text: "Spring Cleaning", url: "/spring-cleaning" }
      ]
    },
    {
      imageUrl: "images/home-theater.jpg",
      title: "Home Theater Installing",
      subtitle: "Professional home theater setup",
      serviceLinks: [
        { text: "TV Mounting & Setup", url: "/tv-mounting-setup" },
        { text: "Surround Sound Installation", url: "/surround-sound" },
        { text: "Media Console Assembly", url: "/media-console" },
        { text: "Cable Management", url: "/cable-management" },
        { text: "Smart Home Integration", url: "/smart-home" }
      ]
    },
    {
      imageUrl: "images/moving.jpg",
      title: "Moving Services",
      subtitle: "Help with all your moving needs",
      serviceLinks: [
        { text: "Local Moving", url: "/local-moving" },
        { text: "Furniture Moving", url: "/furniture-moving" },
        { text: "Heavy Lifting", url: "/heavy-lifting" },
        { text: "Packing Services", url: "/packing-services" },
        { text: "Loading & Unloading", url: "/loading-unloading" },
        { text: "Junk Removal", url: "/junk-removal" }
      ]
    },
    {
      imageUrl: "images/mowing.jpg",
      title: "Yard Work",
      subtitle: "Maintain your outdoor space",
      serviceLinks: [
        { text: "Lawn Mowing", url: "/lawn-mowing" },
        { text: "Gardening", url: "/gardening" },
        { text: "Leaf Removal", url: "/leaf-removal" },
        { text: "Planting", url: "/planting" },
        { text: "Hedge Trimming", url: "/hedge-trimming" },
        { text: "Weed Removal", url: "/weed-removal" },
        { text: "Mulching", url: "/mulching" }
      ]
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {serviceCards.map((card, index) => (
          <ServiceCard 
            key={index}
            imageUrl={card.imageUrl}
            title={card.title}
            subtitle={card.subtitle}
            serviceLinks={card.serviceLinks}
          />
        ))}
      </div>
    </div>
  );
};

export default ServiceCardsGrid;
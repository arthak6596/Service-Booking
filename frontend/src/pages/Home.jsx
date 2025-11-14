import { useState, useRef, useEffect } from 'react';
import Navbar from '../components/Navbar';
import PopularProjects from '../assets/PopularProjects';
import Guarantee from '../assets/Guarantee';
import ItWorks from '../assets/ItWorks';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Assembly');
  const [selectedTag, setSelectedTag] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [filteredTags, setFilteredTags] = useState([])
  const dropdownRef = useRef(null);
  
  const serviceCategories = [
    { 
      name: 'Assembly', 
      icon: '🔧', 
      image: 'images/assembly1.webp',
      description: 'Assemble or disassemble furniture items by unboxing, building, and any cleanup.',
      trending: 'Now Trending: Curved sofas, computer desks, and sustainable materials.'
    },
    { 
      name: 'Mounting', 
      icon: '🔨', 
      image: 'images/mounting.jpg',
      description: 'Mount TVs, shelves, and artwork securely to your walls.',
      trending: 'Now Trending: Floating shelves, TV mounts, and art galleries.'
    },
    { 
      name: 'Moving', 
      icon: '📦', 
      image: 'images/moving.jpg',
      description: 'Get help with moving furniture, boxes, and heavy items.',
      trending: 'Now Trending: Eco-friendly moving supplies and small moves.'
    },
    { 
      name: 'Cleaning', 
      icon: '🧹', 
      image: 'images/cleaning.jpg',
      description: 'Professional cleaning services for homes and offices.',
      trending: 'Now Trending: Natural cleaning products and air purification.'
    },
    { 
      name: 'Outdoor Help', 
      icon: '🌳', 
      image: 'images/mowing.jpg',
      description: 'Get help with yard work, gardening, and outdoor maintenance.',
      trending: 'Now Trending: Drought-resistant landscaping and outdoor living spaces.'
    },
    { 
      name: 'Home Repairs', 
      icon: '🛠️', 
      image: 'images/plumbing.jpeg',
      description: 'Fix household issues from plumbing to electrical work.',
      trending: 'Now Trending: Smart home upgrades and energy-efficient fixes.'
    },
    { 
      name: 'Painting', 
      icon: '🖌️', 
      image: 'images/painting.jpg',
      description: 'Paint rooms, furniture, cabinets, and more.',
      trending: 'Now Trending: Accent walls, textured finishes, and eco-friendly paints.'
    },
    { 
      name: 'Trending', 
      icon: '🔥', 
      image: 'images/decor.jpeg',
      description: 'Explore the most popular and in-demand services.',
      trending: 'Now Trending: Home office setups, outdoor entertaining areas, and small space solutions.'
    },
  ];
  
  const categoryTags = {
    'Assembly': [
      'General Furniture Assembly',
      'Bookshelf Assembly',
      'Desk Assembly'
    ],
    'Mounting': [
      'TV Mounting',
      'Shelf Mounting',
      'Picture Hanging',
      'Mirror Mounting'
    ],
    'Moving': [
      'Local Moving',
      'Furniture Moving',
      'Heavy Lifting',
      'Junk Removal'
    ],
    'Cleaning': [
      'Home Cleaning',
      'Deep Cleaning',
      'Move-in/Move-out Cleaning',
      'Carpet Cleaning'
    ],
    'Outdoor Help': [
      'Lawn Mowing',
      'Gardening',
      'Gutter Cleaning',
      'Pressure Washing'
    ],
    'Home Repairs': [
      'Drywall Repair',
      'Plumbing',
      'Electrical',
      'Door Installation'
    ],
    'Painting': [
      'Interior Painting',
      'Exterior Painting',
      'Cabinet Painting',
      'Fence Painting'
    ],
    'Trending': [
      'Holiday Decorating',
      'Virtual Assistant',
      'Smart Home Installation',
      'Organization'
    ]
  };
  
  const handleSearch = () => {
    navigate(`/search/${searchInput}`)
  }
  
  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchInput(value);

    if(value.length > 0){
      const allTags = Object.values(categoryTags).flat()
      console.log(allTags)
      console.log(`value ${value}`)
      const filtered = allTags.filter((tag)=>{
        return tag.toLowerCase().includes(value.toLowerCase())
      })
      console.log(`filtered Tags ${filteredTags}`)
      setFilteredTags(filtered);
      setShowDropdown(true);
    }else{
      setShowDropdown(false);
    }
  }

  const handleDropDown = () => {
    const allTags = Object.values(categoryTags).flat()
    setFilteredTags(allTags)
    setShowDropdown(true)
  }

  useEffect(()=>{
    const handleClickOutside = (e) => {
      if(dropdownRef.current && !dropdownRef.current.contains(e.target)){
        setShowDropdown(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside)

    return ()=> {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  },[])

  const getCurrentImage = () => {
    const category = serviceCategories.find(cat => cat.name === selectedCategory);
    return category ? category.image : serviceCategories[0].image;
  };
  
  const getCurrentTags = () => {
    return categoryTags[selectedCategory] || [];
  };
  
  const getCurrentCategory = () => {
    return serviceCategories.find(cat => cat.name === selectedCategory) || serviceCategories[0];
  };

  const handleCategorySelect = (categoryName) => {
    setSelectedCategory(categoryName);
    setSelectedTag('');
  };

  const handleTagSelect = (tag) => {
    setSelectedTag(tag);
  };
  
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="relative bg-white">
     
        <div className="absolute inset-0 overflow-hidden">
        
        {/* <div className="absolute -left-16 top-0 h-64 w-64 rounded-full bg-green-600 opacity-70"></div> */}
          <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-green-600 rounded-full"></div>
          <div className="absolute left-0 -bottom-40 w-80 h-80 bg-green-600 opacity-50 rounded-full"></div>
          <div className="absolute  -right-20 top-0 w-64 h-64 bg-green-400 opacity-40 rounded-full"></div>
          {/* <div className="absolute right-20 top-20 w-40 h-40 bg-yellow-400 opacity-80 rounded-full"></div> */}
        </div>
        
        <div className="relative px-4 py-16 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center text-yellow-400 mb-4 mt-4">
              Smart Solutions,<br />Just a Hand Away.
            </h1>
          
            <div className="w-full max-w-xl mt-8 mb-12">
              <div className="relative" ref={dropdownRef}>
                <input
                  type="text"
                  placeholder="What do you need help with?"
                  className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                  value={searchInput}
                  onChange={(e) => handleInputChange(e)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  onClick={()=> handleDropDown()}
                />
               {showDropdown && (
                  <ul className='absolute left-0 right-0 bg-white border border-gray-200 mt-1 rounded-md shadow-lg max-h-48 overflow-y-auto z-50'>
                    {filteredTags.length > 0 ?(
                      filteredTags.map((tag,idx)=>(
                        <li key={idx} className='px-4 py-2 hover:bg-gray-100 cursor-pointer' onClick={()=> {
                          setSearchInput(tag);
                          setSelectedTag(tag);
                          setShowDropdown(false);
                        }}>{tag}</li>
                      ))
                    ):(
                      <li className='px-4 py-2 text-gray-500'>No Results</li>
                    )}
                  </ul>
                )}
                <button onClick={ ()=> handleSearch()} className="absolute right-0 top-0 h-full bg-yellow-400 text-white px-4 rounded-r-md">
                  <span className="text-xl">🔍</span>
                </button>
              </div>
               
            </div>
          </div>
          
          <div className="mt-8">
            <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
              {serviceCategories.map((category, index) => (
                <div 
                  key={index} 
                  className="flex flex-col items-center cursor-pointer"
                  onClick={() => handleCategorySelect(category.name)}
                >
                  <div className={`w-12 h-12 flex items-center justify-center ${selectedCategory === category.name ? 'bg-blue-100' : 'bg-blue-50'} rounded-full mb-2 transition-colors`}>
                    <span className="text-xl">{category.icon}</span>
                  </div>
                  <span className="text-sm text-center">{category.name}</span>
                  {selectedCategory === category.name && (
                    <div className="w-full h-1 bg-blue-500 mt-1 rounded-full"></div>
                  )}
                </div>
              ))}
            </div>
          </div>
          
          <div className="mt-8 flex flex-wrap gap-2">
            {getCurrentTags().map((tag, index) => (
              <span 
                key={index} 
                className={`px-4 py-2 ${selectedTag === tag ? 'bg-blue-100 border-blue-400' : 'bg-white border-gray-300'} border rounded-full text-sm cursor-pointer hover:bg-gray-50 transition-colors`}
                onClick={() => handleTagSelect(tag)}
              >
                {tag}
              </span>
            ))}
          </div>
          
          <div className="mt-12 bg-blue-50 rounded-lg p-6 relative overflow-hidden">
            <div className="absolute top-16 left-12 z-10 bg-white rounded-lg shadow-lg p-6 max-w-sm">
              <h3 className="text-2xl font-bold mb-4">{getCurrentCategory().name}</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <span className="text-green-600">✓</span>
                  </div>
                  <div className="ml-3">
                    <p className="text-gray-800">{getCurrentCategory().description}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <span className="text-green-600">✓</span>
                  </div>
                  <div className="ml-3">
                    <p className="text-gray-800">{getCurrentCategory().trending}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <img 
              src={getCurrentImage()} 
              alt={`${selectedCategory} services`} 
              className="w-full h-96 object-cover rounded-lg transition-all duration-300"
            />
            
            <div className="mt-4 text-sm text-gray-600">
              {selectedTag 
                ? `Find trusted professionals for ${selectedTag.toLowerCase()} services in your area.` 
                : `Browse our top-rated ${selectedCategory.toLowerCase()} professionals and book instantly.`
              }
            </div>
          </div>
          <PopularProjects />
          <Guarantee />
          <ItWorks />
        </div>
        
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default Home;


const ItWorks = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-16 bg-yellow-50 rounded-lg overflow-hidden relative">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-6">
          <h2 className="text-3xl font-bold text-green-800 mb-8">How it works</h2>
          
          <div className="flex items-start mb-12">
            <div className="w-12 h-12 rounded-full bg-purple-200 flex items-center justify-center mr-4 flex-shrink-0">
              <span className="text-lg font-bold">1</span>
            </div>
            <div>
              <p className="font-medium text-lg">Choose a Tasker by price, skills, and reviews.</p>
            </div>
          </div>
          
          <div className="flex items-start mb-12">
            <div className="w-12 h-12 rounded-full bg-yellow-200 flex items-center justify-center mr-4 flex-shrink-0">
              <span className="text-lg font-bold">2</span>
            </div>
            <div>
              <p className="font-medium text-lg">Schedule a Tasker as early as today.</p>
            </div>
          </div>
          
          <div className="flex items-start mb-12">
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mr-4 flex-shrink-0">
              <span className="text-lg font-bold">3</span>
            </div>
            <div>
              <p className="font-medium text-lg">Chat, pay, tip, and review all in one place.</p>
            </div>
          </div>
        </div>
        
        <div className="hidden md:block relative">
          <div className="h-full w-full bg-gray-200 rounded-lg">
           
            <div className="absolute inset-0 flex items-center justify-center text-gray-500">
              <img src="images/works.jpg" className="h-full " alt="happy-people"/>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  )
}

export default ItWorks
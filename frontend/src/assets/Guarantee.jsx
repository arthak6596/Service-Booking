import { Smile, ShieldCheck, Headphones } from "lucide-react";

const Guarantee = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-2">
          <span className="text-green-800">Your satisfaction,</span>{" "}
          <span className="text-purple-600">guaranteed</span>
        </h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="p-6 text-center">
          <Smile className="mx-auto h-12 w-12 text-green-700 mb-4" />
          <h3 className="text-2xl font-bold text-green-800 mb-4">Happiness Pledge</h3>
          <p>If you're not satisfied,we'll work to make it right.</p>
        </div>

        <div className="p-6 text-center">
          <ShieldCheck className="mx-auto h-12 w-12 text-green-700 mb-4" />
          <h3 className="text-2xl font-bold text-green-800 mb-4">Vetted Taskers</h3>
          <p>Taskers are always background checked before joining the platform.</p>
        </div>

        <div className="p-6 text-center">
          <Headphones className="mx-auto h-12 w-12 text-green-700 mb-4" />
          <h3 className="text-2xl font-bold text-green-800 mb-4">Dedicated Support</h3>
          <p>Friendly service when you need us – every day of the week.</p>
        </div>
      </div>
    </div>
  )
}

export default Guarantee
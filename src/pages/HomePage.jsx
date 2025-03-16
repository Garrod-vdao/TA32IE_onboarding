import React from 'react';
import { Sun, Shield, Info} from 'lucide-react';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-amber-50 text-gray-800">
      {/* Our Mission Section */}
      <section className="py-16 px-4" id="mission">
        <div className="container mx-auto max-w-6xl">
          <div className="lg:flex items-center gap-12">
            <div className="lg:w-1/2 mb-10 lg:mb-0">
              <div className="bg-orange-400 rounded-xl p-8 h-full">
                <Sun className="h-16 w-16 text-white mb-6" />
                <h2 className="text-3xl font-bold text-white mb-4">Our Mission</h2>
                <p className="text-white text-lg">
                  We are committed to raising awareness about the importance of UV protection and 
                  providing accurate, real-time UV index data to help people make informed decisions 
                  about sun exposure. Our goal is to reduce the incidence of skin cancer and other 
                  UV-related health issues through education and accessible information.
                </p>
              </div>
            </div>
            <div className="lg:w-1/2">
              <ul className="space-y-4">
                <li className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="font-semibold text-xl mb-2 text-orange-500">Education First</h3>
                  <p>We believe that education is the first step to prevention. We provide resources to 
                  help you understand UV radiation and its effects.</p>
                </li>
                <li className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="font-semibold text-xl mb-2 text-orange-500">Accurate Information</h3>
                  <p>Our UV index data is sourced from reliable Weather api to ensure accuracy.</p>
                </li>
                <li className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="font-semibold text-xl mb-2 text-orange-500">Accessible for All</h3>
                  <p>We design our platform to be user-friendly and accessible to everyone, 
                  regardless of technical knowledge.</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      
      {/* What is UV Index Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-yellow-100 to-orange-100" id="uv-index">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <Info className="h-12 w-12 text-orange-500 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-orange-600 mb-4">What is UV Index?</h2>
            <p className="text-lg max-w-3xl mx-auto">
              The UV Index is an international standard measurement of the strength of ultraviolet radiation from the sun.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { level: "Low (1-2)", color: "bg-green-400", description: "Minimal risk. Safe to be outside with minimal protection." },
              { level: "Moderate (3-5)", color: "bg-yellow-400", description: "Moderate risk. Wear sunscreen, hat, and sunglasses." },
              { level: "High (6-7)", color: "bg-orange-400", description: "High risk. Reduce time in the sun between 10am and 4pm." },
              { level: "Very High (8-10)", color: "bg-red-400", description: "Very high risk. Minimize sun exposure between 10am and 4pm." },
              { level: "Extreme (11+)", color: "bg-purple-400", description: "Extreme risk. Avoid being outside during midday hours." },
            ].map((item, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className={`${item.color} py-3 px-4`}>
                  <h3 className="font-bold text-white text-xl">{item.level}</h3>
                </div>
                <div className="p-6">
                  <p>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Why Sun Protection is Important */}
      <section className="py-16 px-4" id="protection">
        <div className="container mx-auto max-w-6xl">
          <div className="lg:flex items-center gap-12 flex-row-reverse">
            <div className="lg:w-1/2 mb-10 lg:mb-0">
              <div className="bg-amber-500 rounded-xl p-8 h-full">
                <Shield className="h-16 w-16 text-white mb-6" />
                <h2 className="text-3xl font-bold text-white mb-4">Why Sun Protection is Important</h2>
                <p className="text-white text-lg">
                  Protection from harmful UV rays is essential for preventing skin cancer, premature aging, 
                  eye damage, and other health issues. Regular use of sunscreen, protective clothing, 
                  and monitoring UV levels can significantly reduce your risk of UV-related health problems.
                </p>
              </div>
            </div>
            <div className="lg:w-1/2">
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="font-semibold text-xl mb-2 text-amber-500">Skin Cancer Prevention</h3>
                  <p>UV exposure is the primary cause of skin cancer. About 90% of non-melanoma skin 
                  cancers and 85% of melanoma cases are associated with exposure to UV radiation.</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="font-semibold text-xl mb-2 text-amber-500">Prevents Premature Aging</h3>
                  <p>UV radiation accelerates skin aging. Regular protection can prevent wrinkles, 
                  fine lines, and age spots caused by sun damage.</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="font-semibold text-xl mb-2 text-amber-500">Protects Your Eyes</h3>
                  <p>UV exposure can lead to cataracts, macular degeneration, and other eye conditions. 
                  Wearing sunglasses that block UV rays is essential for eye health.</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="font-semibold text-xl mb-2 text-amber-500">Immune System Protection</h3>
                  <p>Excessive UV exposure can suppress immune system function, making it harder 
                  for your body to fight off infections and disease.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
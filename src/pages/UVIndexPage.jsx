import React, { useState } from 'react';
// import axios from 'axios';

const UVIndexApp = () => {
  const [city, setCity] = useState('');
  const [uvData, setUvData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const validateCity = (value) => {
    if (!value.trim()) {
      return 'Please enter a city name';
    }
    
    // Check if input contains only English letters and spaces
    if (!/^[A-Za-z\s]+$/.test(value)) {
      return 'Please enter only English letters for city name';
    }
    
    return '';
  };

  const mockApiRequest = (cityName) => {
    return new Promise((resolve) => {

      setTimeout(() => {

        const citySum = cityName.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);
        const uvIndex = ((citySum % 120) / 10).toFixed(1);
        
        const response = {
          data: {
            status: 0,
            message: "",
            data: {
              latitude: 0,
              longitude: 0,
              now: {
                time: new Date().toISOString(),
                uvi: parseFloat(uvIndex)
              }
            }
          }
        };
        
        resolve(response);
      }, 500); 
    });
  };

  const handleSearch = async () => {
    const validationError = validateCity(city);
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      const response = await mockApiRequest(city);
      
      if (response.data && response.data.status === 0 && response.data.data && response.data.data.now) {
        setUvData({
          city: city,
          uvIndex: response.data.data.now.uvi
        });
      } else {
        setError('Received unexpected data format from server');
      }
    } catch (err) {
      console.error('Error fetching UV data:', err);
      setError('Failed to fetch data, please try again later');
      setUvData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setCity(e.target.value);
    if (error) {
      setError(''); // Clear error when user starts typing
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  // Get UV index level information with color
  const getUVLevelInfo = (index) => {
    if (index < 3) return { color: 'bg-green-500', level: 'Low' };
    if (index < 6) return { color: 'bg-yellow-500', level: 'Moderate' };
    if (index < 8) return { color: 'bg-orange-500', level: 'High' };
    if (index < 11) return { color: 'bg-red-500', level: 'Very High' };
    return { color: 'bg-purple-500', level: 'Extreme' };
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-blue-600 p-4">
          <h1 className="text-xl text-center text-white font-bold">Check UV Index</h1>
        </div>
        
        <div className="p-6">
          <div className="flex flex-col sm:flex-row gap-2">
            <input

              type="text"
              value={city}
              onChange={handleInputChange}
              placeholder="Enter city name"
              className="flex-grow p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              onKeyPress={handleKeyPress}
              aria-label="City name"
            />
            <button
              onClick={handleSearch}
              disabled={loading}
              className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition disabled:opacity-50"
              aria-label="Search"
            >
              {loading ? 'Searching...' : 'Search'}
            </button>
          </div>
          
          {error && (
            <div className="mt-4 p-3 bg-red-100 text-red-700 rounded" role="alert">
              {error}
            </div>
          )}
          
          {uvData && (
            <div className="mt-6">
              <div className="text-center mb-4">
                <h2 className="text-xl font-bold">{uvData.city}</h2>
              </div>
              
              <div className="flex items-center justify-center">
                <div className="text-center">
                  {(() => {
                    const { color, level } = getUVLevelInfo(uvData.uvIndex);
                    return (
                      <div className="flex flex-col items-center">
                        <div className={`w-32 h-32 ${color} rounded-full flex items-center justify-center`}>
                          <span className="text-4xl font-bold text-white">{uvData.uvIndex}</span>
                        </div>
                        <span className="mt-2 text-lg font-medium">{level}</span>
                      </div>
                    );
                  })()}
                </div>
              </div>
            </div>
          )}
          
          {!uvData && !loading && !error && (
            <div className="mt-6 text-center text-gray-500">
              Please enter a city name to check the UV index
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UVIndexApp;
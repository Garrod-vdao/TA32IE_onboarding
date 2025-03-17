import React, { useState, useRef } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { validateCityName, encodeParam } from '../components/SecurityUtils';

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const UVIndexApp = () => {
  const [city, setCity] = useState('');
  const [uvData, setUvData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [forecastDay, setForecastDay] = useState(null); // 0=today, 1=tomorrow, 2=day after tomorrow
  const [forecastData, setForecastData] = useState(null);
  const [loadingForecast, setLoadingForecast] = useState(false);
  const [forecastError, setForecastError] = useState('');
  
  // Track API calls for rate limiting
  const [apiCallCount, setApiCallCount] = useState(0);
  const lastApiCallTime = useRef(Date.now());

  // Enhanced validation with our security utility
  const validateCity = (value) => {
    const validation = validateCityName(value);
    if (!validation.valid) {
      return validation.message;
    }

    // Additional check for Australian cities
    if (!/^[A-Za-z\s]+$/.test(value)) {
      return 'Please enter only English letters for city name';
    }

    return '';
  };

  const handleSearch = async () => {
    // Rate limiting check
    const now = Date.now();
    if (now - lastApiCallTime.current < 1000) { // Prevent requests faster than once per second
      setError('Please wait before trying again');
      return;
    }
    
    // Check for too many calls in short period
    if (apiCallCount > 10) {
      const timeElapsed = now - lastApiCallTime.current;
      if (timeElapsed < 60000) { // Within a minute
        setError('Too many searches. Please wait a moment before trying again.');
        return;
      } else {
        // Reset counter after a minute
        setApiCallCount(0);
      }
    }

    const validationError = validateCity(city);
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    setError('');
    setForecastData(null);
    setForecastDay(null);
    
    // Update API call tracking
    setApiCallCount(prevCount => prevCount + 1);
    lastApiCallTime.current = now;

    try {
      // Use encodeParam from SecurityUtils for safe URL encoding
      const response = await axios.get(`/api/uv-indices/current?location=${encodeParam(city)}`);

      if (response.data && response.data.status === 200 && response.data.data) {
        setUvData({
          city: response.data.data.location.name,
          uvIndex: response.data.data.current.uv
        });
      } else {
        setError('Received unexpected data format from server');
      }
    } catch (err) {
      console.error('Error fetching UV data:', err);

      if (err.response && (err.response.status === 500)) {
        setError('Please enter an Australian city name');
      } else {
        setError('Please try again');
      }

      setUvData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    // Limit input length for additional security
    if (e.target.value.length <= 50) {
      setCity(e.target.value);
      if (error) {
        setError(''); // Clear error when user starts typing
      }
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

  // Get forecast data with enhanced security
  const fetchForecastData = async (dayIndex) => {
    if (!uvData || !uvData.city) {
      setForecastError('Please search for a city first');
      return;
    }
    
    // Rate limiting for forecast API calls
    const now = Date.now();
    if (now - lastApiCallTime.current < 1000) {
      setForecastError('Please wait before trying again');
      return;
    }
    
    // Update API call tracking
    setApiCallCount(prevCount => prevCount + 1);
    lastApiCallTime.current = now;

    setLoadingForecast(true);
    setForecastError('');
    setForecastDay(dayIndex);

    try {
      // Use encodeParam for safe URL encoding
      const response = await axios.get(`/api/uv-indices/forecast?location=${encodeParam(uvData.city)}&day=3`);

      if (response.data && response.data.status === 200 && response.data.data) {
        // Process data for the chart
        const forecastDayData = response.data.data.forecast.forecastday[dayIndex];

        if (!forecastDayData || !forecastDayData.hour) {
          setForecastError(`No forecast data available for ${dayIndex === 0 ? 'today' : dayIndex === 1 ? 'tomorrow' : 'the day after tomorrow'}`);
          setForecastData(null);
          return;
        }

        const hourlyData = forecastDayData.hour.map(item => ({
          time: item.time.split(' ')[1], // Extract just the time portion
          uv: item.uv
        }));

        setForecastData({
          date: forecastDayData.date,
          hourlyData
        });
      } else {
        setForecastError('Received unexpected data format from server');
      }
    } catch (err) {
      console.error('Error fetching forecast data:', err);
      setForecastError('Failed to fetch forecast data, please try again later');
    } finally {
      setLoadingForecast(false);
    }
  };

  // Prepare chart data
  const getChartData = () => {
    if (!forecastData || !forecastData.hourlyData) return null;

    return {
      labels: forecastData.hourlyData.map(item => item.time),
      datasets: [
        {
          label: 'UV Index',
          data: forecastData.hourlyData.map(item => item.uv),
          fill: false,
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
          borderColor: 'rgba(75, 192, 192, 1)',
          tension: 0.1
        }
      ]
    };
  };

  // Chart options
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: forecastData ? `Hourly UV Index for ${uvData.city} on ${forecastData.date}` : '',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'UV Index'
        }
      },
      x: {
        title: {
          display: true,
          text: 'Time'
        }
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-orange-600 p-4">
            <h1 className="text-xl text-center text-white font-bold">Check Current UV Index</h1>
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
                maxLength={50} // Add explicit maxLength for security
              />
              <button
                onClick={handleSearch}
                disabled={loading || apiCallCount > 10}
                className="bg-yellow-400 text-white py-2 px-4 rounded hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition disabled:opacity-50"
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

                <div className="flex items-center justify-center mb-6">
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

                <div className="flex flex-col items-center space-y-4 mb-6">
                  <h3 className="text-xl font-bold text-gray-700">Hourly UV Index Forecast</h3>
                  <div className="flex justify-center space-x-2">
                    <button
                      onClick={() => fetchForecastData(0)}
                      className={`py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-orange-500 transition ${forecastDay === 0 ? 'bg-yellow-500 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
                    >
                      Today
                    </button>
                    <button
                      onClick={() => fetchForecastData(1)}
                      className={`py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-orange-500 transition ${forecastDay === 1 ? 'bg-yellow-500 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
                    >
                      Tomorrow
                    </button>
                    <button
                      onClick={() => fetchForecastData(2)}
                      className={`py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-orange-500 transition ${forecastDay === 2 ? 'bg-yellow-500 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
                    >
                      Day After Tomorrow
                    </button>
                  </div>
                </div>

                {loadingForecast && (
                  <div className="text-center py-8">
                    <p className="text-gray-500">Loading forecast data...</p>
                  </div>
                )}

                {forecastError && (
                  <div className="mt-4 p-3 bg-red-100 text-red-700 rounded" role="alert">
                    {forecastError}
                  </div>
                )}

                {forecastData && !loadingForecast && (
                  <div className="mt-6 h-80 flex justify-center">
                    <div className="w-full max-w-3xl">
                      <Line data={getChartData()} options={chartOptions} />
                    </div>
                  </div>
                )}
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
    </div>
  );
};

export default UVIndexApp;

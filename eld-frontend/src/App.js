import React, { useState } from 'react';
import axios from 'axios';
import Map from './Map';
import { ArrowRight, MapPin, Navigation, Clock, ChevronRight } from 'lucide-react';

function App() {
  const [trip, setTrip] = useState({
    current_location: '',
    pickup_location: '',
    dropoff_location: '',
    current_cycle_used: 0,
  });
  const [route, setRoute] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/trips/', trip);
      console.log('Trip created:', response.data);
      setRoute([
        { lat: 51.505, lng: -0.09, name: 'Current Location' },
        { lat: 51.51, lng: -0.1, name: 'Pickup Location' },
        { lat: 51.51, lng: -0.12, name: 'Dropoff Location' },
      ]);
      setIsFormSubmitted(true);
    } catch (error) {
      console.error('Error creating trip:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container">
      <header className="header">
        <h1>Trip <span>Planner</span></h1>
        <p>Plan your journey with ease and precision</p>
      </header>

      {/* Flex container for form and map */}
      <div className="flex-container">
        <div className="card form-card">
          <h2>
            <Navigation size={24} />
            Journey Details
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>
                <MapPin size={16} />
                Current Location
              </label>
              <input
                type="text"
                placeholder="Where are you now?"
                value={trip.current_location}
                onChange={(e) => setTrip({ ...trip, current_location: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label>
                <MapPin size={16} />
                Pickup Location
              </label>
              <input
                type="text"
                placeholder="Enter pickup location"
                value={trip.pickup_location}
                onChange={(e) => setTrip({ ...trip, pickup_location: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label>
                <MapPin size={16} />
                Dropoff Location
              </label>
              <input
                type="text"
                placeholder="Enter dropoff location"
                value={trip.dropoff_location}
                onChange={(e) => setTrip({ ...trip, dropoff_location: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label>
                <Clock size={16} />
                Current Cycle Used (Hrs)
              </label>
              <input
                type="number"
                placeholder="Hours"
                value={trip.current_cycle_used}
                onChange={(e) => setTrip({ ...trip, current_cycle_used: e.target.value })}
                required
              />
            </div>
            <button type="submit" className="button" disabled={isLoading}>
              {isLoading ? 'Processing...' : 'Plan Trip'}
            </button>
          </form>
        </div>

        <div className="card map-card">
          <h2>
            <ArrowRight size={24} />
            Route Visualization
          </h2>
          {!isFormSubmitted && <p>Your route will appear here after you submit trip details.</p>}
          <div className="map-container">
            <Map route={route} />
          </div>
        </div>
      </div>

      {isFormSubmitted && (
        <div className="summary">
          <h2>Trip Summary</h2>
          <div className="summary-grid">
            <div className="summary-item">
              <h3>Current Location</h3>
              <p>{trip.current_location}</p>
            </div>
            <div className="summary-item">
              <h3>Pickup Location</h3>
              <p>{trip.pickup_location}</p>
            </div>
            <div className="summary-item">
              <h3>Dropoff Location</h3>
              <p>{trip.dropoff_location}</p>
            </div>
            <div className="summary-item">
              <h3>Cycle Used</h3>
              <p>{trip.current_cycle_used} hours</p>
            </div>
          </div>
        </div>
      )}

      <footer className="footer">
        <p>© {new Date().getFullYear()} Trip Planner | Designed for optimal journey planning</p>
      </footer>
    </div>
  );
}

export default App;
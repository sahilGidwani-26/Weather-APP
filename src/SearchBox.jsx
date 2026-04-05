import { useState } from 'react';
import "./SearchBox.css";

export default function SearchBox({ updateInfo }) {
    let [city, setCity] = useState("");
    let [error, setError] = useState(false);
    let [loading, setLoading] = useState(false);

    const API_URL = "https://api.openweathermap.org/data/2.5/weather";
    const API_KEY = "b8044a36333a6a682b729b31f6caceff";

    let getWeatherInfo = async () => {
        let response = await fetch(`${API_URL}?q=${city}&appid=${API_KEY}&units=metric`);
        let jsonResponse = await response.json();
        let result = {
            city: city,
            temp: jsonResponse.main.temp,
            tempMin: jsonResponse.main.temp_min,
            humidity: jsonResponse.main.humidity,
            tempMax: jsonResponse.main.temp_max,
            feelsLike: jsonResponse.main.feels_like,
            weather: jsonResponse.weather[0].description,
        };
        return result;
    };

    let handleChange = (evt) => {
        setCity(evt.target.value);
        setError(false);
    };

    let handleSubmit = async (evt) => {
        evt.preventDefault();
        if (!city.trim()) return;
        setLoading(true);
        setError(false);
        try {
            let newInfo = await getWeatherInfo();
            updateInfo(newInfo);
            setCity("");
        } catch (err) {
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="search-wrapper">
            <div className="search-hero">
                <div className="hero-badge">🌍 Live Weather</div>
                <h1 className="hero-title">
                    <span className="title-line1">Discover</span>
                    <span className="title-line2">The Weather</span>
                </h1>
                <p className="hero-subtitle">Real-time conditions for any city on Earth</p>

                <form onSubmit={handleSubmit} className="search-form">
                    <div className="input-group">
                        <span className="input-icon">📍</span>
                        <input
                            type="text"
                            className="city-input"
                            placeholder="Enter city name..."
                            value={city}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className={`search-btn ${loading ? 'loading' : ''}`}
                        disabled={loading}
                    >
                        {loading ? (
                            <span className="btn-content">
                                <span className="spinner"></span>
                                Searching...
                            </span>
                        ) : (
                            <span className="btn-content">
                                <span>Search</span>
                                <span className="btn-arrow">→</span>
                            </span>
                        )}
                    </button>
                </form>

                {error && (
                    <div className="error-toast">
                        ⚠️ City not found. Please try again.
                    </div>
                )}
            </div>
        </div>
    );
}
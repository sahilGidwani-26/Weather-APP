import "./InfoBox.css";
import ThunderstormIcon from '@mui/icons-material/Thunderstorm';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import SunnyIcon from '@mui/icons-material/Sunny';

export default function InfoBox({ info }) {
    const HOT_URL = "https://images.unsplash.com/photo-1577146544694-d488428de0c1?q=80&w=1170&auto=format&fit=crop";
    const COLD_URL = "https://images.unsplash.com/photo-1614926857083-7be149266cda?w=500&auto=format&fit=crop&q=60";
    const RAIN_URL = "https://images.unsplash.com/photo-1624969914899-60dd740262c5?w=500&auto=format&fit=crop&q=60";

    const isRainy = info.humidity > 75;
    const isHot = info.temp > 15;

    const weatherImage = isRainy ? RAIN_URL : isHot ? HOT_URL : COLD_URL;

    const weatherType = isRainy ? 'rain' : isHot ? 'hot' : 'cold';

    const weatherConfig = {
        rain: {
            icon: <ThunderstormIcon sx={{ fontSize: 28 }} />,
            label: 'Stormy',
            color: '#81d4fa',
            accent: 'rgba(129, 212, 250, 0.15)',
            border: 'rgba(129, 212, 250, 0.25)',
        },
        hot: {
            icon: <SunnyIcon sx={{ fontSize: 28 }} />,
            label: 'Sunny',
            color: '#ffd54f',
            accent: 'rgba(255, 213, 79, 0.12)',
            border: 'rgba(255, 213, 79, 0.25)',
        },
        cold: {
            icon: <AcUnitIcon sx={{ fontSize: 28 }} />,
            label: 'Cold',
            color: '#b3e5fc',
            accent: 'rgba(179, 229, 252, 0.1)',
            border: 'rgba(179, 229, 252, 0.2)',
        },
    };

    const config = weatherConfig[weatherType];

    return (
        <div className="info-wrapper">
            <div className="weather-card" style={{ '--w-color': config.color, '--w-accent': config.accent, '--w-border': config.border }}>

                {/* Image Section */}
                <div className="card-image-wrap">
                    <img src={weatherImage} alt="weather" className="card-image" />
                    <div className="image-overlay" />
                    <div className="weather-badge" style={{ background: config.accent, borderColor: config.border, color: config.color }}>
                        {config.icon}
                        <span>{config.label}</span>
                    </div>
                </div>

                {/* Content */}
                <div className="card-content">
                    <div className="city-header">
                        <h2 className="city-name">{info.city}</h2>
                        <p className="weather-desc">{info.weather}</p>
                    </div>

                    {/* Main Temp */}
                    <div className="main-temp">
                        <span className="temp-value" style={{ color: config.color }}>
                            {Math.round(info.temp)}°
                        </span>
                        <span className="temp-unit">C</span>
                        <div className="feels-like">
                            Feels like {info.feelsLike}°C
                        </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="stats-grid">
                        <div className="stat-card">
                            <span className="stat-icon">💧</span>
                            <span className="stat-label">Humidity</span>
                            <span className="stat-value" style={{ color: config.color }}>{info.humidity}%</span>
                        </div>
                        <div className="stat-card">
                            <span className="stat-icon">🌡️</span>
                            <span className="stat-label">Min Temp</span>
                            <span className="stat-value" style={{ color: config.color }}>{info.tempMin}°C</span>
                        </div>
                        <div className="stat-card">
                            <span className="stat-icon">☀️</span>
                            <span className="stat-label">Max Temp</span>
                            <span className="stat-value" style={{ color: config.color }}>{info.tempMax}°C</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
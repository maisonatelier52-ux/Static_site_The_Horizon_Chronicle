// Lightweight live-weather helper built on Open-Meteo's free, key-less APIs.
// 1) Geocode the configured city name -> lat/lon
// 2) Fetch current weather for that lat/lon
// Both requests are cheap, cached in-memory for the session, and safe to
// call from a client component's useEffect.

const WEATHER_CODES = {
  0: "Clear",
  1: "Mostly Clear",
  2: "Partly Cloudy",
  3: "Overcast",
  45: "Foggy",
  48: "Foggy",
  51: "Light Drizzle",
  53: "Drizzle",
  55: "Heavy Drizzle",
  56: "Freezing Drizzle",
  57: "Freezing Drizzle",
  61: "Light Rain",
  63: "Rain",
  65: "Heavy Rain",
  66: "Freezing Rain",
  67: "Freezing Rain",
  71: "Light Snow",
  73: "Snow",
  75: "Heavy Snow",
  77: "Snow Grains",
  80: "Light Showers",
  81: "Showers",
  82: "Heavy Showers",
  85: "Snow Showers",
  86: "Snow Showers",
  95: "Thunderstorm",
  96: "Thunderstorm",
  99: "Thunderstorm",
};

export function describeWeatherCode(code) {
  return WEATHER_CODES[code] || "Clear";
}

// "New York, USA" -> "New York" (geocoding works best on just the city name)
function primaryCityName(cityLabel = "") {
  return cityLabel.split(",")[0].trim();
}

let cache = null; // { key, promise } — avoids duplicate calls on fast re-renders

export async function fetchCityWeather(cityLabel, { unit = "celsius" } = {}) {
  const cacheKey = `${cityLabel}:${unit}`;
  if (cache && cache.key === cacheKey) return cache.promise;

  const promise = (async () => {
    const cityName = primaryCityName(cityLabel);

    const geoRes = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
        cityName,
      )}&count=1&language=en&format=json`,
    );
    if (!geoRes.ok) throw new Error("Geocoding request failed");
    const geoData = await geoRes.json();
    const place = geoData?.results?.[0];
    if (!place) throw new Error(`No location match for "${cityName}"`);

    const tempUnitParam = unit === "fahrenheit" ? "&temperature_unit=fahrenheit" : "";
    const weatherRes = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${place.latitude}&longitude=${place.longitude}&current_weather=true${tempUnitParam}`,
    );
    if (!weatherRes.ok) throw new Error("Weather request failed");
    const weatherData = await weatherRes.json();
    const current = weatherData?.current_weather;
    if (!current) throw new Error("No current weather in response");

    return {
      city: place.name,
      country: place.country,
      temperature: Math.round(current.temperature),
      unit: unit === "fahrenheit" ? "°F" : "°C",
      condition: describeWeatherCode(current.weathercode),
    };
  })();

  cache = { key: cacheKey, promise };
  return promise;
}
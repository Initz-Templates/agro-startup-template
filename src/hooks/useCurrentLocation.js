import { useEffect, useState } from "react";

const STORAGE_KEY = "farmstore:user-location";
const STORAGE_DETAILS_KEY = "farmstore:user-location-details";

export const useCurrentLocation = () => {
  const [locationLabel, setLocationLabel] = useState("Location not shared");
  const [locationDetails, setLocationDetails] = useState({
    city: "",
    state: "",
    country: "",
    postalCode: "",
    latitude: null,
    longitude: null,
  });
  const [loadingLocation, setLoadingLocation] = useState(false);
  const [locationError, setLocationError] = useState("");

  useEffect(() => {
    const cached = localStorage.getItem(STORAGE_KEY);
    const cachedDetails = localStorage.getItem(STORAGE_DETAILS_KEY);
    if (cached) {
      setLocationLabel(cached);
    }
    if (cachedDetails) {
      try {
        setLocationDetails(JSON.parse(cachedDetails));
      } catch (error) {
        // ignore malformed cached value
      }
    }
  }, []);

  const requestLocation = async () => {
    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported in this browser.");
      return null;
    }

    setLoadingLocation(true);
    setLocationError("");

    return new Promise((resolve) => {
      navigator.geolocation.getCurrentPosition(
        async ({ coords }) => {
          try {
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${coords.latitude}&lon=${coords.longitude}`
            );
            const data = await response.json();
            const city = data?.address?.city || data?.address?.town || data?.address?.village || "";
            const state = data?.address?.state || "";
            const country = data?.address?.country || "";
            const postalCode = data?.address?.postcode || "";
            const label = [city, state, country].filter(Boolean).join(", ") || `${coords.latitude.toFixed(3)}, ${coords.longitude.toFixed(3)}`;
            const details = {
              city,
              state,
              country,
              postalCode,
              latitude: coords.latitude,
              longitude: coords.longitude,
            };
            setLocationLabel(label);
            setLocationDetails(details);
            localStorage.setItem(STORAGE_KEY, label);
            localStorage.setItem(STORAGE_DETAILS_KEY, JSON.stringify(details));
            resolve(details);
          } catch (error) {
            const fallbackLabel = `${coords.latitude.toFixed(3)}, ${coords.longitude.toFixed(3)}`;
            const details = {
              city: "",
              state: "",
              country: "",
              postalCode: "",
              latitude: coords.latitude,
              longitude: coords.longitude,
            };
            setLocationLabel(fallbackLabel);
            setLocationDetails(details);
            localStorage.setItem(STORAGE_KEY, fallbackLabel);
            localStorage.setItem(STORAGE_DETAILS_KEY, JSON.stringify(details));
            resolve(details);
          } finally {
            setLoadingLocation(false);
          }
        },
        (error) => {
          setLoadingLocation(false);
          if (error?.code === 1) {
            setLocationError("Location access denied.");
          } else {
            setLocationError("Unable to fetch current location.");
          }
          resolve(null);
        }
      );
    });
  };

  return { locationLabel, locationDetails, loadingLocation, locationError, requestLocation };
};

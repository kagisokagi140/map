"use client";
import "mapbox-gl/dist/mapbox-gl.css";
import React, { useState, useEffect, useRef } from "react";
import mapboxgl, { accessToken } from "mapbox-gl";
import { Card } from "@/components/ui/card";
import ReactDOM from "react-dom";
import MapboxDirections from "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import { generateRandomPolygons } from "./map/genPolygons";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import { Tab } from "./tabs";
import axios from "axios";
import addMapLayers from "./map/maplayers";
//import { Button } from "@/components/ui/button";
import { Button } from "@/components/ui/button";
import { TiWeatherCloudy } from "react-icons/ti";
import { FaGasPump } from "react-icons/fa";

const SearchTab = ({
  query,
  handleInputChange,
  suggestions,
  handleResultSelect,
  mapstyle,
}: any) => {
  const [min, setMin] = useState<number>(10); // Provide a default value (e.g., 0)
  const [max, setMax] = useState<number>(20); // Provide a default value (e.g., 0)
  const [width, setWidth] = useState<number>(5); // Provide a default value (e.g., 0)

  const handleApply = (
    minValue: number,
    maxValue: number,
    maxWidth: number
  ) => {
    // Update the min and max values
    setMin(isNaN(minValue) ? 0 : minValue);
    setMax(isNaN(maxValue) ? 0 : maxValue);
    setWidth(maxWidth);
  };

  return (
    <>
      <Tab
        query={query}
        handleInputChange={handleInputChange}
        suggestions={suggestions}
        handleResultSelect={handleResultSelect}
        minSize={min} // Pass minSize as prop
        maxSize={max} // Pass maxSize as prop
        maxWidth={width}
        handleApply={handleApply}
        mapstyle={mapstyle}
      />
    </>
  );
};

const MapBox = () => {
  const mapContainer = useRef<HTMLDivElement | null>(null);

  // this is setting up the location to South Africa Gauteng (initial location)
  const [lng] = useState(28.0473);
  const [lat] = useState(-26.2041);
  // const mapStyle = "mapbox://styles/mapbox/satellite-v9";

  // mapbox://styles/mapbox/satellite-v9
  // mapbox://styles/mapbox/satellite-streets-v11
  const [query, setQuery] = useState("");
  // when a user click
  const [suggestions, setSuggestions] = useState([]);
  const [zoom, setZoom] = useState(8);

  const [mapStyle, setMapStyle] = useState(false);

  // State for isochrones data
  const [isochronesData, setIsochrones] = useState<any>(null);
  const geocoderRef = useRef<MapboxGeocoder | null>(null);
  // Use a ref to store the map instance
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const [min, setMin] = useState<number>(10); // Provide a default value (e.g., 0)
  const [max, setMax] = useState<number>(20); // Provide a default value (e.g., 0)


  const [maxWidth, setWidth] = useState<number>(20); // Provide a default value (e.g., 0)


  // Declare the map variable outside the useEffect
  mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX as string;


  const handleResultSelect = async (result: any, polygons: any) => {
    const coordinates = result.geometry.coordinates;

    // Fetch isochrones data from API route
    try {
      const response = await fetch(
        `/api/isochrones?coordinates=${coordinates}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch isochrones");
      }

      const data = await response.json();
      const isochrones = data.isochrones;

      let map = mapRef.current;
      if (mapRef.current) {
        setZoom(8);
        mapRef.current.flyTo({ center: coordinates, zoom: 10 });
        setIsochrones(isochrones);

        addMapLayers(map, polygons, isochrones);

        // Render isochrones on the map
      }
    } catch (error) {
      console.error("Error fetching isochrones:", error);
      // Handle error
    }
  };

 
  useEffect(() => {


    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX as string;

    let map: mapboxgl.Map;
    map = new mapboxgl.Map({
      container: mapContainer.current!,
      style: mapStyle
        ? "mapbox://styles/mapbox/satellite-v9"
        : "mapbox://styles/mapbox/satellite-streets-v11",
      center: [lng, lat],
      zoom: zoom,
      maxBounds: [
        [-24.6, -46.8], // Southwest coordinates of South Africa Gauteng
        [-51.3, 37.3], // Northeast coordinates of South Africa Gauteng

      ],
    });

    map.on("load", () => {
      map.addControl(new mapboxgl.NavigationControl());
    

      map.addControl(
      new MapboxDirections({
        accessToken:mapboxgl.accessToken,
        unit: "metric",
        profile:"mapbox/driving",

      }),
      "top-left"
      
      );

      map.addLayer({
        id: "traffic",
        type:"line",
        source:{
          type:"vector",
          url: "mapbox://mapbox.mapbox-traffic-v1"
        },
        "source-layer": "traffic",
        paint:{
          "line-color" :"#ff0000",
          "line-width" :2
        } 
      })


      const polygons = generateRandomPolygons();

      addMapLayers(map, polygons, isochronesData);
      // addMapLayers(mapRef.current, polygons);

      // Add popup on hover
      const popup = new mapboxgl.Popup({
        closeButton: true,
        closeOnClick: true,
      });

      map.on("mouseenter", "randomPolygons", (e) => {
        map.getCanvas().style.cursor = "pointer";
        const feature = e.features?.[0];
        const title = feature?.properties?.title;
        const size = feature?.properties?.size;
        const popupContent = document.createElement("div");

        ReactDOM.render(
          <Card className="p-6 text-base text-gray-600 font-medium -m-6">
            Name: {title} <br />
            Size: {size}
          </Card>,
          popupContent
        );

        popup.setLngLat(e.lngLat).setDOMContent(popupContent).addTo(map);
      });

      map.on("mouseleave", "randomPolygons", () => {
        map.getCanvas().style.cursor = "pointer";
        popup.remove();
      });
    });

    mapRef.current = map; // Assign the map instance to the ref

    // geo encoder
    const geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl,
    });

    geocoderRef.current = geocoder;
    // Get the geocoder control's container element
    const geocoderContainer = map
      .getContainer()
      .querySelector(".mapboxgl-ctrl-top-right");

    // Set the  display off for geocoder
    if (geocoderContainer) {
   
      (geocoderContainer as HTMLElement).style.display = "none";
    }

    geocoder.on("result", (event) => {
      setQuery(event.result.text);
      setSuggestions(event.features);
    });

    geocoder.on("results", (event) => {
      setSuggestions(event.features);
    });

    map.addControl(geocoder);
    geocoderRef.current = geocoder;

    return () => {
      map.remove();
      if(geocoderRef.current && typeof geocoderRef.current.off ==="function"){
        try{
          geocoderRef.current.off("result");
          geocoderRef.current.off("results");
        }catch (error){
          console.error("Error removing event listeners from Mapbox Geocoder:", error);
        }
    }else{
      console.warn("Mapbox Geocoder ref or off is not available.");
    }
  };
}, [lng, lat, mapStyle, zoom]);

  const handleInputChange = (event: { target: { value: any } }) => {
    const input = event.target.value;
    setQuery(input);

    geocoderRef.current!.setInput(input); // Update the input of the geocoder
  };

  async (waypoints: any[]) => {
    try{
      const response =await axios.get(
        `https://api.mapbox.com/optimized-trips/v1/mapbox/driving/${waypoints.join(
          ";"
        )}?access_token=${mapboxgl.accessToken}`
      );
      const data = response.data;
      const route = data.routes[0];
      const geometry = route.geometry;

     renderRoute(geometry);

    } catch (error) {
      console.error("Error fetching optimized route",error);
    }
  };

  const renderRoute = (geometry: any) => {
    if (mapRef.current){
      mapRef.current.addSource("route", {
        type:"geojson",
        data:{
          type:"Feature",
          properties:{},
          geometry:{
            type :"LineString",
            coordinates:geometry.coordinates,
          }
       }
      })
      
      mapRef.current.addLayer({
        id: "route",
        type:"line",
        source:"route",
        layout:{
          "line-join" : "round",
          "line-cap": "round",
        },
        paint:{
          "line-color": "#0000ff",
          "line-width" : 5,
        },
      });
    }
  };

 

  return (
    <div className="flex px-6 space-x-8">
      <div className=" flex w-[300px] lg:relative fixed z-10 w-full justify-between m-16 lg:m-0">

        <SearchTab
          handleInputChange={handleInputChange}
          handleResultSelect={handleResultSelect}
          query={query}
          suggestions={suggestions}
          min={min}
          max={max}
          maxWidth={maxWidth}
          mapstyle={() => setMapStyle(!mapStyle)}
        />

      </div>

      <div className="w-full">
        <div id="map" >
          <div
            data-query={query}
            className="bg-white  w-[800px] h-[800px] md:w-[1100px] h-[800px]  shadow-lg my-2 rounded-2xl"
            ref={mapContainer}
          />
          
      </div>
    </div>
    </div>
  );
};

export default MapBox;

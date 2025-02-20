import { useLocation } from "./context/Context";
import locations from "./data/loactions";
import { GlobeAltIcon, MapIcon } from '@heroicons/react/24/outline';
import Globe from 'react-globe.gl';
import { useRef, useEffect } from 'react';
import { CustomDropdown } from './components/CustomDropdown';
import { AnimatedBackground } from './components/AnimatedBackground';

export default function Locations() {
  const { country, state, setCountry, setState } = useLocation();
  const globeRef = useRef<any>(null);

  useEffect(() => {
    if (globeRef.current) {
      const controls = globeRef.current.controls();
      if (controls) {
        controls.autoRotate = true;
        controls.autoRotateSpeed = 0.5;
      }
    }
  }, []);

  const countryOptions = locations.map(loc => ({
    name: loc.name,
    value: loc.name
  }));

  const stateOptions = locations
    .find(loc => loc.name === country)
    ?.states.map(state => ({
      name: state.name,
      value: state.name
    })) || [];

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-gray-900/80 via-purple-900/60 to-gray-900/80 overflow-hidden">
      <AnimatedBackground />
      
      {/* Globe component with reduced opacity */}
      <div className="absolute inset-0 opacity-15 blur-md animate-pulse-slow">
        <Globe
          ref={globeRef}
          globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
          width={window.innerWidth}
          height={window.innerHeight}
          backgroundColor="rgba(0,0,0,0)"
          atmosphereColor="#3a3a3a"
          atmosphereAltitude={0.15}
          showAtmosphere={true}
        />
      </div>

      {/* Card Container */}
      <div className="fixed inset-0 flex items-center justify-center p-6 md:p-8 lg:p-10">
        <div className="bg-black/30 text-white space-y-8 p-8 md:p-10 lg:p-12 rounded-3xl shadow-2xl max-w-3xl w-full 
                     border border-gray-700/20 backdrop-blur-2xl
                     hover:shadow-cyan-600/20 hover:border-gray-600/30
                     transition-all duration-500 animate-fadeIn">
          {/* Header Section */}
          <section className="space-y-10">
            <div className="text-center space-y-4">
              <GlobeAltIcon className="h-16 w-16 mx-auto text-cyan-400 animate-spin-slow" />
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-cyan-400 via-teal-400 to-emerald-400 bg-clip-text text-transparent">
                Explore Locations
              </h2>
              <p className="text-gray-300 text-sm md:text-base font-medium">
                Discover places around the globe. Select a country and state to begin.
              </p>
            </div>

            {/* Selection Forms */}
            <div className="space-y-8">
              <CustomDropdown
                options={countryOptions}
                value={country}
                onChange={setCountry}
                placeholder="Select a country"
                icon={<GlobeAltIcon className="h-5 w-5 text-cyan-400" />}
                accentColor="cyan"
              />

              <CustomDropdown
                options={stateOptions}
                value={state}
                onChange={setState}
                placeholder="Select a state"
                disabled={!country}
                icon={<MapIcon className="h-5 w-5 text-teal-400" />}
                accentColor="teal"
              />
            </div>
          </section>

          {/* Selected Location Display */}
          <section className="mt-16 p-8 bg-black/70 backdrop-blur-md rounded-2xl border border-gray-700
                          hover:border-gray-600 transition-all duration-300">
            <h3 className="text-lg md:text-xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent
                          flex items-center space-x-3">
              <MapIcon className="h-6 w-6 text-cyan-400" />
              <span>Selected Location</span>
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center text-gray-300">
                <span className="font-medium">Country</span>
                <span className="font-semibold text-cyan-400 text-lg">
                  {country || <span className="text-gray-500 text-base font-normal">Not selected</span>}
                </span>
              </div>
              <div className="border-t border-gray-700/50"></div>
              <div className="flex justify-between items-center text-gray-300">
                <span className="font-medium">State</span>
                <span className="font-semibold text-teal-400 text-lg">
                  {state || <span className="text-gray-500 text-base font-normal">Not selected</span>}
                </span>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

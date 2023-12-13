'use client';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '400px',
};

interface Location {
  lat: number;
  lng: number;
}

const natoreLocation: Location = {
  lat: 24.41216, // Replace with the actual latitude for Natore
  lng: 88.9913344, // Replace with the actual longitude for Natore
};

const gazipurLocation: Location = {
  lat: 23.9997558, // Replace with the actual latitude for Gazipur
  lng: 90.4173629, // Replace with the actual longitude for Gazipur
};
//ISSUE - process.env not working
const Map = () => {
  return (
    <section className='container pb-32 mt-16 mx-auto '>
      <div className=''>
        <LoadScript
          // googleMapsApiKey={`${process.env.GOOGLE_API_KEY}`}
          googleMapsApiKey={'AIzaSyCFtxcenbj7IFAbULylvZ1ViAeY7jvDKfY'}
        >
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={natoreLocation}
            zoom={8}
          >
            <Marker position={natoreLocation} />
            <Marker position={gazipurLocation} />
          </GoogleMap>
        </LoadScript>
        {/* <div className='grid grid-cols-1 md:grid-cols-2 py-16  gap-y-10 md:gap-x-28   text-secondary '> */}
        <div className=' py-16  md:flex justify-between items-center  text-secondary md:space-x-28 space-y-8 md:space-y-0 '>
          <div className=' space-y-3 text-base font-normal   text-justify flex-1 '>
            <h6 className='text-xl pb-2 '>Natore Office</h6>
            <div className=' flex justify-between'>
              <strong>House</strong>
              <p>23/B Block-C</p>
            </div>
            <div className=' flex justify-between'>
              <strong>Street</strong>
              <p>Halfrasta,Natore Sadar Natore</p>
            </div>
            <div className=' flex justify-between'>
              <strong>Contact</strong>
              <p>+880180000000</p>
            </div>
          </div>
          <div className=' space-y-3 text-base font-normal  text-justify flex-1 '>
            <h6 className='text-xl pb-2 '>Gazipur Office</h6>
            <div className=' flex justify-between'>
              <strong>House</strong>
              <p>15/A Block-B</p>
            </div>
            <div className=' flex justify-between'>
              <strong>Street</strong>
              <p>Konabari ,Gazipur</p>
            </div>
            <div className=' flex justify-between'>
              <strong>Contact</strong>
              <p>+880188888888</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Map;

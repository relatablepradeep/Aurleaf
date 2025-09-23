import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Users, Calendar, MapPin, Award, MessageCircle, Clock } from "lucide-react";

// Import all JSON files eagerly
const cityFiles = import.meta.glob('./data/*.json', { eager: true });

// Ayurvedic color palette
const colors = {
  primary: "#5E8B7E", // sage green
  secondary: "#A7C4BC", // lighter green
  accent: "#DFBE99", // warm beige
  text: "#2F4858", // deep blue-gray
  lightBg: "#F7F1E5", // soft cream
};

// Default doctor avatar
const DefaultAvatar = ({ name }) => {
  const initials = name.split(' ').map(n => n[0]).join('').toUpperCase();
  
  return (
    <div className="w-full h-40 rounded-md flex items-center justify-center bg-gradient-to-br from-green-100 to-teal-50">
      <div className="w-24 h-24 rounded-full bg-gradient-to-br from-teal-500 to-green-400 flex items-center justify-center text-white text-2xl font-bold shadow-md">
        {initials}
      </div>
    </div>
  );
};

const Ayudoctor = () => {
  const { city } = useParams();
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterSpecialty, setFilterSpecialty] = useState("");
  const [specialties, setSpecialties] = useState([]);

  useEffect(() => {
    setLoading(true);
    const fileKey = `./data/${city}.json`;

    if (cityFiles[fileKey]) {
      const jsonData = cityFiles[fileKey];
      const actualData = jsonData.default || jsonData;

      if (Array.isArray(actualData)) {
        setDoctors(actualData);
        
        // Extract unique specialties for filter
        const specs = new Set();
        actualData.forEach(doc => {
          const spec = doc.specialization_experience.split(',')[0].trim();
          specs.add(spec);
        });
        setSpecialties([...specs]);
      } else {
        console.warn("Unexpected JSON structure in", fileKey);
      }
    } else {
      console.warn(`No data found for city: ${city}`);
    }
    
    setTimeout(() => setLoading(false), 600); // Add slight delay for animation effect
  }, [city]);

  const filteredDoctors = filterSpecialty 
    ? doctors.filter(doc => doc.specialization_experience.includes(filterSpecialty))
    : doctors;

  return (
    <div className="min-h-screen" style={{ backgroundColor: colors.lightBg }}>
      <div className="bg-gradient-to-r from-teal-600 to-green-500 text-white py-8 px-6 shadow-lg">
        <div className="container mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <Users className="h-6 w-6" />
            <h1 className="text-3xl font-bold capitalize">
              Ayurvedic Physicians in {city}
            </h1>
          </div>
          <p className="opacity-90 ml-9">
            Find holistic healing with our experienced Ayurvedic doctors
          </p>
        </div>
      </div>

      <div className="container mx-auto p-6">
        {specialties.length > 0 && (
          <div className="mb-6">
            <div className="flex flex-wrap gap-2">
              <button 
                className={`px-4 py-2 rounded-full text-sm ${!filterSpecialty ? 'bg-teal-600 text-white' : 'bg-teal-100 text-teal-800'} transition-all duration-300`}
                onClick={() => setFilterSpecialty("")}
              >
                All Specialties
              </button>
              
              {specialties.map(spec => (
                <button 
                  key={spec}
                  className={`px-4 py-2 rounded-full text-sm ${filterSpecialty === spec ? 'bg-teal-600 text-white' : 'bg-teal-100 text-teal-800'} transition-all duration-300`}
                  onClick={() => setFilterSpecialty(spec)}
                >
                  {spec}
                </button>
              ))}
            </div>
          </div>
        )}

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-pulse flex flex-col items-center">
              <div className="w-16 h-16 bg-teal-200 rounded-full mb-3"></div>
              <div className="h-4 bg-teal-100 rounded w-32"></div>
            </div>
          </div>
        ) : filteredDoctors.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-teal-600 text-5xl mb-4">¯\_(ツ)_/¯</div>
            <p className="text-gray-600">No doctors found in this category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDoctors.map((doc, i) => (
              <div 
                key={i} 
                className="bg-white rounded-xl overflow-hidden shadow-lg transform transition duration-300 hover:shadow-xl hover:-translate-y-1 hover:scale-105 flex flex-col h-full"

                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="h-44 overflow-hidden">
                  {doc.photo_url && doc.photo_url !== "N/A" ? (
                    <img
                      src={doc.photo_url}
                      alt={doc.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <DefaultAvatar name={doc.name} />
                  )}
                </div>
                
                <div className="p-5 flex flex-col flex-grow">
                  <h2 className="text-xl font-bold mb-2" style={{ color: colors.text }}>
                    {doc.name}
                  </h2>
                  
                  <div className="flex items-start gap-2 mb-2">
                    <Award className="h-4 w-4 mt-1 flex-shrink-0 text-teal-600" />
                    <p className="text-sm text-teal-700">
                      {doc.specialization_experience}
                    </p>
                  </div>
                  
                  <div className="flex items-start gap-2 mb-2">
                    <MapPin className="h-4 w-4 mt-1 flex-shrink-0 text-teal-600" />
                    <p className="text-sm text-gray-700">{doc.location}</p>
                  </div>
                  
                  <div className="flex items-start gap-2 mb-2">
                    <Award className="h-4 w-4 mt-1 flex-shrink-0 text-teal-600" />
                    <p className="text-sm">
                      <span className="font-medium">Qualification: </span>
                      <span className="text-gray-800">{doc.qualification}</span>
                    </p>
                  </div>
                  
                  <div className="flex items-start gap-2 mb-2">
                    <MessageCircle className="h-4 w-4 mt-1 flex-shrink-0 text-teal-600" />
                    <p className="text-sm">
                      <span className="font-medium">Languages: </span>
                      <span className="text-gray-800">{doc.languages}</span>
                    </p>
                  </div>
                  
                  <div className="flex items-start gap-2 mb-4 flex-grow">
                    <Clock className="h-4 w-4 mt-1 flex-shrink-0 text-teal-600" />
                    <p className="text-sm text-teal-700 font-medium">
                      {doc.timing}
                    </p>
                  </div>
                  
                  <button onClick={() => {
                      window.location.href = 'https://www.askapollo.com/physical-appointment/city';
                    }}
                    className="w-full py-3 rounded-lg bg-gradient-to-r from-teal-500 to-green-500 text-white font-medium shadow-md hover:shadow-lg transform transition duration-300 hover:-translate-y-0.5 flex items-center justify-center gap-2 mt-auto"
                  >
                    <Calendar className="h-5 w-5" />
                    Book Appointment
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Ayudoctor;
import { useParams, useNavigate } from 'react-router';
import { useEffect, useState, useRef } from 'react';
import disease_data from './scraped_diseases.json';

export default function Disease() {
  const { diseaseId } = useParams();
  const [disease, setDisease] = useState(null);
  const [activeSection, setActiveSection] = useState('overview');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
  
  // Refs for scrolling to sections
  const overviewRef = useRef(null);
  const keyFactsRef = useRef(null);
  const symptomsRef = useRef(null);
  const diagnosisRef = useRef(null);
  const preventionRef = useRef(null);
  const specialistsRef = useRef(null);
  const homeCareRef = useRef(null);
  const dosAndDontsRef = useRef(null);
  const alternativeTherapiesRef = useRef(null);

  useEffect(() => {
    if (!diseaseId) return;
    const decodedId = decodeURIComponent(diseaseId).toLowerCase();

    const found = disease_data.find(
      (d) =>
        d.alt_text?.toLowerCase() === decodedId ||
        d.disease_name?.toLowerCase() === decodedId
    );

    setDisease(found);
  }, [diseaseId]);

  useEffect(() => {
    // Setup intersection observer to update active section
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.dataset.section);
          }
        });
      },
      { threshold: 0.5 }
    );

    // Observe all section refs
    const refs = [
      { ref: overviewRef, id: 'overview' },
      { ref: keyFactsRef, id: 'keyFacts' },
      { ref: symptomsRef, id: 'symptoms' },
      { ref: diagnosisRef, id: 'diagnosis' },
      { ref: preventionRef, id: 'prevention' },
      { ref: specialistsRef, id: 'specialists' },
      { ref: homeCareRef, id: 'homeCare' },
      { ref: dosAndDontsRef, id: 'dosAndDonts' },
      { ref: alternativeTherapiesRef, id: 'alternativeTherapies' }
    ];

    refs.forEach(({ ref, id }) => {
      if (ref.current) {
        ref.current.dataset.section = id;
        observer.observe(ref.current);
      }
    });

    return () => {
      refs.forEach(({ ref }) => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      });
    };
  }, [disease]);

  const scrollToSection = (sectionRef) => {
    if (sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (!disease) {
    return (
      <div className="p-6 text-center text-amber-700 font-semibold bg-amber-50 min-h-screen flex items-center justify-center">
        <div className="max-w-md">
          <h2 className="text-2xl font-serif mb-3">Disease Not Found</h2>
          <p className="mb-4">The Ayurvedic remedy you are searching for cannot be found.</p>
          <button 
            onClick={() => navigate('/')} 
            className="px-4 py-2 bg-amber-600 text-amber-50 rounded hover:bg-amber-700 transition-colors"
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  const sections = [
    { id: 'overview', title: 'Overview', ref: overviewRef, condition: disease.overview_text },
    { id: 'keyFacts', title: 'Key Facts', ref: keyFactsRef, condition: disease.keyfacts?.length > 0 && disease.keyfacts.some(f => f.title || f.values?.[0]) },
    { id: 'symptoms', title: 'Symptoms', ref: symptomsRef, condition: disease.symptoms?.length > 0 },
    { id: 'diagnosis', title: 'Diagnosis', ref: diagnosisRef, condition: (disease.diagnosis_title || disease.diagnosis_text) },
    { id: 'prevention', title: 'Prevention', ref: preventionRef, condition: (disease.prevention_title || disease.prevention_text) },
    { id: 'specialists', title: 'Specialists', ref: specialistsRef, condition: (disease.specialist_title || disease.specialist_description || disease.specialists?.length) },
    { id: 'homeCare', title: 'Home Care', ref: homeCareRef, condition: (disease.home_care_title || disease.home_care_text) },
    { id: 'dosAndDonts', title: "Do's & Don'ts", ref: dosAndDontsRef, condition: (disease.dos?.length || disease.donts?.length) },
    { id: 'alternativeTherapies', title: 'Alternative Therapies', ref: alternativeTherapiesRef, condition: (disease.alternative_therapies_title || disease.alternative_therapies_text) }
  ];

  // Filter available sections
  const availableSections = sections.filter(section => section.condition);

  return (
    <div className="flex flex-col md:flex-row bg-amber-50 min-h-screen font-serif">
      {/* Sidebar Toggle Button */}
      <button 
        className="md:hidden fixed top-4 right-4 z-20 bg-amber-500 text-white w-10 h-10 rounded-full shadow-lg flex items-center justify-center"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? '✕' : '☰'}
      </button>

      {/* Left Side Navigation */}
      <div className={`w-full md:fixed md:w-56 lg:w-64 bg-amber-100 p-4 shadow-inner flex-shrink-0 overflow-y-auto md:h-screen transform md:transform-none transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
        <div className="sticky top-4">
          <h3 className="text-xl font-semibold text-amber-800 mb-6 border-b border-amber-300 pb-2">
            Treatment Journey
          </h3>
          <div className="flex flex-col space-y-2">
            {availableSections.map((section, index) => (
              <button
                key={section.id}
                onClick={() => {
                  scrollToSection(section.ref);
                  setIsSidebarOpen(false);
                }}
                className={`flex items-center p-3 rounded-lg transition-all ${
                  activeSection === section.id
                    ? 'bg-amber-500 text-white font-medium'
                    : 'text-amber-800 hover:bg-amber-200'
                }`}
              >
                <div className="flex items-center mr-4">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    index < availableSections.findIndex(s => s.id === activeSection)
                      ? 'bg-amber-600 text-white'
                      : activeSection === section.id
                      ? 'bg-white text-amber-600 border-2 border-amber-500'
                      : 'bg-amber-200 text-amber-600'
                  }`}>
                    {index + 1}
                  </div>
                  {index < availableSections.length - 1 && (
                    <div className={`h-8 w-0.5 absolute ml-4 mt-15 ${
                      index < availableSections.findIndex(s => s.id === activeSection)
                        ? 'bg-amber-600'
                        : 'bg-amber-300'
                    }`}></div>
                  )}
                </div>
                <span className="text-base lg:text-lg">{section.title}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-grow p-6 md:p-8 lg:p-10 max-w-6xl mx-auto md:ml-56 lg:ml-64 overflow-y-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-center md:items-start mb-10 border-b-2 border-amber-200 pb-8">
          <img
            src={disease.image_url || '/api/placeholder/200/200'}
            alt={disease.alt_text || 'Ayurvedic Remedy'}
            className="w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 object-cover rounded-full border-4 border-amber-300 shadow-lg mb-4 md:mb-0 md:mr-8"
            onError={(e) => {
              e.target.src = '/api/placeholder/200/200';
            }}
          />
          <div className="text-center md:text-left">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-amber-800 font-serif">{disease.alt_text || 'Ayurvedic Remedy'}</h1>
            <p className="text-lg md:text-xl lg:text-2xl text-amber-700 mt-2">{disease.disease_name}</p>
            {disease.brief_text && (
              <p className="text-base md:text-lg italic text-amber-600 mt-3 max-w-3xl">{disease.brief_text}</p>
            )}
          </div>
        </div>

        {/* Overview */}
        {disease.overview_text && (
          <section ref={overviewRef} className="mb-10 scroll-mt-4">
            <h2 className="text-2xl md:text-3xl font-semibold text-amber-800 mb-4 border-l-4 border-amber-500 pl-4">Overview</h2>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-amber-200">
              <p className="text-lg md:text-xl text-amber-900 leading-relaxed">{disease.overview_text}</p>
            </div>
          </section>
        )}

        {/* Key Facts */}
        {disease.keyfacts?.length > 0 && disease.keyfacts.some(f => f.title || f.values?.[0]) && (
          <section ref={keyFactsRef} className="mb-10 scroll-mt-4">
            <h2 className="text-2xl md:text-3xl font-semibold text-amber-800 mb-4 border-l-4 border-amber-500 pl-4">Key Facts</h2>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-amber-200">
              <ul className="space-y-3">
                {disease.keyfacts.map((fact, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="text-amber-500 text-xl mr-3">•</span>
                    <div>
                      <span className="font-semibold text-amber-800 text-lg md:text-xl">{fact.title}: </span>
                      <span className="text-amber-700 text-lg md:text-xl">{fact.values?.join(', ')}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {/* Symptoms */}
        {disease.symptoms?.length > 0 && (
          <section ref={symptomsRef} className="mb-10 scroll-mt-4">
            <h2 className="text-2xl md:text-3xl font-semibold text-amber-800 mb-4 border-l-4 border-amber-500 pl-4">Symptoms</h2>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-amber-200">
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {disease.symptoms.map((symptom, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="text-amber-500 text-xl mr-3">•</span>
                    <span className="text-amber-700 text-lg">{symptom}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {/* Diagnosis */}
        {(disease.diagnosis_title || disease.diagnosis_text) && (
          <section ref={diagnosisRef} className="mb-10 scroll-mt-4">
            <h2 className="text-2xl md:text-3xl font-semibold text-amber-800 mb-4 border-l-4 border-amber-500 pl-4">
              {disease.diagnosis_title || 'Diagnosis'}
            </h2>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-amber-200">
              <p className="text-lg md:text-xl text-amber-900 leading-relaxed">{disease.diagnosis_text}</p>
            </div>
          </section>
        )}

        {/* Prevention */}
        {(disease.prevention_title || disease.prevention_text) && (
          <section ref={preventionRef} className="mb-10 scroll-mt-4">
            <h2 className="text-2xl md:text-3xl font-semibold text-amber-800 mb-4 border-l-4 border-amber-500 pl-4">
              {disease.prevention_title || 'Prevention'}
            </h2>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-amber-200">
              <p className="text-lg md:text-xl text-amber-900 leading-relaxed">{disease.prevention_text}</p>
            </div>
          </section>
        )}

        {/* Specialists */}
        {(disease.specialist_title || disease.specialist_description || disease.specialists?.length) && (
          <section ref={specialistsRef} className="mb-10 scroll-mt-4">
            <h2 className="text-2xl md:text-3xl font-semibold text-amber-800 mb-4 border-l-4 border-amber-500 pl-4">
              {disease.specialist_title || 'Specialists'}
            </h2>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-amber-200">
              {disease.specialist_description && (
                <p className="text-lg md:text-xl text-amber-900 leading-relaxed mb-4">{disease.specialist_description}</p>
              )}
              {disease.specialists?.length > 0 && (
                <ul className="space-y-2">
                  {disease.specialists.map((spec, idx) =>
                    spec && (
                      <li key={idx} className="flex items-start">
                        <span className="text-amber-500 text-xl mr-3">•</span>
                        <span className="text-amber-700 text-lg">{spec}</span>
                      </li>
                    )
                  )}
                </ul>
              )}
            </div>
          </section>
        )}

        {/* Home Care */}
        {(disease.home_care_title || disease.home_care_text) && (
          <section ref={homeCareRef} className="mb-10 scroll-mt-4">
            <h2 className="text-2xl md:text-3xl font-semibold text-amber-800 mb-4 border-l-4 border-amber-500 pl-4">
              {disease.home_care_title || 'Home Care'}
            </h2>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-amber-200">
              <p className="text-lg md:text-xl text-amber-900 leading-relaxed">{disease.home_care_text}</p>
            </div>
          </section>
        )}

        {/* Do's and Don'ts */}
        {(disease.dos?.length || disease.donts?.length) && (
          <section ref={dosAndDontsRef} className="mb-10 scroll-mt-4">
            <h2 className="text-2xl md:text-3xl font-semibold text-amber-800 mb-4 border-l-4 border-amber-500 pl-4">Do's and Don'ts</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {disease.dos?.length > 0 && (
                <div className="bg-green-50 p-6 rounded-lg shadow-sm border border-green-200">
                  <h3 className="font-semibold text-green-800 text-xl mb-4 flex items-center">
                    <span className="mr-2 text-green-600 text-2xl">✓</span> Do's
                  </h3>
                  <ul className="space-y-3">
                    {disease.dos.map((item, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="text-green-500 text-xl mr-3">•</span>
                        <span className="text-green-800 text-lg">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {disease.donts?.length > 0 && (
                <div className="bg-red-50 p-6 rounded-lg shadow-sm border border-red-200">
                  <h3 className="font-semibold text-red-800 text-xl mb-4 flex items-center">
                    <span className="mr-2 text-red-600 text-2xl">✗</span> Don'ts
                  </h3>
                  <ul className="space-y-3">
                    {disease.donts.map((item, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="text-red-500 text-xl mr-3">•</span>
                        <span className="text-red-800 text-lg">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Alternative Therapies */}
        {(disease.alternative_therapies_title || disease.alternative_therapies_text) && (
          <section ref={alternativeTherapiesRef} className="mb-10 scroll-mt-4">
            <h2 className="text-2xl md:text-3xl font-semibold text-amber-800 mb-4 border-l-4 border-amber-500 pl-4">
              {disease.alternative_therapies_title || 'Alternative Therapies'}
            </h2>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-amber-200">
              <p className="text-lg md:text-xl text-amber-900 leading-relaxed">{disease.alternative_therapies_text}</p>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
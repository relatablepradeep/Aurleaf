const LandingPage = () => {
  return (
    <div className="w-full h-screen bg-gradient-to-r from-blue-900 via-purple-800 to-blue-900 flex flex-col justify-center items-center text-center">
      <h1
        className="text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-200 tracking-wide drop-shadow-lg"
        style={{ fontFamily: 'Montserrat, sans-serif', textShadow: '0px 0px 20px rgba(255, 255, 255, 0.8)' }}
      >
        Welcome to AURLEAF
      </h1>
      <p className="text-2xl text-gray-300 mt-6 max-w-2xl">
        Discover the power of Ayurveda combined with modern technology. Your journey to better health starts here.
      </p>
      <button
        className="mt-10 px-8 py-4 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white font-bold rounded-lg shadow-lg hover:scale-105 transition-transform"
        onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}
      >
        Explore Now
      </button>
    </div>
  );
};

export default LandingPage;

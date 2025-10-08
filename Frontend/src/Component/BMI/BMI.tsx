import { useState, useEffect } from 'react';
import { Activity, ArrowRight, Award, User, Scale, Ruler, Coffee, Upload, X } from 'lucide-react';

export default function BMICalculator() {
  const [name, setName] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [calorieIntake, setCalorieIntake] = useState('');
  const [weightUnit, setWeightUnit] = useState('kg');
  const [heightUnit, setHeightUnit] = useState('cm');
  const [bmi, setBmi] = useState(null);
  const [bmiCategory, setBmiCategory] = useState('');
  const [recommendation, setRecommendation] = useState('');
  const [recommendedCalories, setRecommendedCalories] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [yogaExercises, setYogaExercises] = useState([]);
  const [profileImage, setProfileImage] = useState(null);
  const [useDefaultAvatar, setUseDefaultAvatar] = useState(true);

  const calculateBMI = () => {
    let weightInKg = parseFloat(weight);
    let heightInM = parseFloat(height);
    
    if (weightUnit === 'lb') {
      weightInKg = weightInKg * 0.453592;
    }
    
    if (heightUnit === 'cm') {
      heightInM = heightInM / 100;
    } else if (heightUnit === 'm') {
      // Already in meters, no conversion needed
    } else if (heightUnit === 'ft') {
      heightInM = heightInM * 0.3048;
    }
    
    const calculatedBMI = weightInKg / (heightInM * heightInM);
    return calculatedBMI.toFixed(1);
  };

  const getBMICategory = (bmiValue) => {
    const bmi = parseFloat(bmiValue);
    if (bmi < 18.5) return 'underweight';
    if (bmi >= 18.5 && bmi < 25) return 'normal';
    if (bmi >= 25 && bmi < 30) return 'overweight';
    return 'obese';
  };

  const getYogaExercises = (category, heightConcern = false) => {
    if (heightConcern) {
      return [
        "Bar Stretch (Tadasana with arm raises)",
        "Cobra Pose (Bhujangasana)",
        "Triangle Pose (Trikonasana)",
        "Hanging Exercise (with support)",
        "Surya Namaskar (Sun Salutation)",
      ];
    }
    
    if (category === 'underweight') {
      return [
        "Power Yoga (Surya Namaskar)",
        "Bridge Pose (Setu Bandhasana)",
        "Warrior Pose (Virabhadrasana)",
        "Plank Pose (Phalakasana)",
        "Bow Pose (Dhanurasana)",
      ];
    }
    
    if (category === 'overweight' || category === 'obese') {
      return [
        "Surya Namaskar (Sun Salutation)",
        "Kapalbhati Pranayama",
        "Chair Pose (Utkatasana)",
        "Wind Releasing Pose (Pawanmuktasana)",
        "Warrior II Pose (Virabhadrasana II)",
      ];
    }
    
    return [
      "Regular Surya Namaskar",
      "Padmasana (Lotus Pose)",
      "Tadasana (Mountain Pose)",
      "Shavasana (Corpse Pose)",
      "Anulom Vilom (Alternate Nostril Breathing)",
    ];
  };

  const getRecommendedCalories = (category, currentCalories) => {
    const parsedCalories = currentCalories ? parseFloat(currentCalories) : 0;
    
    if (category === 'underweight') {
      if (parsedCalories) {
        return `${Math.round(parsedCalories + 500)} calories/day (increase by 500 calories)`;
      }
      return 'Increase your daily calorie intake by 500 calories';
    }
    
    if (category === 'overweight' || category === 'obese') {
      if (parsedCalories) {
        const reducedCalories = Math.max(1200, Math.round(parsedCalories - 500));
        return `${reducedCalories} calories/day (decrease by 500 calories)`;
      }
      return 'Reduce your daily calorie intake by 500 calories';
    }
    
    if (parsedCalories) {
      return `Maintain your current intake of ${Math.round(parsedCalories)} calories per day`;
    }
    return 'Maintain a balanced diet of 2000-2500 calories per day';
  };

  const getRecommendation = (category, heightValue, heightUnitValue) => {
    let heightConcern = false;
    
    // Check for height concerns (simplified for demo)
    if ((heightUnitValue === 'cm' && heightValue < 160) || 
        (heightUnitValue === 'm' && heightValue < 1.6) || 
        (heightUnitValue === 'ft' && heightValue < 5.3)) {
      heightConcern = true;
    }
    
    let rec = '';
    
    if (category === 'underweight') {
      rec = 'Your BMI indicates you are underweight. Focus on nutrient-rich foods and strength-building yoga poses.';
    } else if (category === 'normal') {
      rec = 'Great job! Your BMI is in the normal range. Continue your healthy lifestyle with balanced yoga practice.';
    } else if (category === 'overweight') {
      rec = 'Your BMI indicates you are overweight. Focus on calorie-deficit diet and regular yoga practice for weight management.';
    } else if (category === 'obese') {
      rec = 'Your BMI indicates obesity. Consider consulting a healthcare provider along with adopting yoga and dietary changes.';
    }
    
    if (heightConcern) {
      rec += ' Your height is below average. Include stretching yoga poses that may help with posture and the appearance of height.';
    }
    
    return {
      recommendation: rec,
      heightConcern
    };
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfileImage(reader.result);
        setUseDefaultAvatar(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setProfileImage(null);
    setUseDefaultAvatar(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!name || !weight || !height) {
      alert('Please fill in all required fields');
      return;
    }
    
    setIsAnimating(true);
    
    setTimeout(() => {
      const calculatedBMI = calculateBMI();
      const category = getBMICategory(calculatedBMI);
      const { recommendation: rec, heightConcern } = getRecommendation(category, parseFloat(height), heightUnit);
      
      setBmi(calculatedBMI);
      setBmiCategory(category);
      setRecommendation(rec);
      setRecommendedCalories(getRecommendedCalories(category, calorieIntake));
      setYogaExercises(getYogaExercises(category, heightConcern));
      setIsSubmitted(true);
      setIsAnimating(false);
    }, 1500);
  };

  const renderBmiAvatar = () => {
    if (!isSubmitted) return null;
    
    let bodyShape = '';
    let bodyColor = '';
    
    switch (bmiCategory) {
      case 'underweight':
        bodyShape = 'thin';
        bodyColor = 'bg-blue-600';
        break;
      case 'normal':
        bodyShape = 'normal';
        bodyColor = 'bg-green-600';
        break;
      case 'overweight':
        bodyShape = 'heavy';
        bodyColor = 'bg-orange-500';
        break;
      case 'obese':
        bodyShape = 'obese';
        bodyColor = 'bg-red-500';
        break;
      default:
        bodyShape = 'normal';
        bodyColor = 'bg-gray-500';
    }
    
    return (
      <div className="flex flex-col items-center mb-4">
        {/* Simple SVG avatar representation based on BMI */}
        <div className="mb-4 mt-4">
          {bodyShape === 'thin' && 
            <div className="flex flex-col items-center relative">
              <div className={`w-8 h-8 rounded-full ${bodyColor}`}></div>
              <div className={`w-1 h-12 ${bodyColor}`}></div>
              <div className={`w-6 h-16 rounded-lg ${bodyColor}`}></div>
              <div className="text-xs mt-2 text-gray-500">Body Type: Underweight</div>
            </div>
          }
          
          {bodyShape === 'normal' && 
            <div className="flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full ${bodyColor}`}></div>
              <div className={`w-2 h-12 ${bodyColor}`}></div>
              <div className={`w-8 h-16 rounded-lg ${bodyColor}`}></div>
              <div className="text-xs mt-2 text-gray-500">Body Type: Normal</div>
            </div>
          }
          
          {bodyShape === 'heavy' && 
            <div className="flex flex-col items-center">
              <div className={`w-12 h-12 rounded-full ${bodyColor}`}></div>
              <div className={`w-4 h-10 ${bodyColor}`}></div>
              <div className={`w-14 h-16 rounded-lg ${bodyColor}`}></div>
              <div className="text-xs mt-2 text-gray-500">Body Type: Overweight</div>
            </div>
          }
          
          {bodyShape === 'obese' && 
            <div className="flex flex-col items-center">
              <div className={`w-14 h-14 rounded-full ${bodyColor}`}></div>
              <div className={`w-6 h-8 ${bodyColor}`}></div>
              <div className={`w-20 h-16 rounded-lg ${bodyColor}`}></div>
              <div className="text-xs mt-2 text-gray-500">Body Type: Obese</div>
            </div>
          }
        </div>
        <div className="text-lg font-semibold">
          BMI: {bmi} - {bmiCategory.charAt(0).toUpperCase() + bmiCategory.slice(1)}
        </div>
      </div>
    );
  };

  const renderUserAvatar = () => {
    if (profileImage) {
      return (
        <div className="relative w-32 h-32 mx-auto mb-4">
          <img 
            src={profileImage} 
            alt="User profile" 
            className="w-full h-full object-cover rounded-full border-4 border-amber-200 shadow-md"
          />
          <button 
            onClick={removeImage}
            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-md hover:bg-red-600 transition-colors"
          >
            <X size={16} />
          </button>
        </div>
      );
    }
    
    if (useDefaultAvatar) {
      return (
        <div className="relative w-32 h-32 mx-auto mb-4 bg-amber-100 rounded-full flex items-center justify-center border-4 border-amber-200 shadow-md">
          <User size={64} className="text-amber-500" />
        </div>
      );
    }
  };

  const getBmiColor = (category) => {
    switch (category) {
      case 'underweight': return 'text-blue-600';
      case 'normal': return 'text-green-600';
      case 'overweight': return 'text-orange-500';
      case 'obese': return 'text-red-500';
      default: return 'text-gray-800';
    }
  };

  return (
    <div className="flex flex-col md:flex-row w-full h-full bg-amber-50 rounded-lg overflow-hidden shadow-lg border-t border-amber-200">
      {/* Left Side - Avatar and BMI Result */}
      <div className="w-full md:w-1/3 bg-amber-50 p-6 flex flex-col border-r border-amber-200">
        <h2 className="text-xl font-bold mb-6 text-amber-800 flex items-center">
          <User className="mr-2" size={20} />
          Personal Profile
        </h2>
        
        {renderUserAvatar()}
        
        {isSubmitted ? renderBmiAvatar() : (
          <div className="mt-4 p-4 bg-amber-100 rounded-lg animate-pulse border border-amber-200">
            <p className="text-amber-800 text-sm text-center">Complete the form to see your BMI results</p>
          </div>
        )}
        
        {isSubmitted && (
          <div className="mt-4 p-4 bg-amber-100 rounded-lg animate-fade-in border border-amber-200">
            <h3 className="font-semibold text-amber-800 mb-2 flex items-center">
              <Award className="mr-2" size={18} />
              Hello, {name}!
            </h3>
            <p className="text-amber-900 text-sm">{recommendation}</p>
          </div>
        )}
      </div>
      
      {/* Right Side - Form and Results */}
      <div className="w-full md:w-2/3 bg-amber-50 p-6">
        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <h1 className="text-2xl font-bold text-amber-800 mb-6">BMI Calculator</h1>
            
            <div className="form-group">
              <label htmlFor="user-name" className="flex items-center text-amber-800 mb-2">
                <User className="mr-2" size={16} />
                Your Name:
              </label>
              <input
                id="user-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 border border-amber-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 bg-amber-50"
                required
              />
            </div>
            
            <div className="form-group mb-6">
              <label htmlFor="profile-upload" className="flex items-center text-amber-800 mb-2">
                <Upload className="mr-2" size={16} />
                Profile Picture:
              </label>
              <div className="flex items-center">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="profile-upload"
                />
                <label
                  htmlFor="profile-upload"
                  className="cursor-pointer bg-amber-100 hover:bg-amber-200 text-amber-700 font-medium py-2 px-4 rounded-md transition-colors duration-200 flex items-center border border-amber-300"
                >
                  <Upload size={16} className="mr-2" />
                  Upload Photo
                </label>
                {!useDefaultAvatar && (
                  <button
                    type="button"
                    onClick={removeImage}
                    className="ml-2 text-red-600 hover:text-red-800"
                  >
                    Remove
                  </button>
                )}
              </div>
              <p className="text-xs text-amber-700 mt-1">Upload your photo or use our default avatar</p>
            </div>
            
            <div className="form-group">
              <label htmlFor="user-weight" className="flex items-center text-amber-800 mb-2">
                <Scale className="mr-2" size={16} />
                Weight:
              </label>
              <div className="flex">
                <input
                  id="user-weight"
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  className="w-full p-2 border border-amber-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-amber-500 bg-amber-50"
                  required
                  min="1"
                  step="0.1"
                />
                <select
                  value={weightUnit}
                  onChange={(e) => setWeightUnit(e.target.value)}
                  className="bg-amber-100 border border-amber-300 rounded-r-md px-3 focus:outline-none text-amber-800"
                  aria-label="Weight unit"
                >
                  <option value="kg">kg</option>
                  <option value="lb">lb</option>
                </select>
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="user-height" className="flex items-center text-amber-800 mb-2">
                <Ruler className="mr-2" size={16} />
                Height:
              </label>
              <div className="flex">
                <input
                  id="user-height"
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  className="w-full p-2 border border-amber-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-amber-500 bg-amber-50"
                  required
                  min="1"
                  step="0.1"
                />
                <select
                  value={heightUnit}
                  onChange={(e) => setHeightUnit(e.target.value)}
                  className="bg-amber-100 border border-amber-300 rounded-r-md px-3 focus:outline-none text-amber-800"
                  aria-label="Height unit"
                >
                  <option value="cm">cm</option>
                  <option value="m">m</option>
                  <option value="ft">ft</option>
                </select>
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="calorie-intake" className="flex items-center text-amber-800 mb-2">
                <Coffee className="mr-2" size={16} />
                Daily Calorie Intake (optional):
              </label>
              <input
                id="calorie-intake"
                type="number"
                value={calorieIntake}
                onChange={(e) => setCalorieIntake(e.target.value)}
                className="w-full p-2 border border-amber-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 bg-amber-50"
                min="0"
              />
            </div>
            
            <button
              type="submit"
              className="w-full bg-amber-600 hover:bg-amber-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-300 flex items-center justify-center"
              disabled={isAnimating}
            >
              {isAnimating ? (
                <div className="animate-pulse flex items-center">
                  <div className="h-2 w-2 bg-white rounded-full mr-1"></div>
                  <div className="h-2 w-2 bg-white rounded-full mr-1 animate-pulse delay-75"></div>
                  <div className="h-2 w-2 bg-white rounded-full animate-pulse delay-150"></div>
                </div>
              ) : (
                <>
                  Calculate BMI <ArrowRight size={16} className="ml-2" />
                </>
              )}
            </button>
          </form>
        ) : (
          <div className="result-container space-y-6 animate-fade-in">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-amber-800">Your Results</h2>
              <button
                onClick={() => setIsSubmitted(false)}
                className="text-amber-600 hover:text-amber-800 font-medium flex items-center"
              >
                Calculate Again
              </button>
            </div>
            
            <div className="p-4 bg-white rounded-lg shadow-sm border border-amber-200">
              <h3 className="font-semibold text-amber-800 mb-3 flex items-center">
                <Activity className="mr-2" size={18} />
                Recommended Yoga Exercises
              </h3>
              <ul className="list-disc pl-6 space-y-1">
                {yogaExercises.map((exercise, index) => (
                  <li key={index} className="text-amber-900">{exercise}</li>
                ))}
              </ul>
            </div>
            
            <div className="p-4 bg-white rounded-lg shadow-sm border border-amber-200">
              <h3 className="font-semibold text-amber-800 mb-3 flex items-center">
                <Coffee className="mr-2" size={18} />
                Calorie Recommendation
              </h3>
              <p className={`${getBmiColor(bmiCategory)} font-medium`}>{recommendedCalories}</p>
            </div>
            
            <div className="mt-4 p-4 bg-amber-100 rounded-lg border border-amber-200">
              <p className="text-sm text-amber-800">
                <strong>Note:</strong> These recommendations are general guidelines based on BMI calculations.
                For personalized advice, please consult with healthcare professionals.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
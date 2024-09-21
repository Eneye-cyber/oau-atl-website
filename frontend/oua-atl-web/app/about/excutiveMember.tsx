import { useState, useEffect } from 'react';
import MyPastExcutives from './data.json'

// Interface for Achievement
interface Achievement {
  tag: string;
  color: string;
}

// Interface for Member
interface Member {
  name: string;
  position: string;
  bio: string;
  achievements: Achievement[];
}

// Interface for Organization
interface Organization {
  term: string;
  members: Member[];
}



function getRandomUserImageUrl() {
  const randomNumber = Math.floor(Math.random() * 100) + 1; // Generate a random number between 1 and 100
  return `https://randomuser.me/api/portraits/med/men/${randomNumber}.jpg`;
}

const imageUrl = getRandomUserImageUrl();
console.log(imageUrl);

export function findTermByInfo(data: Organization[], user: Member, index: number): string | null {
  const matchingTerms: { term: string; originalIndex: number }[] = [];

  for (let i = 0; i < data.length; i++) {
    const currentData = data[i];
    const foundMember = currentData.members.find(
      member => member.name === user.name && member.position === user.position
    );
    if (foundMember) {
      matchingTerms.push({ term: currentData.term, originalIndex: i });
    }
  }

  matchingTerms.sort((a, b) => a.originalIndex - b.originalIndex);

  if (index >= 0 && index < matchingTerms.length) {
    return matchingTerms[index].term;
  }

  return null;
}


export const ExecutiveMember: React.FC<any> = ({ name, position, bio, imageUrl }) => {
  const [showFullText, setShowFullText] = useState(false);
  const [timer, setTimer] = useState(30);

  // Auto-switch to next after 30 seconds
  useEffect(() => {
  const countdown = setInterval(() => {
    setTimer((prev) => (prev === 0 ? 30 : prev - 1));
    if (timer === 0) {
      setShowFullText(false); // Auto-hide the text after 30 seconds
    }
  }, 1000);

  return () => clearInterval(countdown);
}, [timer]);

  return (
    <div className="w-80 h-auto bg-white shadow-lg rounded-lg p-6 text-center">
      <img src={imageUrl} alt={name} className="rounded-full w-24 h-24 mx-auto mb-4" />
      <h3 className="text-lg font-bold">{name}</h3>
      <p className="text-sm text-primary mb-2">{position}</p>
      <p className="text-sm text-gray-600">
        {showFullText ? bio : `${bio.slice(0, 100)}...`}
      </p>
      <button
        className="mt-2 text-accent font-semibold"
        onClick={() => setShowFullText(!showFullText)}
      >
        {showFullText ? 'Read Less' : 'Read More'}
      </button>
      <div className="flex justify-between mt-4">
        <button className="text-sm" onClick={() => setShowFullText(false)}>{'<'}</button>
        <button className="text-sm" onClick={() => setShowFullText(true)}>{'||'}</button>
        <span className="text-sm">{timer}s</span>
      </div>
    </div>
  );
};


import { motion } from "framer-motion";


// Interface definitions
interface Achievement {
  tag: string;
  color: string;
}

interface Member {
  name: string;
  position: string;
  term: string;
  bio: string;
  achievements: Achievement[];
}

interface Organization {
  term: string;
  members: Member[];
}

// Function to get random 3 achievements
const getRandomAchievements = (achievements: Achievement[]): Achievement[] => {
  const shuffled = achievements.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 3); // Get only 3 random achievements
};



// Animation Variants
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

// Past Executive component
export const PastExecutive = () => {
  const [selectedTerm, setSelectedTerm] = useState("All");
  const [selectedPosition, setSelectedPosition] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [achievementQuery, setAchievementQuery] = useState("");

  // Function to handle term change
  const handleTermChange = (event: any) => setSelectedTerm(event.target.value);

  // Function to handle position change
  const handlePositionChange = (event: any) => setSelectedPosition(event.target.value);

  // Function to handle search query change for names
  const handleSearchChange = (event: any) => setSearchQuery(event.target.value);

  // Function to handle search query change for achievements
  const handleAchievementChange = (event: any) => setAchievementQuery(event.target.value);

  // Reset filters
  const handleResetFilters = () => {
    setSelectedPosition("All");
    setSearchQuery("");
    setAchievementQuery("");
  };

  // Find the selected term's data
  const filteredTerm = selectedTerm === "All" ?
    pastExecutives.flatMap((term) => term.members) :
    pastExecutives.find((term) => term.term === selectedTerm)?.members;

  // Filter members by position, search query, and achievements
  const filteredMembers = filteredTerm?.filter((member: any) => {
    const matchesPosition = selectedPosition === "All" || member.position === selectedPosition;
    const matchesName = searchQuery === "" || member.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesAchievement = achievementQuery === "" || member.achievements.some((ach: Achievement) =>
      ach.tag.toLowerCase().includes(achievementQuery.toLowerCase())
    );
    return matchesPosition && matchesName && matchesAchievement;
  });

  return (
    <motion.section
      className="py-16 px-6 bg-gradient-to-b from-white to-gray-100"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeInUp}
      transition={{ duration: 0.8, delay: 0.4 }}
    >
      <div className="container mx-auto max-w-7xl text-center">
        {/* Filters */}
        <div className="mb-10 flex space-x-3 w-full justify-center">
          {/* Select Dropdown for Filtering Terms */}
          <div className="w-full">
            <label htmlFor="termSelect" className="block text-lg font-semibold mb-2">
              Select Term:
            </label>
            <select
              id="termSelect"
              value={selectedTerm}
              onChange={handleTermChange}
              className="w-full px-4 py-2 border border-blue-500 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="All">All Years</option>
              {pastExecutives.map((term, index) => (
                <option key={index} value={term.term}>
                  {term.term}
                </option>
              ))}
            </select>
          </div>
            {/* Search Bar for Filtering by Achievement */}
            <div className="w-full flex flex-col justify-center items-center">

                <label htmlFor="achievementSearch" className="block text-lg font-semibold mb-2">
                  Achievement:
                </label>
                <input
                  id="achievementSearch"
                  type="text"
                  value={achievementQuery}
                  onChange={handleAchievementChange}
                  placeholder="Enter achievement"
                  className="w-full px-4 py-2 border mx-auto border-blue-500 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
          {/* Select Dropdown for Filtering by Position */}
          <div className="w-full">
            <label htmlFor="positionSelect" className="block text-lg font-semibold mb-2">
              Position:
            </label>
            <select
              id="positionSelect"
              value={selectedPosition}
              onChange={handlePositionChange}
              className="w-full px-4 py-2 border border-blue-500 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="All">All Positions</option>
              {[...new Set(
                pastExecutives.flatMap((term) => term.members.map((member) => member.position))
              )].map((position, index) => (
                <option key={index} value={position}>
                  {position}
                </option>
              ))}
            </select>
          </div>

          {/* Search Bar for Filtering by Name */}
          <div className="w-full">
            <label htmlFor="nameSearch" className="block text-lg font-semibold mb-2">
              Name:
            </label>
            <input
              id="nameSearch"
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Enter name"
              className="w-full px-4 py-2 border border-blue-500 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        
        {/* Display the Members of the Selected Term */}
        {filteredMembers && filteredMembers.length > 0 ? (
          <div className="mb-8">
            {selectedTerm !== "All" && (
              <h3 className="text-2xl font-bold text-blue-700">{selectedTerm}</h3>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
              {filteredMembers.map((member, idx) => (
                <div
                  key={idx}
                  className="bg-white text-blue-500 rounded-lg shadow-lg transition-transform transform hover:scale-105"
                >
                  {/* Image and Text */}
                  <div className="flex items-start p-6">
                    <img
                      src={getRandomUserImageUrl()}
                      alt="Anonymous"
                      className="w-16 h-16 rounded-full mr-4"
                    />
                    <div className="flex flex-col items-start">
                      <p className="font-semibold text-sm">{member.name}</p>
                      <p className="text-md mb-1">{member.position}</p>
                      <p className="text-md mb-1 text-xs text-blue-800">{member.term}</p>
                    </div>
                  </div>

                  {/* Achievements */}
                  <div className="flex flex-wrap gap-2 mb-2 p-2">
                    {member.achievements && getRandomAchievements(member.achievements).map((achievement, index) => (
                      <h1
                        key={index}
                        className={`px-2 py-1 rounded-full text-white text-sm font-semibold ${achievement.color} `}
                      >
                        {achievement.tag}
                      </h1>
                    ))}
                  </div>

                  <p className="text-[12px] text-gray-600 p-2 mt-3 text-left">{member.bio}</p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p className="text-xl text-gray-600">No executive members found.</p>
        )}
      </div>
    </motion.section>
  );
};

// Sample JSON Data
const pastExecutives: Organization[] = MyPastExcutives;

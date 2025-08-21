import React, { useState, useEffect } from 'react';
import type{ MouseEvent } from 'react';
import type { FC } from 'react';
import type { StepProps, Skill, SkillCategory, SkillRatingProps } from "../types";

// --- Data (Move this to Step3.tsx) ---
const initialSkills: Skill[] = [
  { id: 1, category: 'Technical', name: 'Web Development', tools: 'HTML, CSS, JavaScript', icon: { symbol: '/icons/code.png', }, rating: 3, circle: 'purple' },
  { id: 2, category: 'Creative', name: 'Graphic Design', tools: 'Photoshop, Illustrator', icon: { symbol: '/icons/paint-brush.png', }, rating: 4, circle: 'red' },
  { id: 3, category: 'Communication', name: 'Content Writing', tools: 'Articles, Blogs, Copy', icon: { symbol: '/icons/pen-tool.png' }, rating: 5, circle: 'green' },
  { id: 4, category: 'Leadership', name: 'Project Management', tools: 'Planning, Coordination', icon: { symbol: '/icons/clipboard.png' }, rating: 4, circle: 'orange' },
  { id: 5, category: 'Creative', name: 'Social Media', tools: 'Marketing, Content', icon: { symbol: '/icons/share.png', }, rating: 2, circle: 'pink' },
  { id: 6, category: 'Technical', name: 'Data Analysis', tools: 'Excel, Analytics', icon: { symbol: '/icons/analytics.png', }, rating: 2, circle: 'blue' },
  { id: 7, category: 'Technical', name: 'Game Development', tools: 'Unity, Blender', icon: { symbol: '/icons/console.png', }, rating: 2, circle: 'red' },
  { id: 8, category: 'Technical', name: 'Artificial Intelligence', tools: 'Python, TensorFlow', icon: { symbol: '/icons/generative.png', }, rating: 2, circle: 'green' },
  { id: 9, category: 'Communication', name: 'Public Speaking', tools: 'Presentations, Workshops', icon: { symbol: '/icons/convo.png' }, rating: 5, circle: 'red' },
  { id: 10, category: 'Communication', name: 'Negotiation', tools: 'Deals, Persuasion', icon: { symbol: '/icons/trade.png' }, rating: 5, circle: 'pink' },
];


// --- Sub-Components (Unchanged) ---

const SkillRating: FC<SkillRatingProps> = ({ rating, onRatingChange }) => (
  // Add stopPropagation to prevent card selection when rating is clicked
  <div className="flex items-center space-x-2 mt-4 star" onClick={(e: MouseEvent) => e.stopPropagation()}>
    {[1, 2, 3, 4, 5].map((star, index) => (
      <button
        key={star}
        type="button"
        onClick={() => onRatingChange(star)}
        className={`w-6 h-6 rounded-full transition-colors duration-200 ${
          star <= rating ? 'selected-rate' : ''
        }`}
      >{index + 1}</button>
    ))}
  </div>
);

const getCirclecolor = (skillColor: string) => {
  switch (skillColor) {
    case 'purple': return 'c-purple';
    case 'red': return 'c-red';
    case 'green': return 'c-green';
    case 'orange': return 'c-orange';
    case 'pink': return 'c-pink';
    case 'blue': return 'c-blue';
    default: return 'bg-gray-500 text-white';
  }
};

// Skill Card Component Props (Updated)
interface SkillCardProps {
  skill: Skill;
  isSelected: boolean;
  onSelect: () => void;
  onRatingChange: (skillId: number, newRating: number) => void;
}

const SkillCard: FC<SkillCardProps> = ({ skill, isSelected, onSelect, onRatingChange }) => (
  <div
    onClick={onSelect}
    role="button"
    tabIndex={0}
    aria-pressed={isSelected}
    onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onSelect()}
    // Add a 'selected' class when isSelected is true
    className={`skill-card flex flex-col items-center justify-center ${isSelected ? 'selected-day' : ''}`}
  >
    <div className={`circle ${getCirclecolor(skill.circle)}`}>
      <img src={skill.icon.symbol} alt={`${skill.name} icon`} />
    </div>
    <h3>{skill.name}</h3>
    <p>{skill.tools}</p>
    <div className="flex-grow" />
    <SkillRating
      rating={skill.rating}
      onRatingChange={(newRating) => onRatingChange(skill.id, newRating)}
    />
  </div>
);


// --- Main Component (Updated) ---

const Step3 = ({ formData, updateFormData, errors }: StepProps) => {
  const categories: SkillCategory[] = ['Technical', 'Creative', 'Communication', 'Leadership'];
  const [activeCategory, setActiveCategory] = useState<SkillCategory>('Technical');
  const [skills, setSkills] = useState<Skill[]>(initialSkills);
  const [selectedSkills, setSelectedSkills] = useState<number[]>([]);

  useEffect(() => {
    const finalSelectedSkills = skills
      .filter(skill => selectedSkills.includes(skill.id))
      .map(skill => ({
        name: skill.name,
        rating: skill.rating
      }));
    updateFormData({ selectedSkills: finalSelectedSkills });
  }, [selectedSkills, skills, updateFormData]);


  const handleRatingChange = (skillId: number, newRating: number) => {
    setSkills(currentSkills =>
      currentSkills.map(skill =>
        skill.id === skillId ? { ...skill, rating: newRating } : skill
      )
    );
  };

  const toggleSkillSelection = (skillId: number) => {
    setSelectedSkills(prevSelected =>
      prevSelected.includes(skillId)
        ? prevSelected.filter(id => id !== skillId)
        : [...prevSelected, skillId]
    );
  };

  const filteredSkills = skills.filter(skill => skill.category === activeCategory);

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-4xl">
        <div className="text-center text-white mb-10">
          <h1 className="text-4xl font-bold">What are your skills?</h1>
          <p className="text-white/80 mt-2">Share your talents and expertise with us</p>
        </div>
        <div className="flex items-center justify-center space-x-2 mb-10 skills">
          {categories.map(category => (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              className={`px-5 py-2 text-sm font-semibold rounded-full transition-colors duration-300 ${
                activeCategory === category ? 'selected-skill' : ''
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {filteredSkills.map(skill => (
            <SkillCard
              key={skill.id}
              skill={skill}
              isSelected={selectedSkills.includes(skill.id)}
              onSelect={() => toggleSkillSelection(skill.id)}
              onRatingChange={handleRatingChange}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Step3;
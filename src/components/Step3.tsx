import React, { useState, useEffect, useMemo, useRef } from 'react';
import type { MouseEvent, FC } from 'react';
import type { StepProps, Skill, SkillCategory, SkillRatingProps } from "../types";

const initialSkills: Skill[] = [
  { id: 1, category: 'Technical', name: 'Web Development', tools: 'HTML, CSS, JavaScript', icon: { symbol: '/icons/code.png', }, rating: 0, circle: 'purple' },
  { id: 2, category: 'Creative', name: 'Graphic Design', tools: 'Photoshop, Illustrator', icon: { symbol: '/icons/paint-brush.png', }, rating: 0, circle: 'red' },
  { id: 3, category: 'Communication', name: 'Content Writing', tools: 'Articles, Blogs, Copy', icon: { symbol: '/icons/pen-tool.png' }, rating: 0, circle: 'green' },
  { id: 4, category: 'Leadership', name: 'Project Management', tools: 'Planning, Coordination', icon: { symbol: '/icons/clipboard.png' }, rating: 0, circle: 'orange' },
  { id: 5, category: 'Creative', name: 'Social Media', tools: 'Marketing, Content', icon: { symbol: '/icons/share.png', }, rating: 0, circle: 'pink' },
  { id: 6, category: 'Technical', name: 'Data Analysis', tools: 'Excel, Analytics', icon: { symbol: '/icons/analytics.png', }, rating: 0, circle: 'blue' },
  { id: 7, category: 'Technical', name: 'Game Development', tools: 'Unity, Blender', icon: { symbol: '/icons/console.png', }, rating: 0, circle: 'red' },
  { id: 8, category: 'Technical', name: 'Artificial Intelligence', tools: 'Python, TensorFlow', icon: { symbol: '/icons/generative.png', }, rating: 0, circle: 'green' },
  { id: 9, category: 'Communication', name: 'Public Speaking', tools: 'Presentations, Workshops', icon: { symbol: '/icons/convo.png' }, rating: 0, circle: 'red' },
  { id: 10, category: 'Communication', name: 'Negotiation', tools: 'Deals, Persuasion', icon: { symbol: '/icons/trade.png' }, rating: 0, circle: 'pink' },
];

const SkillRating: FC<SkillRatingProps> = ({ rating, onRatingChange }) => (
  <div
    className="flex items-center space-x-2 mt-4 star"
    onClick={(e: MouseEvent) => e.stopPropagation()}
  >
    {[1, 2, 3, 4, 5].map((star, index) => (
      <button
        key={star}
        type="button"
        onClick={() => {
          if (rating === star) {
            onRatingChange(0);
          } else {
            onRatingChange(star);
          }
        }}
        className={`w-6 h-6 rounded-full transition-colors duration-200 ${
          star <= rating ? 'selected-rate' : ''
        }`}
      >
        {index + 1}
      </button>
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

const shallowArrayOfObjsEqual = (
  a?: { name: string; rating: number }[],
  b?: { name: string; rating: number }[],
) => {
  if (a === b) return true;
  if (!a || !b || a.length !== b.length) return false;
  for (let i = 0; i < a.length; i++) {
    if (a[i].name !== b[i].name || a[i].rating !== b[i].rating) return false;
  }
  return true;
};

const Step3 = ({ formData, updateFormData}: StepProps) => {
  const categories: SkillCategory[] = ['Technical', 'Creative', 'Communication', 'Leadership'];
  const [activeCategory, setActiveCategory] = useState<SkillCategory>('Technical');
  const [skills, setSkills] = useState<Skill[]>(initialSkills);
  const [selectedSkills, setSelectedSkills] = useState<number[]>([]);

  const selectedPayload = useMemo(
    () =>
      skills
        .filter(s => selectedSkills.includes(s.id))
        .map(s => ({ name: s.name, rating: s.rating })),
    [skills, selectedSkills]
  );

  const updateRef = useRef(updateFormData);
  useEffect(() => { updateRef.current = updateFormData; }, [updateFormData]);
  useEffect(() => {
    const current = (formData as any).selectedSkills as { name: string; rating: number }[] | undefined;
    if (!shallowArrayOfObjsEqual(current, selectedPayload)) {
      updateRef.current({ selectedSkills: selectedPayload });
    }
  }, [selectedPayload, formData]);

  const handleRatingChange = (skillId: number, newRating: number) => {
    setSkills(curr =>
      curr.map(s => (s.id === skillId ? { ...s, rating: newRating } : s))
    );
  };

  const toggleSkillSelection = (skillId: number) => {
    setSelectedSkills(prev =>
      prev.includes(skillId) ? prev.filter(id => id !== skillId) : [...prev, skillId]
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
              className={`px-5 py-2 text-sm font-semibold rounded-full transition-colors duration-300 ${activeCategory === category ? 'selected-skill' : ''}`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
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

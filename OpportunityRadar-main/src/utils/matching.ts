import { Opportunity, StudentProfile, EligibilityResult, SkillGapResult } from '../types';

export function checkEligibility(opp: Opportunity, profile: StudentProfile): EligibilityResult {
  const reasons: string[] = [];
  let isYearEligible = false;

  // Check academic year
  if (opp.eligibleYears.includes('all') || opp.eligibleYears.includes(profile.currentYear)) {
    isYearEligible = true;
    reasons.push(`Your academic standing (${profile.currentYear} year) is eligible.`);
  } else {
    reasons.push(`Targeted for: ${opp.eligibleYears.join(', ')} year students (You are in ${profile.currentYear} year).`);
  }

  // Check degree alignment if specified
  if (opp.eligibleDegrees && opp.eligibleDegrees.length > 0) {
    const degreeMatch = opp.eligibleDegrees.some(deg => 
      profile.branch.toLowerCase().includes(deg.toLowerCase()) || 
      profile.degree.toLowerCase().includes(deg.toLowerCase())
    );
    if (degreeMatch) {
      reasons.push(`Degree branch (${profile.branch}) aligns with field criteria.`);
    } else {
      reasons.push(`Target fields: ${opp.eligibleDegrees.join(', ')}.`);
    }
  }

  // Evaluate skills overlap
  const studentSkillSet = new Set(profile.skills.map(s => s.toLowerCase()));
  const matchedRequired = opp.requiredSkills.filter(req => 
    studentSkillSet.has(req.toLowerCase()) || 
    Array.from(studentSkillSet).some(s => s.includes(req.toLowerCase()) || req.toLowerCase().includes(s))
  );

  const skillCoverage = matchedRequired.length / (opp.requiredSkills.length || 1);
  if (skillCoverage >= 0.5) {
    reasons.push(`You hold ${matchedRequired.length} of ${opp.requiredSkills.length} core required skills.`);
  } else if (opp.requiredSkills.length > 0) {
    reasons.push(`Requires foundational proficiency in ${opp.requiredSkills.slice(0, 3).join(', ')}.`);
  }

  // Work mode alignment
  if (profile.preferredWorkModes.includes(opp.workMode)) {
    reasons.push(`Matches your preferred ${opp.workMode} work arrangement.`);
  }

  // Synthesize eligibility decision
  if (isYearEligible && skillCoverage >= 0.3) {
    return {
      status: 'likely_eligible',
      label: 'Likely Eligible',
      reasons
    };
  } else if (isYearEligible) {
    return {
      status: 'check_requirements',
      label: 'Check Requirements',
      reasons
    };
  } else {
    return {
      status: 'not_eligible',
      label: 'Review Eligibility Criteria',
      reasons
    };
  }
}

export function computeSkillGap(opp: Opportunity, profile: StudentProfile): SkillGapResult {
  const studentSkillSet = new Set(profile.skills.map(s => s.toLowerCase().trim()));
  
  const allOppSkills = [...opp.requiredSkills, ...(opp.preferredSkills || [])];
  const matchedSkills: string[] = [];
  const missingSkills: string[] = [];

  for (const skill of allOppSkills) {
    const isMatched = Array.from(studentSkillSet).some(s => 
      s === skill.toLowerCase().trim() || 
      s.includes(skill.toLowerCase().trim()) || 
      skill.toLowerCase().trim().includes(s)
    );

    if (isMatched) {
      matchedSkills.push(skill);
    } else {
      missingSkills.push(skill);
    }
  }

  // Suggested learning: first 3 missing skills with resources / concepts
  const suggestedLearning = missingSkills.slice(0, 3);
  const matchPercentage = allOppSkills.length > 0 
    ? Math.round((matchedSkills.length / allOppSkills.length) * 100) 
    : 100;

  return {
    matchedSkills,
    missingSkills,
    matchPercentage,
    suggestedLearning
  };
}

export interface RecommendationMatch {
  opportunity: Opportunity;
  score: number;
  matchReasons: string[];
}

export function getPersonalizedRecommendations(
  opportunities: Opportunity[], 
  profile: StudentProfile
): RecommendationMatch[] {
  const matches: RecommendationMatch[] = [];

  for (const opp of opportunities) {
    let score = 0;
    const matchReasons: string[] = [];

    // Category match
    if (profile.preferredCategories.includes(opp.category)) {
      score += 30;
      matchReasons.push(`Matches your target category (${opp.category.charAt(0).toUpperCase() + opp.category.slice(1)})`);
    }

    // Work Mode match
    if (profile.preferredWorkModes.includes(opp.workMode)) {
      score += 20;
      matchReasons.push(`Matches your ${opp.workMode} work preference`);
    }

    // Skills match
    const skillGap = computeSkillGap(opp, profile);
    if (skillGap.matchedSkills.length > 0) {
      score += Math.min(30, skillGap.matchedSkills.length * 8);
      matchReasons.push(`Matches your skills in ${skillGap.matchedSkills.slice(0, 2).join(' & ')}`);
    }

    // Academic year match
    if (opp.eligibleYears.includes('all') || opp.eligibleYears.includes(profile.currentYear)) {
      score += 15;
      matchReasons.push(`Suitable for ${profile.currentYear} year undergraduate students`);
    }

    // Interest keyword match
    for (const interest of profile.interests) {
      const text = `${opp.title} ${opp.description} ${opp.researchDomain || ''}`.toLowerCase();
      if (text.includes(interest.toLowerCase())) {
        score += 10;
        matchReasons.push(`Aligns with your interest in ${interest}`);
        break;
      }
    }

    // Preferred location match
    if (opp.workMode === 'remote' || profile.preferredLocations.some(loc => opp.location.includes(loc))) {
      score += 10;
    }

    matches.push({
      opportunity: opp,
      score,
      matchReasons: matchReasons.slice(0, 3)
    });
  }

  // Sort descending by score
  return matches.sort((a, b) => b.score - a.score);
}


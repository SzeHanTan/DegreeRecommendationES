// TODO: Implement degree recommendation card for results page
// Props: recommendation (DegreeRecommendation), rank (number), isTop (boolean)
// Shows: degree name, score bar, career paths, expandable explanation (rules fired)

import type { DegreeRecommendation } from '../../lib/types';

interface RecommendationCardProps {
  recommendation: DegreeRecommendation;
  rank: number;
  isTop: boolean;
}

export default function RecommendationCard({ recommendation, rank }: RecommendationCardProps) {
  return (
    <div>
      <span>#{rank} {recommendation.degree}</span>
      <span>Score: {recommendation.score}</span>
      <p>RecommendationCard — to be implemented</p>
    </div>
  );
}

// TODO: Implement animated score bar for results page
// Props: label (string), percentage (number 0–100), color (optional)

interface ScoreBarProps {
  label: string;
  percentage: number;
  color?: string;
}

export default function ScoreBar({ label, percentage }: ScoreBarProps) {
  return (
    <div>
      <span>{label}</span>
      <span>{percentage}%</span>
    </div>
  );
}

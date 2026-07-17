export default function StampBadge({ children, color = 'text-tomato' }) {
  return <span className={`postmark ${color}`}>{children}</span>;
}

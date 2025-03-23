type BadgeProps = Readonly<{
  text: string;
  color: string;
}>;
export default function Badge({ text, color }: BadgeProps) {
  return (
    <span className={`text-sm font-semibold p-1.5 rounded ${color}`}>
      {text}
    </span>
  );
}

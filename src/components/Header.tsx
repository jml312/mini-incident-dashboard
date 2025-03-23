import ThemeToggle from "@/components/ThemeToggle";

export default function Header() {
  return (
    <nav className="flex justify-between items-center mt-8 mb-3">
      <h1 className="font-bold text-2xl">Incidents</h1>
      <ThemeToggle />
    </nav>
  );
}

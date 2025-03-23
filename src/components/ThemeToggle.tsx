import Switch from "@/components/common/Switch";
import { useTheme } from "@/contexts/ThemeWrapper";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  // if (!theme) return;
  return (
    <Switch
      checked={theme === "dark"}
      onChange={toggleTheme}
      name={theme === "dark" ? "Light" : "Dark"}
      checkedColor="dark:bg-gray-500"
      unCheckedColor="bg-gray-200"
    />
  );
}

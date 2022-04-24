import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";

const ThemeSelect = () => {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  // After mounting, we have access to the theme
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return null;
  } else {
    return (
      <select
        onChange={(e) => setTheme(e.target.value)}
        defaultValue={theme}
        className="text-sm focus:ring-2 bg-transparent rounded-md border border-gray-300 dark:border-gray-700"
      >
        <option value="dark">dark</option>
        <option value="light">light</option>
        <option value="system">system</option>
      </select>
    );
  }
};

export default ThemeSelect;

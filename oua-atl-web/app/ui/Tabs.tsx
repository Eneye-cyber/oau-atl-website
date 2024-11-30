'use client';
import { type FC, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface TabProps {
  label: string;
  value: string | null;
  activeTabValue: string | null;
  // active?: boolean;
  onClick: () => void;
}

type TabsProps = {
  label: string;
  value: null | string;
}[];

const defaultProps = [
  { label: "All", value: null },
  { label: "Active", value: "active" },
  { label: "Complete", value: "complete" },
  { label: "Overdue", value: "overdue" },
];

const Tab: FC<TabProps> = ({ label, value, onClick, activeTabValue }) => {
  const [active, setActive] = useState<boolean>(false);

  


  // Sync with external activeTabValue prop
  useEffect(() => {
    setActive(activeTabValue === value);
  }, [activeTabValue, value]);
  return (
  <button
    type="button"
    className={`group flex items-center gap-x-2 rounded-lg px-3 py-2 text-sm font-medium outline-none transition duration-75 ${
      active
        ? "bg-accent/50 dark:bg-white/5 text-primary-600 dark:text-primary-400"
        : "hover:bg-gray-50 focus-visible:bg-gray-50 dark:hover:bg-white/5 dark:focus-visible:bg-white/5 text-gray-500 group-hover:text-gray-700 group-focus-visible:text-gray-700 dark:text-gray-400 dark:group-hover:text-gray-200 dark:group-focus-visible:text-gray-200"
    }`}
    role="tab"
    aria-selected={active ? "true" : "false"}
    onClick={onClick}
  >
    <span className="fi-tabs-item-label transition duration-75">{label}</span>
  </button>
  )
};

const Tabs: FC<{ tabs?: TabsProps }> = ({ tabs = defaultProps }) => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<string | null>(null);

  useEffect(() => {
    // Sync initial tab with query parameter from the URL
    const query = new URLSearchParams(window.location.search);
    const tabValue = query.get("status");
    setActiveTab(tabValue || null);
  }, []);

  const handleTabClick = (value: string | null) => {
    setActiveTab(value);

    // Update URL query parameter
    const params = new URLSearchParams(window.location.search);
    if (value) {
      params.set("status", value);
    } else {
      params.delete("status");
    }
    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <nav
      className="fi-tabs flex w-fit gap-x-1 overflow-x-auto mx-auto rounded-xl bg-white p-2 shadow-sm ring-1 ring-gray-950/5 dark:bg-gray-900 dark:ring-white/10"
      role="tablist"
    >
      {tabs.map((tab) => (
        <Tab
          key={tab.label}
          label={tab.label}
          value={tab.value}
          activeTabValue={activeTab}
          // active={activeTab === tab.value}
          onClick={() => handleTabClick(tab.value)}
        />
      ))}
    </nav>
  );
};

export default Tabs;

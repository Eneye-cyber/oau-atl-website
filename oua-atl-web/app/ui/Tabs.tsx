'use client';
import {type FC, useState} from "react";

interface TabProps {
  label: string;
  active?: boolean;
  onClick: () => void;
}

const Tab: FC<TabProps> = ({ label, active, onClick }) => (
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
);

const Tabs: FC = () => {
  const [activeTab, setActiveTab] = useState<string | null>(null);

  const tabs = [
    { label: "All", value: null },
    { label: "Active", value: "active" },
    { label: "Complete", value: "complete" },
    { label: "Overdue", value: "overdue" },
  ];

  return (
    <nav
      className="fi-tabs flex w-fit gap-x-1 overflow-x-auto mx-auto rounded-xl bg-white p-2 shadow-sm ring-1 ring-gray-950/5 dark:bg-gray-900 dark:ring-white/10"
      role="tablist"
    >
      {tabs.map((tab) => (
        <Tab
          key={tab.label}
          label={tab.label}
          active={activeTab === tab.value}
          onClick={() => setActiveTab(tab.value)}
        />
      ))}
    </nav>
  );
};

export default Tabs;

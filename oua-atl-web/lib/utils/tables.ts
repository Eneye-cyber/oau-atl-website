export const DonationTable = [
    // { key: 'index', label: 's/n' },
    { key: "full_name", label: "Full name" },
    { key: "email", label: "Email" },
    { key: "project_title", label: "Project" },
    { key: "amount_donating", label: "Amount donated" },
    { key: "donated_at", label: "Date", type: "date" },
  ];

export const EventColumns = [
  { key: 'image_url', label: 'Image' },
  { key: 'title', label: 'Event name' },
  { key: 'start_date', label: 'Event date', type: 'date' },
  { key: 'location', label: 'Event location' },
  { key: 'entrance_fee', label: '($) Entrance fee' },
];

export const ProjectColumns = [
  { key: 'project_title', label: 'Project name' },
  { key: 'amount_goal', label: 'Financial goal' },
  { key: 'amount_collected', label: 'Contributed amount'  },
  { key: 'donation_count', label: 'No of contributors'  },
  { key: 'date_created', label: 'Project Opened', type: 'date' },
  { key: 'location', label: 'Location' },
];

export const RegularMembersColumn = [
  { key: "full_name", label: "Full name" },
  { key: "email", label: "Email" },
  { key: "study_field", label: "Course of study" },
  { key: "year_graduated", label: "Graduating year" },
  { key: "status", label: "Status" },
];

export const ExecutiveMembersColumns = [
  { key: 'image_url', label: 'Image' },
  { key: 'full_name', label: 'Full name' },
  { key: 'position_assigned', label: 'Position assigned' },
  { key: 'year_graduated:', label: 'Graduating year' },
  { key: 'is_active', label: 'Status' },
];
INSERT OR IGNORE INTO projects
  (id, title, description, tags_json, stars, is_bookmarked, category)
VALUES
  (
    'e-commerce',
    'E-Commerce Website',
    'Build a full-stack e-commerce app using MERN Stack with payment processing and inventory management.',
    '["React","Node.js","Express","MongoDB"]',
    342,
    1,
    'all'
  ),
  (
    'task-mgmt',
    'Task Management App',
    'A productivity app to manage tasks, collaborate with team members, and track real-time progress.',
    '["TypeScript","React","Tailwind","Firebase"]',
    189,
    0,
    'my'
  ),
  (
    'weather-dash',
    'Weather Dashboard',
    'Real-time weather app with API integration, location search, radar maps, and 7-day forecasts.',
    '["React","OpenWeather API","Chart.js"]',
    215,
    1,
    'all'
  ),
  (
    'portfolio-site',
    'Portfolio Website',
    'Personal portfolio website template showcasing projects, skill sets, contact forms, and dark mode.',
    '["HTML","Tailwind CSS","JavaScript"]',
    420,
    0,
    'my'
  );

import { NavLink } from 'react-router-dom';

const tabs = [
  { to: '/',       icon: 'home',           label: 'Home',   fillActive: true  },
  { to: '/search', icon: 'search',         label: 'Search', fillActive: false },
  { to: '/deals',  icon: 'local_activity', label: 'Deals',  fillActive: false },
  { to: '/notifications', icon: 'notifications', label: 'Alerts', fillActive: false },
  { to: '/profile', icon: 'person',        label: 'Me',     fillActive: true  },
];

export default function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 h-16 z-50 flex justify-around items-center pb-safe bg-white/95 backdrop-blur-md border-t border-surface-container shadow-bar max-w-[430px] mx-auto">
      {tabs.map((tab) => (
        <NavLink
          key={tab.to}
          to={tab.to}
          end={tab.to === '/'}
          className={({ isActive }) =>
            `flex flex-col items-center justify-center flex-1 h-full text-[10px] font-medium transition-transform duration-150 active:scale-95 ${
              isActive ? 'text-primary' : 'text-zinc-500'
            }`
          }
        >
          {({ isActive }) => (
            <>
              <span
                className="material-symbols-outlined mb-0.5 text-[22px]"
                style={isActive && tab.fillActive ? { fontVariationSettings: "'FILL' 1" } : {}}
              >
                {tab.icon}
              </span>
              <span>{tab.label}</span>
            </>
          )}
        </NavLink>
      ))}
    </nav>
  );
}

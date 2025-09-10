import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  Search, 
  Plus, 
  Home, 
  CheckSquare, 
  User, 
  Headphones, 
  TrendingUp, 
  Calendar,
  Bell,
  Hexagon
} from 'lucide-react';

interface SidebarItem {
  id: string;
  icon: React.ComponentType<any>;
  label: string;
  path?: string;
  isActive?: boolean;
  hasNotification?: boolean;
  notificationCount?: number;
}

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const sidebarItems: SidebarItem[] = [
    {
      id: 'logo',
      icon: Hexagon,
      label: 'Logo',
      path: '/'
    },
    {
      id: 'search',
      icon: Search,
      label: 'Search'
    },
    {
      id: 'add',
      icon: Plus,
      label: 'Add New',
      isActive: true
    },
    {
      id: 'home',
      icon: Home,
      label: 'Home',
      path: '/'
    },
    {
      id: 'tasks',
      icon: CheckSquare,
      label: 'Tasks'
    },
    {
      id: 'profile',
      icon: User,
      label: 'Profile'
    },
    {
      id: 'support',
      icon: Headphones,
      label: 'Support'
    },
    {
      id: 'analytics',
      icon: TrendingUp,
      label: 'Analytics'
    },
    {
      id: 'calendar',
      icon: Calendar,
      label: 'Calendar'
    },
    {
      id: 'notifications',
      icon: Bell,
      label: 'Notifications',
      hasNotification: true,
      notificationCount: 1
    }
  ];

  const handleItemClick = (item: SidebarItem) => {
    if (item.path) {
      navigate(item.path);
    }
  };

  const isCurrentPath = (path?: string) => {
    if (!path) return false;
    return location.pathname === path;
  };

  return (
    <div className="fixed left-0 top-0 h-full w-16 bg-gray-100 border-r border-gray-200 flex flex-col items-center py-4 z-50">
      <div className="space-y-4">
        {sidebarItems.map((item, index) => {
          const IconComponent = item.icon;
          const isActive = item.isActive || isCurrentPath(item.path);
          const isLogo = item.id === 'logo';
          
          return (
            <div key={item.id} className="relative">
              <button
                onClick={() => handleItemClick(item)}
                className={`
                  w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-200 group relative
                  ${isActive 
                    ? 'bg-primary-teal text-white shadow-lg' 
                    : isLogo
                    ? 'bg-deep-teal text-white hover:bg-primary-teal'
                    : 'text-gray-600 hover:bg-gray-200 hover:text-gray-900'
                  }
                `}
                title={item.label}
              >
                <IconComponent className="w-5 h-5" />
                
                {/* Notification badge */}
                {item.hasNotification && item.notificationCount && (
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-primary-teal text-white text-xs rounded-full flex items-center justify-center font-medium">
                    {item.notificationCount}
                  </div>
                )}
              </button>
              
              {/* Tooltip */}
              <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50 top-1/2 transform -translate-y-1/2">
                {item.label}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
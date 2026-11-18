import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import AIChat from './AIChat';
import { useTheme } from '../context/ThemeContext';

export default function Layout() {
  const { isDark } = useTheme();
  const [isChatOpen, setIsChatOpen]         = useState(false);
  const [chatInitialMsg, setChatInitialMsg] = useState<string | undefined>();

  // openChat is used by child pages (e.g. Incidents "Investigate" button)
  // to pop open the floating AI chat panel with a pre-built prompt.
  const openChat = (initialMessage?: string) => {
    setChatInitialMsg(initialMessage);
    setIsChatOpen(true);
  };

  return (
    <div className={`min-h-screen ${isDark ? 'bg-[#060a14] text-white' : 'bg-gray-50 text-gray-900'}`}>
      <Sidebar onOpenChat={() => openChat()} isChatOpen={isChatOpen} />
      <div className="ml-[240px] transition-all duration-300">
        <Header />
        <main className="p-6">
          <Outlet context={{ openChat }} />
        </main>
      </div>

      {/* AI Chat panel — opened from the sidebar "AI Assistant" item or the Incidents "Investigate" button */}
      <AIChat
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        initialMessage={chatInitialMsg}
      />
    </div>
  );
}

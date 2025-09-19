import { useEffect, useMemo, useState } from 'react';
import ChatPanel from '../components/ChatPanel';
import Sidebar from '../components/Sidebar';
import TopNav from '../components/TopNav';

export default function Home({ workspace }) {
  const { channels, directMessages, user } = workspace;
  const [theme, setTheme] = useState(workspace.initialTheme);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeConversationId, setActiveConversationId] = useState(workspace.initialConversationId);
  const [messages, setMessages] = useState(workspace.messages);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedTheme = window.localStorage.getItem('slackclone-theme');
      if (storedTheme) {
        setTheme(storedTheme);
      }
    }
  }, []);

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-theme', theme);
    }
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('slackclone-theme', theme);
    }
  }, [theme]);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.innerWidth < 1024) {
      setIsSidebarOpen(false);
    }
  }, []);

  const conversations = useMemo(() => {
    const map = {};
    channels.forEach((channel) => {
      map[channel.id] = { ...channel, type: 'channel' };
    });
    directMessages.forEach((directMessage) => {
      map[directMessage.id] = { ...directMessage, type: 'dm' };
    });
    return map;
  }, [channels, directMessages]);

  const activeConversation = conversations[activeConversationId];

  const handleSendMessage = (text) => {
    const now = new Date();
    const newMessage = {
      id: `${activeConversationId}-${now.getTime()}`,
      author: {
        name: user.name,
        title: user.title,
        avatar: user.avatar,
      },
      time: new Intl.DateTimeFormat('en-US', {
        hour: 'numeric',
        minute: '2-digit',
      }).format(now),
      dateTime: now.toISOString(),
      day: 'Today',
      text,
    };

    setMessages((current) => {
      const currentMessages = current[activeConversationId] ?? [];
      return {
        ...current,
        [activeConversationId]: [...currentMessages, newMessage],
      };
    });
  };

  const handleSelectConversation = (conversationId) => {
    setActiveConversationId(conversationId);
    if (typeof window !== 'undefined' && window.innerWidth < 1024) {
      setIsSidebarOpen(false);
    }
  };

  const toggleSidebar = () => setIsSidebarOpen((value) => !value);
  const toggleTheme = () => setTheme((value) => (value === 'light' ? 'dark' : 'light'));

  return (
    <div className="page">
      <TopNav
        workspaceName={workspace.name}
        activeConversation={activeConversation}
        user={user}
        theme={theme}
        onToggleTheme={toggleTheme}
        isSidebarOpen={isSidebarOpen}
        onToggleSidebar={toggleSidebar}
      />
      <div className={`workspace${isSidebarOpen ? '' : ' workspace--collapsed'}`}>
        {isSidebarOpen ? (
          <Sidebar
            channels={channels}
            directMessages={directMessages}
            activeId={activeConversationId}
            onSelect={handleSelectConversation}
          />
        ) : null}
        {activeConversation ? (
          <ChatPanel
            conversation={activeConversation}
            messages={messages[activeConversationId] ?? []}
            onSendMessage={handleSendMessage}
          />
        ) : null}
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const workspace = {
    name: 'Acme Collaboration',
    initialTheme: 'light',
    initialConversationId: 'general',
    user: {
      name: 'Jordan Carter',
      title: 'Product Manager',
      avatar: 'https://i.pravatar.cc/160?img=32',
    },
    channels: [
      {
        id: 'general',
        name: '# general',
        description: 'Company-wide announcements and wins in one upbeat channel.',
        topic: 'Announcements',
        members: 138,
        unread: 2,
      },
      {
        id: 'design-systems',
        name: '# design-systems',
        description: 'Cross-team home for components, tokens, and accessibility.',
        topic: 'Weekly release planning',
        members: 42,
        unread: 0,
      },
      {
        id: 'customer-insights',
        name: '# customer-insights',
        description: 'Fresh learnings from research, calls, and product analytics.',
        topic: 'Q3 journey mapping',
        members: 28,
        unread: 6,
      },
    ],
    directMessages: [
      {
        id: 'dm-sara-lane',
        name: 'Sara Lane',
        title: 'Design Lead',
        presence: 'online',
        description: 'You and Sara Lane',
        topic: 'Design system sync',
        members: 'You + 1',
      },
      {
        id: 'dm-lee-chen',
        name: 'Lee Chen',
        title: 'Data Scientist',
        presence: 'away',
        description: 'You and Lee Chen',
        topic: 'Experiment readout',
        members: 'You + 1',
      },
      {
        id: 'dm-olivia-banks',
        name: 'Olivia Banks',
        title: 'Customer Success',
        presence: 'offline',
        description: 'You and Olivia Banks',
        topic: 'Enterprise rollout',
        members: 'You + 1',
      },
    ],
    messages: {
      general: [
        {
          id: 'general-1',
          day: 'Today',
          time: '9:18 AM',
          dateTime: '2024-06-06T09:18:00.000Z',
          text: 'Morning team! Overnight we shipped the updated onboarding checklist. Metrics are looking great so far.',
          author: {
            name: 'Mel Torres',
            title: 'Engineering Manager',
            avatar: 'https://i.pravatar.cc/160?img=12',
          },
        },
        {
          id: 'general-2',
          day: 'Today',
          time: '9:25 AM',
          dateTime: '2024-06-06T09:25:00.000Z',
          text: 'Love it! Make sure to drop screenshots in #customer-insights so the success team can share the update.',
          author: {
            name: 'Jordan Carter',
            title: 'Product Manager',
            avatar: 'https://i.pravatar.cc/160?img=32',
          },
        },
        {
          id: 'general-3',
          day: 'Yesterday',
          time: '5:42 PM',
          dateTime: '2024-06-05T17:42:00.000Z',
          text: 'Reminder: town hall tomorrow at 10 AM Pacific. Drop any questions in the thread before then!',
          author: {
            name: 'Priya Desai',
            title: 'Operations',
            avatar: 'https://i.pravatar.cc/160?img=45',
          },
        },
      ],
      'design-systems': [
        {
          id: 'design-1',
          day: 'Today',
          time: '8:02 AM',
          dateTime: '2024-06-06T08:02:00.000Z',
          text: 'Token audit doc is ready for review. Please leave comments before stand-up.',
          author: {
            name: 'Sara Lane',
            title: 'Design Lead',
            avatar: 'https://i.pravatar.cc/160?img=15',
          },
          attachments: [
            {
              id: 'design-attachment-1',
              title: 'Foundations-tokens-v4.fig',
              meta: 'Figma • Updated 1 hour ago',
            },
          ],
        },
        {
          id: 'design-2',
          day: 'Today',
          time: '8:17 AM',
          dateTime: '2024-06-06T08:17:00.000Z',
          text: 'Thanks! We can slot this into the cadence doc once engineering signs off.',
          author: {
            name: 'Jordan Carter',
            title: 'Product Manager',
            avatar: 'https://i.pravatar.cc/160?img=32',
          },
        },
      ],
      'customer-insights': [
        {
          id: 'insights-1',
          day: 'Today',
          time: '10:07 AM',
          dateTime: '2024-06-06T10:07:00.000Z',
          text: 'Call recording from yesterday’s enterprise onboarding is uploaded. Lots of insights around admin permissions.',
          author: {
            name: 'Olivia Banks',
            title: 'Customer Success',
            avatar: 'https://i.pravatar.cc/160?img=20',
          },
          attachments: [
            {
              id: 'insights-attachment-1',
              title: 'Enterprise-onboarding-notes.docx',
              meta: 'Microsoft Word • 225 KB',
            },
          ],
        },
        {
          id: 'insights-2',
          day: 'Yesterday',
          time: '4:12 PM',
          dateTime: '2024-06-05T16:12:00.000Z',
          text: 'Survey results indicate a 12% uptick in activation when we surface quick tutorials during setup.',
          author: {
            name: 'Lee Chen',
            title: 'Data Scientist',
            avatar: 'https://i.pravatar.cc/160?img=33',
          },
        },
      ],
      'dm-sara-lane': [
        {
          id: 'dm-sara-1',
          day: 'Today',
          time: '7:55 AM',
          dateTime: '2024-06-06T07:55:00.000Z',
          text: 'Morning! Want to align on the hero motion studies before today’s sync?',
          author: {
            name: 'Sara Lane',
            title: 'Design Lead',
            avatar: 'https://i.pravatar.cc/160?img=15',
          },
        },
        {
          id: 'dm-sara-2',
          day: 'Today',
          time: '7:57 AM',
          dateTime: '2024-06-06T07:57:00.000Z',
          text: 'Yes! I’ll bring the prototype with the updated transitions.',
          author: {
            name: 'Jordan Carter',
            title: 'Product Manager',
            avatar: 'https://i.pravatar.cc/160?img=32',
          },
        },
      ],
      'dm-lee-chen': [
        {
          id: 'dm-lee-1',
          day: 'Yesterday',
          time: '6:18 PM',
          dateTime: '2024-06-05T18:18:00.000Z',
          text: 'The experiment dashboard is refreshed. Let me know if you need any other cuts of the data.',
          author: {
            name: 'Lee Chen',
            title: 'Data Scientist',
            avatar: 'https://i.pravatar.cc/160?img=33',
          },
        },
      ],
      'dm-olivia-banks': [
        {
          id: 'dm-olivia-1',
          day: 'Today',
          time: '11:05 AM',
          dateTime: '2024-06-06T11:05:00.000Z',
          text: 'Heads up: Northwind wants to pilot the workflow builder next week. Can we prepare a quick start deck?',
          author: {
            name: 'Olivia Banks',
            title: 'Customer Success',
            avatar: 'https://i.pravatar.cc/160?img=20',
          },
        },
        {
          id: 'dm-olivia-2',
          day: 'Today',
          time: '11:10 AM',
          dateTime: '2024-06-06T11:10:00.000Z',
          text: 'Absolutely. I’ll pull the existing onboarding template and tailor it for their use case.',
          author: {
            name: 'Jordan Carter',
            title: 'Product Manager',
            avatar: 'https://i.pravatar.cc/160?img=32',
          },
        },
      ],
    },
  };

  return {
    props: {
      workspace,
    },
  };
}

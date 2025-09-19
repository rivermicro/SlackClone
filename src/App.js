import React from './mini-react.js';

const { createElement: h, useState, useMemo, useRef } = React;
const Fragment = React.Fragment;

const initialWorkspace = {
  workspaceName: 'Design Platform',
  workspaceTagline: 'Design systems · Research · Product',
  user: {
    id: 'u-alicia',
    name: 'Alicia Chen',
    title: 'Product Design Lead',
    initials: 'AC',
    avatarColor: '#6366f1',
  },
  channels: [
    {
      id: 'general',
      name: 'general',
      topic: 'Company-wide announcements and async updates',
      description: 'Team-wide announcements and planning with context for the week.',
      starred: true,
      unreadCount: 2,
      members: 112,
      highlights: {
        recap: 'Weekly all-hands moved to Thursday · Q2 planning doc ready for review',
        pinned: 6,
        files: 28,
      },
      messages: [
        {
          id: 'm-gen-01',
          author: {
            name: 'Olivia Nguyen',
            handle: 'olivia',
            title: 'Design Operations',
            initials: 'ON',
            avatarColor: '#f97316',
          },
          timestamp: '2024-04-18T15:24:00Z',
          content: 'Reminder that tomorrow\'s all-hands is a hybrid session. Agenda and deck are ready for async review.',
          attachments: [
            {
              id: 'a-gen-01',
              title: 'April All-hands deck',
              description: 'Slides covering Q2 initiatives, hiring updates, and research readouts.',
              href: '#',
            },
          ],
          reactions: [
            { emoji: '👍', count: 7 },
            { emoji: '🎉', count: 5 },
          ],
        },
        {
          id: 'm-gen-02',
          author: {
            name: 'Marcus Hill',
            handle: 'marcus',
            title: 'Brand Design',
            initials: 'MH',
            avatarColor: '#8b5cf6',
          },
          timestamp: '2024-04-18T16:02:00Z',
          content: 'Sharing the new event branding explorations for next month\'s launch. Feedback welcome before Friday!',
          attachments: [
            {
              id: 'a-gen-02',
              title: 'Launch visuals exploration',
              description: 'Figma file with hero, billboard, and email header concepts.',
              href: '#',
            },
          ],
          reactions: [
            { emoji: '💜', count: 4 },
            { emoji: '👀', count: 3 },
          ],
        },
        {
          id: 'm-gen-03',
          author: {
            name: 'Alicia Chen',
            handle: 'alicia',
            title: 'Product Design Lead',
            initials: 'AC',
            avatarColor: '#6366f1',
          },
          timestamp: '2024-04-18T16:15:00Z',
          content: 'Thanks Marcus! Let\'s carve out 20 minutes in tomorrow\'s critique for async notes and top level comments.',
          attachments: [],
          reactions: [
            { emoji: '✅', count: 3 },
          ],
        },
      ],
    },
    {
      id: 'design-system',
      name: 'design-system',
      topic: 'Tokens, components, and quality-of-life improvements',
      description: 'Tracking system tokens, component roll-outs, and documentation updates.',
      starred: true,
      unreadCount: 0,
      members: 38,
      highlights: {
        recap: 'Navbar composable released · Color tokens audit in review',
        pinned: 11,
        files: 46,
      },
      messages: [
        {
          id: 'm-ds-01',
          author: {
            name: 'Jordan Lee',
            handle: 'jordan',
            title: 'UX Engineer',
            initials: 'JL',
            avatarColor: '#0ea5e9',
          },
          timestamp: '2024-04-19T09:42:00Z',
          content: 'Navbar composable shipped to production. Docs updated with responsive examples and accessibility checklist.',
          attachments: [],
          reactions: [
            { emoji: '🚀', count: 9 },
            { emoji: '👏', count: 6 },
          ],
        },
        {
          id: 'm-ds-02',
          author: {
            name: 'Priya Natarajan',
            handle: 'priya',
            title: 'Staff Designer',
            initials: 'PN',
            avatarColor: '#ec4899',
          },
          timestamp: '2024-04-19T10:18:00Z',
          content: 'Color tokens audit v2 ready for review. Added neutral ramp tweaks and updated docs for dark mode spacing.',
          attachments: [
            {
              id: 'a-ds-01',
              title: 'Color tokens audit v2',
              description: 'Sheet comparing old vs new values with contrast notes.',
              href: '#',
            },
          ],
          reactions: [
            { emoji: '✨', count: 6 },
            { emoji: '🧪', count: 2 },
          ],
        },
      ],
    },
    {
      id: 'research',
      name: 'research-readouts',
      topic: 'Research synthesis and highlight reels',
      description: 'Digestible research insights and highlight reels to keep everyone in the loop.',
      starred: false,
      unreadCount: 5,
      members: 21,
      highlights: {
        recap: 'Checkout study week 3 in the field · Beta tester clips collected',
        pinned: 4,
        files: 19,
      },
      messages: [
        {
          id: 'm-res-01',
          author: {
            name: 'Samira Patel',
            handle: 'samira',
            title: 'Lead Researcher',
            initials: 'SP',
            avatarColor: '#22c55e',
          },
          timestamp: '2024-04-18T13:04:00Z',
          content: 'Field notes from yesterday\'s checkout study are in the Miro board. Highlight clips uploading now.',
          attachments: [
            {
              id: 'a-res-01',
              title: 'Checkout study · Week 3 notes',
              description: 'Structured takeaways with quotes, sentiment tags, and supporting clips.',
              href: '#',
            },
          ],
          reactions: [
            { emoji: '🔍', count: 5 },
          ],
        },
      ],
    },
  ],
  directMessages: [
    {
      id: 'dm-jordan',
      name: 'Jordan Lee',
      status: 'active',
      role: 'UX Engineer',
      initials: 'JL',
      avatarColor: '#0ea5e9',
      unreadCount: 0,
      messages: [
        {
          id: 'm-dm-jordan-01',
          author: 'Jordan Lee',
          fromMe: false,
          timestamp: '2024-04-18T14:25:00Z',
          content: 'Have a minute to look at the new walkthrough? I noted a few places where the animation feels heavy.',
        },
        {
          id: 'm-dm-jordan-02',
          author: 'Alicia Chen',
          fromMe: true,
          timestamp: '2024-04-18T14:30:00Z',
          content: 'Absolutely. I can swing by after the hiring sync or we can async in FigJam.',
        },
      ],
    },
    {
      id: 'dm-riley',
      name: 'Riley Tanaka',
      status: 'away',
      role: 'Motion Designer',
      initials: 'RT',
      avatarColor: '#f97316',
      unreadCount: 3,
      messages: [
        {
          id: 'm-dm-riley-01',
          author: 'Riley Tanaka',
          fromMe: false,
          timestamp: '2024-04-18T11:10:00Z',
          content: 'Uploading the transition study now. Curious which option feels more balanced on mobile.',
        },
      ],
    },
    {
      id: 'dm-tony',
      name: 'Tony Vega',
      status: 'offline',
      role: 'Frontend Engineer',
      initials: 'TV',
      avatarColor: '#ef4444',
      unreadCount: 0,
      messages: [
        {
          id: 'm-dm-tony-01',
          author: 'Tony Vega',
          fromMe: false,
          timestamp: '2024-04-17T18:45:00Z',
          content: 'Pushing the timeline sync tonight. Should unblock QA to verify the fix tomorrow morning.',
        },
      ],
    },
  ],
};

function App() {
  const [workspace, setWorkspace] = useState(initialWorkspace);
  const [activeConversation, setActiveConversation] = useState({ type: 'channel', id: initialWorkspace.channels[0].id });
  const [searchTerm, setSearchTerm] = useState('');

  const filteredChannels = useMemo(() => {
    if (!searchTerm) {
      return workspace.channels;
    }
    const term = searchTerm.toLowerCase();
    return workspace.channels.filter((channel) => {
      return channel.name.toLowerCase().includes(term) || (channel.topic && channel.topic.toLowerCase().includes(term));
    });
  }, [workspace, searchTerm]);

  const filteredDMs = useMemo(() => {
    if (!searchTerm) {
      return workspace.directMessages;
    }
    const term = searchTerm.toLowerCase();
    return workspace.directMessages.filter((dm) => dm.name.toLowerCase().includes(term) || (dm.role && dm.role.toLowerCase().includes(term)));
  }, [workspace, searchTerm]);

  const conversation = useMemo(() => {
    if (activeConversation.type === 'channel') {
      return workspace.channels.find((channel) => channel.id === activeConversation.id);
    }
    return workspace.directMessages.find((dm) => dm.id === activeConversation.id);
  }, [workspace, activeConversation]);

  const isChannel = activeConversation.type === 'channel';

  function handleSelectConversation(nextConversation) {
    setActiveConversation(nextConversation);
  }

  function handleSendMessage(messageBody) {
    const trimmed = messageBody.trim();
    if (!trimmed) {
      return;
    }
    const timestamp = new Date().toISOString();
    if (isChannel) {
      setWorkspace((previous) => {
        const sender = previous.user;
        return {
          ...previous,
          channels: previous.channels.map((channel) => {
            if (channel.id !== activeConversation.id) {
              return channel;
            }
            const nextMessages = channel.messages.concat({
              id: `m-${activeConversation.id}-${Date.now()}`,
              author: {
                name: sender.name,
                handle: sender.name.split(' ')[0].toLowerCase(),
                title: sender.title,
                initials: sender.initials,
                avatarColor: sender.avatarColor,
              },
              timestamp,
              content: trimmed,
              attachments: [],
              reactions: [],
            });
            return { ...channel, messages: nextMessages };
          }),
        };
      });
    } else {
      setWorkspace((previous) => {
        const senderName = previous.user.name;
        return {
          ...previous,
          directMessages: previous.directMessages.map((dm) => {
            if (dm.id !== activeConversation.id) {
              return dm;
            }
            const nextMessages = dm.messages.concat({
              id: `m-${activeConversation.id}-${Date.now()}`,
              author: senderName,
              fromMe: true,
              timestamp,
              content: trimmed,
            });
            return { ...dm, messages: nextMessages };
          }),
        };
      });
    }
  }

  return h(
    'div',
    { className: 'app-shell' },
    h(Sidebar, {
      workspace,
      channels: filteredChannels,
      directMessages: filteredDMs,
      activeConversation,
      onSelectConversation: handleSelectConversation,
      searchTerm,
      onSearchTermChange: setSearchTerm,
    }),
    h(ChatPane, {
      workspace,
      conversation,
      isChannel,
      onSendMessage: handleSendMessage,
    }),
  );
}

function Sidebar(props) {
  const { workspace, channels, directMessages, activeConversation, onSelectConversation, searchTerm, onSearchTermChange } = props;

  return h(
    'aside',
    { className: 'sidebar' },
    h('div', { className: 'workspace-summary' },
      h('div', { className: 'workspace-avatar', style: { background: '#111827' } }, workspace.workspaceName.split(' ').map((word) => word[0]).join('')),
      h('div', { className: 'workspace-meta' },
        h('div', { className: 'workspace-name' }, workspace.workspaceName),
        h('div', { className: 'workspace-tagline' }, workspace.workspaceTagline),
      ),
      h('button', { className: 'workspace-compose-button', type: 'button' }, '+ New'),
    ),
    h('div', { className: 'sidebar-search' },
      h('input', {
        type: 'search',
        placeholder: 'Search channels, people…',
        value: searchTerm,
        oninput: (event) => onSearchTermChange(event.target.value),
        className: 'sidebar-search-input',
      }),
    ),
    h(SidebarSection, {
      title: 'Starred',
      items: channels.filter((channel) => channel.starred),
      renderItem: (channel) => h(ChannelListItem, {
        key: channel.id,
        channel,
        isActive: activeConversation.type === 'channel' && activeConversation.id === channel.id,
        onSelect: () => onSelectConversation({ type: 'channel', id: channel.id }),
      }),
    }),
    h(SidebarSection, {
      title: 'Channels',
      actionLabel: '+',
      items: channels,
      renderItem: (channel) => h(ChannelListItem, {
        key: channel.id,
        channel,
        isActive: activeConversation.type === 'channel' && activeConversation.id === channel.id,
        onSelect: () => onSelectConversation({ type: 'channel', id: channel.id }),
      }),
    }),
    h(SidebarSection, {
      title: 'Direct messages',
      items: directMessages,
      renderItem: (dm) => h(DirectMessageItem, {
        key: dm.id,
        directMessage: dm,
        isActive: activeConversation.type === 'dm' && activeConversation.id === dm.id,
        onSelect: () => onSelectConversation({ type: 'dm', id: dm.id }),
      }),
    }),
    h('div', { className: 'sidebar-footer' },
      h('div', { className: 'sidebar-user' },
        h(Avatar, { initials: workspace.user.initials, color: workspace.user.avatarColor }),
        h('div', { className: 'sidebar-user-meta' },
          h('div', { className: 'sidebar-user-name' }, workspace.user.name),
          h('div', { className: 'sidebar-user-title' }, workspace.user.title),
        ),
      ),
      h('button', { className: 'sidebar-user-status', type: 'button' }, 'Set status'),
    ),
  );
}

function SidebarSection(props) {
  const { title, actionLabel, items, renderItem } = props;
  return h(
    'section',
    { className: 'sidebar-section' },
    h('header', { className: 'sidebar-section-header' },
      h('span', { className: 'sidebar-section-title' }, title),
      actionLabel ? h('button', { className: 'sidebar-section-action', type: 'button' }, actionLabel) : null,
    ),
    h('div', { className: 'sidebar-section-content' }, items.map((item) => renderItem(item))),
  );
}

function ChannelListItem(props) {
  const { channel, isActive, onSelect } = props;
  return h(
    'button',
    {
      className: joinClassNames('sidebar-item', isActive ? 'is-active' : ''),
      type: 'button',
      onclick: onSelect,
    },
    h('span', { className: 'sidebar-item-symbol' }, '#'),
    h('div', { className: 'sidebar-item-body' },
      h('div', { className: 'sidebar-item-primary' }, channel.name),
      channel.topic ? h('div', { className: 'sidebar-item-secondary' }, channel.topic) : null,
    ),
    channel.unreadCount > 0 ? h('span', { className: 'sidebar-item-unread' }, String(channel.unreadCount)) : null,
  );
}

function DirectMessageItem(props) {
  const { directMessage, isActive, onSelect } = props;
  return h(
    'button',
    {
      className: joinClassNames('sidebar-item', 'sidebar-item--dm', isActive ? 'is-active' : ''),
      type: 'button',
      onclick: onSelect,
    },
    h(Avatar, { initials: directMessage.initials, color: directMessage.avatarColor, size: 28, status: directMessage.status }),
    h('div', { className: 'sidebar-item-body' },
      h('div', { className: 'sidebar-item-primary' }, directMessage.name),
      directMessage.role ? h('div', { className: 'sidebar-item-secondary' }, directMessage.role) : null,
    ),
    directMessage.unreadCount > 0 ? h('span', { className: 'sidebar-item-unread' }, String(directMessage.unreadCount)) : null,
  );
}

function ChatPane(props) {
  const { workspace, conversation, isChannel, onSendMessage } = props;

  if (!conversation) {
    return h('main', { className: 'chat-pane' }, h('div', { className: 'chat-empty-state' }, 'Select a channel or start a new conversation.'));
  }

  return h(
    'main',
    { className: 'chat-pane' },
    h(ConversationHeader, { workspace, conversation, isChannel }),
    h(MessageTimeline, { conversation, isChannel }),
    h(MessageComposer, { workspace, conversation, onSendMessage, isChannel }),
  );
}

function ConversationHeader(props) {
  const { workspace, conversation, isChannel } = props;
  const titlePrefix = isChannel ? '#' : '';
  const highlights = conversation.highlights;

  return h(
    'header',
    { className: 'chat-header' },
    h('div', { className: 'chat-header-primary' },
      h('div', { className: 'chat-header-title' }, `${titlePrefix}${conversation.name}`),
      conversation.topic ? h('div', { className: 'chat-header-topic' }, conversation.topic) : null,
    ),
    isChannel && highlights ? h('div', { className: 'chat-header-highlights' },
      h('div', { className: 'chat-highlight-card' },
        h('div', { className: 'chat-highlight-label' }, 'Channel recap'),
        h('div', { className: 'chat-highlight-value' }, highlights.recap),
      ),
      h('div', { className: 'chat-highlight-card' },
        h('div', { className: 'chat-highlight-label' }, 'Pinned'),
        h('div', { className: 'chat-highlight-value' }, `${highlights.pinned}`),
      ),
      h('div', { className: 'chat-highlight-card' },
        h('div', { className: 'chat-highlight-label' }, 'Files'),
        h('div', { className: 'chat-highlight-value' }, `${highlights.files}`),
      ),
    ) : null,
    !isChannel ? h('div', { className: 'chat-header-dm' },
      h('div', { className: 'chat-header-dm-user' },
        h(Avatar, { initials: conversation.initials, color: conversation.avatarColor, size: 40, status: conversation.status }),
        h('div', { className: 'chat-header-dm-meta' },
          h('div', { className: 'chat-header-dm-name' }, conversation.name),
          conversation.role ? h('div', { className: 'chat-header-topic' }, conversation.role) : null,
        ),
      ),
      h('div', { className: 'chat-header-dm-actions' },
        h('button', { className: 'chat-header-action', type: 'button' }, 'Schedule huddle'),
        h('button', { className: 'chat-header-action', type: 'button' }, 'Share file'),
      ),
    ) : null,
  );
}

function MessageTimeline(props) {
  const { conversation, isChannel } = props;
  const messages = conversation.messages || [];

  if (!messages.length) {
    return h('section', { className: 'chat-timeline empty' }, h('div', { className: 'chat-empty-state' }, isChannel ? 'This channel is quiet. Start the conversation!' : 'Send a message to kick things off.'));
  }

  const groups = groupMessagesByDay(messages);

  return h(
    'section',
    { className: 'chat-timeline' },
    groups.map((group) => h(
      Fragment,
      { key: group.day },
      h('div', { className: 'chat-timeline-divider' }, group.day),
      group.messages.map((message) => h(MessageRow, { key: message.id, message, conversation, isChannel })),
    )),
  );
}

function MessageRow(props) {
  const { message, conversation, isChannel } = props;
  const author = message.author || {};
  const isSelf = Boolean(message.fromMe);

  return h(
    'article',
    { className: joinClassNames('chat-message', isSelf ? 'is-self' : '') },
    isChannel
      ? h(Avatar, { initials: author.initials || author.name?.[0], color: author.avatarColor || '#4b5563' })
      : h(Avatar, {
          initials: (message.fromMe ? 'You' : message.author).split(' ').map((word) => word[0]).join(''),
          color: message.fromMe ? '#6366f1' : conversation?.avatarColor || '#111827',
          status: !message.fromMe ? conversation?.status : undefined,
        }),
    h('div', { className: 'chat-message-body' },
      h('header', { className: 'chat-message-meta' },
        h('span', { className: 'chat-message-author' }, isChannel ? author.name : (message.fromMe ? 'You' : message.author)),
        isChannel && author.title ? h('span', { className: 'chat-message-role' }, ` · ${author.title}`) : null,
        h('span', { className: 'chat-message-time' }, formatTimestamp(message.timestamp)),
      ),
      h('div', { className: 'chat-message-content' }, message.content),
      message.attachments && message.attachments.length
        ? h('div', { className: 'chat-message-attachments' }, message.attachments.map((attachment) => h(MessageAttachment, { key: attachment.id, attachment })))
        : null,
      message.reactions && message.reactions.length
        ? h('div', { className: 'chat-message-reactions' }, message.reactions.map((reaction) => h('span', { className: 'chat-reaction-chip' }, `${reaction.emoji} ${reaction.count}`)))
        : null,
    ),
  );
}

function MessageAttachment(props) {
  const { attachment } = props;
  return h(
    'a',
    { className: 'chat-attachment', href: attachment.href },
    h('div', { className: 'chat-attachment-title' }, attachment.title),
    attachment.description ? h('div', { className: 'chat-attachment-description' }, attachment.description) : null,
  );
}

function MessageComposer(props) {
  const { workspace, conversation, onSendMessage, isChannel } = props;
  const [draft, setDraft] = useState('');
  const textareaRef = useRef(null);

  function handleSubmit(event) {
    event.preventDefault();
    onSendMessage(draft);
    setDraft('');
    if (textareaRef.current) {
      textareaRef.current.value = '';
    }
    textareaRef.current = null;
    setTimeout(() => {
      const field = document.querySelector('.chat-composer-textarea');
      if (field) {
        field.focus();
      }
    }, 0);
  }

  function handleKeyDown(event) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSubmit(event);
    }
  }

  return h(
    'form',
    { className: 'chat-composer', onsubmit: handleSubmit },
    h('div', { className: 'chat-composer-toolbar' },
      h('span', { className: 'chat-composer-context' }, isChannel ? `Message #${conversation?.name || ''}` : `Message ${conversation?.name || ''}`),
      h('div', { className: 'chat-composer-actions' },
        h('button', { type: 'button', className: 'chat-composer-action' }, 'Format'),
        h('button', { type: 'button', className: 'chat-composer-action' }, 'Attachment'),
        h('button', { type: 'button', className: 'chat-composer-action' }, 'Shortcuts'),
      ),
    ),
    h('textarea', {
      className: 'chat-composer-textarea',
      placeholder: isChannel ? 'Send a message to the channel' : `Message ${conversation?.name || ''}`,
      value: draft,
      oninput: (event) => {
        setDraft(event.target.value);
        if (textareaRef.current === null) {
          textareaRef.current = event.target;
        }
      },
      rows: 3,
      onkeydown: handleKeyDown,
    }),
    h('div', { className: 'chat-composer-footer' },
      h('div', { className: 'chat-composer-hint' }, 'Press Enter to send · Shift + Enter for a new line'),
      h('button', { type: 'submit', className: 'chat-composer-submit' }, 'Send'),
    ),
  );
}

function Avatar(props) {
  const { initials, color, size = 32, status } = props;
  return h(
    'div',
    {
      className: 'avatar',
      style: { background: color || '#4b5563', width: `${size}px`, height: `${size}px` },
    },
    h('span', { className: 'avatar-initials' }, initials || ''),
    status ? h('span', { className: joinClassNames('avatar-status', `status-${status}`) }) : null,
  );
}

function groupMessagesByDay(messages) {
  const formatter = new Intl.DateTimeFormat('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  const groups = [];
  messages.forEach((message) => {
    const key = formatter.format(new Date(message.timestamp));
    let group = groups.find((item) => item.day === key);
    if (!group) {
      group = { day: key, messages: [] };
      groups.push(group);
    }
    group.messages.push(message);
  });
  return groups;
}

function formatTimestamp(isoString) {
  if (!isoString) {
    return '';
  }
  const formatter = new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: '2-digit',
  });
  return formatter.format(new Date(isoString));
}

function joinClassNames(...values) {
  return values.filter(Boolean).join(' ');
}

export default App;

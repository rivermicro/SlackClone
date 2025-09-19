import { useEffect, useMemo, useRef, useState } from 'react';

function DayDivider({ label }) {
  return (
    <div className="chat-panel__day">
      <span>{label}</span>
    </div>
  );
}

function Message({ message }) {
  return (
    <article className="message" aria-label={`${message.author.name} at ${message.time}`}>
      <img src={message.author.avatar} alt="" className="message__avatar" width={40} height={40} />
      <div className="message__body">
        <header className="message__meta">
          <span className="message__author">{message.author.name}</span>
          {message.author.title ? <span className="message__author-title">{message.author.title}</span> : null}
          <time dateTime={message.dateTime} className="message__time">
            {message.time}
          </time>
        </header>
        <p className="message__text">{message.text}</p>
        {message.attachments?.length ? (
          <ul className="message__attachments">
            {message.attachments.map((attachment) => (
              <li key={attachment.id} className="message__attachment">
                <span className="message__attachment-title">{attachment.title}</span>
                <span className="message__attachment-meta">{attachment.meta}</span>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </article>
  );
}

export default function ChatPanel({ conversation, messages, onSendMessage }) {
  const [draft, setDraft] = useState('');
  const scrollRef = useRef(null);
  const bottomRef = useRef(null);

  useEffect(() => {
    setDraft('');
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [conversation.id]);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }, [messages]);

  const groupedMessages = useMemo(() => {
    const groups = [];
    let currentDay = null;

    messages.forEach((message) => {
      if (message.day !== currentDay) {
        currentDay = message.day;
        groups.push({ type: 'day', id: `day-${message.day}`, day: message.day });
      }
      groups.push({ type: 'message', id: message.id, message });
    });

    return groups;
  }, [messages]);

  const sendDraft = () => {
    const value = draft.trim();
    if (!value) {
      return false;
    }
    onSendMessage(value);
    setDraft('');
    return true;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    sendDraft();
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      sendDraft();
    }
  };

  return (
    <section className="chat-panel" aria-label={`Conversation ${conversation.name}`}>
      <header className="chat-panel__header">
        <div>
          <h1 className="chat-panel__title">{conversation.name}</h1>
          <p className="chat-panel__subtitle">{conversation.description}</p>
        </div>
        <dl className="chat-panel__stats">
          <div>
            <dt>Members</dt>
            <dd>{conversation.members}</dd>
          </div>
          <div>
            <dt>Topic</dt>
            <dd>{conversation.topic}</dd>
          </div>
        </dl>
      </header>
      <div className="chat-panel__messages" ref={scrollRef}>
        {groupedMessages.map((group) =>
          group.type === 'day' ? (
            <DayDivider key={group.id} label={group.day} />
          ) : (
            <Message key={group.id} message={group.message} />
          )
        )}
        <div ref={bottomRef} />
      </div>
      <form className="chat-panel__composer" onSubmit={handleSubmit}>
        <label htmlFor="chat-composer" className="sr-only">
          Message {conversation.name}
        </label>
        <textarea
          id="chat-composer"
          className="chat-panel__input"
          placeholder={`Message ${conversation.name}`}
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          onKeyDown={handleKeyDown}
          rows={3}
        />
        <div className="chat-panel__composer-actions">
          <span className="chat-panel__hint">Press Enter to send • Shift + Enter for a new line</span>
          <button type="submit" className="chat-panel__send">
            Send
          </button>
        </div>
      </form>
    </section>
  );
}

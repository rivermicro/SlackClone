export default function Sidebar({ channels, directMessages, activeId, onSelect }) {
  return (
    <aside id="workspace-sidebar" className="sidebar" aria-label="Workspace navigation">
      <section className="sidebar__section">
        <div className="sidebar__section-header">
          <h2 className="sidebar__section-title">Channels</h2>
          <button type="button" className="sidebar__add" aria-label="Add channel">
            +
          </button>
        </div>
        <nav className="sidebar__list" aria-label="Channels">
          {channels.map((channel) => (
            <button
              key={channel.id}
              type="button"
              onClick={() => onSelect(channel.id)}
              className={`sidebar__item${channel.id === activeId ? ' is-active' : ''}`}
            >
              <span className="sidebar__item-name">{channel.name}</span>
              {channel.unread ? (
                <span className="sidebar__badge" aria-label={`${channel.unread} unread messages`}>
                  {channel.unread}
                </span>
              ) : null}
            </button>
          ))}
        </nav>
      </section>
      <section className="sidebar__section">
        <div className="sidebar__section-header">
          <h2 className="sidebar__section-title">Direct messages</h2>
          <button type="button" className="sidebar__add" aria-label="Start direct message">
            +
          </button>
        </div>
        <nav className="sidebar__list" aria-label="Direct messages">
          {directMessages.map((dm) => (
            <button
              key={dm.id}
              type="button"
              onClick={() => onSelect(dm.id)}
              className={`sidebar__item${dm.id === activeId ? ' is-active' : ''}`}
            >
              <span className={`sidebar__presence sidebar__presence--${dm.presence}`} aria-hidden="true" />
              <span className="sidebar__item-name">{dm.name}</span>
              <span className="sidebar__item-meta">{dm.title}</span>
            </button>
          ))}
        </nav>
      </section>
    </aside>
  );
}

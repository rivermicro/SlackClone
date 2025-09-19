export default function TopNav({
  workspaceName,
  activeConversation,
  user,
  theme,
  onToggleTheme,
  isSidebarOpen,
  onToggleSidebar,
}) {
  return (
    <header className="top-nav" role="banner">
      <div className="top-nav__left">
        <button
          type="button"
          className="top-nav__menu"
          aria-expanded={isSidebarOpen}
          aria-controls="workspace-sidebar"
          onClick={onToggleSidebar}
        >
          <span className="sr-only">Toggle workspace navigation</span>
          <span aria-hidden="true">☰</span>
        </button>
        <div className="top-nav__titles">
          <span className="top-nav__workspace">{workspaceName}</span>
          <span className="top-nav__conversation">{activeConversation?.name}</span>
        </div>
      </div>
      <div className="top-nav__right">
        <button
          type="button"
          className="top-nav__theme"
          onClick={onToggleTheme}
          aria-label="Toggle light and dark theme"
        >
          <span aria-hidden="true">{theme === 'dark' ? '🌙' : '🌞'}</span>
          <span className="top-nav__theme-label">{theme === 'dark' ? 'Dark' : 'Light'} mode</span>
        </button>
        <div className="top-nav__user">
          <img
            src={user.avatar}
            alt=""
            className="top-nav__avatar"
            width={40}
            height={40}
          />
          <div className="top-nav__user-meta">
            <span className="top-nav__user-name">{user.name}</span>
            <span className="top-nav__user-title">{user.title}</span>
          </div>
        </div>
      </div>
    </header>
  );
}

const Menu = props => {
    return (
      <nav className="menu">
        <NavLink className="menu__item" to="/" exact activeClassName="menu__item-active">Главная</NavLink>
        <NavLink className="menu__item" to="/drift" activeClassName="menu__item-active">Дрифт-такси</NavLink>
        <NavLink className="menu__item" to="/timeattack" activeClassName="menu__item-active">Time Attack</NavLink>
        <NavLink className="menu__item" to="/forza" activeClassName="menu__item-active">Forza Karting</NavLink>
      </nav>
    )
}
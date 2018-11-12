class App extends React.Component {
    render() {
      return (
        <Router>
          <div className="tabs">
            <nav className="tabs__items">
              <NavLink className="tabs__item" to="/" exact activeClassName="tabs__item-active">Рефераты</NavLink>
              <NavLink className="tabs__item" to="/creator" activeClassName="tabs__item-active">Криэйтор</NavLink>
              <NavLink className="tabs__item" to="/fortune" activeClassName="tabs__item-active">Гадалка</NavLink>
            </nav>
            <div className="tabs__content">
              <Route exact path="/" component={Essay} />
              <Route path="/creator" component={Creator} />
              <Route path="" component={Fortune} />
            </div>
          </div>
        </Router>
      )
    }
}

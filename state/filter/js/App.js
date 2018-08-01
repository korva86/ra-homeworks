'use strict'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      'activeFilter': 'all'
    }
  }

  sort(projects, category) {
    if (category.toLowerCase() === 'all')
      return projects;

    return projects.filter(function (el) {
      return el.category === category;
    })
  }

  render() {
    const {filters, projects} = this.props;
    return (
      <div>
        <Toolbar
          filters={filters}
          selected={this.state.activeFilter}
          onSelectFilter={(filter) => {
            this.setState({
              'activeFilter': filter
            });
            console.log(filter);
          }}/>
        <Portfolio projects={this.sort(projects, this.state.activeFilter)}/>
      </div>
    );
  }
}
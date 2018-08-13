class SearchBox extends React.Component {

  constructor(props) {
    super(props);
    this.state = { fixed: false };
  }

  componentDidMount () {
    let searchBox = document.querySelector('.search-box').closest(".col-sm-12");
    const searchBoxTop = searchBox.offsetTop;
    this.scrollHandler = this.scrollHandler.bind(this);
    this.setPosition = this.setPosition.bind(this);
    document.addEventListener(
      'scroll',
      this.scrollHandler
    );
  }

  componentWillUnmount() {
    document.removeEventListener(
      'scroll',
      this.scrollHandler
    )
  }

  render() {
    return <SearchBoxView fixed={this.state.fixed} />
  }

  isFixed(searchBoxTop) {
    let h = window.pageYOffset;
    return h >= searchBoxTop;
  }

  setPosition() {
    let searchBox = document.querySelector('.search-box').closest(".col-sm-12");
    const searchBoxTop = searchBox.offsetTop;
    this.setState({fixed: this.isFixed(searchBoxTop)});
  }

  scrollHandler () {
    this.setPosition()
  }
}

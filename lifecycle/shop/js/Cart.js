class Cart extends React.Component {

  shouldComponentUpdate(nextProps) {
    const {isOpen, items} = nextProps;
    console.log(items);
    return this.props.isOpen !== isOpen || (this.props.isOpen && items.length !== this.props.items);
  }

  render() {
    return (
      <CartView {...this.props} />
    );
  }

}

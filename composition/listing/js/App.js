'use strict';

const App = ({items}) => (
  <main>
    {items.map(item => {
      return <Item color={ColorSelection(item.type)} item={item} />
    })}
  </main>
);

const ColorSelection = (type) => {
  switch(type) {
    case 'unisex':
      return "black";
    case 'male':
      return "blue";
    case 'female':
      return "orange";
  }
};
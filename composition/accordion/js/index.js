'use strict';
const mainTitle = "React";
const mainContent = [
  {
  sectionTitle: "Компоненты",
  text: "Каждый компонент являются законченной частью пользовательского интерфейса и сам управляет своим состоянием, а композиция компонентов (соединение) позволяет создавать более сложные компоненты. Таким образом, создается иерархия компонентов, причем каждый отдельно взятый компонент независим сам по себе. Такой подход позволяет строить сложные интерфейсы, где есть множество состояний, и взаимодействовать между собой."
  },
  {
  sectionTitle: "Выучил раз, используй везде!",
  text: "После изучения React вы сможете использовать его концепции не только в браузере, но также и при разработке мобильных приложений с использованием React Native."
  },
  {
  sectionTitle: "Использование JSX",
  text: "JSX является языком, расширяющим синтаксис стандартного Javascript. По факту он позволяет писать HTML-код в JS-скриптах. Такой подход упрощает разработку компонентов и повышает читаемость кода."
  }
]

const Section = (props) => {
  const {sectionTitle, text} = props;
  return (
    <section  className={props.open? 'section open' : 'section'}>
    <button >toggle</button>
    <h3 className="sectionhead" onClick={(e) => {e.currentTarget.closest(".section").classList.toggle('open')}}>{sectionTitle}</h3>
    <div className="articlewrap">
      <div className="article">
        {text}
      </div>
    </div>
    </section>
  )
}
    
const Accordion = (props) => {
      return (
        <main className="main">
          <h2 className="title"> {mainTitle} </h2>
          
        {mainContent.map((item, i) => {
        const {sectionTitle, text} = item;
        return (
        <Section 
        sectionTitle={sectionTitle}
        text={text} />)
        })}
          
        </main>
      );
    }

ReactDOM.render( <Accordion />, document.getElementById('accordian') ); 
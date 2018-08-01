'use strict';
function FeedbackForm(props) {
    let pizza = "пицца";
    let cake = "пирог";
    let subjectOpt1 = "У меня проблема";
    let subjectOpt2 = "У меня важный вопрос";
    const submit = function (e) {
      e.preventDefault();
      let formData = new FormData(e.target);
      let object = {};
      formData.forEach(function(value, key){
          object[key] = value;
      });
      let objectStr = JSON.stringify(object);
      
      props.onSubmit(objectStr);
    }
    let pizzaCheck, cakeCheck;
    props.data.snacks.indexOf(pizza) >-1 ? pizzaCheck=true : pizzaCheck=false;
    props.data.snacks.indexOf(cake) >-1 ? cakeCheck=true : cakeCheck=false;
    let message = props.data.message;
    let subject = props.data.subject === subjectOpt2 ? subjectOpt2 : subjectOpt1;
    let name = props.data.name;
    let email = props.data.email;
    let defaultCheckMr, defaultCheckMrs, defaultCheckMs;
    switch (props.data.salutation) {
        case 'Мистер':
          defaultCheckMr = true; defaultCheckMrs=false; defaultCheckMs=false;
          break;
        case 'Мис':
          defaultCheckMr = false; defaultCheckMrs=true; defaultCheckMs=false;
          break;
        case 'Мисис':
          defaultCheckMr = false; defaultCheckMrs=false; defaultCheckMs=true;
          break;
        default:
          defaultCheckMr = false; defaultCheckMrs=false; defaultCheckMs=false;
      };
    const mister = ( <input className="contact-form__input contact-form__input--radio" id="salutation-mr" name="salutation" type="radio" value="Мистер" defaultChecked={defaultCheckMr} /> )
    const misis = ( <input className="contact-form__input contact-form__input--radio" id="salutation-ms" name="salutation" type="radio" value="Мисис" defaultChecked={defaultCheckMs} /> )
    const mis = ( <input className="contact-form__input contact-form__input--radio" id="salutation-mrs" name="salutation" type="radio" value="Мис" defaultChecked={defaultCheckMrs} /> )
    return (
    <form className="content__form contact-form" id="form" onSubmit={submit} >
    <div className="testing">
      <p>Чем мы можем помочь?</p>
    </div>
    <div className="contact-form__input-group">
      {mister}
      <label className="contact-form__label contact-form__label--radio" htmlFor="salutation-mr">Мистер</label>
      {misis}
      <label className="contact-form__label contact-form__label--radio" htmlFor="salutation-mrs">Мисис</label>
      {mis}
      <label className="contact-form__label contact-form__label--radio" htmlFor="salutation-ms">Мис</label>
    </div>
    <div className="contact-form__input-group">
      <label className="contact-form__label" htmlFor="name">Имя</label>
      <input className="contact-form__input contact-form__input--text" id="name" name="name" type="text" defaultValue={name} />
    </div>
    <div className="contact-form__input-group">
      <label className="contact-form__label" htmlFor="email">Адрес электронной почты</label>
      <input className="contact-form__input contact-form__input--email" id="email" name="email" type="email" defaultValue={email} />
    </div>
    <div className="contact-form__input-group">
      <label className="contact-form__label" htmlFor="subject">Чем мы можем помочь?</label>
      <select className="contact-form__input contact-form__input--select" id="subject" name="subject" defaultValue={subject}>
        <option value={subjectOpt1}>У меня проблема</option>
        <option value={subjectOpt2}>У меня важный вопрос</option>
      </select>
    </div>
    <div className="contact-form__input-group">
      <label className="contact-form__label" htmlFor="message">Ваше сообщение</label>
      <textarea className="contact-form__input contact-form__input--textarea" id="message" name="message" rows="6" cols="65" defaultValue={message}></textarea>
    </div>
    <div className="contact-form__input-group">
      <p className="contact-form__label--checkbox-group">Хочу получить:</p>
      <input className="contact-form__input contact-form__input--checkbox" id="snacks-pizza" name="snacks" type="checkbox" value={pizza} ref={element => pizza = element} defaultChecked={pizzaCheck} />
      <label className="contact-form__label contact-form__label--checkbox" htmlFor="snacks-pizza">Пиццу</label>
      <input className="contact-form__input contact-form__input--checkbox" id="snacks-cake" name="snacks" type="checkbox" value={cake} ref={element => cake = element} defaultChecked={cakeCheck} />
      <label className="contact-form__label contact-form__label--checkbox" htmlFor="snacks-cake">Пирог</label>
    </div>
    <button className="contact-form__button" type="submit">Отправить сообщение!</button>
    <output id="result" />
  </form>
    )
  }
//'use strict';
function AuthForm (props) {
  let userName, email, pass;
  const changePass = function(e) {
     e.target.value = e.target.value.replace(/\W/,'');
   };
  const changeEmail = function(e) {
     e.target.value = e.target.value.replace(/[^A-Za-z0-9_@.-]/,'');
   };
  const Submit = function(e) {
     e.preventDefault();
     let formData = {
       "name": userName.value,
       "email": email.value,
       "password": pass.value
     };
     console.log(formData);
     if(props.onAuth || typeof props.onAuth == 'function') {props.onAuth(formData)};
     
   }
   return (
     <form className="ModalForm" action="/404/auth/" method="POST" onSubmit={Submit}>
       <div className="Input">
         <input required type="text" placeholder="Имя" ref={element => userName = element} />
         <label></label>
       </div>
       <div className="Input">
         <input type="email" placeholder="Электронная почта" onChange={changeEmail} ref={element => email = element} />
         <label></label>
       </div>
       <div className="Input">
         <input required type="password" placeholder="Пароль" onChange={changePass} ref={element => pass = element} />
         <label></label>
       </div>
       <button type="submit">
         <span>Войти</span>
         <i className="fa fa-fw fa-chevron-right"></i>
       </button>
     </form>
   )
 };
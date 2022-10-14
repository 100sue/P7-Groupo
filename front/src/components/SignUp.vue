<template>
  <div class="signup">
      <div class="signup-insert">
          <p class="signup-insert-msg">
             
          </p>
          <p class="signup-insert-msg p-red">
            
          </p>
          <img src="../assets/mockup-acceuil2.png" alt="Groupomania-image-accueil" class="signup-insert-img"/>
      </div>
      <div class="signup-container">
          <form class="signup-container-form" @submit="createUser">
              <p class="signup-container__title">
                  Scoreur App
              </p>
              <div class="inputbox">
                  <span id="connectErrorMsg" v-show="errorFirstName" class="signup-container__errormsg">Champ invalide, veuillez vérifier votre prénom.</span>
                  <input type="text" v-model="firstNameSignup"  name=""  required="">
                  <label >Prénom</label>
              </div>
              <div class="inputbox">
                  <span id="connectErrorMsg" v-show="errorLastName" class="signup-container__errormsg">Champ invalide, veuillez vérifier votre nom.</span>
                  <input type="text" v-model="lastNameSignup"  name=""  required="">
                  <label >Nom</label>
              </div>
              <div class="inputbox">
                  <span id="connectErrorMsg" v-show="errorJob" class="signup-container__errormsg">Champ invalide, veuillez vérifier votre poste au basket-ball.</span>
                  <input type="text" v-model="jobSignup" name=""  required="">
                  <label >Poste ou vous jouez</label>
              </div>
              <div class="inputbox">
                  <span id="connectErrorMsg" v-show="errorEmail" class="signup-container__errormsg">Champ invalide, veuillez vérifier votre email.</span>
                  <input type="text" v-model="emailSignup"  name="" required="">
                  <label >Adresse e-mail</label>
              </div>
              <div class="inputbox" @click.prevent="ToggleInput">
                  <span id="connectErrorMsg" v-show="errorPassword" class="signup-container__errormsg">Votre mot de passe doit contenir 8 caractères minimum.</span>
                  <input v-on:click="ToggleInput" :type="type" ref="password-field" v-model="passwordSignup"  name=""  required="">
                  <label >Mot de passe</label>
                  <button id="toggleBtn" >
                        <i class="fa-regular fa-eye" v-if="icon"></i>
                        <i class="fa fa-eye-slash" v-else="icon"></i>
                    </button>
              </div>
              <button type="submit" class="signup-container__btn">S'inscrire</button>
          </form>
      </div>
  </div> 
</template>

<script>
import axios from "axios";
import router from "../router";
export default {
  name: 'SignUp',
  data() {
      return {
          firstNameSignup: "",
          lastNameSignup: "",
          jobSignup: "", 
          emailSignup: "",
          passwordSignup: "",
          errorFirstName: false,
          errorLastName: false,
          errorJob: false,
          errorEmail: false,
          errorPassword: false,
          type: "password",
          icon: true,
      }
  },
  methods: {
      createUser(e) {
          e.preventDefault();
          var nameRegExp = new RegExp("^[A-zÀ-ú \-]+$");
          var emailRegExp = new RegExp("^[a-zA-Z0-9_. -]+@[a-zA-Z.-]+[.]{1}[a-z]{2,10}$");
          if (this.firstNameSignup === "" || this.lastNameSignup === "" || this.jobSignup === "" || this.emailSignup === "" || this.passwordSignup === "") {
              alert("Vous devez remplir le formulaire pour vous inscrire !");
              return;
          } else {
              this.errorFirstName = !nameRegExp.test(this.firstNameSignup);
              this.errorLastName = !nameRegExp.test(this.lastNameSignup);
              this.errorJob = !nameRegExp.test(this.jobSignup);
              this.errorEmail = !emailRegExp.test(this.emailSignup);
              this.errorPassword = !(this.passwordSignup.length >= 8);
          };
          if (this.errorFirstName || this.errorLastName || this.errorJob || this.errorEmail || this.errorPassword) {
              // Un champ n'est pas bon
              return;
          }
          axios.post('http://localhost:27107/api/auth/signup', { 
              firstname: this.firstNameSignup,
              lastname: this.lastNameSignup,
              job: this.jobSignup,
              email: this.emailSignup, 
              password: this.passwordSignup })
              .then(function (response) {
                  localStorage.setItem("token", response.data.token);
                  localStorage.setItem("userId", response.data.userId);
                  router.push('feed');
              })
              .catch(error => alert("Erreur : " + error));
      },
      ToggleInput() {
            if(this.type == "password")
            {
                this.type = "text";
                this.icon = false;
            }
            else {
                this.type = "password";
                this.icon = true;
            }
        }
  }
  
}
</script>

<style scoped>
/* LAPTOP */ 
.signup {
  max-width: 1024px;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 30px;
}
.signup-insert{
  width: 60%;
}
.signup-insert-msg{
  margin:0;
  font-weight: bold;
  font-size: 3.5rem;
  color: #2C3B97;
}
.signup-insert-msg:last-of-type{
  margin-bottom: 60px;
}

.p-red{
  color: #FD2D01;
}
/* Image */ 
.signup-insert-img{
  margin-top: 100px;
  animation: SlideDown 1.5s ease-in-out;
  animation-iteration-count: infinite;
}
/* Animation Image */
@keyframes SlideDown {
  0% {
      transform: translateY(15px);
  }
  50% {
      transform: translateY(0px);
  }
  100% {
      transform: translateY(15px);
  }
}
/* Forme */
.signup-container {
  padding: 40px;
  border-radius: 10px;
  margin-bottom: 70px;
  background: rgba(0, 0, 0,.5);
  backdrop-filter: blur(5px);
  box-shadow: 0 15px 25px rgba(0, 0, 0,.5);
  border: 0.5px solid #4E5166;
}
.signup-container-form{
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 380px;
}
.signup-container__title{
  color: #FD2D01;
  font-weight: 900;
  font-size: 2.5rem;
  margin:0;
}
.signup-container .inputbox {
  position: relative;

}
.signup-container .inputbox input{
  width: calc(100% - 20px);
  background: transparent;
  border: none;
  outline: none;
  padding: 10px 0;
  border-bottom: 1px solid #fff;
  font-size: 16px;
  letter-spacing: 1px;
  color: #fff;
}


.signup-container .inputbox label{
  position: absolute;
  top: 0;
  left: 0;
  padding: 10px 0;
  font-size: 16px;
  color: #fff;
  pointer-events: none;
  transition: .5s;
}
.signup-container .inputbox input:focus ~ label, 
.signup-container .inputbox input:valid ~ label
{
  top: -18px;
  left: 0;
  font-size: 12px;
  color: #FD2D01;
}

.signup-container__btn{
  cursor: pointer;
  padding: 10px;
  font-weight: bold;
  color: white;
  background-color: #FD2D01;
  border-radius: 5px;
  border: none;
}
.signup-container .inputbox #toggleBtn {
    position: absolute;
    top: -5px;
    right: 10px;
    width: 35px;
    height: 35px;
    background: rgba(0, 0, 0,-0.5);
    border: none;
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #FD2D01;
}

.signup-container__errormsg{
  display: block;
  font-size: 0.75rem;
  margin-top: 10px;
  color: white;
}
@media screen and (max-width: 1024px) {
  .signup{
      margin: 60px 50px;
  }
}
 /* Tablette */
@media screen and (max-width: 768px) {
  .signup{
      flex-direction: column;
      margin-top: 10px;
  }
  /* Texte d'Acceuil */
  .signup-insert{
      width: 90%;
      text-align: center;
  }
  /* Image */ 
  .signup-insert-img{
      width: 50%;
  }
  /* Forme */ 
  .signup-container {
      margin-top: 70px;
      width: auto;
  }
}
/* Mobile */
@media screen and (max-width: 425px) {
  .signup{
      flex-direction: column;
      margin-top: 10px;
  }
  /* Texte d'Acceuil */
  .signup-insert{
      margin-top: 30px;
      width: 100%;
      text-align: center;
  }
  .signup-insert-msg{
      font-size: 2.3rem;
  }
  /* Image */ 
  .signup-insert-img{
      width: 100%;
  }
  /* Forme */ 
  .signup-container {
      width: auto;
      margin: 80px 30px;
  }
  .signup-container__title{
      font-size: 2rem;
  }
  .signup-container__input{
      width: calc(100% - 20px);
  }
}
</style>
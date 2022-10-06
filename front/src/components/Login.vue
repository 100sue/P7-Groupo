<template>
    <div class="login">
        <div class="login-insert">
            <p class="login-insert-msg">Bienvenue,</p>
            <p class="login-insert-msg p-red">sur Streetball Network</p>
            <img src="../assets/accueil47.png" alt="Groupomania-image-accueil" class="login-insert-img"/>
        </div> 
        <div class="login-container">
            <form class="login-container-form" @submit="logUser">
                <p class="login-container__title">Scoreur App</p>
                <div class="inputbox">
                    <span id="connectErrorMsg" v-show="errorEmail" class="login-container__errormsg">Champ invalide, veuillez vérifier votre email.</span>
                    <input type="text" v-model="emailLogin" id="emailLogin"  name=""  required="">
                    <label >Adresse e-mail</label>
                </div>
                <div class="inputbox" @click.prevent="ToggleInput">
                    <span id="connectErrorMsg" v-show="errorPassword" class="login-container__errormsg">Paire : mot de passe et adresse mail incorrecte.</span>
                    <input v-on:click="ToggleInput" :type="type" ref="password-field" v-model="passwordLogin" name="" id="passwordLogin" required="" >
                    <label >Mot de passe</label>
                    <button id="toggleBtn" >
                        <i class="fa-regular fa-eye" v-if="icon"></i>
                        <i class="fa fa-eye-slash" v-else="icon"></i>
                    </button>
                    
                </div>
                <button type="submit" class="login-container__btn">Se connecter</button>
            </form>
            <p id="connectErrorMsg" class="login-container__errormsg"><!-- Adresse mail ou mot de passe incorrect.--></p>
        </div>
    </div> 
</template>

<script>
import axios from "axios";
import router from "../router";
export default {
    name: 'Login',
    data() {
        return {
            emailLogin: "",
            passwordLogin: "",
            errorEmail: false,
            errorPassword: false,
            type: "password",
            icon: true,
        }
    },
    methods: {
        logUser(e) {
            e.preventDefault();
            var emailRegExp = new RegExp("^[a-zA-Z0-9_. -]+@[a-zA-Z.-]+[.]{1}[a-z]{2,10}$");
            if (this.emailLogin === "" || this.passwordLogin === "") {
                alert("Vous devez remplir le formulaire pour vous inscrire !");
                return;
            } else {
                this.errorEmail = !emailRegExp.test(this.emailLogin);
                this.errorPassword = !(this.passwordLogin.length >= 8);
            };
            if (this.errorEmail || this.errorPassword) {
                // Un champ n'est pas bon
                return;
            }
            axios.post("http://localhost:27107/api/auth/login", { email: this.emailLogin, password: this.passwordLogin })
                .then(function (response) {
                    localStorage.setItem("token", response.data.token);
                    localStorage.setItem("userId", response.data.userId);
                    router.push("feed");
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
.login {
    max-width: 1024px;
    margin: auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 30px 0;
}
/* WELCOME TEXT */
.login-insert{
    width: 60%;
}
.login-insert-msg{
    margin:0;
    font-weight: bold;
    font-size: 3.5rem;
    color: black;
}
.login-insert-msg:last-of-type{
    margin-bottom: 60px;
}
.p-red{
    color: #FD2D01;
}
/* IMAGE */ 
.login-insert-img{
    animation: SlideDown 1.5s ease-in-out;
    animation-iteration-count: infinite;
}
/* ANIMATION IMAGE */
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
/* FORM */
.login-container {
    padding: 40px;
    border-radius: 20px;
    height: 230px;
    border-radius: 10px;
    margin-bottom: 70px;
    background: rgba(0, 0, 0,.8);
    backdrop-filter: blur(5px);
    box-shadow: 0 15px 25px rgba(0, 0, 0,.5);
}
.login-container-form{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 210px;
}
.login-container__title{
    color: #FD2D01;
    font-weight:900;
    font-size: 2.5rem;
    margin:0;
}
.login-container .inputbox {
    position: relative;
}
.login-container .inputbox input {
    width: calc(100% - 20px);
    background: transparent;
    border: none;
    outline: none;
    padding: 10px 0;
    border-bottom: 1px solid #fff;
    font-size: 16px;
    letter-spacing: 1px;
    color: #fff;
    position: relative;
}
.login-container  .inputbox label{
  position: absolute;
  top: 0;
  left: 0;
  padding: 10px 0;
  font-size: 16px;
  color: #fff;
  pointer-events: none;
  transition: .5s;
}
.login-container .inputbox input:focus ~ label,
.login-container .inputbox input:valid ~ label
 {
  top: -18px;
  left: 0;
  font-size: 12px;
  color: #FD2D01;
}
.login-container__btn{
    cursor: pointer;
    padding: 10px;
    font-weight: bold;
    color: white;
    background-color: #FD2D01;
    border-radius: 5px;
    border: none;
}

.login-container .inputbox #toggleBtn {
    position: absolute;
    top: -5px;
    right: 10px;
    width: 35px;
    height: 35px;
    background: rgba(0, 0, 0,.5);
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #FD2D01;
}


.login-container__errormsg{
    display: block;
    font-size: 0.75rem;
    margin-top: 10px;
    color: white;
}
@media screen and (max-width: 1024px) {
    .login{
        margin: 60px 50px;
    }
}
/* TABLET */
@media screen and (max-width: 768px) {
    .login{
        flex-direction: column;
        margin-top: 10px;
    }
    /* WELCOME TEXT */
    .login-insert{
        width: 90%;
        text-align: center;
    }
    /* IMAGE */ 
    .login-insert-img{
        width: 50%;
    }
    /* FORM */ 
    .login-container {
        margin-top: 70px;
        width: auto;
    }
}
/* MOBILE */
@media screen and (max-width: 425px) {
    .login{
        flex-direction: column;
        margin-top: 10px;
    }
    /* WELCOME TEXT */
    .login-insert{
        margin-top: 30px;
        width: 100%;
        text-align: center;
    }
    .login-insert-msg{
        font-size: 2.3rem;
    }
    /* IMAGE */ 
    .login-insert-img{
        width: 100%;
    }
    /* FORM */ 
    .login-container {
        width: auto;
        margin: 80px 30px;
    }
    .login-container__title{
        font-size: 2rem;
    }
    .login-container__input{
        width: calc(100% - 20px);
    }
}
</style>
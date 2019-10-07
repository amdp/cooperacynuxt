<template>
  <div>
    <b-row class="mr-3 ml-3">
      <div class="container d-flex justify-content-center">
        <b-form
          @submit.prevent="login"
          class="needs-valitation"
          autocomplete="on"
        >
          <b-form-group label-for="loginEmail" label="Email:">
            <b-form-input
              id="loginEmail"
              v-model="loginEmail"
              size="sm"
              required
              autocomplete="current-email"
            ></b-form-input>
          </b-form-group>
          <b-form-group label-for="loginPassword" label="Password:">
            <b-form-input
              id="loginPassword"
              v-model="loginPassword"
              size="sm"
              required
              type="password"
              autocomplete="current-password"
            ></b-form-input>
          </b-form-group>
          <b-button
            type="submit"
            class="btn bhdiversity white btn-block mt-3 gray border-0"
            >Login</b-button
          ><br />
          <p>
            Forgot password? Just enter your correct email address and a
            <em>new password</em> in the login prompt you just used above, then:
            <b-button
              class="btn bhunderstanding white btn-block gray border-0"
              @click="recover"
              >Set new password</b-button
            ><br />
            If you still have problems, please
            <nuxt-link class="ac" to="/contact">contact us</nuxt-link>.
          </p>
        </b-form>
      </div>
    </b-row>
    <!-- <b-row>
      <div v-for="s in strategies" :key="s.key" class="mb-3">
        <b-btn @click="$auth.loginWith(s.key)" block :class="s.color"
          >Login with {{ s.name }}</b-btn
        >
      </div>
    </b-row> -->

    <div class="col-12">
      <div class="row">
        <div class="col-12 d-flex justify-content-center mt-4">
          <p class="care subheading">OR CREATE A NEW ACCOUNT:</p>
        </div>
      </div>
      <div class="row">
        <!--
      <div class="g-signin2" data-onsuccess="googleOnSignIn" data-theme="dark"></div>
      <a href="#" @click="googleSignOut">Sign out</a>-->
        <div class="col-12 d-flex justify-content-center">
          <b-form @submit.prevent="newuser" class="mt-3 was-validated">
            <b-form-group
              label-for="nameInput"
              label="Name:"
              description="Please insert your name"
            >
              <b-form-input
                id="nameInput"
                v-model="formName"
                size="sm"
                required
              ></b-form-input>
            </b-form-group>
            <b-form-group
              label-for="surnameInput"
              label="Surname:"
              description="Please insert your surname"
            >
              <b-form-input
                id="surnameInput"
                v-model="formSurname"
                size="sm"
                required
              ></b-form-input>
            </b-form-group>
            <b-form-group
              label-for="emailInput"
              label="Email:"
              description="Please insert a valid email: it will be your future username"
            >
              <b-form-input
                id="emailInput"
                v-model="formEmail"
                size="sm"
                autocomplete="email"
                required
              ></b-form-input>
            </b-form-group>
            <b-form-group
              label-for="passwordInput"
              label="Password:"
              description="Please insert your password or passphrase"
            >
              <b-form-input
                id="passwordInput"
                v-model="formPassword"
                size="sm"
                type="password"
                autocomplete="new-password"
                required
              ></b-form-input>
            </b-form-group>
            <b-form-group
              label-for="imageInput"
              label="Image:"
              description="Please choose an image for your account"
            >
              <b-form-file
                id="imageInput"
                v-model="formImageFile"
                ref="formImageFile"
                size="sm"
              ></b-form-file>
            </b-form-group>
            <b-button
              type="submit"
              class="btn bhcare btn-block mt-3 white border-0"
              >JOIN WITH BANK TRANSFER</b-button
            ><br />
            <p class="subheading d-flex justify-content-center">
              OR WITH
            </p>
            <!-- CHECK would like OR WITH to be v-if="paypal"  -->
          </b-form>
        </div>
      </div>
      <div
        class="d-flex justify-content-center"
        id="paypal-button-container"
      ></div>
    </div>
  </div>
</template>

<script>
export default {
  middleware: ['auth'],
  head: {
    title: 'Join or Login',
    script: [
      {
        src:
          'https://www.paypal.com/sdk/js?client-id=' +
          process.env.PAYPALID +
          '&vault=true&currency=EUR&debug=false'
      },
      {
        src: 'https://apis.google.com/js/platform.js',
        async: true,
        defer: true
      },
      { src: '/login/google.js' }
    ], //CHECK https://github.com/nuxt/nuxt.js/issues/2000 better not to have it in the static folder tho
    meta: [
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { 'http-equiv': 'X-UA-Compatible', content: 'IE=edge' },
      { name: 'google-signin-scope', content: 'profile email' },
      { name: 'google-signin-client_id', content: `${process.env.GOOGLEID}` }
    ]
  },
  data() {
    return {
      loginEmail: '',
      loginPassword: '',
      formName: '',
      formSurname: '',
      formEmail: '',
      formPassword: '',
      formImageFile: '',
      formPaypalagreementid: 'bank'
    }
  },
  computed: {
    mailInputState() {
      return this.mail.length > 1 ? true : false
    }, //CHECK to be completed
    strategies: () => [
      { key: 'wechat', name: 'WeChat', color: 'login-button border-0 bhcare' },
      {
        key: 'google',
        name: 'Google',
        color: 'login-button border-0 bhequivalence'
      },
      {
        key: 'facebook',
        name: 'Facebook',
        color: 'login-button border-0 bhfreedom'
      },
      {
        key: 'github',
        name: 'GitHub',
        color: 'login-button border-0 bhunderstanding'
      }
    ]
  },
  mounted: function() {
    var that = this //important: we need to have a reference to the variables in the page and cannot call 'this' in nested functions
    // if (paypal) {
    //   console.log(' ' + JSON.stringify('paypal starting'))
    //   paypal
    //     .Buttons({
    //       onError: function(err) {
    //         alert(err)
    //         console.log('err' + err)
    //         that.formPaypalagreementid = 'e' + JSON.stringify(err)
    //         that.newuser()
    //       },
    //       onCancel: function(data) {
    //         console.log('c' + JSON.stringify(data))
    //         that.formPaypalagreementid = 'c' + JSON.stringify(data)
    //         that.newuser()
    //       },
    //       createSubscription: function(data, actions) {
    //         return actions.subscription.create({
    //           plan_id: 'P-9C681042E7918904VLURYYGQ'
    //         })
    //       },
    //       onApprove: function(data, actions) {
    //         alert(
    //           'You have successfully become a member with subscription ID ' +
    //             data.subscriptionID
    //         )
    //         that.formPaypalagreementid = data.subscriptionID
    //         that.newuser()
    //       }
    //     })
    //     .render('#paypal-button-container')
    //   console.log(' ' + JSON.stringify('render launched'))
    // }
  },
  methods: {
    async login() {
      this.error = null
      this.$auth
        .loginWith('local', {
          data: {
            email: this.loginEmail,
            password: this.loginPassword
          }
        })
        .catch(e => {
          this.error = e + ''
        })
    },
    googleSignOut() {
      var auth2 = gapi.auth2.getAuthInstance()
      auth2.signOut()
    },
    recover() {
      this.$store.dispatch('recoverPasswordAction', {
        email: this.loginEmail,
        password: this.loginPassword
      })
    },
    async newuser() {
      var newuser = await this.$store.dispatch('newuserAction', {
        name: this.formName,
        surname: this.formSurname,
        email: this.formEmail,
        password: this.formPassword,
        paypalagreementid: this.formPaypalagreementid
      })
      if (newuser == 'exists') {
        return this.$toast.show('Email already in use!', {
          duration: 1000,
          className: 'toasts'
        })
      }
      if (this.formImageFile) {
        //the newuser variable in response from the server sends the id of the recently created user
        this.imageUpload(newuser.id).catch(err => console.error(err))
      } else {
        this.addedToast()
      }
    },
    async imageUpload(id, empty) {
      let formImageData = new FormData()
      formImageData.append('file', this.formImageFile)
      formImageData.append('id', id)
      let res = await this.$store
        .dispatch('imageUploadAction', {
          formImageData: formImageData,
          headers: { headers: { 'Content-Type': 'multipart/form-data' } },
          proptype: 'user'
        })
        .catch(err => {
          console.error(err)
        })
      if (res) {
        this.addedToast()
      }
    },
    addedToast() {
      this.$toast.success('New user added.', {
        duration: 1000,
        className: 'toasts'
      })
      //setTimeout(function(){location.href = location.href}, 1200)
    }
  }
}
</script>

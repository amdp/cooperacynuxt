<template>
  <div>
    <b-row class="mr-3 ml-3 mt-5">
      <div class="container d-flex justify-content-center">
        <b-form
          @submit.prevent="login"
          class="needs-valitation"
          autocomplete="on"
        >
          <b-form-group label-for="loginEmail" label="Email:" required>
            <b-form-input
              id="loginEmail"
              v-model="loginEmail"
              size="sm"
              type="email"
              placeholder="Your email"
              class="form-control"
              required
              autocomplete="current-email"
            ></b-form-input>
          </b-form-group>
          <b-form-group label-for="loginPassword" label="Password:" required>
            <b-form-input
              id="loginPassword"
              v-model="loginPassword"
              size="sm"
              required
              type="password"
              autocomplete="current-password"
            ></b-form-input>
          </b-form-group>
          <p>
            <b-button
              type="submit"
              class="btn bhcare white btn-block mt-3 border-0"
              id="loginbutton"
            >
              <span v-if="!logging" class="btransparent">LOGIN</span>
              <b-spinner
                small
                v-if="logging"
                class="m-1 btransparent"
              ></b-spinner>
              <span v-if="logging" class="btransparent"
                >Checking your paypal/bank membership..</span
              >
            </b-button>
          </p>
          <p class="freedom">
            <!-- fare che se la password è sbagliata ti chiede automaticamente di cambiarla con quella inserita -->
            Want to <b>change</b> password? Just enter your email and a
            <em>new password</em> in the above fields
            <b-button
              class="btn bhunderstanding white btn-block border-0"
              @click="recover"
              >CHANGE PASSWORD</b-button
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
    <b-row>
      <b-container class="justify-content-center">
        <p class="base up text-center">
          Want to make a <span class="diversity">gift</span>? Please use a
          <nuxt-link to="/activate" class="ac">
            Bank Transfer Activation
          </nuxt-link>
        </p>
      </b-container>
    </b-row>
    <div class="row">
      <div class="col-12 d-flex justify-content-center mt-4">
        <b-button
          class="btn bhcare white btn-block border-0 mb-3"
          @click="newaccount"
          >CREATE A NEW SUBSCRIPTION BASED ACCOUNT INSTEAD</b-button
        >
      </div>
    </div>
    <div class="row" v-if="this.newaccountvar">
      <!--
      <div class="g-signin2" data-onsuccess="googleOnSignIn" data-theme="dark"></div>
      <a href="#" @click="googleSignOut">Sign out</a>-->
      <div class="col-12 d-flex justify-content-center">
        <b-form @submit.prevent="newuser()" class="mt-3 was-validated">
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
              type="email"
              placeholder="Your email"
              class="form-control"
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
          <b-form-group
            label-for="nicknameInput"
            label="Nickname:"
            description="Please insert your nickname if you have one"
          >
            <b-form-input
              id="nicknameInput"
              v-model="formNickname"
              size="sm"
            ></b-form-input>
          </b-form-group>
          <b-form-group
            label-for="sexInput"
            label="Sexual Identity:"
            description="Please insert your sex according to your current personal identity"
          >
            <b-form-select
              id="sexidentityInput"
              v-model="formSexidentity"
              size="sm"
              required
            >
              <b-form-select-option v-html="$t('login.female')" value="F">
                F - Female
              </b-form-select-option>
              <b-form-select-option v-html="$t('login.male')" value="M">
                M - Male
              </b-form-select-option>
              <b-form-select-option v-html="$t('login.intersex')" value="X">
                X - Intersex
              </b-form-select-option>
            </b-form-select>
          </b-form-group>
          <b-form-group
            label-for="sexInput"
            label="Biological Sex at Birth:"
            description="Please insert your biological sex at birth"
          >
            <b-form-select
              id="birthsexInput"
              v-model="formBirthsex"
              size="sm"
              required
            >
              <b-form-select-option v-html="$t('login.female')" value="F">
                F - Female
              </b-form-select-option>
              <b-form-select-option v-html="$t('login.male')" value="M">
                M - Male
              </b-form-select-option>
              <b-form-select-option v-html="$t('login.intersex')" value="X">
                X - Intersex
              </b-form-select-option>
            </b-form-select>
          </b-form-group>
          <b-form-group
            label-for="birthdateInput"
            label="Birthdate:"
            description="Please insert your birthdate"
          >
            <b-form-input
              id="birthdateInput"
              v-model="formBirthdate"
              size="sm"
              type="datetime-local"
              required
            ></b-form-input>
          </b-form-group>
          <b-form-group
            label-for="birthcountryInput"
            label="Country of birth:"
            description="Insert the country of birth"
          >
            <b-form-select
              id="birthcountryInput"
              v-model="formBirthcountry"
              required
            >
              <option
                v-for="country in country"
                :key="country.id"
                :value="country.id"
              >
                {{ country.name }}
              </option>
            </b-form-select>
          </b-form-group>
          <b-form-group
            label-for="birthplaceInput"
            label="Birthplace:"
            description="Insert the city or location of your birth"
          >
            <b-form-select
              id="birthplaceInput"
              v-model="formBirthplace"
              required
            >
              <option v-for="place in place" :key="place.id" :value="place.id">
                {{ place.name }}
              </option>
            </b-form-select>
          </b-form-group>

          <p class="it diversity">
            {{ $t('main.newplace') }}
            <a v-b-modal.placemodal class="ad finger b">
              {{ $t('main.one') }}
            </a>
          </p>

          <b-form-group
            label-for="nationalityInput"
            label="Country of nationality:"
            description="Insert the country of your nationality"
          >
            <b-form-select
              id="nationalityInput"
              v-model="formNationality"
              required
            >
              <option
                v-for="country in country"
                :key="country.id"
                :value="country.id"
              >
                {{ country.name }}
              </option>
            </b-form-select>
          </b-form-group>
          <b-form-group
            label-for="nationalitiesInput"
            label="Other countries of nationality:"
            description="Please insert the name of any other country in which you have a nationality"
          >
            <b-form-input
              id="nationalitiesInput"
              v-model="formNationalities"
              size="sm"
            ></b-form-input>
          </b-form-group>
          <b-button
            type="submit"
            class="btn bhcare btn-block mt-3 white border-0"
            >JOIN WITH BANK TRANSFER</b-button
          ><br />
          <p
            class="btn bhcare white btn-block border-0 mb-4"
            @click="loadpaypal"
          >
            JOIN WITH PAYPAL OR CREDIT CARD
          </p>
          <div
            class="d-flex justify-content-center"
            id="paypal-button-container"
          ></div>
        </b-form>
      </div>
    </div>
    <b-row v-else class="mb-5"></b-row>
    <placemodal />
  </div>
</template>

<script>
export default {
  middleware: ['auth'],
  async fetch({ store, params }) {
    await store.dispatch('getPlace')
    await store.dispatch('getCountry')
  },
  head() {
    return {
      title: 'Cooperacy - Login',
      script: [
        {
          src:
            'https://www.paypal.com/sdk/js?client-id=' +
            process.env.PAYPALID +
            '&vault=true&currency=EUR&debug=false',
          defer: true,
        },
        {
          src: 'https://apis.google.com/js/main/platform.js',
          async: true,
          defer: true,
        },
        { src: '/login/google.js' },
      ], //CHECK https://github.com/nuxt/nuxt.js/issues/2000 better not to have it in the static folder tho
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { 'http-equiv': 'X-UA-Compatible', content: 'IE=edge' },
        { name: 'google-signin-scope', content: 'profile email' },
        {
          name: 'google-signin-client_id',
          content: `${process.env.GOOGLEID}`,
        },
      ],
    }
  },
  data() {
    return {
      loginEmail: null,
      loginPassword: null,
      formName: null,
      formSurname: null,
      formEmail: null,
      formPassword: null,
      formImageFile: null,
      formPaypalagreementid: 'bank',
      formNickname: null,
      formSexidentity: null,
      formBirthsex: null,
      formBirthdate: null,
      formBirthcountry: null,
      formBirthplace: null,
      formNationality: null,
      formNationalities: null,
      newaccountvar: false,
      newaccountpaypal: false,
      logging: false,
      offline: false,
    }
  },
  computed: {
    place() {
      let place = this.$store.state.place.filter(
        (place) => place.country === this.formBirthcountry
      )
      return place.sort((a, b) => (a.name > b.name ? 1 : -1))
    },
    country() {
      //avoids showing Cooperacy as possible entry
      return this.$store.state.country.filter((country) => country.id != 1)
    },
    mailInputState() {
      return this.mail.length > 1 ? true : false
    }, //CHECK to be completed
    strategies: () => [
      { key: 'wechat', name: 'WeChat', color: 'login-button border-0 bhcare' },
      {
        key: 'google',
        name: 'Google',
        color: 'login-button border-0 bhequivalence',
      },
      {
        key: 'facebook',
        name: 'Facebook',
        color: 'login-button border-0 bhfreedom',
      },
      {
        key: 'github',
        name: 'GitHub',
        color: 'login-button border-0 bhunderstanding',
      },
    ],
  },
  methods: {
    newaccount() {
      this.newaccountvar = true
    },
    loadpaypal() {
      if (!this.newaccountpaypal) {
        var that = this //important: we need to have a reference to the variables in the page and cannot call 'this' in nested functions
        paypal
          .Buttons({
            onError: function (err) {
              alert(err)
              console.log('err' + err)
              that.formPaypalagreementid = 'e' + JSON.stringify(err)
            },
            onCancel: function (data) {
              console.log('c' + JSON.stringify(data))
              that.formPaypalagreementid = 'c' + JSON.stringify(data)
            },
            createSubscription: function (data, actions) {
              return actions.subscription.create({
                plan_id: 'P-9C681042E7918904VLURYYGQ',
              })
            },
            onApprove: function (data, actions) {
              alert(
                'You have successfully become a member with subscription ID ' +
                data.subscriptionID
              )
              that.formPaypalagreementid = data.subscriptionID
              that.newuser()
            },
          })
          .render('#paypal-button-container')
        this.newaccountpaypal = true
      }
    },
    async login() {
      this.logging = true
      try {
        await this.$auth.loginWith('local', {
          data: {
            email: this.loginEmail,
            password: this.loginPassword,
          },
        })
      } catch (err) {
        if (err.response.data == 'expired') {
          location.href = '/activate'
        } else {
          alert(
            'Sorry, there seems to be something wrong: ' +
            err.response.data +
            '.'
          )
          this.logging = false
        }
      }
    },
    googleSignOut() {
      var auth2 = gapi.auth2.getAuthInstance()
      auth2.signOut()
    },
    async recover() {
      this.$store.dispatch('recoverPassword', {
        email: this.loginEmail,
        password: this.loginPassword,
      })
      alert(
        'Cooperacy is sending you an email to ' +
        this.loginEmail +
        ' to set the new password that is now in the password field.'
      )
    },
    async newuser() {
      var newuser = await this.$store.dispatch('newuser', {
        name: this.formName,
        surname: this.formSurname,
        email: this.formEmail,
        password: this.formPassword,
        paypalagreementid: this.formPaypalagreementid,
        nickname: this.formNickname,
        sexidentity: this.formSexidentity,
        birthsex: this.formBirthsex,
        birthdate: this.formBirthdate,
        birthcountry: this.formBirthcountry,
        birthplace: this.formBirthplace,
        nationality: this.formNationality,
        nationalities: this.formNationalities,
      })
      if (newuser == 'exists') {
        return this.$toast.show('Email already in use!', {
          duration: 1000,
          className: 'toast',
        })
      }
      if (this.formImageFile) {
        //the newuser variable in response from the server sends the id of the recently created user
        this.imageUpload(newuser.id).catch((err) => console.error(err))
      } else {
        this.added()
      }
    },
    async imageUpload(id) {
      let formImageData = new FormData()
      formImageData.append('file', this.formImageFile)
      formImageData.append('id', id)
      formImageData.append('proptype', 'user')
      let res = await this.$store
        .dispatch('imageUpload', {
          formImageData: formImageData,
          headers: { headers: { 'Content-Type': 'multipart/form-data' } },
        })
        .catch((err) => {
          console.error(err)
        })
      if (res) {
        this.added()
      }
    },
    added() {
      this.$toast.show('New user added.', {
        duration: 1000,
        className: 'toast',
      })
      setTimeout(function () {
        location.href = '/main/thankyou'
      }, 1200)
    },
  },
}
</script>

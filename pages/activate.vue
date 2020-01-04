<template>
  <b-container>
    <b-row>
      <b-col class="justify-content-center">
        <p class="heading freedom">ACTIVATE YOUR MEMBERSHIP</p>
        <p>
          If you are a new member or if your membership has expired, you can
          activate your membership using this page forms.<br />
          You can activate your membership with a bank transfer or make a
          <span class="diversity">gift</span>
          to a friend with a
          <nuxt-link to="/activate#bank" class="ac"
            >Bank Transfer Activation</nuxt-link
          >. <br /><br />
          <span class="base up freedom">PAYPAL</span><br />
          For Paypal Renewal, please fill in your email and password:
        </p>
        <b-form
          @submit.prevent="renewal()"
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
            class="btn bhcare white btn-block border-0 mb-4"
            @click="loadpaypal()"
          >
            ACTIVATE WITH PAYPAL OR CREDIT CARD
          </b-button>
          <div
            class="d-flex justify-content-center"
            id="paypal-button-container"
          ></div>
        </b-form>
        <p class="freedom">
          If you have problems, please
          <nuxt-link class="ac" to="/contact">contact us</nuxt-link>.
        </p>
        <br />
        <p id="bank" name="bank" class="freedom base up">
          BANK TRANSFER ACTIVATION
        </p>
        <p>
          If you want to activate your membership or a friend membership through
          a bank transfer, please fill in the relative email in the following
          input box:
        </p>
        <b-form-group
          label-for="bankEmailInput"
          label="Email:"
          description="Insert your email or that of the person you want to donate a membership to"
        >
          <b-form-input
            id="bankEmailInput"
            v-model="formBankEmail"
            size="sm"
            required
          ></b-form-input>
        </b-form-group>
        <p>
          then send a bank transfer to Cooperacy - IBAN
          IT61D0623001623000043225634 BIC/SWIFT CRPPIT2P277 - Filiale AG 23
          00277 - Cariparma, via della Moscova 53 Milano 20121 using the
          following code:
        </p>
        <p class="understanding text-center">
          {{ bankCode }}
        </p>
        <p>
          <span class="understanding">
            <strong> VERY IMPORTANT NOTE:<br /> </strong>
          </span>
          Bank transfers without code will be processed as donations to
          Cooperacy, so do not forget to insert the resulting code in the bank
          transfer.
        </p>
        <br /><br />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  head() {
    return {
      title: 'Cooperacy - Activation',
      script: [
        {
          src:
            'https://www.paypal.com/sdk/js?client-id=' +
            process.env.PAYPALID +
            '&vault=true&currency=EUR&debug=false',
          defer: true
        },
        {
          src: 'https://apis.google.com/js/main/platform.js',
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
    }
  },
  data() {
    return {
      loginEmail: null,
      loginPassword: null,
      formPaypalagreementid: 'bank',
      newaccountvar: false,
      newaccountpaypal: false,
      formBankEmail: null
    }
  },
  computed: {
    mailInputState() {
      return this.mail.length > 1 ? true : false
    }, //CHECK to be completed
    bankCode() {
      if (this.formBankEmail) {
        let atnumber = this.formBankEmail.indexOf("@") + 1
        return this.formBankEmail.replace('@', 'at' + atnumber + 'at') + " Cooperacy Bank Membership Activation"
      }
    }
  },
  methods: {
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
                plan_id: 'P-9C681042E7918904VLURYYGQ'
              })
            },
            onApprove: function (data, actions) {
              alert(
                'You have successfully become a member with subscription ID ' +
                data.subscriptionID
              )
              that.formPaypalagreementid = data.subscriptionID
              that.updateuser()
            }
          })
          .render('#paypal-button-container')
        this.newaccountpaypal = true
      }
    },
    async updateuser() {
      try {
        let updateUser = await this.$store.dispatch('updatePaypalAction', {
          email: this.loginEmail,
          password: this.loginPassword,
          paypalagreementid: this.formPaypalagreementid
        })
      } catch (err) {
        alert(err)
      }
      this.addedToast()
    },
    addedToast() {
      this.$toast.success('New paypal subscription authorized.', {
        duration: 1000,
        className: 'toast'
      })
      setTimeout(function () { location.href = '/main/thankyou' }, 1200)
    }
  }
}
</script>

<template>
  <div class="row mt-5">
    <div class="col-12">
      <div class="row"><div class="col-12 d-flex justify-content-center"><p class="care subheading">OR CREATE A NEW ACCOUNT:</p></div></div>
      <div class="row">
        <div class="col-12 d-flex justify-content-center">
          <b-form @submit.prevent="newuser" class="mt-3 was-validated">
            <b-form-group label-for="nameInput" label="Name:" description="Please insert your name">
              <b-form-input id="nameInput" v-model="formName" size="sm" required></b-form-input></b-form-group>
            <b-form-group label-for="surnameInput" label="Surname:" description="Please insert your surname">
              <b-form-input id="surnameInput" v-model="formSurname" size="sm" required></b-form-input></b-form-group>
            <b-form-group label-for="emailInput" label="Email:" description="Please insert a valid email: it will be your future username">
              <b-form-input id="emailInput" v-model="formEmail" size="sm" autocomplete="email" required></b-form-input></b-form-group>
              <!-- add crypt password before sending it -->
            <b-form-group label-for="passwordInput" label="Password:" description="Please insert your password or passphrase">
              <b-form-input id="passwordInput" v-model="formPassword" size="sm" type="password" autocomplete="new-password" required></b-form-input></b-form-group>
            <b-form-group label-for="imageInput" label="Image:" description="Please choose an image for your account"> 
              <b-form-file id="imageInput" v-model="formImageFile" ref="formImageFile" size="sm"></b-form-file>
            </b-form-group>
            <b-button type="submit" class="btn bhcare btn-block mt-3 white border-0">JOIN WITH BANK TRANSFER</b-button><br>
            <p class="subheading d-flex justify-content-center">OR WITH</p>
          </b-form>
        </div>
      </div>
      <div class="d-flex justify-content-center" id="paypal-button-container"></div>
      <script>paypal.Buttons({
        //onError: function (err) {Show an error page here, when an error occurs}
        //onCancel: function (data) {When a buyer cancels a payment, they typically return to the parent page. You can instead indicate a different page here.}
        // REMOVE DEBUG!!
        createSubscription: function(data, actions) { return actions.subscription.create({ 'plan_id': 'P-9C681042E7918904VLURYYGQ'});},
        onApprove: function(data, actions) {alert('You have successfully become a member with subscription ID ' + data.subscriptionID);
        this.formPaypalagreementid=data.subscriptionID; this.newuser();}}).render('#paypal-button-container');
      </script>
    </div>
  </div>
</template>

<script>
export default {
  head: {
    title: 'Join or Login',
    script: [{src:'https://www.paypal.com/sdk/js?client-id='+process.env.PAYPALID+'&vault=true&currency=EUR&debug=true'}], //live
    //script: [{src:'https://www.paypal.com/sdk/js?client-id='+process.env.PAYPALID+'&vault=true&currency=EUR&debug=true'}], //sandbox
    meta: [ { name: 'viewport', content: 'width=device-width, initial-scale=1' }, { 'http-equiv': 'X-UA-Compatible', content: 'IE=edge' },]
  },
  data() {
    return {
      formName: '',
      formSurname: '',
      formEmail: '',
      formPassword: '',
      formImageFile: '',
      formPaypalagreementid: 'bank',
    }
  },
  methods: {
    async newuser() {
      var newuser = await this.$store.dispatch('newuserAction', { 
        name: this.formName,
        surname: this.formSurname,
        email: this.formEmail,
        password: this.formPassword,
        paypalagreementid: this.formPaypalagreementid
      })
      if (newuser == 'exists'){return this.$toast.show('Email already in use!', {duration: 1000, className: 'toasts'})}
      if (this.formImageFile) {
        //the res variable in response from the server sends the id of the recently created user
        this.imageUpload(newuser.id)
        .catch(err => console.error(err))
      }else{this.addedToast()}
    },
    async imageUpload(id) {
        let formImageData = new FormData()
        formImageData.append('file', this.formImageFile)
        formImageData.append('id', id)
        let res = await this.$store.dispatch('imageUploadAction', {
          formImageData: formImageData, 
          headers: {headers: { 'Content-Type': 'multipart/form-data' }},
          proptype: 'user',
        })
        .catch(err => {console.error(err)})
        if (res) {this.addedToast()}
    },
    addedToast(){
      this.$toast.success('New user added.', {duration: 1000, className: 'toasts'})
      setTimeout(function(){location.href = location.href}, 1200)
    }
  },

}
</script>
    <!-- <div v-if="this.$store.state.payment=='cancelled'"><p class="base understanding center space up">Subscription cancelled.<br><br>
    You have {{ this.$store.state.payment.days }} days left to join us!</p></div>
    <div v-else>
    <p class="base equivalence center space up">Step 2: the voluntary pooling<br><br></p>
    <p class="base">The Cooperacy membership is based on a voluntary pooling of just one euro per month: the money is pooled to finance future ideas and projects, included yours.<br><br>

    <nuxt-link href="paypalpay" class="btn btn-primary btn-block">VOLUNTARY POOLING THROUGH PAYPAL</nuxt-link>
    <p class="mini">If you encounter any problem please screenshot any error and.. write us! (see below)</p><br><br>

    Living in a low income country? You can pool with a lower amount if you help us adapt the amount to the different purchasing power of your nation. Write us.<br><br>

    If you don't like paypal, you can pool one year membership (12 euros) via bank transfer: our IBAN is IT61D0623001623000043225634 - Filiale AG 23 Milano Cariparma di via della Moscova.<br><br>

    <p class="base">Pool instead via bank transfer sending us a code/receipt or contact us for suggestions, questions, requests:</p>
    <div role="form" class="wpcf7" id="wpcf7-f1303-p20-o1" lang="en-US" dir="ltr">

    <p class="mini">Your Name (required)<br />
    {{ Form::text('name', null, [
    'size' => 40,
    'class' => 'wpcf7-form-control wpcf7-text wpcf7-validates-as-required',
    'aria-required' => 'true',
    'aria-invalid' => 'false',]) }}</p>

    <p class="mini">Your Email (required)<br />
    <span class="wpcf7-form-control-wrap your-email">{{ Form::email('email', null, [
    'size' => 40,
    'class' => 'wpcf7-form-control wpcf7-text wpcf7-email wpcf7-validates-as-required wpcf7-validates-as-email',
    'aria-required' => 'true',
    'aria-invalid' => 'false',]) }}</span> </label></p>

    <p class="mini">Subject<br />
    <span class="wpcf7-form-control-wrap your-subject">{{ Form::text('subject', null, [
    'size' => 40,
    'class' => 'wpcf7-form-control wpcf7-text',
    'aria-invalid' => 'false',]) }}</span></p>

    <p class="mini">Your Message<br />
    <span class="wpcf7-form-control-wrap your-message">{{ Form::textarea('message', null, [
    'cols' => 40,
    'rows'=>10,
    'class' => 'wpcf7-form-control wpcf7-textarea',
    'aria-invalid' => 'false',]) }}</span></p>

    <p class="mini"><input type="submit" value="Send" class="wpcf7-form-control wpcf7-submit" /></p>
    <div class="wpcf7-response-output wpcf7-display-none"></div>-->

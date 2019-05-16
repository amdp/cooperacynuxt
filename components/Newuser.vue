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
            <b-button type="submit" class="btn bhcare btn-block mt-3 white border-0">JOIN</b-button>
          </b-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formName: '',
      formSurname: '',
      formEmail: '',
      formPassword: '',
      formImageFile: '',
    }
  },
  methods: {
    async newuser() {
      var newuser = await this.$store.dispatch('newuserAction', { 
        name: this.formName,
        surname: this.formSurname,
        email: this.formEmail,
        password: this.formPassword,
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
  }
}
</script>

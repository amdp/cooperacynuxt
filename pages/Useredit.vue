<template>
  <div class="row mt-5">
    <div class="col-12">
      <div class="row"><div class="col-12 d-flex justify-content-center"><p class="care subheading">UPDATE YOUR INFO</p></div></div>
      <div class="row">
        <div class="col-12 d-flex justify-content-center">
          <b-form @submit.prevent="useredit" class="mt-3 was-validated">
            <b-form-group label-for="nameInput" label="Name:" description="Please insert your real name">
              <b-form-input id="nameInput" v-model="formName" size="sm" required></b-form-input></b-form-group>
            <b-form-group label-for="surnameInput" label="Surname:" description="Please insert your real surname">
              <b-form-input id="surnameInput" v-model="formSurname" size="sm" required></b-form-input></b-form-group>
            <b-form-group label-for="emailInput" label="Email:" description="Please insert a valid email that will be your username">
              <b-form-input id="emailInput" v-model="formEmail" size="sm" required autocomplete="email"></b-form-input></b-form-group>
              <!-- add insert previous password and relative check -->
            <b-form-group label-for="passwordInput" label="Password:" description="Please insert your NEW password or passphrase">
              <b-form-input id="passwordInput" v-model="formPassword" size="sm" type="password" required autocomplete="current-password"></b-form-input></b-form-group>
            <b-form-group label-for="imageInput" label="Image:" :description="imageUploadDesc"> 
              <b-form-file id="imageInput" v-model="formImageFilename" ref="formImageFile" size="sm" accept="image/*" @input="imageUpload()"></b-form-file>
            </b-form-group>
            <b-button type="submit" class="btn bhcare btn-block mt-3 white border-0">UPDATE</b-button>
          </b-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  middleware: ['auth'],
  data() {
    return {
      formName: this.$auth.$state.user.name,
      formSurname: this.$auth.$state.user.surname,
      formEmail: this.$auth.$state.user.email,
      formPassword: '',
      formImageFilename: this.$auth.$state.user.image,
      imageUploadDesc: 'Please choose an image for your account',
      id: this.$auth.$state.user.id,
    }
  },
  methods: {
    useredit() {
      axios.put(
        '/db/user', {
          id: this.id,
          name: this.formName,
          surname: this.formSurname,
          email: this.formEmail,
          password: this.formPassword,
          image: this.formImageFilename.name,
        })
        .then(res => {

          console.log(this.formImageFilename.name + '  ' + JSON.stringify(res))
        })
        .catch(err => {
          console.log(err)
        })
    },
    async imageUpload() {
        //insert here deletion of previous image! (in form, if formimage = '' then do nothing, if formimage != '' then delete previous choice)
        let formImageData = new FormData()
        formImageData.append('file', this.formImageFilename)
        axios.post(
          '/db/userimageupload', formImageData, { headers: { 'Content-Type': 'multipart/form-data' } })
        .then(res => {
          this.imageUploadDesc = 'Image uploaded. Please keep the image name in the textbox above as it is now.'
          console.log('SUCCESS!!');
        })
        .catch(err => {
          this.imageUploadDesc = 'Image failed to upload. Please retry.'
          console.log('FAILURE :(');
        })
    },
  }
}
</script>

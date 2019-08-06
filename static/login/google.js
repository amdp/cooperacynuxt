function googleOnSignIn(googleUser) {
  console.log("ok")
  var profile = googleUser.getBasicProfile()
  console.log("Full Name: " + profile.getName())
  console.log("Given Name: " + profile.getGivenName())
  console.log("Family Name: " + profile.getFamilyName())
  console.log("Image URL: " + profile.getImageUrl())
  console.log("Email: " + profile.getEmail())
  var id_token = googleUser.getAuthResponse().id_token
  console.log("ID Token: " + id_token)
}

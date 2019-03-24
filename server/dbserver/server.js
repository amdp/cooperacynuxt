var express = require("express")
var bodyParser = require("body-parser")
var cors = require("cors")

var cooperacyRoute = require("./routes/cooperacyRoutes")

var port = ( process.env.PORT || 5000 )
var app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

app.use("/cooperacy", cooperacyRoute)

app.listen(port, function () {
  console.log("Server is running on port: " + port)
})

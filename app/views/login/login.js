var frameModule = require("ui/frame");
var UserViewModel = require("../../shared/view-models/user-view-model");
var dialogsModule = require("ui/dialogs");

var user = new UserViewModel();

var page;
var email;

exports.loaded = function(args) {
    page = args.object;
    page.bindingContext = user;
}

exports.signIn = function() {
    user.login()
        .catch(function(error) {
            console.log(error);
            dialogsModule.alert({
                message: "Unfortunately we could not find your account.",
                okButtonText: "OK"
            });
            return Promise.reject();
        })
        .then(function() {
            console.log("successfully logged in!");
            frameModule.topmost().navigate("views/list/list");
        })
}

exports.register = function() {
    var topmost = frameModule.topmost();
    topmost.navigate("views/register/register");
}
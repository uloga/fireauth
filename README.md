## Firebase - Angular.js Authentication System

You can find example at: [FireAuth](https://uloga.github.io/fireauth/#/login) 

Usage
-----
Go to [Firebase](https://www.firebase.com/) and create a database, they also have free option plans, like the one I'm using for this example.
You can find out more about how to use firebase by reading [Firebase Docs](https://www.firebase.com/docs/).
Aftere you've created your firebase databas you can download this repo and test it locally. 

Go into repos folder and in ``` app.js ``` set your own ``` var firebaseUrl = "" ```.
Next: create your own github app at: [New Github App](https://github.com/settings/applications/new)
If you're using it locally, make sure that your Homepage URL is set to ``` http://localhost/fireauth/ ```

I'm using github social login in this example but you can also use many other social logins with firebase,
if you wanna know more about how to use and set these up visit: Firebase Docs](https://www.firebase.com/docs/web/guide/user-auth.html)

More about how to use Firebase - Github oAUth
-----
To get started with GitHub authentication, you need to first create a new GitHub application. 
Click the Register new application button at the top right of that page and fill in a name, description,
and website for your application. Set the Authorization callback URL to https://auth.firebase.com/v2/<YOUR-FIREBASE-APP>/auth/github/callback 
so that GitHub's OAuth service can properly communicate with Firebase's authentication server.

If you like this example, please star and watch feel free to fork.

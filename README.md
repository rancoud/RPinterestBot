# RPinterestBot
Bot for Pinterest

## Setup
1. Create Pinterest application
2. Rename conf.pinterest.app.sample.js to conf.pinterest.app.js
3. Fill the file with **name** , **consumer_key** , **consumer_secret** , **access_token** (**callback_url** and **scope** is for user authentification)
4. Create your job in folder jobs

## Example
Once your pinterest application created you can run job.
```
node job me
```

## How to write job
1. Create a file in jobs folder, the filename is the job name
2. In job get a Pinterest app by using ```getPinterestApp(name, endpoints)```
  * if you provide no arguments the first Pinterest app is returned
  * name (string or undefined - optionnal) : using a specific Pinterest app
  * endpoints (array - optionnal) : return an available Pinterest app which can use thoses endpoints (rate limit)

## PID watcher and killer
Jobs'list running (pid + job + options)
```
node pid
```
Kill a job
```
node pid kill {pidId}
```
Kill all jobs
```
node pid kill all
```

## JOBS
* example -> do nothing
* me -> return authenticated user information
* my_boards -> return authenticated user’s public boards
* get_pins_in_board -> returns list of Pins on the board
* valid_board -> check if argument provided is a valid board
* valid_user -> check if argument provided is a valid_user

## Pinterest User Authentification
Getting access token for external user with an app.  
```
node save_oauth "myapp"
```
*(if app name argument is not provided the first one in conf is picked)*  
A server will be up at 127.0.0.1 on port 3000.  
When callback is done a file is created in oauth_access_cache like this: screen_name.tok  
It will contain the app name, access token and access token secret.  

## Optionnal arguments
```
// user to use (require getting access token)
-u OR --user "myuser"
// pinterest app to use
-a OR --app "myapp"
// file to upload
-f OR --file "/path/to/file"
```
**for user argument use in lower case the screen name of the account**  

## Documentation Pinterest API
List of endpoints (GET / POST / PATCH / DELETE)
```
node doc
```
List of endpoints (GET only)
```
node doc get
```
List of endpoints (POST only)
```
node doc post
```
List of endpoints (PATCH only)
```
node doc patch
```
List of endpoints (DELETE only)
```
node doc delete
```
Endpoint details
```
node doc "/v1/me/"
```
List of parameters
```
node doc parameters
```
Test endpoint (GET and POST)
```
node doc test "/v1/me/"
```

## LIMITS
Sandbox: 200 calls / 60 minutes / token  
Live: 1000 call / 60 minutes / token  

Url images in 60x60 in sandbox  

Can't see private board (will be never support by pinterest team)  

List of Scopes  
* read_public : Use GET method on a user’s Pins, boards and likes.  
* write_public : Use PATCH, POST and DELETE methods on a user’s Pins and boards.  
* read_relationships : Use GET method on a user’s follows and followers (on boards, users and interests).  
* write_relationships : Use PATCH, POST and DELETE methods on a user’s follows and followers (on boards, users and interests).  

## TODO
* rate-limit-save
* add scope in doc
* check scope on api call

## Nota Bene

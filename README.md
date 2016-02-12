# RPinterestBot
Bot for Pinterest

## Setup
1. Create Pinterest application
2. Rename conf.pinterest.app.sample.js to conf.pinterest.app.js
3. Fill the file with **name** , **consumer_key** , **consumer_secret** , **access_token_key** , **access_token_secret** (**callback_url** is for user authentification)
4. Create your job in folder jobs

## Example
Once your pinterest application created you can run job.
```
node job example
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
List of endpoints (GET and POST)
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
Endpoint details
```
node doc "statuses/home_timeline"
```
List of parameters
```
node doc parameters
```
Test endpoint (GET and POST)
```
node doc test "statuses/home_timeline"
```

## TODO
* complete

## Nota Bene

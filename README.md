# Housing Alert

Housing alert is a web app and sms-based free service that aims to close the digital divide by making the process of finding and applying to affordable housing accessible for people who don’t have internet service or don’t know how to use the internet. 

https://housing-alert.herokuapp.com

## Demo

### [Full Video Demo - click here](https://www.youtube.com/watch?v=MiBklCG1PE0&feature=youtu.be)


![Housing Alert](./client/public/housing_alert_registration.gif)


![Housing Alert](./client/public/housing_alert_preference.gif)


![SMS Registration](./client/public/housing_alert_SMS_registration.gif)


![SMS Alert](./client/public/housing_alert_SMS_alert.gif)


## Built With

* [Express](https://expressjs.com/) - Node.js framework
* [Passport](http://www.passportjs.org/) - User Authentication 
* [Sequelize](http://docs.sequelizejs.com/) - ORM for PostgreSQL database
* [React](https://reactjs.org/) - UI library

### APIs

* [Twilio](https://www.twilio.com/) - SMS messaging and other communications platform
* [Google](https://developers.google.com/) - OAuth2 Authentication, Google Maps, Google Geocoding

### Data 

* [DAHLIA](https://github.com/Exygy/sf-dahlia-salesforce/) - San Francisco Affordable Housing Portal 

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. 

### Prerequisites

You'll need everything below to run this application. Installation instructions can be found via link below.

* [Node](https://nodejs.org/en/)
* [Postgres.app](https://postgresapp.com/)(Mac only) Alternative: [PostgreSQL](postgresql.org)
* [NPM](https://www.npmjs.com/)

A List of API keys that you would need to obtain prior running this project can be found in server/config/keys.js file

From [Twilio](https://www.twilio.com/), you would need: 
* Twilio phone number
* Twilio account SID
* Twilio auth token
* Authy API key
* Verify service SID

From [Google](https://developers.google.com/), you would need: 
* Google oauth2 client ID
* Google API key


### Installing

After installing all the prerequisites, please follow this step by step guide to get your development env running


1. In your terminal, navigate to where you would like to store this project. Then run

```
$ git clone https://github.com/isabelleyiu/housing_alert.git
```

2. Go into the project directory by running

```
$ cd housing_alert
```

3. To install server-side dependencies, run:

```
$ npm install 
```

4. To install client-side dependencies, run:

```
$ npm run client-install
```

5. In order to connect your database to the project. Make sure that your PostgreSQL database is running.

6. In your terminal prompts create database housing_alert

```
$ createdb housing_alert
```

7. Connect to the database with PostgreSQL to make sure you have your database setup 

```
$ psql housing_alert
```

8. open the config.json file in server/config directory. If you are using VS Code, run

```
$ code server/config/config.json
```

9. Update the development part of the file with details from your database. If you didn't create an username and password, your config.json should look something like this. This will allow Sequelize to create all of the neccessary tables for you.

```
{
  "development": {
    "username": "",
    "password": null,
    "database": "housing_alert",
    "host": "127.0.0.1",
    "dialect": "postgres",
    "timezone": "-07:00"
  }
}
```

10. In your root directory, create a .env file to hold all of your API keys that you get beforehand. You will at least need the following info to get the project running.

```
SESSION_SECRET=1234567890
TWILIO_PHONE=1234567890
TWILIO_ACCOUNT_SID=1234567890
TWILIO_AUTH_TOKEN=1234567890
```

11. At this point, you should have everything you need to run this project. Start up the servers by running command in your root directory.

``` 
$ npm run dev
```

Viola. Your back-end server should now be running at port 5000, and client server running at port 3000. 

Happy hacking!



## Authors

* **Isabelle Yiu** - *Initial work* - [isabelleyiu](https://github.com/isabelleyiu)


## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* This is a final Project for [Techtonica](https://techtonica.org/) program. 



covid 19

1. create html file
# create conainer div
# in container div i create a statics div that have chart and information about the countries
# also i create an option div that have a type div thaat have 4 buttons (confirmed,deaths,recovered,critical)
# and region div that have 5 button (global,asia,americas,africa,europe) 

2. create js file
# origin object => Save countries by continents
# datatype object => {
    allcoronadata => save all corona data
    currentregion => show defult chart in global corona cases(what the last region from api)
    currenttype => what the last requst type from api

}

## API

# coronacountrys() return the counterys with corona data
# returnbycountrydata(code) return the country according to the code(IL=Israel)
# allcountries() return the data of all countries 
# byorigin(orgion) return the countrys according to the orgion


## functions

# createbtncountries() create all the buttons of the countries in the world
# countryselectclick(event=country) show the country corona information 
# regionselectclick(event=region) show all the countries in region inside the chart

### •	Development of a covid-19 site to revirew the data of corona in the world.
### •	The project is developing using React, JavaScript, Bootstrap, MDB, HTML5 and CSS3 in frontend, and Node.js with NoSQL Mongo database.
### •	Libraries: Axios, Dom-Router, yup, formic, multer, bcryptjs, express.js.
### •	Add Deployment to Heroku cloud.



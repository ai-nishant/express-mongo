Please follow the below steps to execute the file

STEP 1 [Downloading]

Download from the url or as zip, extract it in desire folder of choice


STEP 2 [Installation]

before running the below command , please check node version  using command `node --version`  
if it detect output would be similar to `v16.14.2`


please run below command :
npm install --save


Note {the redis installation is optional , steps are mentioned in `redissteps.txt` in root foolder}

STEP 3 [Running the backend]

below command can be used to run backend server locally 

npm run start 


Note : change the path of mongo db server in .env file for error free run.



In order to the insert the dummy records :

use the follow curl call

`
curl --location --request POST 'localhost:3000/search' \
--header 'Content-Type: application/json' \
--data-raw '{
    "records" :1000000
}'
`


In order to search the user or records use below curl call

`
curl --location --request GET 'localhost:3000/search/final?from=1951-01-01&to=1970-01-01&status=@dead&zipCodes=800001'
`




************* TimeLine Details below *************

1. brainstorming and solution approach defination ----  2-3 hour
2. Database schema design and creation ---- 1 hour
3. Data preparation and insertion of dummy data --- 5-6 hours for 22 lac records   [ `couldnt go beyond as cpu became slow`]
4. Mongo query for get api as per use case  ---- 3-4 hours 
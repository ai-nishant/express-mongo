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

----startofcurcall-----    ignore this line 35
curl --location --request POST 'localhost:3000/search' \
--header 'Content-Type: application/json' \
--data-raw '{
    "records" :1000000
}'
----startofcurcall-----    ignore this line 41


In order to search the user or records use below curl call

----startofcurcall-----    ignore this line 46
curl --location --request GET 'localhost:3000/search/final?from=1951-01-01&to=1970-01-01&status=@dead&zipCodes=800001'
----startofcurcall-----    ignore this line 48



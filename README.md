# angular_2_list

npm install -g typescript



typings - The TypeScript Definition Manager. It uses typings.json, which can resolve to the Typings Registry, GitHub, NPM, Bower, HTTP and local files.
to do: read about RouterLink

http://couchdb.apache.org/
http://localhost:5984/_utils/index.html

create database 'user'
create record with 2 fields: 'id' = 'settings' and 'filter'=''

# to allow CORS:
1. go to CouchDB\etc\couchdb\default.ini  and set:

    [httpd]
    enable_cors = true

    [cors]
    origins = *
2.  restart database
    to stop => run cmd as Administrator and then: net.exe stop "apache couchdb"
    to start use Start CouchDB bat files

#take a look at observables
http://reactivex.io/


#JSONP
 JSONP returns the object inside a function with a known variable name.
 in CouchDB:
    [httpd]
    allow_jsonp = true

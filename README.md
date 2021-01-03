# description
Collector api microservices

# collector-api

[![LoopBack](https://github.com/strongloop/loopback-next/raw/master/docs/site/imgs/branding/Powered-by-LoopBack-Badge-(blue)-@2x.png)](http://loopback.io/)

# generate angular services from swagger.json file
openapi-generator generate -i swagger.json -g typescript-angular


# AWS Mongo configuration
{
  "name": "collector",
  "connector": "mongodb",
  "url": "mongodb://<USER_NAME>:<PASSWORD>@127.0.0.1:27017/collectordb?authSource=admin&ssl=false"
}

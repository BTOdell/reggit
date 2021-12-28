# Reggit
> A powerful regex-like filtering and notification engine for Reddit designed to run for free on [AWS](https://aws.amazon.com/).

## Features
TODO

## Deployment
One of the primary goals of Reggit was to be capable of running forever within the unlimited free tier of AWS: https://aws.amazon.com/free/

Unfortunately, the [Amazon API Gateway](https://aws.amazon.com/api-gateway/) service is only free for the first 12 months.

### AWS Free Tier Services (Unlimited)
* [Lambda](https://aws.amazon.com/lambda/): Serves the SPA, powers the REST API, and scrapes the Reddit website at periodic intervals.
* [DynamoDB](https://aws.amazon.com/dynamodb/): Persistent storage for configuration of the filtering and notification engine.
* [EventBridge](https://aws.amazon.com/eventbridge/): Trigger web-scraping lambda functions periodically.
* [SNS](https://aws.amazon.com/sns/): Send email notifications when search criteria is met during web-scraping of Reddit.
* [Optional] [Cognito](https://aws.amazon.com/cognito/): Provide access control to the web app and enable support for multiple users.
* [Optional] [Route 53](https://aws.amazon.com/route53/): Allow the web app to be accessible from a memorable URL instead of an IP address.

### AWS Free Tier Services (12-months)
* [API Gateway](https://aws.amazon.com/api-gateway/): Provide a public internet access point to the serverless web app.
Thankfully, the cost of 1 million HTTP requests through an endpoint is only $1.00 (one dollar). Reggit doesn't use the API gateway during scheduled web scraping activity, only when you navigate to the web app, which is optimized to minimize the number of requests. In most cases, you won't owe Amazon a penny.

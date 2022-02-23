'use strict';
const AWS = require("aws-sdk")
const dynamo = new AWS.DynamoDB.DocumentClient()

module.exports.survey = async (event) => {
  let body, request, response
  let requestJSON = typeof event.body !== 'object' ? JSON.parse(event.body) : event.body
  let statusCode = 200    
  const headers = {
    'Access-Control-Allow-Origin': 'https://survey.novauniverse.me',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Credentials': true,
    'Content-Type': 'application/json'
  }
  try {
    switch (event.routeKey) {   
      case "POST /{name}":
      
        //--- dynamoDB

        request = {
          TableName: "survey",
          Item: {
            name: requestJSON.name,
            title: requestJSON.title,
            details: requestJSON.details,
            question: requestJSON.question
          }  
        }
        await dynamo.put(request).promise()
        body = 'SUCCESS'
        break
      case "DELETE /doc":
        requestJSON = typeof event.body !== 'object' ? JSON.parse(event.body) : event.body

        //--- S3
        request = {
          Bucket: `${BUCKET_NAME}/markdowns`,
          Key: `${requestJSON.name}.md`
        }        
        await s3.deleteObject(request).promise()
        body = 'SUCCESS'
        break
    }
  } catch (err) {
    statusCode = 400
    body = err.message
  } finally {
    body = JSON.stringify(body)
  }  

  return {
    statusCode,
    body,
    headers
  }
}

'use strict';
const AWS = require("aws-sdk")
const dynamo = new AWS.DynamoDB.DocumentClient()

module.exports.survey = async (event) => {
  let body, request, requestJSON, response
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
      case "GET /surveys":
        request = {       
          TableName: "survey",
          ProjectionExpression: "#name",
          ExpressionAttributeNames: { "#name": "name" },
        }        
        body = await dynamo.scan(request).promise()
        break
      case "GET /{name}":
        request = {
          TableName: "survey",
          Key: {
            name: event.pathParameters.name
          }         
        }         
        body = await dynamo.get(request).promise()
        break 
      case "POST /create":
        requestJSON = JSON.parse(event.body)
        request = {
          TableName: "survey",
          Item: {
            name: requestJSON.name,
            title: requestJSON.title,
            details: requestJSON.details,
            questions: requestJSON.questions
          }  
        }
        await dynamo.put(request).promise()
        body = 'YES'
        break
      case "POST /submit":
        requestJSON = JSON.parse(event.body)
        request = {
          TableName: "result",
          Item: {
            name: requestJSON.name,
            email: requestJSON.email,
            answer: requestJSON.answer
          }  
        }
        await dynamo.put(request).promise()
        body = 'YES'
        break
      case "DELETE /{name}":
        break
    }
  } catch (err) {
    statusCode = 400
    body = [err.message]
  } finally {
    body = JSON.stringify(body)
  }  

  return {
    statusCode,
    body,
    headers
  }
}

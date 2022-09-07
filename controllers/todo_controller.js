const crypto = require('crypto');
const moment = require('moment');

// DynamoDB settings
const AWS = require('aws-sdk');
// Set the region
AWS.config.update({ region: 'eu-central-1' });
const db = new AWS.DynamoDB({ apiVersion: '2012-08-10' });

const TABLE_NAME = 'node_js_todo';

exports.addTodo = async (request, result) => {
  try {
    const todo = request.body;

    const params = {
      TableName: TABLE_NAME,
      Item: {
        id: { S: todo.id },
        title: { S: todo.title },
        completed: { BOOL: todo.completed },
        date: { S: todo.date },
      },
    };

    await db.putItem(params).promise();

    result.json({ status: 200, message: 'Todo added' });
  } catch (err) {
    console.log(err);
    result.json({ status: 500, message: err });
  }
};

exports.getTodos = async (request, result) => {
  // Create DynamoDB service object

  const params = {
    TableName: TABLE_NAME,
    Select: 'ALL_ATTRIBUTES',
  };

  const data = await db.scan(params).promise();

  const todoList = data.Items;
  result.json({ status: 200, todoList });
};

exports.deleteTodo = async (request, result) => {
  try {
    const id = request.params && request.params.id;
    var params = {
      TableName: TABLE_NAME,
      Key: {
        id: { S: id },
      },
    };

    await db.deleteItem(params).promise();

    result.json({ status: 200, message: 'Todo deleted' });
  } catch (err) {
    console.log(err);
    result.json({ status: 500, message: err });
  }
};

exports.updateTodo = async (request, result) => {
  try {
    const id = request.params && request.params.id;
    const { completed } = request.body;
    var params = {
      ExpressionAttributeNames: {
        '#completed': 'completed',
      },
      ExpressionAttributeValues: {
        ':completed': {
          BOOL: completed,
        },
      },
      Key: {
        id: {
          S: id,
        },
      },
      TableName: TABLE_NAME,
      UpdateExpression: 'SET #completed = :completed',
    };
    await db.updateItem(params).promise();

    result.json({ status: 200, message: 'Todo updated' });
  } catch (err) {
    console.log(err);
    result.json({ status: 500, message: err });
  }
};

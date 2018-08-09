var WebSocketServer = require('ws').Server;
var http = require('http');
var express = require('express');
var app = express();
var newOrder = require('./components/new_oresrows.js');

var source = [
  { id: '1231', millitime: 1488634980000, date: '04.02.2017', time: '16:43', lc: '123456789', source: 'сайт', costStatus: 'оплачен', implStatus: 'new', count: 1,  price: 1400, cost: 14000,
      productId: 1451, serviceName: 'Установка врезного замка в металлическую дверь', serviceLink: '#',
      actions: [
         { status: 'appoint' },
         { status: 'cancel' }
      ]
  },
  { id: '1232', millitime: 1488634980001, date: '04.02.2017', time: '16:43', lc: '2725050650', source: 'сайт', costStatus: 'оплачен', implStatus: 'in-progress', count: 1,  price: 1000, cost: 1000,
      productId: 1452, serviceName: 'Повесить зеркало квадратное', serviceLink: '#',
      actions: [
         { status: 'cancel' }
      ]
  },
  { id: '1233', millitime: 1488634980002, date: '04.02.2017', time: '16:43', lc: '2725050650', source: 'сайт', costStatus: 'оплачен', implStatus: 'appointed', count: 10,  price: 800, cost: 8000,
      productId: 1453, serviceName: 'Поклеить обои', serviceLink: '#',
      actions: [
         { status: 'cancel' }
      ]
  },
  { id: '1234', millitime: 1488634980003, date: '04.02.2017', time: '16:43', lc: '2725050650', source: 'сайт', costStatus: 'оплачен', implStatus: 'run', count: 10,  price: 800, cost: 8000,
      productId: 1453, serviceName: 'Повесить зеркало круглое', serviceLink: '#',
      actions: [
         { status: 'cancel' }
      ]
  },
  { id: '1235', millitime: 1488634980004, date: '04.02.2017', time: '16:43', lc: '2725050650', source: 'сайт', costStatus: 'оплачен', implStatus: 'ready', count: 10,  price: 800, cost: 8000,
      productId: 1453, serviceName: 'Прибить полочку', serviceLink: '#',
      actions: [
         { status: 'close' },
         { status: 'cancel'}
      ]
  },
  { id: '1236', millitime: 1488634980005, date: '04.02.2017', time: '16:43', lc: '2725050650', source: 'сайт', costStatus: 'оплачен', implStatus: 'canceled', count: 10,  price: 800, cost: 8000,
      productId: 1453, serviceName: 'Починить кран', serviceLink: '#',
      actions: [
         { status: 'cancel' } 
      ]
  },
  { id: '1237', millitime: 1488634980006, date: '04.02.2017', time: '16:43', lc: '2725050650', source: 'сайт', costStatus: 'оплачен', implStatus: 'closed', count: 10,  price: 800, cost: 8000,
      productId: 1453, serviceName: 'Помыть ковер', serviceLink: '#',
      actions: [
         { status: 'open' }
      ]
  },
  { id: '1238', millitime: 1488634980007, date: '04.02.2017', time: '16:43', lc: '2725050650', source: 'сайт', costStatus: 'оплачен', implStatus: 'new', count: 10,  price: 800, cost: 8000,
      productId: 1453, serviceName: 'Помыть пол', serviceLink: '#',
      actions: [
         { status: 'appoint' },
         { status: 'cancel' }
      ]
  },
  { id: '1239', millitime: 1488634980008, date: '04.02.2017', time: '16:43', lc: '2725050650', source: 'сайт', costStatus: 'оплачен', implStatus: 'new', count: 10,  price: 800, cost: 8000,
      productId: 1453, serviceName: 'Поклеить обои', serviceLink: '#',
      actions: [
         { status: 'appoint' },
         { status: 'cancel' }
      ]
  }
];

app.get('/mp_orders_repair.js', function(req, res) {
  res.send('Hello World!');
});

var server = http.createServer(app);
server.listen(8080);

console.log("WebSocketServer: сервер создан");

var webSocketServer = new WebSocketServer({server: server});
webSocketServer.on('connection', function(ws) {

  var count = 0;
  var oresrows = source;
  var timer = setInterval(function() {

    oresrows = (count == 0) ? oresrows : newOrder(oresrows);
    count++;

    ws.send(JSON.stringify(oresrows), function(error) {
      // handle errors 
    });
  }, 2000);

  console.log('WebSocketServer: клиент подключился');

  ws.on('close', function() {
    console.log('ebSocketServer: клиент отключился');
    clearInterval(timer);
  });
});
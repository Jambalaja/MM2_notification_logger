'use strict';
const NodeHelper = require('node_helper');

const {PythonShell} = require("python-shell");
var pythonStarted = false;

module.exports = NodeHelper.create(
{
	python_start: function () 
	{
		const self = this;		
		self.pyshell = new PythonShell('modules/' + this.name +
		'/python-scripts/notification-logger.py', {pythonPath: '/usr/bin/python', args: [JSON.stringify(this.config)]});
		console.log(this.name + " started");
		self.pyshell.on('message', function (message)
		{
			console.log("[smartmirror-notification-logger] " + message);
		});
  	},

  	socketNotificationReceived: function(notification, payload) 
	{
		const self = this;
		if(notification === 'CONFIG') 
		{
      		self.config = payload;
			if(!pythonStarted)
			{
				pythonStarted = true;
				self.python_start();
			}
		}
		else
		{
			self.pyshell.send(payload);
			//console.log("Send: " + entryString);
		}
  	},
	
	//call python clean up function
	stop: function() 
	{
		const self = this;
	    	console.log("Stopping module helper: " + self.name);
		//self.pyshell.send("stop logging");
		self.pyshell.childProcess.kill('SIGKILL');
		self.pyshell.end(function (err)
		{
           		if (err)
			{
        			//throw err;
    			};
    			console.log('Clean up notification-logger finished');
		});
	}
})


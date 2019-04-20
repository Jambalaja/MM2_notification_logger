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
		'/python-scripts/notification-logger.py', {pythonPath: 'python', args: [JSON.stringify(this.config)]});
		console.log("notification-logger started");
		self.pyshell.on('message', function (message)
		{
			console.log("notification-logger: " + message);
		});
  	},

  	socketNotificationReceived: function(notification, payload) 
	{
		const self = this;
		if(notification === 'CONFIG') 
		{
      			this.config = payload;
			if(!pythonStarted)
			{
				pythonStarted = true;
				this.python_start();
			}
		}
		else
		{
			this.pyshell.send(payload);
			//console.log("Send: " + entryString);
		}
  	},
	
	//call python clean up function
	stop: function() 
	{
		const self = this;
		self.pyshell.send('stop logging');
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


'use strict';
const NodeHelper = require('node_helper');
const fs = require('fs');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

module.exports = NodeHelper.create(
{
  	socketNotificationReceived: function(notification, payload) 
	{
		const self = this;
		if(notification === 'CONFIG') 
		{
      			self.config = payload;
			if(!fs.existsSync(this.config.logFilePath))
			{
				fs.mkdir(this.config.logFilePath)
			}
		}
		else
		{
			var d = new Date(Date.now());
			var month   = d.getMonth() == 0 ? '01' : d.getMonth() + 1 
			var minutes = Math.floor(d.getMinutes() / 5)*5
			minutes = minutes < 10 ? '0' + minutes : minutes
			d = d.getDate() + "_" + month + "_" + d.getFullYear() + "_" + d.getHours() + "_" + minutes
			
			var csvWriter = createCsvWriter({
			    path: this.config.logFilePath + d + "_notification_log.csv",
			    append: true,
			    header: [
				{id: 'date', title: 'DATE'},
				{id: 'senderName', title: 'SENDER_NAME'},
				{id: 'notification', title: 'NOTIFICATION'},
				{id: 'payload', title: 'PAYLOAD'}
			    ]
			});
			csvWriter.writeRecords([payload])
		}
  	}
})


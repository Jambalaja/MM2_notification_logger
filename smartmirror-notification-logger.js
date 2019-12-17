Module.register("smartmirror-notification-logger", {
	defaults:{},
	start: function() {
		this.sendSocketNotification('CONFIG', this.config);
		Log.info('Starting module: ' + this.name);
	},
	getDom: function () {
	},
	notificationReceived: function(notification, payload, sender) 
	{
		var senderName = "";
		if(sender)
		{
			senderName = sender.name;
		}
		else
		{
			senderName = "Core System";
		}
		var entry = {
			date: Date.now(),
			senderName: senderName,
			notification: notification,
			payload: JSON.stringify(payload)
		}
		this.sendSocketNotification("Log", entry);
	},
	socketNotificationReceived: function () {},
})

# smartmirror-notification-logger

This module logs all messages broadcasted by the installed and started MagicMirror2 modules. The logged messages are stored in a .csv file with the format:

TIME_STAMP, SENDER_NAME, NOTIFICATION_NAME, PAYLOAD

Please note that the payload is not parsed. 

## Installation

1. clone or copy the repository to your MM2 location under ~/MagicMirror/modules/
2. add the following entry to your ~/MagicMirror/config/config.js

```javascript
{
	module: "smartmirror-notification-logger",
	config: {
			logFilePath: "./modules/smartmirror-notification-logger/notification_log.csv", //working directory for python-shell is ~/MagicMirror
			writeMode: "a" //a for append; w for (over)write
		}
},
```

## Requirements

1. a valid installation of MM2 on your system
2. python-shell package for node.js (https://www.npmjs.com/package/python-shell)
3. python installed on your system

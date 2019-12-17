# smartmirror-notification-logger

This module logs all messages broadcasted by the installed and started MagicMirror2 modules. The logged messages are stored in a .csv file with the format:

TIME_STAMP, SENDER_NAME, NOTIFICATION_NAME, PAYLOAD

The payload is parsed as a JSON string. The logger creates a new log file every 5 minutes to keep read and write times short.

## Installation

1. clone or copy the repository to your MM2 location under ~/MagicMirror/modules/
2. add the following entry to your ~/MagicMirror/config/config.js

```javascript
{
	    module: "smartmirror-notification-logger",
	    config: {
		logFilePath: "./modules/smartmirror-notification-logger/log/", //working directory for node.js is ./MagicMirror2
	     }
},
```

## Requirements

1. a valid installation of MM2 on your system
2. csv-writer installed as package for MM2 https://www.npmjs.com/package/csv-writer

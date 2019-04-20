import threading
import sys
import os
import json

i = 0

def to_node(message):
	print(message)
	# stdout is buffered and has to be flushed manually to prevent delays in the node helper communication
	sys.stdout.flush()


def check_stdin():
	global i
	while True:
		lines = sys.stdin.readline()
		if "stop logging" in lines:
			close_log_file()
			break
		write_log(lines)
		i += 1

def write_log(logEntry):
	#to_node("Writing: " + logEntry + "to " + logFile.name)
	logFile.write(logEntry)

def close_log_file():
	logFile.close()
	to_node("Logfile saved to " + os.path.realpath(logFile.name))
	to_node(str(i) + " new entries saved")

if __name__ == "__main__":
	config = json.loads(sys.argv[1])
	to_node("open log file " + config['logFilePath'] + " in mode '" + config['writeMode'] + "'")
	to_node("This working directory path: " + os.getcwd())
	logFile = open(config['logFilePath'], config['writeMode'])
	t = threading.Thread(target=check_stdin)
	t.start()

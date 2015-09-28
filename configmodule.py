# Ask for PROXY SETTINGS #
import re

# File Paths #
configDictionary = {
	'os' : {'posix': 0, 'nt': 1},
	'usertypesjs': [
		'/BBVA/itests/src/main/resources/users/userTypes.json',
		r'C:\BBVA\itests\src\main\resources\users\userTypes.json'
	],
	'eiUser': [
		'/BBVA/itests/src/main/resources/users/ei',
		r'C:\BBVA\itests\src\main\resources\users\ei'
		],
	'mockusers': [
		'/BBVA/WebApp/src/main/resources/META-INF/cabeceras/mockUsers.json',
		r'C:\BBVA\WebApp\src\main\resources\META-INF\cabeceras\mockUsers.json'
	],
	'confjs': [
		'/BBVA/WebApp/src/main/webapp/js/bbva.app.feedback.conf.js',
		r'C:\BBVA\WebApp\src\main\webapp\js\bbva.app.feedback.conf.js'
	]
}

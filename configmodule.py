# Ask for PROXY SETTINGS #
import re

def checkProxy(PROXY_HOST, PROXY_PORT):
	if PROXY_HOST and PROXY_PORT:
		pass
	else:
		PROXY_HOST = str(raw_input("Enter Proxy address\nExample_<http://User:Password@CACHETABII.igrupobbva>_: "))
		PROXY_PORT = str(raw_input("Proxy: "))

		with open('feedback.py') as f:
			contents = f.read()
		r = re.compile(r'PROXY_HOST = ""')
		contents = r.sub('PROXY_HOST = "' + PROXY_HOST + '"', contents)
		with open('feedback.py','w') as f:
			f.write(contents)

		with open('feedback.py') as f:
			contents = f.read()
		r = re.compile(r'PROXY_PORT = ""')
		contents = r.sub('PROXY_PORT = "' + PROXY_PORT + '"', contents)
		with open('feedback.py','w') as f:
			f.write(contents)

# File Paths #
configDictionary = {
	'os' : {'posix': 0, 'nt': 1},
	'usertypesjs': [
		'/BBVA/itests/src/main/resources/users/userTypes.json',
		r'C:\BBVA\itests\src\main\resources\users\userTypes.json'
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
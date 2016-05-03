# -*- coding: iso-8859-15 -*-

import os, sys
import re
import json
if os.name == 'posix':
	import readline
import codecs
from time import sleep

import requests
from lxml import html

prompt = os.name + '@' + os.name + " $ "
###########################
######## FUNCTIONS ########
###########################

#### printing #####

def printBBVALogo():
	print ("hhhhho                                                ")
	print ("yyyyyo                                                ")
	print ("sssss+                                                ")
	print ("sssss+                                                ")
	print ("sssss+         /oooooo:  :oooooo:`oo+`   `o+  +oo+    ")
	print ("ooooo+         odh-`-hh. +dd:`-hh./dd+   +d: /hydd/   ")
	print ("ooooo+         odh. oh+  +dd- +h+  sdh- .hs `hs`ydh.  ")
	print ("+++++:         odh. `sdy.+dd- `ody..hds`sh. oh-`-hdy` ")
	print ("/////:         odh.  odd/+dd-  odd/ /ddsd/ :hysssydd+ ")
	print ("/////:         +hhssyhy/ +hdssyhy/   shhy``yy`   `yhh-")
	print ("-----.         ```````   ```````      ```  ``     ````")
	print ("-----.                                                ")
	print ("-----.                                                ")

def printMenu():
	print	("               Linea de Feedback script 1.0.0")
	print	("               ------------------------------")
	print ("               1) Create mock form      8) Show me the lists ;) ")
	print	("               2) Create Local Object   9) Exit")
	print ("               3) Mock user (requests)")
	print ("               4) Mock user (selenium)")
	print ""

def printCreateMockFormMenu():
	print ""
	print	"--------------------"
	print "| CREATE MOCK FORM |"
	print	"--------------------"
	print ""

def printBaseConfStepsMenu():
	print ""
	print	"-----------------------"
	print "| CREATE LOCAL OBJECT |"
	print	"-----------------------"
	print ""

def printDataRecordedMenu():
	print ""
	print	"-----------------"
	print "| DATA RECORDED |"
	print	"-----------------"
	print ""

def printConfirmation(confirmation):
	print "\n", confirmation, "\n ▂ ▂ ▃ ▄ ▄ ▃ ▂ ▂ \n"


def printINFOMessageNo1():
	print " info:"
	print " ----"
	print " Do not forget to check trailing comma ',' at the end "
	print " of mockedForms array (feedback.conf.js),"
	print ""

def printListFormsOrStepsAux(lenX, type, list):
	print "There are ", lenX, type," recorded:"
	for element in list:
		print (list.index(element) + 1), element

def printPrettyData():
	formsLoaded = readWriteJSON("","r","forms.json")
	print json.dumps(formsLoaded, sort_keys=True, indent=2, separators=(',', ': '))

def printListFormsOrSteps(type):

	lenForm = len(formList)
	lenStep = len(stepList)

	# First condition if eval is true
	(
	printListFormsOrStepsAux(lenForm, type, formList)
	if type == 'forms'
	else printListFormsOrStepsAux(lenStep, type, stepList)
	)

	str(raw_input("\nPress any key to continue"))


#### CREATING BIG OBJECTS #####

def createLinksObjAux(idTypeForm, idForm):

	linksArrayObj = (
		  "     {\n"
		+ "	     		'type': {" + "\n"
    + "             'id': '" + idTypeForm + "'\n"
    + "            }," + "\n"
    + "           'link': {" + "\n"
    + "             'href': '//www.opinator.com/opi/" + idForm +"?carry_formulario=" + idForm +"&id=41719461C32226318F2015245&carry_lang=en&lang=en'" + "\n"
    + "            }" + "\n"
    + "        }")
	return linksArrayObj

def createLinksObj(type, idForm):

	if type == "push":
		linksArrayObj = createLinksObjAux(type, idForm)

	elif type == "widget": # widget
		linksArrayObj = createLinksObjAux(type, idForm)

	elif type == "pull":	# pull_push
		linksArrayObj = (
			createLinksObjAux('push', idForm)
			+ ","
			+ createLinksObjAux('pull', idForm)
			)

	return linksArrayObj

def createMockForm():
	formsLoaded = readWriteJSON("","r","forms.json")
	mockForms = "mockedForms: [\n"
	for item in formsLoaded:

		while len(item['steps']) > 0:
			# sorted(item)
			# len(item['steps'])
			idStep = item['steps'].pop()
			idForm = item['form']
			type = item['type']
			mockForm = (
			"	     {\n"
			+ "        'id': '" + idStep + "'," + "\n"
			+ "        'businessCode': '" + idStep + "'," + "\n"
			+ "        'forms': [{" + "\n"
			+ "          'id': '" + idForm + "'," + "\n"
			+ "          'usePushMode': true," + "\n"
			+ "          'links': [" + "\n"
			+ "     	     " + createLinksObj(type, idForm) + "\n"
			+ "          ]" + "\n"
			+ "        }]" + "\n"
			+ "      },")

			mockForms += mockForm
	return mockForms

####  CREATING SMALL OBJECTS ####

def createBaseConfSteps():
	formsLoaded = readWriteJSON("", "r", 'forms.json')
	baseConfSteps = "VSIDS: {\n"

	for item in formsLoaded:
		for step in item['steps']:

			baseConfSteps += (
				"      '"
				+ step
				+ "': [detallesOperativa."
				+  item['nameOp'] + "],\n"
				)

	return baseConfSteps


def createBaseConfStepsDetail():
	formsLoaded = readWriteJSON("","r","forms.json")
	baseConfStepsDetail = ""

	for item in formsLoaded:
		urls = ""
		for url in item['urlLocation']:
			urls += url
			if item['urlLocation'].index(url) < len(item['urlLocation']) - 1:
				urls += "', '"

		if item['type'] == 'push':
			baseConfStepsDetail += (
				"\n  detallesOperativa." + item['nameOp'] + " = {\n"
				+ "    'urlLocation': ['" + urls + "'],\n"
				+ "    'id': '" + item['form'] + "'\n"
				+ "    };\n"
				)
		elif item['type'] == 'pull':
			baseConfStepsDetail += (
				"\n  detallesOperativa." + item['nameOp'] + " = {\n"
				+ "    'urlLocation': ['" + urls + "'],\n"
				+ "    'id': '" + item['form'] + "'\n"
				+ "    'additionalButtonClasses': 'fb_floatRight',\n"
		    + "    'botonType': 'boton_feedback_fondo_azul_redondeado',\n"
		    + "    'additional_carry': ''\n"
				+ "    };\n"
				)
		elif item['type'] == 'widget':
			baseConfStepsDetail += (
				"\n  detallesOperativa." + item['nameOp'] + " = {\n"
				+ "    'urlLocation': ['" + urls + "'],\n"
				+ "    'id': '" + item['form'] + "'\n"
				+ "    'noModelButton': true,\n"
    		+	"    'botonType': 'boton_estrellas',\n"
    		+	"    'answersId': []\n"
				+ "    };\n"
				)

	return baseConfStepsDetail + u"\nreturn {"

def createMockUser(user, cclien, ticket, opType, dif):
	if dif == 'mockusers':
		mockUserObject = (
			"//" + opType + "\n"
			+ '{'
			+'"cclient": "{cclien}", "ivUser": "{user}", "ivTicket": "{ticket}"'.format(cclien=cclien[0], user=user, ticket=ticket[0])
			+'}' + ',\n//OC ANTICIPO NOMINA'
			)
	elif dif == 'usertypes':
		mockUserObject = (
		'\n  "' + opType + '": {\n'
		+ '    "sandbox": "",\n'
    + '    "ei": "' + user + '",\n'
    + '    "pr": ""\n'
    + '  },\n  "GestorNoRemoto": {'
  )
	return mockUserObject

####  CHECKERS ####
def checkProxy(PROXY_HOST, PROXY_PORT):
	if PROXY_HOST and PROXY_PORT:
		pass
	else:
		PROXY_HOST = str(raw_input("Enter Proxy address\nExample_<http://User:Password@CACHETABII.igrupobbva>_: "))
		PROXY_PORT = str(raw_input("Port: "))
		# NOTA CREAR UN CHECKER PARA AVISAR QUE HAY QUE CAMBIAR LA password
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

def checkLooping(mk):
	return (mk == "y") or (mk == "Y") or (mk == "")

def checkUseLastForm():

	lenForm = len(formList)

	if (lenForm > 0):
		useLastForm = (
			str(raw_input("Shall I use the last Form ID "
			+ formList[lenForm-1]
			+ "? "))
			)
		if useLastForm == "y" or useLastForm == "":
			idForm = formList[lenForm - 1]
		else:
			idForm = str(raw_input("Form ID or <INTRO> for default: "))

	else:
		idForm = str(raw_input("Form ID or <INTRO> for default: "))
	# Set Options for Default Form
	if idForm == "":
		idForm = "oc_financiacion_adeudo_abandono_web"
		type = 1

	return idForm

#####MOCK INFO #####
def getMockInfo(mysession, user):
	#Form data de inicio de sesion
	eai_user='0019-'+user.zfill(10)
	payload={'eai_user':eai_user,'eai_password':'123456', 'origen':'bbvanet2', 'eai_URLDestino':'/BBVANet/','idioma':'CAS','eai_url_params':''}
	#Hacemos login
	response = mysession.post("https://ei-bbvaglobal.igrupobbva/DFAUTH/slod/DFServlet", data=payload, verify=False)
	print 'Login KQOF Main Page ======> ' + str(response.status_code) + ' ' + response.reason

	if response.status_code == requests.codes.ok:
		#Abrimos puerta trasera
		response = mysession.get("https://ei-bbvaglobal.igrupobbva/BBVANet/info", verify=False)
		print 'Go to KQOF Info ======> ' + str(response.status_code) + ' ' + response.reason

		if response.status_code == requests.codes.ok:
			payload={'techUser':'kqof','techPasswd':'ci4bbva'}
			response = mysession.post("https://ei-bbvaglobal.igrupobbva/BBVANet/info", data=payload, verify=False)
			print 'Login KQOF Info ======> ' + str(response.status_code) + ' ' + response.reason

			if response.status_code == requests.codes.ok:
				tree = html.fromstring(response.text)
				iv_cclien = tree.xpath('.//td[contains(text(), "iv-cclien")]/following-sibling::td/text()')
				iv_ticket = tree.xpath('.//td[contains(text(), "iv-ticket")]/following-sibling::td/text()')
				return {'iv_cclien':iv_cclien, 'iv_ticket':iv_ticket}
			else:
				print 'Can not get iv_cclien and iv_ticket from user: ' + user
				return {}
		else:
			print 'Can not login KQOF Info with user ' + user
			return {}
	else:
		print 'Can not login KQOF Main Page with user: ' + user
		return {}



#### misc ####
def deletePrevData():
	os.remove('forms.json')


def appendFormToTheList(idForm):
	if (len(formList) == 0):
		formList.append(idForm)
	elif (idForm != formList[len(formList) - 1]):
		formList.append(idForm)
	else:
		return

def askForSteps(stepList):
	if len(stepList) > 0:
		print "Last Step: " + str(stepList[len(stepList) - 1])
	idStep = str(raw_input("New Step ID: "))
	stepList.append(idStep)
	return stepList

def askForAList(question):
	u = raw_input(question)
	return map(str, u.split())

def clearTerminal():
	if os.name == 'nt':
		os.system('cls') #for window
	else:
		os.system('clear') #for Linux

def mapToJSONFromInput(file):
	if os.path.isfile('forms.json'):
		return
	else:
		print "Follow the pattern:"
		print ""
		print "<pattern>"
		print "          NomOperativa | form1 push url1_url2 step1 step2 | form2 pull url step3"
		print "<pattern>"
		print "												press (q) to go back"

		### Formatting the input to a JSON ###
		input1 = raw_input(prompt)
		if input1 == 'q':
			return
		input1 = map(str, input1.split(" | "))
		data = []
		nameOp = input1.pop(0)
		for i in input1:

			data.append(map(str,i.split()))

		dataOut = []

		### String methods all the time... iterating through arrays ###
		for element in data:
			f = element.pop(0)
			t = element.pop(0)
			u = element.pop(0).split('_')
			nameOpOut = nameOp

			if t == 'pull':
				nameOpOut += 'Exito'
			else:
				nameOpOut += 'Abandono'

			d = {
				'nameOp': nameOpOut,
				'form': f,
				'type': t,
				'steps': element,
				'urlLocation': u
			}

			dataOut.append(d)

		readWriteJSON(dataOut, 'w', file)

def loadingApp():
	clearTerminal()
	x = "				"
	print "\n\n\n"
	print "				LOADING FEEDBACK TOOLS:\n"
	for i in range(8):
		u = i + 1
		sleep(0.2 / u )
		sys.stdout.write("\r" + x)
		sys.stdout.flush()
		x += "▄  " * u

def readWriteJSON(data, rw, file):

	if rw == "w":
		with open(file, 'w') as f:
			json.dump(data, f)
	elif rw == "r":
		with open(file, 'r') as f:
			return json.load(f)

#
# 
# 9 sep, 2015
# Implementacion feedback
#
## -*- coding: UTF-8 -*-
develop = False
###########################
######### IMPORTS #########
###########################

import re
import sys
import codecs # for unicode format
import os # 
from time import sleep
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

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

###########################
### INITIALIZE VARIABLES ##
###########################
# Config vars
osname = os.name
indDic = configDictionary['os'][osname]
mockusersjsFP = configDictionary['mockusers'][indDic]
usertypesjsFP = configDictionary['usertypesjs'][indDic]
confjsFP = configDictionary['confjs'][indDic]

# Paths for developing
if develop:
	mockusersjsFP = 'mockUsers.json'
	confjsFP = 'feedback.conf.js'
	usertypesjsFP = 'userTypes.json'

# Initialize variables
loop = 1
stepList = []
formList = []
operativas = []

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
	print	("               2) BaseConf Steps        9) Exit")
	print ("               3) Mock user (selenium)")
	print ""

def printCreateMockFormMenu():
	print ""
	print	"--------------------"
	print "| CREATE MOCK FORM |"
	print	"--------------------"

def printTypeOfForm():
	print "What type of form?"
	print "  1) push\n  2) widget\n  3) push_pull\n"
	return int(raw_input("Opt: "))

def printListFormsOrStepsAux(lenX, type, list):
	print "There are ", lenX, type," recorded:"
	for element in list:
		print (list.index(element) + 1), element

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
	
	if type == 1: # push
		linksArrayObj = createLinksObjAux('push', idForm)
	
	elif type == 2: # widget
		linksArrayObj = createLinksObjAux('widget', idForm)
		
	elif type == 3:	# pull_push
		linksArrayObj = (
			createLinksObjAux('push', idForm)
			+ ","
			+ createLinksObjAux('pull', idForm)
			)		

	return linksArrayObj

def createMockForm(idStep, idForm, type):

	mockForm = (
	"//FeedMockForm\n"
	+	"	     {\n"
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

	return mockForm

####  CREATING SMALL OBJECTS ####

def concatenateSteps(detalleOperativa, successStep):
	
	successExitoNombre = str(stepList.pop(successStep - 1))
	baseConfSteps = "this.baseConfLocal = {\n"
	
	for step in stepList:
		baseConfSteps += (
			"      '" 
			+ step 
			+ "': [detallesOperativa." 
			+  detalleOperativa + "Abandono" + "],\n"
			)
	
	baseConfSteps += (
		"      '" 
		+ successExitoNombre 
		+ "': [detallesOperativa." +  detalleOperativa + "Exito" + "],\n"
		)

	return baseConfSteps

def createBaseConfSteps(hasSteps, successStep):

	detalleOperativa = str(raw_input("Nombre detalle operativa: "))

	if (hasSteps) and not(successStep == 0):
		baseConfSteps = concatenateSteps(detalleOperativa, successStep)
		
	else:
		mk = "y"
		while checkLooping(mk):
			askForSteps()
			mk = str(raw_input('Do you want to create another Step? '))

		printListFormsOrSteps("steps")
		successStep = int(raw_input("Cual es el paso del Exito en la operativa? "))
		baseConfSteps = concatenateSteps(detalleOperativa, successStep)

	return baseConfSteps

def createMockUser(user, cclien, ticket, opType):
	mockUserObject = (
		opType + "\n"
		+ '{"cclient": "' 
		+ cclien 
		+ '", "ivUser": "' 
		+ user 
		+ '", "ivTicket": "' 
		+ ticket 
		+ '"},\n//OC ANTICIPO NOMINA'
		)
	return mockUserObject

####  CHECKERS ####

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

#### misc ####
def appendFormToTheList(idForm):
	if (len(formList) == 0):
		formList.append(idForm)
	elif (idForm != formList[len(formList) - 1]):
		formList.append(idForm)
	else:
		return

def askForSteps():
	if len(stepList) > 0:
		print "Last Step: " + str(stepList[len(stepList) - 1])
	idStep = str(raw_input("New Step ID: "))
	stepList.append(idStep)

def clearTerminal():
	if os.name == 'nt':
		os.system('cls') #for window
	else:
		os.system('clear') #for Linux

###########################
######## Classes ##########
###########################

class MyUser():
	def __init__(self, user, cclien, ticket):
		self.u = user
		self.c = cclien
		self.t = ticket

class Configure():
	def __init__(self, filePath, regExp):
		self.f = filePath
		self.r = regExp

###########################
###### MENU CHOICES #######
###########################

while loop == 1:

	clearTerminal()
	printBBVALogo()
	printMenu()

  # User selects an option from the menu
	choice = int(raw_input("               Opt: "))

######################################################
# Create Mock form #
####################
	if choice == 1:

		mk = "y"
		while checkLooping(mk):	
			
			clearTerminal()
			printCreateMockFormMenu()
			askForSteps()
			idForm = checkUseLastForm()
			appendFormToTheList(idForm)
			type = printTypeOfForm()

			# Compile a RegExp and write the subsitute to the JSFile
			with open(confjsFP) as f:
				contents = f.read()
			r = re.compile(r'//FeedMockForm')
			contents = r.sub(createMockForm(stepList[len(stepList) - 1], idForm, type), contents)
			with open(confjsFP,'w') as f:
				f.write(contents)

			print ""
			print u'\u2514' + " Object created!"
			print "  ---------------"
			mk = str(raw_input("Do you want to create another? "))

######################################################
# Add BaseConf steps #
######################

	elif choice == 2:

		clearTerminal()
		
		print ""
		print	"-------------------"
		print "| BASE CONF STEPS |"
		print	"-------------------"
		hasSteps = 'false'
		successStep = 0

		if len(stepList) > 0:
			print "<info> I will use the", len(stepList) ,"steps you already recorded <info>"
			printListFormsOrSteps('steps')
			hasSteps = 'true'

			successStep = int(raw_input("Cual es el paso del Exito en la operativa? "))
		# print "<info> Remember to edit manually the success step if that is your case<info>"
			print ""

		
		with open(confjsFP) as f:
			contents = f.read()
		r = re.compile(r'this.baseConfLocal = {')
		contents = r.sub(createBaseConfSteps(hasSteps, successStep), contents)
		
		with open(confjsFP,'w') as f:
			f.write(contents)
		print ""
		print u'\u2514' + " Properties created!"
		print "  ---------------"
		raw_input('Press a key to continue...')
		
######################################################
# Mock user (selenium) #
########################

	elif choice == 3:

		

		u = raw_input('Enter the users to mock separated by spaces: ')
		userList = map(str, u.split())
		opType = "//" + str(raw_input("Nombre operativa: "))

		for user in userList:
			fp = webdriver.FirefoxProfile()
			# Direct = 0, Manual = 1, PAC = 2, AUTODETECT = 4, SYSTEM = 5
			fp.set_preference("network.proxy.type", 1)
			PROXY_HOST = "http://xe49706:bbva0006@CACHETABII.igrupobbva"
			PROXY_PORT = "8080"
			fp.set_preference("network.proxy.http", PROXY_HOST)
			fp.set_preference("network.proxy.http_port", PROXY_PORT)
			browser = webdriver.Firefox(firefox_profile=fp)
			browser.get('https://ei-bbvaglobal.igrupobbva/particulares/index.jsp')
			assert 'BBVA.es' in browser.title

			btnAccesoClientes = browser.find_element(By.XPATH, '//*[contains(text(), "Acceso Clientes")]')
			inputEnterUser = browser.find_element(By.XPATH, './/*[@id="eai_user"]')
			inputEnterPass = browser.find_element(By.XPATH, './/*[@id="eai_password"]')
			btnEntrar = browser.find_element(By.XPATH, './/*[@id="acceder"]')
			
			btnAccesoClientes.click()
			inputEnterUser.send_keys(user + Keys.TAB)
			inputEnterPass.send_keys('123456')
			btnEntrar.click()

			# Check requests response??
			sleep(8)

			assert 'BBVA' in browser.title
			
			browser.get('https://ei-bbvaglobal.igrupobbva/BBVANet/info')
			
			sleep(1)

			inputEnterUser2 = browser.find_element(By.XPATH, './html/body/form/input[1]')
			inputEnterPass2 = browser.find_element(By.XPATH, './html/body/form/input[2]')
			btnLogin = browser.find_element(By.XPATH, './html/body/form/input[3]')

			inputEnterUser2.send_keys('kqof')
			inputEnterPass2.send_keys('ci4bbva')
			btnLogin.click()
			sleep(3)

			assert 'Echo' in browser.title

			iv_cclien = browser.find_element(By.XPATH, './/td[contains(text(), "iv-cclien")]/following-sibling::td').text
			iv_ticket = browser.find_element(By.XPATH, './/td[contains(text(), "iv-ticket")]/following-sibling::td').text
			print "iv-cclien", iv_cclien
			print "iv-ticket", iv_ticket

			userData = MyUser(user, iv_cclien, iv_ticket)

			browser.quit()

			# Write to mockusers.js
			with open(mockusersjsFP) as f:
				contents = f.read()
			r = re.compile(r'//OC ANTICIPO NOMINA')
			contents = r.sub(createMockUser(user, iv_cclien, iv_ticket, opType), contents)
			with open(mockusersjsFP,'w') as f:
				f.write(contents)
			# Write to usertypes.json
			with open(usertypesjsFP) as f:
				contents = f.read()
			r = re.compile(r'"GestorNoRemoto": {')
			contents = r.sub(createMockUser(user, iv_cclien, iv_ticket, opType), contents)
			with open(usertypesjsFP,'w') as f:
				f.write(contents)

		
		print "Exito!"
		raw_input('Pulsa <INTRO> para continuar')
		# falta configurar usertypes y crear el fichero en ei nombrandolo con el nif usuario.


######################################################
# Show me the lists #
#####################

	elif choice == 8:
		clearTerminal()
		print ""
		print	"-----------------"
		print "| DATA RECORDED |"
		print	"-----------------"
		if (len(stepList) > 0) and (len(formList) > 0):
			printListFormsOrSteps('steps')
			printListFormsOrSteps('forms')
		elif (len(stepList) > 0):
			printListFormsOrSteps('steps')
		elif (len(formList) > 0):
			printListFormsOrSteps('forms')
		else:
			str(raw_input("There are no steps or forms recorded :("))

######################################################
# Exit #
########

	elif choice == 9:
		loop = 0
		clearTerminal()
	else: 
		print("I need a numeric input!!")

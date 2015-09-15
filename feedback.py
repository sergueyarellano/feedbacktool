#
# xe49706
# 9 sep, 2015
# Implementacion feedback
#
## -*- coding: UTF-8 -*-

###########################
######### IMPORTS #########
###########################

import re
import sys
import codecs
import os

###########################
######## FUNCTIONS ########
###########################

def linksArray(type, idForm):
	linksArrayObj = ""
	if type == 1: # push
		linksArrayObj = (
		  "     {\n"	
		+ "	     		'type': {" + "\n"
    + "             'id': 'push'" + "\n"
    + "            }," + "\n"
    + "           'link': {" + "\n"
    + "             'href': '//www.opinator.com/opi/" + idForm +"?carry_formulario=" + idForm +"&id=41719461C32226318F2015245&carry_lang=en&lang=en'" + "\n"
    + "            }" + "\n"
    + "        }")

	elif type == 2: # pull_push
		linksArrayObj = (
			"     {\n"
		+ "	     		'type': {" + "\n"
    + "             'id': 'push'" + "\n"
    + "            }," + "\n"
    + "           'link': {" + "\n"
    + "             'href': '//www.opinator.com/opi/" + idForm +"?carry_formulario=" + idForm +"&id=41719461C32226318F2015245&carry_lang=en&lang=en'" + "\n"
    + "            }" + "\n"
    + "          }, {"  + "\n"
    + "           'type': {" + "\n"
    + "             'id': 'pull'" + "\n"
    + "            }," + "\n"
    + "           'link': {" + "\n"
    + "             'href': '//www.opinator.com/opi/" + idForm +"?carry_formulario=" + idForm +"&id=41719461C32226318F2015245&carry_lang=en&lang=en'" + "\n"
    + "            }" + "\n"
    + "          }")

	elif type == 3: # widget
		linksArrayObj = (
		"     {\n" 	
		+ "	     		'type': {" + "\n"
    + "             'id': 'widget'" + "\n"
    + "            }," + "\n"
    + "           'link': {" + "\n"
    + "             'href': '//www.opinator.com/opi/" + idForm +"?carry_formulario=" + idForm +"&id=41719461C32226318F2015245&carry_lang=en&lang=en'" + "\n"
    + "            }" + "\n"
    + "        }")

	else:
		print "That is not a valid type"
		linksArrayObj = "That is not a valid type"

	return linksArrayObj
			

def mockFormPush(idStep, idForm, type):

	makeObj = (
	"//FeedMockForm\n"
	+	"	     {\n"
	+ "        'id': '" + idStep + "'," + "\n"
	+ "        'businessCode': '" + idStep + "'," + "\n"
	+ "        'forms': [{" + "\n"
	+ "          'id': '" + idForm + "'," + "\n"
	+ "          'usePushMode': true," + "\n"
	+ "          'links': [" + "\n"
	+ "     	     " + linksArray(type, idForm) + "\n"
	+ "          ]" + "\n"
	+ "        }]" + "\n"
	+ "      },")

	return makeObj

def printLoop(type):
	if type == "forms":
		print "There are ", len(formList), type," recorded:"
		for element in formList:
			print (formList.index(element) + 1), element
		print ""
	else:
		print "There are ", len(stepList), type," recorded:"
		for element in stepList:
			print (stepList.index(element) + 1), element
		print ""
	str(raw_input("Press any key to continue"))	
	print ""

def askForSteps():
	if len(stepList) > 0:
		print "Last Step: " + str(stepList[len(stepList) - 1])
	idStep = str(raw_input("New Step ID: "))
	stepList.append(idStep)

def createBaseConfSteps(hasSteps, successStep):

	
	baseConfSteps = "//FeedStepConf\n"
	detalleOperativa = str(raw_input("Nombre detalle operativa: "))
	if (hasSteps) and not(successStep == 0):
		successExitoNombre = str(stepList.pop(successStep - 1))
		for step in stepList:
			baseConfSteps += "      '" + step + "': [detallesOperativa." +  detalleOperativa + "Abandono" + "],\n"
		baseConfSteps += "      '" + successExitoNombre + "': [detallesOperativa." +  detalleOperativa + "Exito" + "],\n"
		
	else:
		mk2 = "y"
		while (mk2 == "y") or (mk2 == "Y") or (mk2 == ""):
			askForSteps()
			mk2 = str(raw_input('Do you want to create another Step? '))
			if (mk2 != "y") and (mk2 != "Y") and (mk2 != ""):
				printLoop("steps")
				successStep = int(raw_input("Cual es el paso del Exito en la operativa? "))
				successExitoNombre = str(stepList.pop(successStep - 1))
				for step in stepList:
					baseConfSteps += "      '" + step + "': [detallesOperativa." +  detalleOperativa + "Abandono" + "],\n"
				baseConfSteps += "      '" + successExitoNombre + "': [detallesOperativa." +  detalleOperativa + "Exito" + "],\n"

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
				
###########################
######## Classes ##########
###########################

class myUser():
	def __init__(self, user, cclien, ticket):
		self.u = user
		self.c = cclien
		self.t = ticket


###########################
### INITIALIZE VARIABLES ##
###########################

loop = 1
stepList = []
formList = []
operativas = []
idStep = ""


###########################
###### MENU CHOICES #######
###########################

while loop == 1:
	os.system('cls') #for window
	os.system('clear') #for Linux
	
     
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
	print	("               Linea de Feedback script 1.0.0")
	print	("               ------------------------------")
	print ("               1) Create mock form      8) Show me the lists ;) ")
	print	("               2) BaseConf Steps        9) Exit")
	print ("               3) Mock user (selenium)")
	print ""
	choice = raw_input("               Opt: ")
	choice = int(choice)

#############################################################

	if choice == 1:

		mk1 = "y"
		while (mk1 == "y") or (mk1 == "Y") or (mk1 == ""):	
			
			os.system('cls') #for window
			os.system('clear') #for Linux
			print ""
			print	"--------------------"
			print "| CREATE MOCK FORM |"
			print	"--------------------"

			# Ask for StepID and append it to a list of steps
			askForSteps()

			# Ask for the FormID
			if (len(formList) > 0):
				checkForm = str(raw_input("Shall I use the last Form ID " + formList[len(formList)-1] + "?"))
				if (checkForm == "y") or (checkForm == ""):
					idForm = formList[len(formList)-1]
				else:
					idForm = str(raw_input("Form ID or <INTRO> for default: "))
			else:		
				idForm = str(raw_input("Form ID or <INTRO> for default: "))
				
				
			if idForm == "":
				# Set Options for Default Form 
				idForm = "oc_financiacion_adeudo_abandono_web"
				type = 1
			else: 
				if (len(formList) == 0):
					formList.append(idForm)
				elif (idForm != formList[len(formList) - 1]):
					formList.append(idForm)
				else:
					pass
				print "What type of form?"
				print "  1) push\n  2) push_pull\n  3) widget\n"
				type = int(raw_input("Opt: "))

			# Compile a RegExp and write the subsitute to the JSFile
			with open('feedback.conf.js') as f:
				contents = f.read()
			r = re.compile(r'//FeedMockForm')
			contents = r.sub(mockFormPush(idStep, idForm, type), contents)
			with open('feedback.conf.js','w') as f:
				f.write(contents)

			print ""
			print u'\u2514' + " Object created!"
			print "  ---------------"
			mk1 = str(raw_input("Do you want to create another? "))

#############################################################

	elif choice == 2:

		os.system('cls') #for window
		os.system('clear') #for Linux
		print ""
		print	"-------------------"
		print "| BASE CONF STEPS |"
		print	"-------------------"
		hasSteps = 'false'
		successStep = 0

		if len(stepList) > 0:
			print "<info> I will use the", len(stepList) ,"steps you already recorded <info>"
			printLoop('steps')
			hasSteps = 'true'

			successStep = int(raw_input("Cual es el paso del Exito en la operativa? "))
		# print "<info> Remember to edit manually the success step if that is your case<info>"
			print ""

		
		with open('feedback.conf.js') as f:
			contents = f.read()
		r = re.compile(r'//FeedStepConf')
		contents = r.sub(createBaseConfSteps(hasSteps, successStep), contents)
		
		with open('feedback.conf.js','w') as f:
			f.write(contents)
		print ""
		print u'\u2514' + " Properties created!"
		print "  ---------------"
		raw_input('Press a key to continue...')
		
		
		


#############################################################

	elif choice == 3:

		from time import sleep
		from selenium import webdriver
		from selenium.webdriver.common.by import By
		from selenium.webdriver.common.keys import Keys
		from selenium.webdriver.support.ui import WebDriverWait
		from selenium.webdriver.support import expected_conditions as EC

		try:
			fp = webdriver.FirefoxProfile()
			# Direct = 0, Manual = 1, PAC = 2, AUTODETECT = 4, SYSTEM = 5
			fp.set_preference("network.proxy.type", 1)
			PROXY_HOST = "http://xe49706:bbva0006@CACHETABII.igrupobbva"
			PROXY_PORT = "8080"
			fp.set_preference("network.proxy.http", PROXY_HOST)
			fp.set_preference("network.proxy.http_port", PROXY_PORT)

			user = str(raw_input('Enter the user to mock: '))
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

			userData = myUser(user, iv_cclien, iv_ticket)

			browser.quit()
			
			opType = "//" + str(raw_input("Tipo operativa: "))

			

			with open('mockUsers.json') as f:
				contents = f.read()
			r = re.compile(r'//OC ANTICIPO NOMINA')
			contents = r.sub(createMockUser(user, iv_cclien, iv_ticket, opType), contents)
			with open('mockUsers.json','w') as f:
				f.write(contents)

			
			print "Exito!"
			raw_input('Pulsa <INTRO> para continuar')
		except ValueError:
			print "Oops! Ha ocurrido un error"
			print "Prueba mas tarde!"
			raw_input('Pulsa <INTRO> para continuar')

#############################################################

	elif choice == 8:
		os.system('cls') #for window
		os.system('clear') #for Linux
		print ""
		print	"-----------------"
		print "| DATA RECORDED |"
		print	"-----------------"
		if (len(stepList) > 0) and (len(formList) > 0):
			printLoop('steps')
			printLoop('forms')
		elif (len(stepList) > 0):
			printLoop('steps')
		elif (len(formList) > 0):
			printLoop('forms')
		else:
			str(raw_input("There are no steps or forms recorded :("))

#############################################################

	elif choice == 9:
		loop = 0
		os.system('cls') #for window
		os.system('clear') #for Linux
	else: 
		print("I need a numeric input!!")

# A implementar:
#  mockear user en mockuser,
#  usertypes.json

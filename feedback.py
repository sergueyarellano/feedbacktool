# Author: SAM
# 9 sep, 2015
# Implementacion feedback
#
## -*- coding: UTF-8 -*-
develop = True

###########################
######### IMPORTS #########
###########################

# import re
# import sys
# import codecs # for unicode format
import os # 
import re
import codecs
import sys
import configmodule as cf
import funcmodule as _
import variables as vr
import json
import readline
from time import sleep
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys

###########################
### SET VARIABLES ##
###########################

PROXY_HOST = "http://xe49706:bbva0006@CACHETABII.igrupobbva"
PROXY_PORT = "8080"
_.checkProxy(PROXY_HOST, PROXY_PORT)
stepList = vr.stepList
formList = vr.formList
# Config vars
osname = os.name
indDic = cf.configDictionary['os'][osname]
mockusersjsFP = cf.configDictionary['mockusers'][indDic]
usertypesjsFP = cf.configDictionary['usertypesjs'][indDic]
confjsFP = cf.configDictionary['confjs'][indDic]

# Files modified by this program:
if develop:
	mockusersjsFP = 'mockUsers.json'
	confjsFP = 'feedback.conf.js'
	usertypesjsFP = 'userTypes.json'

# Initialize variables
loop = 1
operativas = []


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

	_.clearTerminal()
	_.printBBVALogo()
	_.printMenu()

  # User selects an option from the menu
	choice = int(raw_input("               Opt: "))

######################################################
# Create Mock form #
####################
	if choice == 1:	
			
			_.clearTerminal()
			_.printCreateMockFormMenu()
			_.mapToJSONFromInput()

			# Compile a RegExp and write the subsitute to the JSFile
			
			with open(confjsFP) as f:
				contents = f.read()
			r = re.compile('this.additionalOpinatorResponse = \[')
			contents = r.sub(_.createMockForm(), contents)
			with open(confjsFP,'w') as f:
				f.write(contents)

			print ""
			raw_input(u'\u2514' + " Object created!")
			print "  ---------------"
			
######################################################
# BaseConf steps #
##################

	elif choice == 2:

		_.clearTerminal()
		_.printBaseConfStepsMenu()

		hasSteps = 'false'
		successStep = 0

		if len(stepList) > 0:
			print "<info> I will use the", len(stepList) ,"steps you already recorded <info>"
			_.printListFormsOrSteps('steps')
			hasSteps = 'true'

			successStep = int(raw_input("Which is the success Step? "))
		# print "<info> Remember to edit manually the success step if that is your case<info>"
			print ""

		with open(confjsFP) as f:
			contents = f.read()
		r = re.compile(r'this.baseConfLocal = {')
		contents = r.sub(_.createBaseConfSteps(hasSteps, successStep, operativas), contents)
		with open(confjsFP,'w') as f:
			f.write(contents)
		print ""
		print u'\u2514' + " Properties created!"
		print "  ---------------"
		raw_input('Press a key to continue...')

######################################################
# BaseConfSteps (detail) #
##########################
	elif choice == 3:

		_.clearTerminal()
		_.printBaseConfStepsDetailMenu()

		hasForms = _.checkFormsAreLoaded()
		url = raw_input("Enter URL: ")

		if hasForms:
			print "<info> I will use the", len(stepList) ,"steps you already recorded <info>"
			_.printListFormsOrSteps('forms')
			successForm = int(raw_input("Which is the success Form? "))
		else:
			formList = _.askForAList("Enter forms separated by spaces: ")
			_.printListFormsOrSteps('forms')
			successForm = int(raw_input("Which is the success Form? "))
		
		with open(confjsFP) as f:
			contents = f.read()
		r = re.compile(r'//Objetos de configuracion Operativa')
		contents = r.sub(_.createBaseConfStepsDetail(hasForms, successForm, url), contents)
		
		with open(confjsFP,'w') as f:
			f.write(contents)
		print ""
		print u'\u2514' + " Properties created!"
		print "  ---------------"
		raw_input('Press a key to continue...')

				
######################################################
# Mock user (selenium) #
########################

	elif choice == 4:

		userList = _.askForAList("Enter the users to mock separated by spaces: ")
		opType = "//" + str(raw_input("Nombre operativa: "))

		for user in userList:
			fp = webdriver.FirefoxProfile()
			# Direct = 0, Manual = 1, PAC = 2, AUTODETECT = 4, SYSTEM = 5
			fp.set_preference("network.proxy.type", 1)
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
			contents = r.sub(_.createMockUser(user, iv_cclien, iv_ticket, opType), contents)
			with open(mockusersjsFP,'w') as f:
				f.write(contents)
			# Write to usertypes.json
			# with open(usertypesjsFP) as f:
			# 	contents = f.read()
			# r = re.compile(r'"GestorNoRemoto": {')
			# contents = r.sub(_.createMockUser(user, iv_cclien, iv_ticket, opType), contents)
			# with open(usertypesjsFP,'w') as f:
			# 	f.write(contents)

		
		print "Exito!"
		raw_input('Pulsa <INTRO> para continuar')
		# falta configurar usertypes y crear el fichero en ei nombrandolo con el nif usuario.


######################################################
# Show me the lists #
#####################

	elif choice == 8:
		_.clearTerminal()
		_.printDataRecordedMenu()

		if (len(stepList) > 0) and (len(formList) > 0):
			_.printListFormsOrSteps('steps')
			_.printListFormsOrSteps('forms')
		elif (len(stepList) > 0):
			_.printListFormsOrSteps('steps')
		elif (len(formList) > 0):
			_.printListFormsOrSteps('forms')
		else:
			str(raw_input("There are no steps or forms recorded :("))

######################################################
# Exit #
########

	elif choice == 9:
		loop = 0
		_.clearTerminal()
	else: 
		print("I need a numeric input!!")

# Author: SAM
# 9 sep, 2015
# Implementacion feedback
#
# -*- coding: UTF-8 -*-
develop = True

# IDEAS
#	Crear un checker para saber si opinator nos esta mandando bien los objetos, y si en realidad aparecera feedback

###########################
######### IMPORTS #########
###########################

import os # 
import re
import codecs
import configmodule as cf
import funcmodule as _

import json
if os.name == 'posix':
	import readline
from time import sleep

from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys

import requests

###########################
### SET VARIABLES ##
###########################

PROXY_HOST = "http://xe49706:bbva0007@CACHETABII.igrupobbva"
PROXY_PORT = "8080"
_.checkProxy(PROXY_HOST, PROXY_PORT)

# Config vars
osname = os.name
indDic = cf.configDictionary['os'][osname]

MOCKUSERSJS_FILEPATH = cf.configDictionary['mockusers'][indDic]
USERTYPESJS_FILEPATH = cf.configDictionary['usertypesjs'][indDic]
CONFJS_FILEPATH = cf.configDictionary['confjs'][indDic]

# Files modified by this program:
if develop:
	MOCKUSERSJS_FILEPATH = 'mockUsers.json'
	CONFJS_FILEPATH = 'feedback.conf.js'
	USERTYPESJS_FILEPATH = 'userTypes.json'

# Initialize variables
loop = 1

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
if os.path.isfile('forms.json'):
	_.deletePrevData()

_.loadingApp()

while loop == 1:
	
	_.clearTerminal()
	_.printBBVALogo()
	_.printMenu()

	choice = raw_input("               Opt: ")

######################################################
# Create Mock form #
####################
	if choice == "1":	
			
		_.clearTerminal()
		_.printCreateMockFormMenu()
		_.mapToJSONFromInput('forms.json')

		if os.path.isfile('forms.json'):
			# Compile a RegExp and write the subsitute to the JSFile
			with open(CONFJS_FILEPATH) as f:
				contents = f.read()
			r = re.compile('this.additionalOpinatorResponse = \[')
			contents = r.sub(_.createMockForm(), contents)

			with open(CONFJS_FILEPATH,'w') as f:
				f.write(contents)

			_.clearTerminal()
			_.printConfirmation(" Object created! ")
			_.printINFOMessageNo1()
			raw_input(' Press key to continue...')
		else:
			pass

			
######################################################
# Create Local Object #
#######################

	elif choice == "2":

		_.clearTerminal()
		_.printBaseConfStepsMenu()
		_.mapToJSONFromInput("forms.json")

		if os.path.isfile('forms.json'):
			# Compile a RegExp and write the subsitute to the JSFile
			with open(CONFJS_FILEPATH) as f:
				contents = f.read()
			r = re.compile(r'this.baseConfLocal = {')
			contents = r.sub(_.createBaseConfSteps(), contents)

			with open(CONFJS_FILEPATH,'w') as f:
				f.write(contents)

			with open(CONFJS_FILEPATH) as f:
				contents = f.read()
			r = re.compile(r'var FeedbackConf = function \(\) {')
			contents = r.sub(_.createBaseConfStepsDetail(), contents)

			with open(CONFJS_FILEPATH,'w') as f:
				f.write(contents)

			_.clearTerminal()
			_.printConfirmation(" Properties created!")
			raw_input(' Press key to continue...')
		else:
			pass

######################################################
# Mock user (requests) #
########################
	# A implementar, parte de Ivan
	elif choice == 3:
	
		userList = _.askForAList("Enter the users to mock separated by spaces: ")
		opType = str(raw_input("Nombre operativa: "))

		for user in userList:
		
			print 'Try to create user: ' + user
			#Creamos una sesion en KQOF
			requests.packages.urllib3.disable_warnings()
			s = requests.Session()
			#Borramos las cookies
			s.cookies.clear()
			
			#Numero de reintentos para entrar en el entorno
			MAX_RETRY=3
		
			cnt=0
			while cnt < MAX_RETRY:
				try:
					response = s.get('https://ei-bbvaglobal.igrupobbva/particulares/index.jsp', verify=False)
					print 'Go to KQOF Main Page ======> ' + str(response.status_code) + ' ' + response.reason
					if response.status_code == requests.codes.ok:
						_.getMockInfo(s,user)
						break
					else:
						cnt += 1
						print 'Retry connection after {0} seconds'.format(cnt*3)
						sleep(cnt*3)
				except requests.exceptions.RequestException as e:
					cnt += 1
					print 'Retry connection after {0} seconds'.format(cnt*3)
					sleep(cnt*3)
					if cnt == MAX_RETRY:
						print e

			s.close()		
			
		raw_input('Pulsa <INTRO> para continuar')
		# falta configurar usertypes y crear el fichero en ei nombrandolo con el nif usuario.

######################################################
# Mock user (selenium) #
########################

	elif choice == "4":

		userList = _.askForAList("Enter the users to mock separated by spaces: ")
		opType = str(raw_input("Nombre operativa: "))

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
			with open(MOCKUSERSJS_FILEPATH) as f:
				contents = f.read()
			r = re.compile(r'//OC ANTICIPO NOMINA')
			contents = r.sub(_.createMockUser(user, iv_cclien, iv_ticket, opType, 'mockusers'), contents)
			with open(MOCKUSERSJS_FILEPATH,'w') as f:
				f.write(contents)

			# Write to usertypes.json

			with open(USERTYPESJS_FILEPATH) as f:
				contents = f.read()
			r = re.compile(r'"GestorNoRemoto": {')
			contents = r.sub(_.createMockUser(user, iv_cclien, iv_ticket, opType, 'usertypes'), contents)
			with open(USERTYPESJS_FILEPATH,'w') as f:
				f.write(contents)

		print "Exito!"
		raw_input('Pulsa <INTRO> para continuar')
		# falta configurar usertypes y crear el fichero en ei nombrandolo con el nif usuario.


######################################################
# Show me the lists #
#####################

	elif choice == "8":
		if os.path.isfile('forms.json'):
			_.clearTerminal()
			_.printConfirmation('/forms.json')
			_.printPrettyData()
			raw_input(' Press key to continue...')
		else:

			print "\n               There is nothing to show!!"
			sleep(1)
######################################################
# Exit #
########

	elif choice == "9":
		loop = 0
		_.clearTerminal()
	else: 
		print("I need a numeric input!!")

import os
import json
import variables as vr
import readline
import codecs
import sys
stepList = vr.stepList
formList = vr.formList
osname = os.name
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
	print	("               2) BaseConfSteps         9) Exit")
	print ("               3) BaseConfSteps (detail)")
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
	print	"-------------------"
	print "| BASE CONF STEPS |"
	print	"-------------------"	
	print ""

def printDataRecordedMenu():
	print ""
	print	"-----------------"
	print "| DATA RECORDED |"
	print	"-----------------"
	print ""

def printBaseConfStepsDetailMenu():
	print ""
	print	"----------------------------"
	print "| BASE CONF STEPS (DETAIL) |"
	print	"----------------------------"
	print ""		

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
	formsLoaded = readWriteJSON("","r")
	print formsLoaded
	mockForms = "this.additionalOpinatorResponse = [\n"
	for item in formsLoaded:
		print item
		while len(item['steps']) > 0:
			# sorted(item)
			# len(item['steps'])
			idStep = item['steps'].pop()
			idForm = item['form']
			type = item['type']
			print idStep
			print idForm
			print type
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

def concatenateForms(successForm, url):
	successExitoNombre = str(formList.pop(successForm - 1))
	baseConfStepsDetail = "//Objetos de configuracion Operativa\n"
	detalleOperativa = str(raw_input("Nombre detalle operativa: "))

	for form in formList:
		baseConfStepsDetail += (
			"  detallesOperativa." + detalleOperativa + "Abandono = {\n"
			+ "    'urlLocation': ['" + str(url) + "],\n"
			+ "    'id': '" + form + "'\n"
			+ "  };\n" 
			)
	baseConfStepsDetail += (
		"  detallesOperativa." + detalleOperativa + "Exito = {\n"
		+ "    'urlLocation': ['" + str(url) + "],\n"
		+ "    'id': '" + str(successForm) + "',\n"
		+ "    'additionalButtonClasses': 'fb_floatRight',\n"
    + "    'botonType': 'boton_feedback_fondo_azul_cuadrado'\n"
		+ "  };" 
		)

def createBaseConfStepsDetail(hasForms, successForm, url):	
	baseConfStepsDetail = concatenateForms(successForm, url)
	return baseConfStepsDetail

def createMockUser(user, cclien, ticket, opType, dif):
	if dif == 'mockusers':
		mockUserObject = (
			"//" + opType + "\n"
			+ '{"cclient": "' 
			+ cclien 
			+ '", "ivUser": "' 
			+ user 
			+ '", "ivTicket": "' 
			+ ticket 
			+ '"},\n//OC ANTICIPO NOMINA'
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

def checkFormsAreLoaded():
	u = False
	if len(formList) > 1:
		u = True
	else:
		u = False
	return u

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

def checkProxy(PROXY_HOST, PROXY_PORT):
	if PROXY_HOST and PROXY_PORT:
		pass
	else:
		PROXY_HOST = str(raw_input("Enter Proxy address\nExample_<http://User:Password@CACHETABII.igrupobbva>_: "))
		PROXY_PORT = str(raw_input("Proxy: "))
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

def mapToJSONFromInput():

	print "Enter forms, their type (push, pull, widget) and associated steps"
	print ""
	print "<pattern> form1 push step1 step2 | form2 pull step3 <pattern>"
	print ""

	### Formatting the input to a JSON ###
	input1 = raw_input(vr.prompt)
	input1 = map(str, input1.split(" | "))
	data = []
	for i in input1:

		data.append(map(str,i.split()))

	dataOut = []

	for element in data:
		f = element.pop(0)
		t = element.pop(0)
		d = {
			'form': f, 
			'type': t,
			'steps': element 
		}

		dataOut.append(d)

	readWriteJSON(dataOut, 'w')

def readWriteJSON(data, rw):
	if rw == "w":
		with open('forms.json', 'w') as f:
			json.dump(data, f)
	elif rw == "r":
		with open('forms.json', 'r') as f:
			return json.load(f)
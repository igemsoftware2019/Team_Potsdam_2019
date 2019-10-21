from getpass import getpass
from pathlib import Path
from webbot import Browser 
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.common.keys import Keys
import git

repo = git.Repo('../../')
commits = list(repo.iter_commits('HEAD'))
count = len(commits)
contents = Path("./build/igemBuild.html").read_text()
import clipboard
clipboard.copy(contents)

pw = getpass()

web = Browser()

web.go_to('https://igem.org/Login2')
web.type("jonaskopka", css_selector="#name_and_pass > input[type=text]:nth-child(2)")
web.type(pw, css_selector="#name_and_pass > input[type=password]:nth-child(4)")
web.click("login")

#update Template not working because of .type()/send keys

web.go_to('https://2019.igem.org/wiki/index.php?title=Template:Potsdam&action=edit')
web.type('', clear=True, xpath="//*[@id='wpTextbox1']", tag="textarea")
driver = web.driver
actions = ActionChains(driver)
actions.key_down(Keys.CONTROL)
actions.send_keys("v")
actions.key_up(Keys.CONTROL)
actions.perform()
web.type("v0."+str(count), css_selector="#wpSummary")
web.click("Save Page")

urls = ['Team:Potsdam','Team:Potsdam/','Team:Potsdam/Team','Team:Potsdam/Collaborations','Team:Potsdam/Description','Team:Potsdam/Design',
		'Team:Potsdam/Experiments','Team:Potsdam/Notebook','Team:Potsdam/Contribution','Team:Potsdam/Results','Team:Potsdam/Demonstrate',
		'Team:Potsdam/Improve','Team:Potsdam/Attributions','Team:Potsdam/Safety','Team:Potsdam/Human_Practices','Team:Potsdam/Model','Team:Potsdam/Sponsoring']
#Update Template for all pages
for url in urls:
	web.go_to('https://2019.igem.org/wiki/index.php?title='+url+'&action=edit') 
	web.click("Save Page")

driver.close()

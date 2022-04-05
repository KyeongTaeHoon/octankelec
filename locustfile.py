from locust import HttpUser, task, between

class QuickstartUser(HttpUser):
	wait_time = between(5, 9)

	@task(3)
	def my_task1(self):
		self.client.get("/index.html")

	@task(5)
	def my_task2(self):
		self.client.get("/OctankElectronics_files/images(6)")

	@task(2)
	def my_task3(self):
		self.client.get("/OctankElectronics_files/5e6131e4afff65c9f59d0fd9_5cdd75f59ec2a00550f8b69a_Variants.png")

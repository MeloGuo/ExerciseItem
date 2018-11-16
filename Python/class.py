class PersonClass(object):
  def __init__(self, name, phone):
    self.name = name
    self.phone = phone

  def updatePhone(self, newPhone):
    self.phone = newPhone

class ChinesePerson(PersonClass):
  def __init__(self, name, phone, id, email):
    PersonClass.__init__(self, name, phone)
    self.empid = id
    self.email = email

  def updateEmail(self, newEmail):
    self.email = newEmail

guo = ChinesePerson('GuoZiliang', 15200905159, '110222199606020838', '921877607@qq.com')
print(guo.name, guo.phone, guo.empid, guo.email)
guo.updatePhone(17600480763)
guo.updateEmail('guoziliang199606@outlook.com')
print(guo.name, guo.phone, guo.empid, guo.email)
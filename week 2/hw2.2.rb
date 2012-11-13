require 'rubygems'
require 'mongo'

connection = Mongo::Connection.new "localhost", 27017
db = connection.db "students"
coll = db.collection "grades"

hwcoll = coll.find("type" => "homework").sort("student_id" => 1).to_a

l, i = hwcoll.length - 1, 0
arr = []
while i < l do
  uid = if hwcoll[i]["score"] < hwcoll[i+1]["score"]
  	hwcoll[i]["_id"]
  else
  	hwcoll[i+1]["_id"]
  end
  coll.remove "_id" => uid
  i+=2
end
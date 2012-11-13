require 'rubygems'
require 'mongo'

connection = Mongo::Connection.new "localhost", 27017
db = connection.db "school"
coll = db.collection "students"
s_coll = coll.find().sort("_id" => 1).to_a

i, l = 0, coll.count

while i < l
  student = s_coll[i]
  #puts "#{student['_id']} : HW1 => #{student['scores'][2]} / HW2 => #{student['scores'][3]}"
  lower_hw_index = if student['scores'][2]['score'] < student['scores'][3]['score']
      2
	else
	  3
	end
  coll.update({"_id" => student['_id']}, {"$pull" => { "scores" => student["scores"][lower_hw_index]}})
  i+=1
end
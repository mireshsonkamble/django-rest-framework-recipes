import pymongo

url = "mongodb+srv://mireshsonkamble03:cQwjEe60VRBw2xWS@cluster0.oacisop.mongodb.net/?retryWrites=true&w=majority"
client = pymongo.MongoClient(url)
db = client["myRecipesApp"]

from http.server import BaseHTTPRequestHandler
import json
import time

with open('./data.json','r', encoding="utf8") as file:
  response = json.load(file)

class handler(BaseHTTPRequestHandler):
 def do_GET(self):
  # time.sleep(5)
  self.send_response(200)
  self.send_header("Content-type", "application/json")
  self.send_header("Content-Length", str(len(json.dumps(response))))
  self.end_headers()
  self.wfile.write(str(json.dumps(response)).encode('utf8'))
  return


from fastapi import FastAPI
from pydantic import BaseModel
import uvicorn

app = FastAPI()

# Dummy data
products = [
  {"id":"1","tags":["phone","android","mobile"]},
  {"id":"2","tags":["phone","ios","mobile"]},
  {"id":"3","tags":["headphones","audio"]},
  {"id":"4","tags":["mug","home"]},
  {"id":"5","tags":["shoes","fashion"]},
]

class Req(BaseModel):
  product_id: str

@app.post('/recommend')
def recommend(req: Req):
  pid = req.product_id
  # simple: return others except pid
  return [p for p in products if p['id'] != pid][:5]

if __name__ == '__main__':
  uvicorn.run(app, host='0.0.0.0', port=8001)

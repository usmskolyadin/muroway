from fastapi import FastAPI, Request, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import hashlib
import hmac
import os
from dotenv import main

app = FastAPI()

# Настройка CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Проверка данных от Telegram
def validate_telegram_data(init_data: str) -> bool:
    bot_token = os.getenv("TELEGRAM_BOT_TOKEN")
    secret_key = hashlib.sha256(bot_token.encode()).digest()
    
    data_pairs = [pair.split('=') for pair in init_data.split('&')]
    hash_index = [i for i, pair in enumerate(data_pairs) if pair[0] == 'hash'][0]
    hash_value = data_pairs.pop(hash_index)[1]
    
    data_check_string = '\n'.join([f"{pair[0]}={pair[1]}" for pair in sorted(data_pairs)])
    computed_hash = hmac.new(secret_key, data_check_string.encode(), hashlib.sha256).hexdigest()
    
    return hash_value == computed_hash

@app.post("/auth")
async def auth(request: Request):
    data = await request.json()
    if not validate_telegram_data(data['initData']):
        raise HTTPException(status_code=401, detail="Invalid Telegram data")
    return {"status": "authenticated"}

@app.get("/data")
async def get_data():
    return {"message": "Hello from FastAPI!"}
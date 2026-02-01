import os 
from app import create_app
from app.db import create_schema

app = create_app()

if __name__ == "__main__":
    create_schema()
    port = int(os.getenv("PORT", "4000"))
    print(f"Backend is up and running at port: {port}")
    app.run(port=port)
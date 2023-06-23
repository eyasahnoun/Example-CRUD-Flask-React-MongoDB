FROM python:3.11

WORKDIR /backend

# Création de l'environnement virtuel
RUN python -m venv /venv
ENV PATH="/venv/bin:$PATH"

# Installation des dépendances
COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt

# Copie du code source
COPY . .

EXPOSE 5000

CMD ["python", "app.py"]

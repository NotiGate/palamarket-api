# PalaMarket API

## Installation

Importations nécessaires :

```bash
npm install
```

## Configuration

Renommer le fichier dans le dossier config (rename to .env .txt) en .env

Dans le fichier .env :

```bash
# Le port d'écoute de l'API
PORT=YOURPORT

# Votre URL de connnexion à la base de donnée MongoDB | Exemple :
DB_PASS=mongodb+srv://USERNAME:PASSWORD@cluster0.c4ocp.mongodb.net/palamarket

# Token de votre bot
BOT_TOKEN=Le token

# Le mot de passe admin pour payer une commande
ADMIN_PASS=Votre mot de passe admin
```

## Usage

```bash
# Créer un produit 
PATH_REQUEST = http://yourdomain.com:PORT/api/product/create
Body {
    "name":"Name du Produit",
    "price":Prix
}

# Modifier un produit 
PATH_REQUEST = http://yourdomain.com:PORT/api/product/update/<id_product>
Body {
    "name":"Name du Produit",
    "price":Prix
}

# Supprimer un produit 
PATH_REQUEST = http://yourdomain.com:PORT/api/product/delete/<id_product>
Body {
    
}

# Créer une commande 
PATH_REQUEST = http://yourdomain.com:PORT/api/order/create
Body {
    "pseudo":"Pseudo du joueur",
    "article":"name de l'article demandé"
    "quantity":quantitee
}

# Mettre une commande en "payée"
PATH_REQUEST = http://yourdomain.com:PORT/api/order/pay/<id_order>
Body {
    "password":"ADMIN_PASS (.env)"
}

# Mettre une commande en "farm"
PATH_REQUEST = http://yourdomain.com:PORT/api/order/farm/<id_order>
Body {
    "manager":"Nom du manager"
}

# Mettre une commande en "ready"
PATH_REQUEST = http://yourdomain.com:PORT/api/order/ready/<id_order>
Body {
    "manager":"Nom du manager"
}

# Mettre une commande en "delivering"
PATH_REQUEST = http://yourdomain.com:PORT/api/order/delivery/<id_order>
Body {
    "manager":"Nom du livreur"
}

# Mettre une commande en "delivered"
PATH_REQUEST = http://yourdomain.com:PORT/api/order/delivered/<id_order>
Body {
    "manager":"Nom du livreur"
}
```

## Contribution
Si vous trouvez un bug, merci de le signaler, des bugs peuvent être présents.

## License
[MIT](https://choosealicense.com/licenses/mit/)

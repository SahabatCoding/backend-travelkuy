# Kota API Spec

## Create Kota API

Endpoint :  POST /kota 

Request Body :

```json
{
    "nm_kota" : "Aceh",
    "about" : "indah",
    "country" : "indonesia"
}
```

Response Body Success :

```json
{
  "data" : {
    "nm_kota" : "bali",
    "about" : "indah",
    "country" : "indonesia"
  }
}
```

Response Body Error : 

```json
{
  "errors" : "kota already registered"
}
```

## Update Kota API

Endpoint : PUT /kota/bali

Request Body :

```json
{
    "about" : "indah",//optionl
    "country" : "indonesia"//optionl
}
```

Response Body Success : 

```json
{
  "data" : {
        "nm_kota" : "Bali",
        "about" : "indah",
        "country" : "indonesia"
  }
}
```

Response Body Error : 

```json
{
  "errors" : "Kota is not found"
}
```

## Get Kota API

Endpoint : GET /kota/bali

Response Body Success:

```json
{
    "data": {
        "nm_kota": "Aceh",
        "about": "indah banget",
        "country": "indonesia",
        "destination": [
            {
                "id": 89,
                "nm_destination": "pantai",
                "about": "indah banget"
            },
            {
                "id": 90,
                "nm_destination": "gunung",
                "about": "indah banget"
            }
        ]
    }
}
```

Response Body Error : 

```json
{
  "errors" : "Unauthorized"
}
```

## Remove Kota API

Endpoint : /api/users/current

Response Body Success :

```json
{
  "data" : "OK"
}
```

Response Body Error :

```json
{
  "errors" : "Kota is not found"
}
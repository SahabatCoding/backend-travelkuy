# Destination API Spec

## Create Destination API

Endpoint :  POST /kota/:idKota/destination

Request Body :

```json
{
    "nm_kota" : "pantai",
    "about" : "indah"
}
```

Response Body Success :

```json
{
  "data" : {
    "nm_kota" : "pantai",
    "about" : "indah"
  }
}
```

Response Body Error : 

```json
{
  "errors" : "\"nm_destination\" is not allowed to be empty"
}
```

## Update Destination API

Endpoint : PUT /kota/:idKota/destination/:idDestination

Request Body :

```json
{
    "nm_kota" : "pantai",//optional
    "about" : "indah"//optional
}
```

Response Body Success : 

```json
{
  "data" : {
        "nm_kota" : "pantai",
        "about" : "indah"
  }
}
```

Response Body Error : 

```json
{
  "errors" : "Destination is not found"
}
```

## Get Destination API

Endpoint : GET /kota/:idKota/destination/:idDestination

Response Body Success:

```json
{
    "data": {
        "id": 89,
        "nm_destination": "pantai",
        "about": "indah banget",
        "hotel": [
            {
                "nm_hotel": "pandawa",
                "about": "indah",
                "alamat": "villa",
                "price": "2 juta"
            }
        ]
    }
}
```

Response Body Error : 

```json
{
  "errors" : "Destination is not found"
}
```

## Remove Destination API

Endpoint : DELETE /kota/:idKota/destination/:idDestination

Response Body Success :

```json
{
  "data" : "OK"
}
```

Response Body Error :

```json
{
  "errors" : "Destination is not found"
}
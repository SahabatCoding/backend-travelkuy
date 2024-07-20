# Hotel API Spec

## Create Hotel API

Endpoint :  POST /Hotel/:Hotel/hotel

Request Body :

```json
{
    "nm_hotel" : "pandawa",
    "about" : "indah",
    "alamat" : "villa",
    "price" : "2 juta"
}
```

Response Body Success :

```json
{
  "data" : {
    "id" : "1",
    "nm_hotel" : "pandawa",
    "about" : "indah",
    "alamat" : "villa",
    "price" : "2 juta"
  }
}
```

Response Body Error : 

```json
{
  "errors" : "\"nm_Hotel\" is not allowed to be empty"
}
```

## Update Hotel API

Endpoint : PUT /destination/:destination/hotel/:hotel

Request Body :

```json
{
    "nm_hotel" : "pandawara",//optional
    "about" : "indah banget",//optional
    "alamat" : "villa",//optional
    "price" : "2 juta"//optional
}
```

Response Body Success : 

```json
{
  "data" : {
    "id" : "1",
    "nm_hotel" : "pandawara",
    "about" : "indah banget",
    "alamat" : "villa",
    "price" : "2 juta"
  }
}
```

Response Body Error : 

```json
{
  "errors" : "Hotel is not found"
}
```

## Get Hotel API

Endpoint : GET /destination/:destination/hotel/:hotel

Response Body Success:

```json
{
    "data" : {
    "id" : "1",
    "nm_hotel" : "pandawara",
    "about" : "indah banget",
    "alamat" : "villa",
    "price" : "2 juta"
  }
}
```

Response Body Error : 

```json
{
  "errors" : "Hotel is not found"
}
```

## Remove Hotel API

Endpoint : DELETE /destination/:destination/hotel/:hotel
Response Body Success :

```json
{
  "data" : "OK"
}
```

Response Body Error :

```json
{
  "errors" : "Hotel is not found"
}
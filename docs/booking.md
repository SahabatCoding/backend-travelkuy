# Booking API Spec

## Create Booking API

Endpoint : POST /users/hotel/:idHotel/booking

Headers : 
- Authorization : token

Request Body :

```json
{
  "check_in" : "2024-07-02",
  "check_out" : "2024-07-04",
  "price" : "20jt",
  "id_hotel" : "22",
}
```

Response Body Success : 

```json
{
  "data" : {
    "id_booking" : 1,
    "check_in" : "2024-07-02",
    "price" : "20jt",
    "check_out" : "2024-07-04"
  }
}
```

Response Body Error :

```json
{
  "errors" : "\"check_in\" must be a valid date"
}
```

## Update Booking API

Endpoint : PUT /users/hotel/:idHotel/booking/:idBooking

Headers :
- Authorization : token

Request Body :

```json
{
  "check_in" : "2024-07-02",//optional
  "check_out" : "2024-07-04",//optional
  "price" : "20jt"
}
```

Response Body Success :

```json
{
  "data" : {
    "id_booking" : 1,
    "check_in" : "2024-07-02",//optional
    "check_out" : "2024-07-04",//optional
    "price" : "20jt"
  }
}
```

Response Body Error :

```json
{
  "errors" : "\"check_in\" must be a valid date"
}
```

## Get Booking API

Endpoint : GET /users/hotel/:idHotel/booking/:idBooking

Headers :
- Authorization : token

Response Body Success :

```json
{
  "data": {
        "id_booking": 27,
        "check_in": "2024-07-07T00:00:00.000Z",
        "check_out": "2024-07-08T00:00:00.000Z",
        "price": "20 jt",
        "user": {
            "username": "chairul"
        },
        "hotel": {
            "nm_hotel": "pandawa",
            "destination": {
                "nm_destination": "pantai",
                "kota": {
                    "nm_kota": "bali"
                }
            }
        }
    }
}
```

Response Body Error :

```json
{
  "errors" : "Booking is not found"
}
```
## Remove Booking API

Endpoint : /users/hotel/:idHotel/booking/:idBooking

Headers :
- Authorization : token

Response Body Success :

```json
{
  "data" : "OK"
}
```

Response Body Error :

```json
{
  "errors" : "Bookin is not found"
}
```
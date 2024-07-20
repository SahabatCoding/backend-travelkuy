# User API Spec

## Register User API

Endpoint :  POST /users 

Request Body :

```json
{
  "username" : "chairul",
  "full_name" : "chairul yusuf",
  "password" : "rahasia",
  "gmail" : "chairul@gmail.com",
  "phone" : "089678767443"
}
```

Response Body Success :

```json
{
    "data" : {
        "username" : "chairul",
        "full_name" : "chairul yusuf",
        "gmail" : "chairul@gmail.com",
        "phone" : "089678767443"
    }
}
```

Response Body Error : 

```json
{
  "errors" : "Username already registered"
}
```

## Login User API

Endpoint : POST /users/login

Request Body :

```json
{
  "username" : "chairul",
  "password" : "rahasia"
}
```

Response Body Success : 

```json
{
  "data" : {
    "token" : "unique-token"
  }
}
```

Response Body Error :

```json
{
  "errors" : "Username or password wrong"
}
```

## Update User API

Endpoint : PATCH /users/current

Headers :
- Authorization : token 

Request Body :

```json
{
  "username" : "chairul", //option
  "full_name" : "chairul yusuf",//optional
  "gmail" : "chairul@gmail.com",//optional
  "phone" : "089678767443",//optional
  "jkel" : "laki-laki",//optional
  "tgl_lahir" : "27",//optional
  "alamat" : "villa",//optional
  "ktp" : "3586172538",//optional
  "kode_pos" : "15313",//optional
  "token" : "089678767443"//optional
}
```

Response Body Success : 

```json
{
  "data" : {
    "username" : "chairul", 
    "full_name" : "chairul yusuf",
    "gmail" : "chairul@gmail.com",
    "phone" : "089678767443",
    "jkel" : "laki-laki",
    "tgl_lahir" : "27",
    "alamat" : "villa",
    "ktp" : "3586172538",
    "kode_pos" : "15313",
    "token" : "089678767443"
  }
}
```

Response Body Error : 

```json
{
  "errors" : "full_name length max 100"
}
```

## Get User API

Endpoint : GET /users/current

Headers :
- Authorization : token

Response Body Success:

```json
{
  "data" : {
    "username" : "chairul", 
    "full_name" : "chairul yusuf",
    "gmail" : "chairul@gmail.com",
    "phone" : "089678767443",
    "jkel" : "laki-laki",
    "tgl_lahir" : "27",
    "alamat" : "villa",
    "ktp" : "3586172538",
    "kode_pos" : "15313",
    "token" : "089678767443"
  }
}
```

Response Body Error : 

```json
{
  "errors" : "Unauthorized"
}
```

## Logout User API

Endpoint : DELETE /users/logout

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
  "errors" : "Unauthorized"
}
```
# Hi, I'm Chairul! 👋

Hi, I'm Chairul, this api project was created to create a travel website.
why did I make this? because I was trusted by the team to be the backend at one of the boot camps, I have completed the city, destination and hotel api, not only that, I created users and bookings for transactions when the user wants to book a hotel

## API Reference

```http
  https://backend-travelkuy.vercel.app
```

#### Get all destination in aceh

```http
  GET /kota/aceh
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `api_key` | `string` | **Required**. Your API key |

#### Get all the hotels in the Aceh destination

Get the destination ID after you get the Aceh destination api. the one above

```http
  GET /kota/aceh/destination/${id}
```



| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of item to fetch |




## Announcement

For api usage, see the 'docs' file. [docs](https://github.com/ProgrammerZamanNow/belajar-nodejs-restful-api/tree/main/docs)


[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/chairulyusuf/)
[![Instagram](https://img.shields.io/badge/instagram-E4405F?style=for-the-badge&logo=instagram&logoColor=white)](https://www.instagram.com/chairulyf/)


# Getting started

A tutorial on how install npm

## Quickstart

As a first step, install all libraries in package.json

```bash
  npm install 
```

## Create database
Make sure to create a database first in your local area

## Environment Variables

After creating the database, next configure the environment variables to your .env file

`DATABASE_URL = "mysql://root:@localhost:3306/travel"`

## Run a migration to create your database tables 

```bash
  npx prisma migrate dev 
```

## Authors

- [@SahabatCoding](https://github.com/SahabatCoding)



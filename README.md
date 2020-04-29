# silent-auction-api
node api for silent auction application 

USER and AUTH ENDPOINTS

[/] - POST Register endpoint "/api/auth/register"
    !Data shape to POST!
	{
    	"username":"durgen25",
    	"password":"hingadinga",
    	"first_name":"Leif",
    	"last_name":"Erikson",
    	"email":"Awesome@cool2.com"
	}
		
[/] - POST Login endpoint "/api/auth/login"
    !Data shape to POST!
	{
    	"username":"durgen25",
   	 "password":"hingadinga"
	}

[/] - GET Profile endpoint "/api/users/profile"	
    !Data returned from GET request!
	{
    "id": 4,
    "username": "durgen23",
    "first_name": "Leif",
    "last_name": "Erikson",
    "email": "Awesome@cool.com",
    "auctions": [
        {
            "id": 4,
            "user_id": 4,
            "name": "Feet Loaf 3",
            "item_description": "sequel to feet loaf 2 and prequel to feet loaf 1",
            "item_price": 223,
            "date_started": "2020-04-29T01:47:28.283Z",
            "date_ending": "2020-05-01T08:40:23.000Z",
            "image": "https://i.imgur.com/vlI8Xqw.jpg"
        }
    ],
    "bids": [
        {
            "id": 8,
            "auction_id": 3,
            "price": 380,
            "date_listed": "2020-04-29T15:53:52.000Z",
            "name": "Guitar"
        },
        {
            "id": 9,
            "auction_id": 1,
            "price": 270,
            "date_listed": "2020-04-29T15:54:22.000Z",
            "name": "Camera"
        }
    ]
}

[/] - PUT profile endpoint updates profile  "/api/users/profile"
        !Data shape to POST! all fields are optional!
        {
    	"username":"durgen25",
    	"password":"hingadinga",
    	"first_name":"Leif",
    	"last_name":"Erikson",
    	"email":"Awesome@cool2.com"
	    }       


[/] - DELETE profile endpoint, deletes profile  "/api/users/profile"
        !Only authorization needed!

AUCTION ENDPOINTS

[/] - GET all auctions endpoint "api/auctions"
        !Only authorization needed!
        [
    {
        "id": 1,
        "user_id": 62,
        "username": "Test1",
        "name": "Camera",
        "item_description": "Nikon digital camera",
        "item_price": 250,
        "date_started": "2020-04-28 22:58:01",
        "date_ending": "2020-04-30 16:40:23",
        "image": "https://i.imgur.com/my9SknX.jpg"
    },
    {
        "id": 2,
        "user_id": 2,
        "username": "Test2",
        "name": "Game console",
        "item_description": "Super Nintendo Entertainment System",
        "item_price": 39.99,
        "date_started": "2020-04-26 12:58:01",
        "date_ending": "2020-04-30 16:40:23",
        "image": "https://i.imgur.com/2zJ2clW.jpg"
    },
    {
        "id": 3,
        "user_id": 3,
        "username": "Test3",
        "name": "Guitar",
        "item_description": "Fender",
        "item_price": 300,
        "date_started": "2020-04-27 16:34:01",
        "date_ending": "2020-04-30 16:40:23",
        "image": "https://i.imgur.com/zQyowDJ.jpg"
    }
]

[/] - GET auction endpoint using ID, returns highestbid and will return an array of bids only if owner of auction "api/auctions/:id"
    !If user is owner GET will return:
    {
    "id": 1,
    "user_id": 62,
    "username": "Test1",
    "name": "Camera",
    "item_description": "Nikon digital camera",
    "item_price": 250,
    "date_started": "2020-04-28 22:58:01",
    "date_ending": "2020-04-30 16:40:23",
    "image": "https://i.imgur.com/my9SknX.jpg",
    "bids": [
        {
            "id": 3,
            "auction_id": 1,
            "price": 150,
            "date_listed": "2020-04-28 16:42:54",
            "username": "Test3"
        },
        {
            "id": 9,
            "auction_id": 1,
            "price": 244,
            "date_listed": "2020-04-28 16:42:54",
            "username": "Test3"
        }
    ],
    "highestBid": 250
    }

    !IF user is not owner of auction GET will return:
    {
    "id": 1,
    "user_id": 62,
    "username": "Test1",
    "name": "Camera",
    "item_description": "Nikon digital camera",
    "item_price": 250,
    "date_started": "2020-04-28 22:58:01",
    "date_ending": "2020-04-30 16:40:23",
    "image": "https://i.imgur.com/my9SknX.jpg",
    "highestBid": 250
    }

[/] - POST create an auction "api/auctions"
    !Data shape to POST!
    {
    "name":"Meat Loaf",
    "item_description":"Loaf of BEEF",
    "item_price":100,
    "date_ending":"2020-04-30 08:40:23",
    "image":"https://i.imgur.com/vlI8Xqw.jpg"
    }

[/]  - PUT edit your auction "api/auctions/:id" disallow if not owner
    !Data shape to PUT! all fields are optional
    {
    "name":"Meat Loaf",
    "item_description":"Loaf of BEEF",
    "item_price":100,
    "date_ending":"2020-04-30 08:40:23",
    "image":"https://i.imgur.com/vlI8Xqw.jpg"
    }

[/]  - DELETE, delete your auction "api/auctions:id" disallow if not owner
    !Only authorization needed!
BID ENDPOINTS

[/] - POST add bid to an auction "api/bid/auctions/:id"
    !Sample data to post! Amount must be higher than highest bid and cant be posted on own auction
    {
    "price":300
    }

[/] - DELETE delete your bid from auction "api/bid/:id"
    !Only authorization needed!


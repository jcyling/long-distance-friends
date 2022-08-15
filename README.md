*This app is a work-in-progress (Dated: 05/08/2022).*

# :earth_asia: Long Distance Friends
A scheduling web app to make hanging out with family and friends in different timezones easier. Coordinating online hangouts with friends in different timezones can be difficult - Long Distance Friends make it better!

![Homepage](/images/ldf-homepage-01.png)

## :memo: What It Does
![Group](/images/ldf-group-home-01.png)
- Keep track of what timezones and time differences everyone in your friend group are in.
- Generates a link for all your friends to tell us when they are free to hangout.
- See what times your friends are free to hangout at a glance.
- Answer to your friend's invite to hangout by inputting your availability - and LDF will sort out the rest!
- Once everyone has put in their availability, if there is a working timeslot for all friends in the group, LDF will send out a Zoom meeting link to everyone's email.

![RSVP](/images/ldf-friend-rsvp-hangout-01.png)

## :hammer: What It Uses
- Back-end: Node.js, Express
- Front-end: React, TailwindCSS
- Testing: Jest, Postman
- Database: MongoDB, Mongoose
- Other: Luxon (datetime and timezone management), nodemailer (email integration)

## 📌 APIs 
- Google Maps API - for location and timezone handling
- Zoom API - for meeting invites

## 📁 Structure
#### Client
```
/src
├── components              # Components
│   ├── common              # Fields, buttons & other common components
│   ├── home                # /home interface components
│   ├── rsvp                # /rsvp interface components
│   ├── views               # Other pages
├── services                # API interactions
├── static                  # Images
├── utils                   # Tools and utilities
└── README.md
```
#### Server
```
├── controllers             # Routers & Tests
├── models                  # Schema definitions
├── services                # External API services
├── utils                   # Tools and utilities
└── README.md
```

## 🪄 Specific Features & Optimizations
#### Cascading deletion of referenced IDs in MongoDB
The schemas have `post-` middleware which is triggered when `delete` is called on the document. All other references to this object in relevant documents are automatically deleted.

#### Timezone and location handling
Input any location and the timezone (and offset, incl. daylight saving) is worked out for you.

#### Randomly generated UUIDs for short, succinct invitation URLs
Each hangout has a UUID that makes the RSVP invitation easy to send.

## :gear: Setup
Long Distance Friends works with the following services:
- MongoDB
- Gmail
- Zoom

Configure these variables in your environment to deploy.

To start, `npm run start` in the client and server folders.
To run in development mode, `npm run dev`.
To test, `npm run test`.
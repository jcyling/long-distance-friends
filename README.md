*This app is a work-in-progress (Dated: 06/07/2022).*

# :earth_asia: Long Distance Friends
A scheduling web app to make hanging out with family and friends in different timezones easier. This app originated from the idea of wanting to improve the coordination of hanging out with friends in different timezones online.

### :memo: What It Does
- Keep track of what timezones and time differences everyone in your friend group are in.
- Generates a link for all your friends to tell us when they are free to hangout.
- See what times your friends are free to hangout at a glance.
- Answer to your friend's invite to hangout by inputting your availability - and LDF will sort out the rest!
- Once everyone has put in their availability, if there is a working timeslot for all friends in the group, LDF will send out a zoom link to everyone's email.

![Homepage](/images/ldf-homepage-01.png)

### :hammer: How It Works
- Back-end: Node.js, Express
- Front-end: React, TailwindCSS
- Database: MongoDB, Mongoose
- Other: Luxon (for datetime and timezone management)

### :gear: Setup
Long Distance Friends works with the following services:
- MongoDB
- Gmail
- Zoom

Configure these variables in your environment to deploy.
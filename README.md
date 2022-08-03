*This app is a work-in-progress (Dated: 06/07/2022).*

# :earth_asia: Long Distance Friends
A scheduling web app to make hanging out with family and friends in different timezones easier. Coordinating online hangouts with friends in different timezones can be difficult - Long Distance Friends make it better!

![Homepage](/images/ldf-homepage-01.png)

### :memo: What It Does
- Keep track of what timezones and time differences everyone in your friend group are in.
- Generates a link for all your friends to tell us when they are free to hangout.
- See what times your friends are free to hangout at a glance.
- Answer to your friend's invite to hangout by inputting your availability - and LDF will sort out the rest!
- Once everyone has put in their availability, if there is a working timeslot for all friends in the group, LDF will send out a zoom link to everyone's email.

![RSVP](/images/ldf-friend-rsvp-hangout-01.png)

### :hammer: How It Works
- Back-end: Node.js, Express
- Front-end: React, TailwindCSS
- Database: MongoDB, Mongoose
- Other: Luxon (for datetime and timezone management)

### Design

Diagram for datetime conversion logic between client and server-side architecture
<iframe style="border: 1px solid rgba(0, 0, 0, 0.1);" width="800" height="450" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FeZQ9GLDdLqu5q526wM3C9U%2FLongDistanceFriends-DateTimeConversionDiagram%3Fnode-id%3D0%253A1" allowfullscreen></iframe>

### :gear: Setup
Long Distance Friends works with the following services:
- MongoDB
- Gmail
- Zoom

Configure these variables in your environment to deploy.
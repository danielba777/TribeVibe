# TribeVibe Social Network

> Social Network built with React, Node.js, Express.js & MySQL.
 
TribeVibe is a dynamic social networking platform designed to bring people together, share experiences, and build lasting connections. Whether you’re looking to stay in touch with friends, follow inspiring stories, or discover new communities, TribeVibe is your go-to space for vibrant interactions and meaningful engagements.

# Features

**Posts**
* Share Your Moments: Post updates, photos, and thoughts to keep your friends and followers updated.
* Engage with Content: Like and comment on posts from other users to interact and build connections.
* Media Upload: Easily upload images to your posts and see a preview before sharing.

**Stories**
* Express Creatively: Create stories that appear on the homepage of your followers, disappearing after 24 hours.
* Stay Updated: Keep up with what’s happening in your friends’ lives in a more casual and spontaneous way.

**Search Functionality**
* Find Friends: Search for users by name and connect with them.
* Explore Profiles: Easily navigate to user profiles and discover new connections.

**Dark Mode**
* Comfortable Viewing: Toggle between light and dark mode to suit your preference and reduce eye strain.
* Persistent Settings: Once selected, your preferred mode will be saved for future logins.

**Profile Customization**
* Personalize Your Profile: Upload a profile picture, cover photo, and personal information to express yourself.
* Showcase Your Posts: Your posts will be displayed on your profile page for others to see.

**User Interaction**
* Build Your Tribe: Follow or unfollow users to stay connected with people who matter to you.
* Stay Informed: Get the latest updates from your followers directly on your homepage.

# Test User Accounts
```
# John Doe
john
P: 123456

# Jane Doe
jane
P: 123456

# Daniel Smith
daniel
P: 123456
```

# Usage
* Create MySQL-Database and obtain your Hostname, username, password and the database name

## .env - Variables

Rename the example.env to .env and add the following:
```
host=YOUR_HOST
user=YOUR_USER
password=YOUR_PASSWORD
database=YOUR_DATABASE
```

## Install dependencies (frontend + backend)
```
cd api
yarn
cd client
yarn
```

## Run 
```
# Run backend
cd api
yarn start

# Run frontend
cd client
yarn start
```

# Build & Deploy

## Create frontend production build
```
cd client
yarn build
```

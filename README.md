# Chat Backend
## Tags
- v1.x.x is the Part 1
- v2.x.x is the Part 2
## Local installation
```
git clone git@github.com:antoinealej/chat-back.git
cd chat-back
npm i
npm start 
```
you can now access the graphQL playground at 
[http://localhost:4000/graphql](http://localhost:4000/graphql)

When the server starts, the server pre-populate some data. 
You can find the detailed data in [fixture.json](src/assets/fixtures.json)
## Docker
Build your image and run your container with the following commands
```
docker build -t chat-back .
docker run -p 4000:4000 -d chat-back
```
## GraphQL
For each Query, Mutation or Subscription you have to be authenticated, 
add the authorization header in the HTTP headers
```
{
  "authorization": "u3"
}
```
#### Types
```
type Forum {
  # The forum ID
  id: String

  # The forum name
  name: String

  # The list of the users who joined the forum
  users: [User]
}

type User {
  # The user ID
  id: String

  # The user name
  name: String

  # The user profile picture
  picture: String
}

type Message {
  # The message ID
  id: String

  # The content of the message sent by the author
  content: String

  # The author of the message
  author: User

  # The forum the message as been sent on
  forum: Forum

  # The date and time the message has been sent
  sentAt: String
}
```
### Query
```sdl
type Query {
  # List the forums
  forums: [Forum]

  # List of the forums I (the authenticated user) joined
  myForums: [Forum]

  # Get my (the authenticated user) details
  me: User

  # List the users of a forum
  users(
    # The ID of the forum you want to get the users from
    forumId: String!
  ): [User]

  # List the messages of a forum
  messages(
    # The ID of the forum you want to get the messages from
    forumId: String!
  ): [Message]
}
```
#### Query examples
- get my user details:
```
{
  me {
    name
    picture
  }
  myForums {
    id
    name
  }
}
```
- get the forums list
```
{
  forums {
    id
    name
  }
}
```
- get the messages of a forum
```
{
  forumMessages(forumId: "f2") {
    content
    sentAt
    author {
      name
      picture
    }
  }
}
``` 
- get the users who joined a forum
```
{
  forumUsers(forumId: "f4") {
    id
    name
    picture
  }
}
```
### Mutations
```
type Mutation {
  # Create a new forum
  createForum(
    # The name of the forum you want to create
    name: String!
  ): Forum

  # Join a forum
  join(
    # The id of the forum you want to join
    forumId: String!
  ): Forum

  # Post a new message in a forum
  postMessage(
    # The content of the message
    content: String!

    # The ID of the forum where the message is posted
    forumId: String!
  ): Message
}
```
#### Mutations examples
- Create a new forum
```
mutation {
  createForum(name: "Board Games") {
    id
    name
  }
}
```
- Join a forum
```
mutation {
  joinForum(forumId: "f2") {
    id
    name
    users {
      id
      name
      picture
    }
  }
}
```
- Post a message un a forum
```
mutation {
  postMessage(forumId: "f2", content: "Salut!") {
   	content
    sentAt
    author {
      name
      picture
    }
  }
}
```
### Subscriptions
```
type Subscription {
  # Subscription of a forum messages
  feedMessages(
    # The ID of the forum to subscribe to
    forumId: String!
  ): Message
}
```
#### Subscriptions examples
- get the new posts events
```
subscription {
  feedForumMessages(forumId: "f2") {
    content
    sentAt
    author {
      name
      picture
    }
  }
}
```

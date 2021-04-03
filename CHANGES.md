# Chat Backend Part 2 Changes
1) When a user creates a forum, he can mark it as private.
    - Add `isPrivate` in `Forum` type
    - Add `isPrivate` in `createForum` Mutation. This value is optional, the default value will be false.
2) He will automatically be the admin of this forum.
    - Add `admins` in `Forum` type, so we can know who is an admin of each forum. It's an array as we may have multiple admins in the future.
    - The resolver will add the `User` in the admin list of the `Forum`
3) When a forum is private, no-one can see it in the list of available forums.
    - `forums` query will only return the non private forums, `isPrivase` === false
    - `myForums` query will return the public and private forums you joined
4) A user can ask to join a private forum only if he knows the forum ID.
    - Add `Request` type with the `Forum`, the `User`, a boolean `isAccepted` to know if the request has been accepted or denied and a boolean `isResolved` to know if the admin resolved the request
    - Since we can already join a forum by ID the user can join any private forum.
    - When a `User` ask to join a `Forum` by ID, if the `Forum` is public, he'll join it, 
    if the `Forum` is private the resolver will create a `Request`. Both scenarios use the same mutation.
5) When an ask request is sent, the admin of this forum can accept or refuse the request.
    - In order to accept or refuse a `Request`, the admin has to see the `Request` list, so we add the `requests` Query.
    - The `requests` Query doesn't have any arguments as it'll return all the `Requests` that are not resolved yet (`isResolved === false`) of all the `Forums` the authenticated user is admin 
    - We could have added `forumId` as an argument to specify for which `Forum` we want to get the `Request` list or add another Query for this matter.
6) If the request is accepted, the user automatically joins the forum.
    - Add `resolveRequest` Mutation with `requestId` and `isAccepted` to true.
    - The resolver will change `isAccepted` in the `Request` to true, change `isResolved` to true and add the specified user to the list of the users in the `Forum`
7) If the request is refused, the user is not notified.
    - We can use the `resolveRequest` Mutation with the `requestId` and `isAccepted` to false
    - The resolver will change `isAccepted` in the `Request` to false and change `isResolved` to true

## GraphQL
#### Types
```
type Forum {
  # The forum ID
  id: String

  # The forum name
  name: String

  # Define whether the forum is private or not
  isPrivate: Boolean

  # The list of the admins of the forum
  admins: [User]

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

type Request {
  # The request ID
  id: String

  # The forum the user requests to join the private forum
  forum: Forum

  # True if the request is accepted, false if it is denied
  isAccepted: Boolean

  # True if the request is resolved, false otherwise
  isResolved: Boolean

  # The user who wants to join the private forum
  user: User
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
  forumUsers(
    # The ID of the forum you want to get the users from
    forumId: String!
  ): [User]

  # List the messages of a forum
  forumMessages(
    # The ID of the forum you want to get the messages from
    forumId: String!
  ): [Message]

  # Get my forums requests
  requests: Request
}
```
### Mutations
```
type Mutation {
  # Create a new forum
  createForum(
    # The name of the forum you want to create
    name: String!

    # True if the forum is private or false if it is public
    isPrivate: Boolean
  ): Forum

  # Join a forum
  joinForum(
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

  # Accept or refuse a request
  resolveRequest(
    # The ID of the request the admin wants to resolve
    requestId: String

    # True if the request is accepted, false if it is denied
    isAccepted: Boolean
  ): Request
}
```
### Subscriptions
```
type Subscription {
  # Subscription of a forum messages
  feedForumMessages(
    # The ID of the forum to subscribe to
    forumId: String!
  ): Message
}
```

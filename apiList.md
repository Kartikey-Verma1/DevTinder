## auth
- post - authProfile/login
- post - authProfile/logout
- post - authProfile/signup

## profile
- patch - profile/change
- patch - profile/changepassword
- delete - profile/delete
- get - profile/user

## connectionRequest
- post - connectionRequest/send/ingnore/:userId
- post - connectionRequest/send/interested/:userId
- post - connectionRequest/review/ignore/:requestId
- post - connectionRequest/review/interested/:requestId

## user
- get - user/connections
- get - user/requestes
- get - user/feed
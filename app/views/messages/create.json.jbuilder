json.id         @message.id
json.image      @message.image.url
json.content    @message.content
json.time       @message.created_at.to_s
json.user_name  @message.user.name

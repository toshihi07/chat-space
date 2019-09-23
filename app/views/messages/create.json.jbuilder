json.id         @message.id
json.image      @message.image.url
json.content    @message.content
json.created_at @message.created_at.strftime("%Y/%m/%d %H:%M")
json.user_id    @message.user.id
json.user_name  @message.user.name

# binding.pry
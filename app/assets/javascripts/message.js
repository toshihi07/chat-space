$(document).on('turbolinks:load', function() {
  function buildHTML(message){
    console.log(message)
    var MessageImage = message.image ? `<img src="${message.image}" class="lower-message__image">` : ``;
    var html = `
        <div class="message" data-message_id="${message.id}">
          <div class="upper-message">
            <div class="upper-message__user-name">
              ${ message.user_name }
            </div>
            <div class="upper-message__date">
              ${ message.time }
            </div>
          </div>
          <div class="lower-meesage">
            <p class="lower-message__content">
              ${ message.content }
            </p>
            ${ MessageImage }
          </div>
        </div>`;
    return html;
}

  function Scroll(){
    $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
  }

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      console.table(data)
      var html = buildHTML(data);
      $('.messages').append(html);
      $('#new_message')[0].reset();
      $(".form__submit").prop('disabled', false);
      Scroll();
    })
    .fail(function(){
      alert('メッセージの送信に失敗しました');
    })
  })
});

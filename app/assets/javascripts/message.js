$(document).on('turbolinks:load', function() {
  
  function buildHTML(message){
    var MessageImage = message.image? `<img src="${message.image}" class="lower-message__image">` : ``;
    var html = `<div class="message" data-message_id="${message.id}">
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
  let reloadMessages = function() {                                 //（正規表現： \で直後の記号文字を毎回エスケープ）
    if (window.location.href.match(/\/groups\/\d+\/messages/)){   // ifでグループメッセージの画面でのみ自動更新
      let last_message_id = $('.message').last().data('message_id');
      console.log(last_message_id)

    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      if (messages.length !== 0){               //メッセージの中身があればappend&スクロールするようにする
      let insertHTML = '';                      //追加するHTMLの入れ物を作る
      
      messages.forEach(function(message) {      //配列messagesの中身一つ一つを取り出し、HTMLに変換したものを入れ物に足し合わせる
        insertHTML = buildHTML(message);        //メッセージが入ったHTMLを取得
        $('.messages').append(insertHTML);      //メッセージを追加
      })
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast')   //メッセージ分だけスクロール
      }
    })

    .fail(function() {
      alert('自動更新に失敗しました');
    });
  }
};
  setInterval(reloadMessages, 5000);
});
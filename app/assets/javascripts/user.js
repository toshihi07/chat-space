//画面遷移時、JSがロードされないとき `turbolinks:load`イベントをつける
$(document).on('turbolinks:load', function() {  

  $(function(){
    let searchList = $('#user-search-result');

    //ユーザー候補を表示
    function appendUser(user) {
      let html = `<div class='chat-group-user clearfix' >
                    <p class='chat-group-user__name'>${user.name}</p>
                      <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">
                      追加</div>
                  </div>`
      searchList.append(html);
    }
    //検索候補なしのエラーメッセージappend関数
    function appendErrMsgUser(message){
      let html = `<div class='chat-group-user clearfix' >
                    <p class='chat-group-user__name'>${message}</p>
                  </div>`
      searchList.append(html);
    }

    //追加後に全ユーザーを表示させる
    function buildHTML(id, name) {
      var html = `<div class='chat-group-user'>
                    <input name='group[user_ids][]' type='hidden' value="${id}">
                    <p class="chat-group-user__name">${name}</p>
                    <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
                  </div>`
      return html
    }

    //イベント発火-ユーザー検索のinputに入力時
    $("#user-search-field").on("keyup", function() {
      let input = $("#user-search-field").val();
      $.ajax({
        url: '/users',
        type: 'GET',
        data: { keyword: input },
        dataType: 'json'
      })
      .done(function(users){
        $('#user-search-result').empty();
        if (users.length !== 0 && input.length !== 0 ) {
          users.forEach(function(user) {
            appendUser(user); 
          });
        }
        else {
          appendErrMsgUser('一致するユーザーはいません');
        }
      })
      .fail(function(){
        alert('ユーザーの検索に失敗しました');
      })
    });

    //追加された後にそのユーザーの欄を消す
    $("#user-search-result").on("click", '.user-search-add', function(){
        let id = $(this).data('user-id');
        let name = $(this).data('user-name');
        let insertHTML = buildHTML(id, name);
        $('.chat-group-users').append(insertHTML);
        $(this).parent('.chat-group-user').remove();
    });

    //削除ボタン
    $('.chat-group-users').on('click', '.user-search-remove', function(){ 
      $(this).parent().remove();       //クリックした子要素と親要素をどちらも削除
    })
  });
});


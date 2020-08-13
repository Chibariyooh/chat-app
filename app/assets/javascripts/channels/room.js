App.room = App.cable.subscriptions.create("RoomChannel", {
  connected: function() {
    // Called when the subscription is ready for use on the server
    console.log("connected")
  },

  disconnected: function() {
    // Called when the subscription has been terminated by the server
  },

  received: function(message) {
    // Called when there's incoming data on the websocket for this channel
    //(message)でアラート出現
    // alert(message)
    
    // viewのidがmessagesのオブジェクトを取得
    const messages = document.getElementById('messages')
    // オブジェクトのHTMLに以下のデータを追加で挿入
    messages.innerHTML += `<p>${message}</p>`
    
  },

  speak: function(content) {
    return this.perform('speak',{message: content});
  }
});

document.addEventListener('DOMContentLoaded', function() {
  // rooms/shou.html.erbのidがchat-inputのオブジェクトを取得
  const input = document.getElementById('chat-input')
  // rooms/shou.html.erbのidがbuttonのオブジェクトを取得
  const button = document.getElementById('button')
  // buttonクリック時の操作を記述
  button.addEventListener('click', function() {
    // inputに入力された値を取得
    const content = input.value
    // App.roomのspeakメソッドを実行
    App.room.speak(content)
    // inputの入力値を空文字にする
    input.value = ''
  })

})

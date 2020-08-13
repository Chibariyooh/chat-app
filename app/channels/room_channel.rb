class RoomChannel < ApplicationCable::Channel
  def subscribed
    stream_from "room_channel"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def speak(data)
    Message.create!(content: data['message'])
    ActionCable.server.broadcast 'room_channel', data['message']

    # オブジェクトをmessageに格納
    #message = Message.create!(content: data['message'])
    # _message.html.erbにデータを渡してHTMLを生成
    #template = ApplicationController.renderer.render(partial: 'messages/message', locals: {message: message})
    # 生成されたHTMLを渡してbroadcast
    #ActionCable.server.broadcast 'room_channel', template
  end
end

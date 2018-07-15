# json.set! 'comments' do
  @comments.each do |comment|
    json.set! comment.id do
      json.extract! comment, :id, :body, :video_id, :parent_comment_id, :user_id
    end
  end
# end

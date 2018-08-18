json.set! 'results' do
  @results.each do |result|
    json.set! result.id do
      json.extract! result, :title, :id, :description
    end
  end
end

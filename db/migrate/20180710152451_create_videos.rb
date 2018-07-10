class CreateVideos < ActiveRecord::Migration[5.2]
  def change
    create_table :videos do |t|
      t.string :title, null: false
      t.text :description, null: false
      t.string :video_url, null: false
      t.string :thumbnail_url, null: false
      t.integer :views, default: 0
      t.integer :length
      t.integer :uploader_id, null: false

      t.timestamps
    end

    add_index :videos, :uploader_id
  end
end

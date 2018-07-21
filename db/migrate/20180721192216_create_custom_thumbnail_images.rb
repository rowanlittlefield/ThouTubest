class CreateCustomThumbnailImages < ActiveRecord::Migration[5.2]
  def change
    create_table :custom_thumbnail_images do |t|
      t.integer :video_id, null: false
    end

      add_index :custom_thumbnail_images, :video_id, unique: true
  end
end

class CreateLikes < ActiveRecord::Migration[5.2]
  def change
    create_table :likes do |t|
      t.integer :user_id, null: false
      t.references :likeable, polymorphic: true, index: true
      t.boolean :is_dislike, default: false  

      t.timestamps
    end

    add_index :likes, :user_id
    add_index :likes, [:user_id, :likeable_id, :likeable_type], unique: true
  end
end

# README
<!-- 
This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ... -->

## users
|column|type|options|
|------|----|-------|
|name|string|null: false, index: true|
### association
has_many :messages
has_many :groups_users
has_many :groups through: :groups_users

## messages
|column|type|options|
|------|----|-------|
|message|text||
|image|string||
|user_id|references|null:false,foreign_key:true|
|group_id|references|null:false,foreign_key:true|
### association
belongs_to :group
belongs_to :user

## groups
|column|type|options|
|------|----|-------|
|name|string|null: false, unique: true|
### association
has_many :groups_users
has_many :users, through: :groups_users
has_many :messages

## groups_usersテーブル
|column|type|options|
|------|----|-------|
|user_id|references|null: false, foreign_key: true|
|group_id|references|null: false, foreign_key: true|
### Association
 belongs_to :group
 belongs_to :user



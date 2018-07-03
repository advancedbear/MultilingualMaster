# Multilingual Master
## マルチリンガルマスターとは？
Discord上で動作する翻訳BOTです。  
テキスト投稿に対してリアクション機能を使うことで、本文を主要な言語に翻訳することが可能です。  

## 使い方
1. 翻訳したい投稿の右上の顔アイコンをクリックします  
![image1](image1.png)
2. 翻訳したい言語の国旗を選んでリアクションを行うと翻訳されます    
![image2](image2.png)

### 翻訳可能な言語
国家が多すぎるのでG20参加国に絞りました。  
いくつか公用語が被っている国もあるので、14ヶ国語に対応しています。
- 日本語
- 英語
- 韓国語
- 中国語（簡体字）
- インドネシア語
- ヒンディー語
- アラビア語
- フランス語
- ドイツ語
- イタリア語
- スペイン語
- ポルトガル語
- ロシア語
- トルコ語

## 設置方法
### 用意するもの
- Google Apps Scriptが使えるGoogleアカウント
- Discord Developerに登録されておりBOTが作成できるDiscordアカウント
- Nodeが動作してインターネットに繋がるコンピュータ
- [Node.js](https://nodejs.org/ja/)
### 設置手順
1. [この辺](https://qiita.com/tanabee/items/c79c5c28ba0537112922)を参考に、GASを組んでAPIを実行可能にしておく
1. [この辺](https://github.com/advancedbear/TweetDiscordStatus/blob/master/doc/DiscordBOT.md)を参考にBOTアカウントを作成しておく
1. このリポジトリをクローンする
1. リポジトリフォルダの中で`npm install`する
1. `config.json.sample`ファイルの名前を`config.json`に変更する
1. `config.json`にGASのURLと、DiscordBOTのclientIDとtokenを入れる
1. `node index.js --join`を実行し、BOTアカウントをサーバーに参加させる（サーバ管理者の権限が必要です）
1. `node index.js`を実行してBOTを稼働させる（チャット欄で`!MM`を入力して動作確認出来ます）
### デーモン化
#### Windowsの場合
Winserを使ってください
使い方はググってください
#### Linuxの場合
pm2を使ってください
使い方はググってください

# お問い合わせ先
Issuesページ、もしくは[Twitter](https://twitter.com/advanced_bear)からどうぞ
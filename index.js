const fs = require('fs')
const opener = require('opener')
const request = require('request')
const Discord = require('discord.js')
const emoji_flags = {
    '🇯🇵': 'ja', '🇰🇷': 'ko', '🇨🇳': 'zh-CN', '🇮🇩': 'id', '🇮🇳': 'hi', '🇸🇦': 'ar', '🇫🇷': 'fr',
    '🇩🇪': 'de', '🇮🇹': 'it', '🇬🇧': 'en', '🇨🇦': 'en', '🇲🇽': 'es', '🇺🇸': 'en', '🇦🇷': 'es',
    '🇧🇷': 'pt', '🇷🇺': 'ru', '🇹🇷': 'tr', '🇿🇦': 'en', '🇦🇺': 'en',
}

var client = new Discord.Client();
var config
try {
    config = JSON.parse(fs.readFileSync("config.json", "utf-8"))
} catch(err) {
    console.error(err)
    console.error('\n\n"config.json" not found!\nDid you copy and rename "config.sample.json" to "config.json"?\n');
    console.error('Please read setup section of "README.md" at first.');
}

var doTranslate = (mes, tgt, callback)=>{
    request.get({
        url: config.gapps,
        qs: {
            text: mes,
            source: null,
            target: tgt
        }
    }, (err, res, body)=>{
        !err ? callback(body) : callback(null)
    })
}

if(process.argv[2] === "--join"){
    if(process.argv.length == 3){
        let clientId = config.clientID;
        let botJoinUrl = "https://discordapp.com/oauth2/authorize?scope=bot&client_id="+clientId;
        console.info("BOT adding page will open automatically.\nPlease add BOT account to the server.")
        opener(botJoinUrl, null, (error, stdout, stderr) => {
            process.exit(0);
        })
    }
} else {
    if(config.token == "" || config.client_id == ""){
        console.error('Please add Discord Token and Discord ClientID in "config.json" at first.');
        process.exit(-1);
    }
}

client.login(config.token)

client.on('ready', ()=> {
    console.log('BOT ready');
    console.info('If you close this console, BOT will shutdown immediately.\
                \nIf you want to run in background, use "forever" or "pm2".\
                \nMore information in "README.md".');
})

client.on("message", (message) => {
    if(message.content===("!MM")){
        message.channel.send("Hello, Everyone! I'm Multilingual Master!\
        \nI can translate any text posts in this server.\
        \nIf you want me to translate post, react the post with flag-emoji which language you want!\n\
        \nみなさん、こんにちは！私はマルチリンガルマスターです。\
        \n私はこのサーバーのどんなテキスト投稿も翻訳することが出来ます。\
        \n翻訳して欲しい時は、その投稿に翻訳したい言葉の国旗をリアクションしてくださいね。")
    }
})

client.on('messageReactionAdd', (obj)=>{
    let orig = obj.message
    let emoji = obj.emoji
    doTranslate(orig.content.toString(), emoji_flags[emoji.name], (result)=>{
        let origURL = 'https://discordapp.com/channels/'+orig.channel.guild.id+'/'+orig.channel.id+'/'+orig.id
        let embed = new Discord.RichEmbed()
            .setAuthor(orig.author.username, orig.author.displayAvatarURL)
            .setColor('GOLD')
            .setTimestamp(orig.createdAt)
            .addField('Translated: ',result!=null? result : "Sorry, I can't translate this message. :sob: ")
            .setFooter('Powered by Google Translation API and @advanced_bear.')
        obj.message.reply({embed})
    })
})
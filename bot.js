const Discord = require('discord.js');
const client = new Discord.Client();
const fetch = require('node-fetch')

client.login(process.env.BOT_TOKEN);
let cursed = "k̶i̸l̴l̷ ̵p̷u̵r̶g̶e̵ ̵k̶i̴l̷l̴ ̷m̵y̷s̵t̶e̵r̶i̵o̸u̷s̶ ̸m̶i̵s̸c̴h̶e̵v̶i̷o̶u̸s̵ ̴k̷i̴l̵l̸ ̴p̵u̴r̴g̴e̶ ̸k̶i̷l̶l̷ ̴t̴h̵e̴m̶ ̴a̴l̴l̷ ̴k̸i̸l̷l̷ ̸w̷i̷t̵h̸o̸u̷t̵ ̶m̷e̴r̷c̵y̷ ̸k̶i̵l̷l̷ ̸k̵i̶l̵l̵ ̴k̶i̵l̶l̷ ̶p̴u̴r̶g̶e̶ ̴k̸i̶l̵l̸ ̶m̷y̶s̷t̷e̷r̸i̴o̴u̶s̷ ̷m̷i̵s̵c̴h̵e̷v̵i̷o̵u̸s̴ ̷k̷i̷l̷l̷ ̵p̸u̷r̸g̸e̷"
let shuffled

//Purge Channel ID: 832123847733936214
//Purge Message ID: 832132846000275477
client.on('ready', async () => {
	console.log('Ready!');
	
	let purge_channel = await client.channels.fetch('832123847733936214');
	let purge_message = await purge_channel.messages.fetch('832132846000275477')

	setInterval(async () => {
		shuffled = cursed.split('').sort(function(){return 0.5-Math.random()}).join('');
	}, 10000)

	setInterval(async () => {
		let embed = await getEmbed();
		
		var deadline = new Date("04/18/2021")
		var currentTime = new Date()
		var delta =	(deadline-currentTime) / 1000
		var days = Math.floor(delta / 86400);
		delta -= days * 86400;
		var hours = Math.floor(delta / 3600) % 24;
		delta -= hours * 3600;
		var minutes = Math.floor(delta / 60) % 60;
		delta -= minutes * 60;
		var seconds = Math.floor(delta % 60); 

		//console.log(days + "  " + hours + "  " + minutes + "  " + seconds)

		if (seconds == 0 || seconds == 30)
			embed.setDescription(cursed)
		// if (seconds == 10 || seconds == 20 || seconds == 30 || seconds == 40 || seconds == 50)
		else
			embed.setDescription(shuffled)
	

		embed.addFields(
			{name: '\u200B', value: "```fix\n"+days + " d̶a̶y̴s  " + hours + " h̴o̶u̷r̶s  " + minutes + " m̸i̴n̵u̵t̷e̸s  " + seconds + " s̷e̷c̶o̵n̸d̸s   \n```"},
			{name: '\u200B', value: "s̷t̵a̴r̴e̷ ̸a̶t̸ ̵i̶t̵ ̸f̵o̷r̶ ̸t̵o̴o̵ ̸l̵o̴n̴g̸ ̷a̵n̵d̴ ̸y̵o̸u̷ ̴m̶i̸g̷h̷t̵ ̵g̸e̸t̸ ̸l̴o̶s̵t̷"}
		)

		
		purge_message.edit(embed)

		if (days == 0 && hours == 0 && minutes == 0 && seconds == 0) {
			console.log("timer finished")
			return;
		}
	}, 5000)
});

let prefix = '$'

client.on('message', async message => {
    if (!message.content.startsWith(prefix)) return;

    const args = message.content.trim().split(/ +/g);
    const cmd = args[0].slice(prefix.length).toLowerCase();
  
    if (cmd == 'doit') {
        connectCommand(args,message)
    } else if (cmd == 'dm') {
		dmCommand(args, message)
	} else if (cmd == 'play') {
		playCommand(args,message)
	}
});

async function playCommand(args, message) {
	let channel = await client.channels.fetch(args[1])
	let connection = await channel.join()

	if (connection) {
		console.log("Successfully connected.");
		let dispatcher = connection.play(args[2])
		const wait = delay => new Promise(resolve => setTimeout(resolve, delay));
		await wait(10000);
		channel.leave()
	}
}

function leaveC(channel) {
	channel.leave()
	return 1
}

async function dmCommand(args, message) {
	let user = await client.users.fetch(args[1])
	user.send(args[2]).then(connected => {
		console.log('sent')
	}).catch(e => {
		console.error(e)
	})
}

async function connectCommand(args, message) {
	let channel = await client.channels.fetch(args[1])
	channel.join().then(connection => {
		// Yay, it worked!
		console.log("Successfully connected.");
	  }).catch(e => {
		// Oh no, it errored! Let's log it to console :)
		console.error(e);
	  });
}

async function getEmbed() {
    let embed = await new Discord.MessageEmbed()
    .setTitle("P̷͍̲͠U̸̺̯̓̐͠R̶̬̦͜͝Ĝ̴̻͔́Ę̶͕̳͛ ̵̨̰̌ͅC̴̘̟̆̒̃Õ̴̪͇̆̉ͅU̵͖̲̿N̶͈̓T̴̢̑Ḑ̶̻́̔O̴̖͎̫͂W̵̧͕̮̏̽N̸͍͆")
    .setThumbnail('https://static.wikia.nocookie.net/memes-pedia/images/b/bc/44b.jpg/revision/latest?cb=20200815203649&path-prefix=es')
	.setFooter("w̵̤̎h̴͈̏ō̵̞ ̴̥̕k̵̤͗í̶̼l̴̦̂l̷̗̏e̷̼̍d̶̬̕ ̷̛̝m̸̘̅e̴̥͑?̴͉͠")
    
	return embed;
}
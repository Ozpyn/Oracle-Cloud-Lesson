
+ [Intro](#in-the-cloud)
+ [Details](#details)
+ [Create VM](#create-a-vm-instance)
+ [VM Connect](#connect-to-the-running-vm)
+ [Bot Stuff](#bot-stuff)
    + [JavaScript](#javascript)
    + [Python](#python)

# In the Cloud

Before getting started (before coming to the meeting) please ensure you have signed up for an oracle cloud account, *the setup takes a little bit to do and also for Oracle to verify details*.
https://www.oracle.com/cloud/free/

Be sure to also install a functional ssh software. MacOS and many linux versions support ssh via the terminal by default. Windows PowerShell (not cmd.exe to my knowledge) also natively supports ssh. There are a variety of chrome extentions for chromebooks that add ssh functionality.

If using PuTTY, PuTTY KeyGen is also needed to convert ssh keys into putty keys.

---
`Take note: a credit card is required for making an account. Although if you stay within the constraints of the "always free tier" the card will not be charged.`

`If you wish to be extra careful to not be charged, I reccomend using privacy.com, they allow you to make a temporary card, which can be turned off after making an oracle account.` https://privacy.com/

## Details

In efforts to get more cusomers using their new infrastructure (using Ampere Arm), Oracle (the java people) made their free tier a fair bit more powerful. Usable processing power includes 4 cpu cores and 24 gb of ram. The resources can be split into multiple instances or pooled into just one.

With such a compuing instance somebody could (for example): Host a website, Host a Minecraft Server, Have a remote VSCode Development Server (Similar to Kent's CS wasp and hornet), make a RESTful API, Host a Discord Bot, and many others.

The most common way to host a website on a server involves a lengthy process of messing around with Apache2 or with bundles that include Apache2. This obviously is not the only website hosting tool, however it does seem to be the only beginner friendly one that I have found.

For the purposes of this lesson I suggest only allocating 2 cores and 8gb of ram to the Server instance. (Oracle has support for changing the allocation of resources later on, if desired.)

## Create a VM Instance

First, we need to create a VM instance. To get started, click on 'Create a VM Instance' on the landing page after signing in. You may have to scroll down to the 'Launch Resources' panel.

![Create VM Instance.](/images/launch-resources.png "VM Instance")

Give your VM instance a name (I called mine “hacksu-lesson"). You can just leave the default (“root”) compartment selected. You can also leave the "availability domain" as the default.

![Name-Placement.](/images/compute.png "VM Name")

### Image and Shape

Next up, Image and Shape. Make sure you have the "Oracle Linux" image selected. Now on to the shape, this is where you allocate resources to your instance. Select "Ampere" as the desired shape series. As referenced earlier, I reccomend using 2 cores and 8gb of ram. If you attempt to use more resources than are available to you Oracle Cloud will warn you that you have exceeded your service limit.

![Image and Shape.](/images/image-shape.png "Image and Shape")

![Shape.](/images/shape-specify.png "Shape Specify")

(Editing Oz getting in the way here, after going  back through the steps, it looks like most of the always free resources using ampere arm have been claimed, this isnt an issue however, because we can use the VM.Standard.E2.1.Micro from the previous generation tab. Good luck, and have fun! I do say it is a smidgen slower than I would like. It has a maximum of 1 core and 1gb of RAM.)

Okay now that we've defined computing variables, verify that your shape variable contains the "always free-eligible" tag.

![Verify.](/images/always-free-verify.png "Verify")

### Networking

We’ll need to choose a virtual cloud network (VCN). Select ‘Create a new virtual cloud network’. Then, choose ‘Create a public subnet’ and choose names that are descriptive (You will thank yourself later, for the most part the names cannot change). Finally, make sure that ‘Assign a public IPv4 address’ is selected (required to make a connection via ssh).

![Networking.](/images/networking.png "Networking")

### SSH

Generate new ssh keys for a safe connection to your server. I would not reccomend using the 'No SSH keys' options.

![SSH-Keys.](/images/ssh-keys.png "SSH-Keys")

Save your keys in a safe place and make a backup in another safe place. (The keys are very difficult to remake)

---

Now, after all of those shenanegans you can click create on your vm.

![Create.](/images/create.png "Create")

After clicking create, you will be redirected to the VM details page, wait to continue until it is done provisioning.

## Connect to the Running VM

After the VM has provisioned its public ip-address and username will become visible. Be sure to take note and save these in a safe place.

![General Info.](/images/gen-info.png "General Info")

Using your preferred SSH client: connect to the server with the provided username and ip address. (e.g. `ssh usr@10.10.10.10 -i ~/Downloads/key.key` )

## Bot Stuff

There are two routes we can take from here, depending on the bot you have or want to build. Personally I prefer JavaScript, so that is the guide I will follow, however if you wish to host the Python bot you made in a previous lesson there will be instructions on how to do that here.

For both options you will need to create a discord application for the bot.

1. Open the [Discord developer portal](https://discord.com/developers/applications) and log into your account.
2. Click on the "New Application" button.
3. Enter a name and confirm the pop-up window by clicking the "Create" button.\
4. Select the "Bot" tab in the left pane.
5. Click the "Add Bot" button on the right and confirm the pop-up window by clicking "Yes, do it!". Congratulations, you're now the proud owner of a shiny new Discord bot! You're not entirely done, though.

Okay listen up bits and bobs, this next part is crucially important, not only for the security of your bot, but also every server it might be in, and even your server. You are about to copy your discord bot token, do not share this under any circumstances, we will use a config file to reasonably obfuscate this. If you decide to put your bot on any git type service, please use a .gitignore file to make it so the config file doesn't get uploaded.

6. Go to 'Build-A-Bot' under the 'Bot' tab, click 'Reset Token' to snag the super secret login info.
7. We also need to enable the 'Message Content Intent' in order for the bot to recieve input. (Dont forget to click save!)
8. Now, to add the bot to our server, sneak over to the "OAuth2" tab on the left.
9. Sneak to the 'URL Generator' tab, There are a bunch of scopes here, we only need the 'Bot' scope, this can be changed later.
10. We will also give the bot all text permissions.
11. With the generated link, we can add the bot to our server.


#

### JavaScript

Firstly, we will install NodeJS, as this will help us run the discord bot.

`sudo yum install nodejs`

Then, make a project directory with `mkdir BOTNAME`, navigate there `cd BOTNAME`.

Initialize the NodeJS project: `npm init -y` the '-y' modifier will automatically fill out small details to start the project.

Install DiscordJS with `npm install discord.js`, this package will allow the bot to actually communicate with discord.

If you have already made a JavaScript discord bot, then it should be aas simple as downloading the bot files to your server. (VSCode is really cool, as it allows you to click and drag files from your local machine.) 

If you haven't made a bot yet, thats totally okay. We will make a simple one now.

Run `touch config.json` then `nano config.json` and enter the following: 
```
{
    "token": "YOUR_TOKEN_HERE",
    "prefix": "YOUR_PREFIX_HERE"
}
```

replace YOUR_TOKEN_HERE with the secret token you copied from the Discord Developer page.

`CTRL + X` to exit nano.

With the initialization command we ran earlier, the pre-defined entrypoint was set to `index.js`. Small issue though, that does not exist, so lets make one! Run `touch index.js`, then depending on the SSH service you are using (Point & Click or CLI), open index.js. (CLI: nano index.js). 

The heading of the file should include all imports.

```
const Discord = require('discord.js');
const config = require('./config.json');
```

Next, we define what the bot will be able to do:

```
const client = new Discord.Client({
    intents: Discord.IntentsBitField.Flags.Guilds
        | Discord.IntentsBitField.Flags.GuildMessages
        | Discord.IntentsBitField.Flags.MessageContent
});
```

According to the intents that are requested, the bot is able to read all messages. (In order to check for when it is called upon)

To finish setting up the bot (sans any commands) add the following code.

```
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);
});

client.login(config.token);
```

This will pop a message in your command line when the bot is confirmed to be online.
It will also log into Discord given the secret token.

Now, lets write the command interpreter and a command.

```
client.on('messageCreate', msg => {
    if (msg.author.bot) return;
    if (msg.content.indexOf(config.prefix) !== 0) return;
    const input = msg.content.toLowerCase();
    const args = input.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift();
    switch (command) {
        case "ping":
            console.log(`Pinged!`)
            msg.channel.send('Pong!');
            break;
    }

});
```

The code that you've just written will do a few things: Ignore inputs given by bots, Ignore inputs that do not start with the given prefix, makes user input lowercase (for easier processing), splits user input into multiple arguments, and houses commands. If you wish to write new commands, it should be rather simple, just add a new case in the switch statement.

`CTRL + X` to exit nano.

One more step before we can run the bot run `nano package.json`, and make sure your scripts looks like the following:

```
  "scripts": {
    "start": "node index.js"
  },
```

Any other scripts can be safely removed.

`CTRL + X` to exit nano.

AND FINALLY, we can run `npm start` to run our Discord Bot. (Speaker Note: Call for hands of any questions)

### Python

Install Python first my friend. `sudo yum update -y` then `sudo yum install -y python3` and also: `sudo yum install -y python3-pip`

Next, make a folder to house the bot: `mkdir BOTNAME`

Install Discord Python with the following command `pip install discord.py`

Make a file called `bot.py` and `config.json`.

```
touch bot.py
touch config.json
```

To edit your config file: `nano config.json` and enter the following:

```
{
    "token": "YOUR_DISCORD_BOT_TOKEN",
    "prefix": "YOUR_PREFIX_HERE"
}
```

Edit your bot file with `nano bot.py` and add the following:
These are imports that help the bot function.
```
import discord
from discord.ext import commands
import json
```


This allows the bot to parse the json file.
```
with open('config.json', 'r') as f:
    config = json.load(f)
```

Allows the bot to respond to the defined prefix.
```
bot = commands.Bot(command_prefix=config['prefix'])
```

The following spits out commentary in the console when the bot is running.
```
@bot.event
async def on_ready():
    print(f'{bot.user.name} has connected to Discord!')
```

The command structure for bot commands.
```
@bot.command(name='ping')
async def ping(ctx):
    await ctx.send('Pong!')
```

Allows the bot to sign into Discord.
```
bot.run(config['token'])
```


Start that goober with `python3 bot.py` or `python bot.py` (whichever works).
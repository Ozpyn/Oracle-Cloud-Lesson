import discord
from discord.ext import commands
import json

with open('config.json', 'r') as f:
    config = json.load(f)

intents = discord.Intents(guilds=True, guild_messages=True, messages=True)

bot = commands.Bot(command_prefix=config['prefix'], intents=intents)

@bot.event
async def on_ready():
    print(f'{bot.user.name} has connected to Discord!')

@bot.command(name='ping')
async def ping(ctx):
    await ctx.send('Pong!')

bot.run(config['token'])

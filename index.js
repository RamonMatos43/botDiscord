const config = require('./config.json')
const { Client, GatewayIntentBits, Partials, ActivityType, EmbedBuilder,  } = require('discord.js')

const client = new Client({
    intents: [
        GatewayIntentBits.AutoModerationConfiguration,
        GatewayIntentBits.AutoModerationExecution,
        GatewayIntentBits.DirectMessageReactions,
        GatewayIntentBits.DirectMessageTyping,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.GuildBans,
        GatewayIntentBits.GuildEmojisAndStickers,
        GatewayIntentBits.GuildIntegrations,
        GatewayIntentBits.GuildInvites,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.GuildMessageTyping,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.GuildScheduledEvents,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildWebhooks,
        GatewayIntentBits.Guilds,
        GatewayIntentBits.MessageContent
    ],
    partials: [
        Partials.Channel,
        Partials.GuildMember,
        Partials.GuildScheduledEvent,
        Partials.Message,
        Partials.Reaction,
        Partials.ThreadMember,
        Partials.User
    ]
})

const token = config.token

client.on('ready', async () => {
    let ativy = [
        `Bio 1`,
        `Bio 2`,
        `Bio 3`
    ],
    at = 0;

    await setInterval(() => client.user.setPresence({
        activities: [
            {
                name: `${ativy[at++ % ativy.length]}`,
                type: ActivityType.Watching
            }
        ],
        status: 'dnd' // dnd = Ocupado / idle = Ausente / invisible = Invisivel / online = Online
    }), 1000 * 5)

    if (!client.user.avatarURL()) return console.log('[ERROR]: Defina uma foto de perfil para o Bot!')

    console.log(`[BOT] Carregando Comandos.....`)

    let commands;

    // await client.application.commands.set([]) // Executar toda vez que quiser apagar todos os comandos
    commands = client.application.commands

    await commands.create({
        name: 'ping',
        description: 'Verificar Latência'
    });

    console.log(`[BOT] ${client.user.username} Is Online!`)
});

client.on('interactionCreate', async (interaction) => {
    if (interaction.isCommand()) {
        if (interaction.commandName == 'ping') {
            const embedPing = new EmbedBuilder()
            .setAuthor({ name: interaction.user.tag, iconURL: interaction.user.avatarURL({ dynamic: true }) })
            .setTitle(`Verificar Ping`)
            .setDescription(`> ⚡***Ping:*** *${Date.now() - interaction.createdTimestamp}ms*`)
            .setTimestamp()
            .setColor('Random')
            .setThumbnail(interaction.user.avatarURL({ dynamic: true }))
            .setFooter({ text: `${client.user.tag} By ETERNOS1X#7227`, iconURL: client.user.avatarURL() })

            await interaction.reply({ embeds: [embedPing], ephemeral: true })
        }
    }
});

client.login(token)
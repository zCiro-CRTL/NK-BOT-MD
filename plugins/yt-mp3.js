/**
[ By @NeKosmic || https://github.com/NeKosmic/ ]
**/
let handler = async (m, { conn, command, text, args }) => {
	if (!text) return m.reply(`Que desea descargar de Youtube?, Ejemplo de uso: \n\n${Prefijo + command} https://youtu.be/PPNzvu5RYq4`)
	if(!isUrl(args[0]) && !args[0].includes('youtu')) return reply('*[ ! ] Link inválido*\n_Por favor, use un link de YouTube_\n')
	let name = await conn.getName(m.sender)
	let mcarga = m.reply(`_Procesando, ${name} por favor espere..._`)
	await mcarga
    let ytm3 = encodeURIComponent(text)
try {
	let apiytdl = await fetchJson(`https://latam-api.vercel.app/api/ytmp3_2?apikey=${MyApiKey}&q=${ytm3}`)
	let thumbapi = await getBuffer(apiytdl.logo) 
	conn.sendMessage(m.chat, { audio: { url: apiytdl.descarga }, contextInfo:{"externalAdReply":{"title": `${apiytdl.titulo}`,"body": `${NombreDelBot} 🔥}`,"previewType": "PHOTO","thumbnailUrl": ``,"thumbnail": thumbapi,"sourceUrl": `${apiytdl.descarga}`}}, mimetype: 'audio/mpeg', fileName: `${apiytdl.titulo}.mp3` }, { quoted: m }).catch(e => {conn.sendButton(m.chat, `*[ ! ] Ocurrio un error inesperado u.u [ ! ]*`, `Toque el boton para usar otra alternativa`, NombreDelBot, ['[ ♻️ REINTENTAR ]', Prefijo+`yta ${text}`], m)})
} catch (e) {
m.reply(`[ ! ] Error, vuelva a intentarlo mas tarde...`)
}
}

handler.help = ['ytmp3 <link>']
handler.tags = ['servicio']
handler.command = /^(ytmp3)$/i
handler.limit = true

export default handler
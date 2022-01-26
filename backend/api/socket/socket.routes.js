
// elestic search

const { Client } = require('@elastic/elasticsearch')
const client = new Client({
    cloud: {
        id: 'mixtape:ZXUtd2VzdC0xLmF3cy5mb3VuZC5pbyQ5ODhjNDEyYWQ0ODU0NzAxYTA2NGQ1MTNjYmE1NTRiNyRkYTU0MDMzZmU1MzY0NzRlODQ3YTU3NTU0MWVhMDY4Yw==',
    },
    auth: {
        username: 'elastic',
        password: 'Z0tL1FfyxOJHmUVO5pko0Vn3'
    }
})

module.exports = connectSockets
let msgs = []
let msgsfound = []
function connectSockets(io) {
    io.on('connection', socket => {
        console.log('CONNECTED ID: ', socket.id);
        // console.log('SOCKET LOG IN',socket);
        // messages sockets
        let totalConnected = io.engine.clientsCount;
        socket.emit('getCount', totalConnected);
        socket.emit('message history', msgs);
        socket.on('is typing', isTyping => {
            io.to(socket.myRoom).emit('type msg', isTyping);
        })
        socket.on('is not typing', isTyping => {
            io.to(socket.myRoom).emit('stop type msg', isTyping);
        })


        socket.on('send message', async (message) => {
            console.log('MESSAGE :', message);

            msgs.unshift(message)
            io.to(socket.myRoom).emit('chat message', message.msg);

            if (message.msg.replyToMsg) {
                elasticSearchIndexData(message)
            }
            // if(message.msg.name === ''){
            //     message.msg.name = 'Guest';
            // }
            if (message.msg.txt.toLowerCase().includes('?')) {
                console.log('is q ?')
                let messagesFound = await elasticSearch(message).catch(console.log)
                console.log('messagesFound', messagesFound)
                // if (messagesFound.length === 0) return  
                let messagefound = {
                    msg: { 
                        name:'bot',
                        txt: messagesFound[0]._source.answer
                    },
                    roomId: message.roomId
                  }
                  console.log('messagefound',messagefound)

                  io.to(socket.myRoom).emit('chat message',messagefound.msg);
            }

          


            // msgs.unshift(message)
            // io.to(socket.myRoom).emit('chat message', messagesFound[0]._source.message);
            // io.to(socket.myRoom).emit('chat message', 'messagesFound[0]._source.message');
            // console.log('maessagse msg : ', message.msg);
            // console.log('maessagse msg : ', message.msg.name);
            // console.log('maessagse msg : ', message.msg.txt);
            // 
            // 
            // console.log('messagesFound array :', message._source.name , message._source.message ,typeof message._source.message)
            // messagesFound.map( async (message) =>{           
            //     console.log('socket.myRoom :', socket.myRoom )
            //     msgs.unshift(message)
            // })
        })

        // socket.on('chat found', (message) => {
        //     console.log('MESSAGE chat message:', message);

        //     // msgs.unshift(message)
        //     // console.log('msgs :',msgs)
        // })

        async function elasticSearchIndexData(message) {
            // messages
            /* Delete index */
            // client.indices.delete({
            //   index: 'messages',
            // }).then(function (resp) {
            //   console.log("Successful query!");
            //   console.log(JSON.stringify(resp, null, 4));
            // }, function (err) {
            //   console.trace(err.message);
            // });
 
            // Let's start by indexing some data
            console.log('elasticSearchIndexData messages',message)
            await client.index({
                index: 'messages',
                // type: '_doc', // uncomment this line if you are using {es} ≤ 6
                body: {
                    question: message.msg.replyToMsg,
                    answer: message.msg.txt, 
                }
            })

        }

        async function elasticSearch(message) {
            // console.log('elasticSearch',message)
            console.log(' elasticSearch message.msg.txt',message.msg.txt)
            // We need to force an index refresh at this point, otherwise we will not
            // get any result in the consequent search
            await client.indices.refresh({ index: 'messages' })

            // Let's search!
            const { body } = await client.search({
                index: 'messages',
                 // type: '_doc', // uncomment this line if you are using {es} ≤ 6

                body: {
                    "query": {
                        "bool": {
                            "must": {
                                "match": {
                                    "question": message.msg.txt
                                }
                            },
                            // "must": {
                            //     "bool": {
                            //         "should": [
                            //             {
                            //                 "match": {
                            //                     "message": "recommend"
                            //                 }
                            //             },
                            //         ],

                            //     }
                            // },
                            // "must": [
                            //     {
                            //         "terms": {
                            //             "message": ['funk', 'pop', 'rock', 'electro', 'classic', 'israeli', 'techno', 'trance']
                            //         }
                            //     }
                            // ],
                        }
                    }

                }
            }) // end of search function 
            console.log('elestic search result ', body.hits.hits)
            return body.hits.hits
        }

        socket.on('clear chat', () => {
            io.to(socket.myRoom).emit('clear-all-chat');
            msgs = [];
        })
        socket.on('send gif', gif => {
            io.to(socket.myRoom).emit('gif', gif);
        })
        socket.on('set-song-playing', song => {
            console.log('set-song-playing', song)
            io.to(socket.myRoom).emit('play-song', song);
        })


        // mixs sockets
        socket.on('first-song-play', () => {
            io.to(socket.myRoom).emit('start-first-song');
        })

        socket.on('move-to', currTimePlaying => {
            io.to(socket.myRoom).emit('song-time', currTimePlaying);
        })

        socket.on('next-song', nextSong => {
            io.to(socket.myRoom).emit('play-song', nextSong);
        })

        socket.on('prev-song', nextSong => {
            io.to(socket.myRoom).emit('play-song', nextSong);
        })

        socket.on('pause-song-playing', currSong => {
            io.to(socket.myRoom).emit('pause-song', currSong);
        })


        socket.on('pause-global-player', () => {
            io.to(socket.myRoom).emit('pause-song');
        })


        socket.on('play-global-player', () => {
            io.to(socket.myRoom).emit('play-song');
        })


        // socket.on('send-song-to-all', song => {
        //     io.to(socket.myRoom).emit('play-song',song)
        // })
        socket.on('send-song-to-all', song => {
            console.log('play-song', song)
            io.to(socket.myRoom).emit('play-song', song)
        })
        socket.on('play-preview-curr-song', song => {
            io.to(socket.myRoom).emit('play-song-old', song)
        })

        socket.on('move-to-new-time', currTimePlaying => {
            io.to(socket.myRoom).emit('song-time-new', currTimePlaying);
        })
        socket.on('song-time-new-semi', currTimePlaying => {
            io.to(socket.myRoom).emit('song-time-final', currTimePlaying);
        })

        socket.on('mix-updated', mix => {
            console.log('mix-updated')
            io.to(socket.myRoom).emit('mix-is-updated', mix);
        })

        socket.on('sync-songs', time => {
            io.to(socket.myRoom).emit('sync-songs-time', time);
        })

        socket.on('newTime', time => {
            io.to(socket.myRoom).emit('setNewTime', time);
        })


        socket.on('setOn', time => {
            io.to(socket.myRoom).emit('setOnTwo', time);
        })

        socket.on('disconnect', room => {
            socket.leave(room)
            console.log('DISCONNECTED ID: ', socket.id);
        });


        socket.on('return-time', time => {
            io.to(socket.myRoom).emit('returnNewTime', time);
        })


        socket.on('join room', room => {
            console.log('SOCKY MY ROOM:', socket.myRoom);
            // console.log('JOINED TO ROOM ',room);
            // socket.username = 'user';
            // io.to(room).emit('user joined',{name:'System message',txt:'New user has joind the chat'});
            if (socket.myRoom) {
                console.log('LEAVED ROOM ', socket.myRoom);
                socket.leave(socket.myRoom)
            }
            socket.join(room);
            console.log('JOINED ROOM ', room);
            socket.myRoom = room;
            // console.log('SOCKY MY ROOM:',socket.myRoom);
        })
    })
}
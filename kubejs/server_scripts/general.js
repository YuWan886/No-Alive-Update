
// ServerEvents.commandRegistry(event => {
//     const { commands: Commands, arguments: Arguments } = event;

//     event.register(
//         Commands.literal('na')
//             .then(
//                 Commands.literal('menu')
//                     .executes(context => {
//                         const player = context.source.getPlayer();
//                         if (player.hasPermissions(2)) {
//                             player.runCommandSilent(`function na:menu/main`);
//                         }
//                         return 1;
//                     })
//             )
//     );
// });


PlayerEvents.chat(event => {
    const player = event.player;
    const message = event.message.toLowerCase().trim();

    switch (message) {
        case '扣1获得gs神犬':
            player.runCommandSilent('kick @s');
            player.tell(`已神犬 ${player.name}`);
            event.cancel();
            break;
    }
});


// PlayerEvents.tick(event => {
//     const player = event.player
//     player.paint({
//         emerald: {
//             type: 'item',
//             item: 'minecraft:emerald',
//             visible: true,
//             alignX: 'center',
//             alignY: 'center'
//         }
//     })
// })
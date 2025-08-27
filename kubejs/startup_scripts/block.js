StartupEvents.registry('block', event => {
    event.create('lucky_block', 'basic')
        .soundType('stone')
        .hardness(0.1)
})
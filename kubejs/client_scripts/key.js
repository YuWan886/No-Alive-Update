ClientEvents.tick(event => {
    const keyl = global.regKeyL;
    if (keyl.isDown()) {
        if (!event.player.getPersistentData().getBoolean("OpenMenu")) {
            event.player.sendData("OpenMenu")
            event.player.getPersistentData().putBoolean("OpenMenu", true);
        }
    } else {
        if (event.player.getPersistentData().getBoolean("OpenMenu")) {
            event.player.getPersistentData().putBoolean("OpenMenu", false);
        }
    }

    const keyb = global.regKeyB;
    if (keyb.isDown()) {
        if (!event.player.getPersistentData().getBoolean("OpenShop")) {
            event.player.sendData("OpenShop")
            event.player.getPersistentData().putBoolean("OpenShop", true);
        }
    } else {
        if (event.player.getPersistentData().getBoolean("OpenShop")) {
            event.player.getPersistentData().putBoolean("OpenShop", false);
        }
    }
})
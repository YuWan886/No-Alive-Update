/////////////////////////
// Menu Implementation //
/////////////////////////

let MenuState = function (type, player) {
    this.player = player;
    this.type = type;
    this.page = 0;
    player.openChestGUI(type.title, 6, (gui) => this.gui = gui);
    this.showPage();
};

MenuState.prototype.showPage = function () {
    for (let slot of this.type.pages[this.page]) {
        let btn = this.gui.getSlot(slot.x, slot.y);
        btn.setItem(Item.of(slot.item).withName(Text.of(slot.label)));
        for (let event of ['LeftClicked', 'RightClicked', 'MiddleClicked', 'Swapped', 'Thrown', 'ShiftLeftClicked', 'ShiftRightClicked', 'DoubleClicked']) {
            let handler = slot['on' + event];
            handler && btn['set' + event](() => handler(this.player));
        }
    }
    let disabledItem = "minecraft:barrier";
    let enabledItem = "minecraft:slime_ball";
    let enabled = this.page > 0;
    this.gui.button(0, 5, enabled ? enabledItem : disabledItem, Text.white("上一页").italic(false), () => this.prevPage());
    enabled = this.page < this.type.pages.length - 1;
    this.gui.button(8, 5, enabled ? enabledItem : disabledItem, Text.white("下一页").italic(false), () => this.nextPage());
    let pageNum = this.page + 1;
    this.gui.button(4, 5, Item.of("minecraft:paper", pageNum), "Page #" + pageNum, () => { });
};

MenuState.prototype.clearPage = function () {
    for (let slot of this.type.pages[this.page]) {
        let btn = this.gui.getSlot(slot.x, slot.y);
        btn.setItem("minecraft:air");
        btn.resetClickHandlers();
    }
};

MenuState.prototype.prevPage = function () {
    if (this.page <= 0) return;
    this.clearPage();
    --this.page;
    this.showPage();
};

MenuState.prototype.nextPage = function () {
    if (this.page >= this.type.pages.length - 1) return;
    this.clearPage();
    ++this.page;
    this.showPage();
};

let MenuType = function (title) {
    this.title = title;
    this.pages = [];
};

MenuType.prototype.getPage = function (i) {
    if (this.pages[i] === undefined)
        this.pages[i] = [];
    return this.pages[i];
};

MenuType.prototype.addSlot = function (slot) {
    this.getPage(slot.page).push(slot);
};

MenuType.prototype.show = function (player) {
    new MenuState(this, player);
};


///////////////
// Menu Data //
///////////////

// 主菜单
let mainMenu = new MenuType(Text.blue("主菜单"));
mainMenu.addSlot({
    page: 0, x: 4, y: 1, label: Text.green("开始游戏").italic(false), item: "minecraft:diamond_sword",
    onLeftClicked: (player) => {
        player.closeMenu();
        Utils.server.scheduleInTicks(2, () => {
            player.runCommand("function na:game/game_start");
        })
    }
});
mainMenu.addSlot({
    page: 0, x: 4, y: 2, label: Text.red("结束游戏").italic(false), item: "minecraft:barrier",
    onLeftClicked: (player) => {
        player.closeMenu();
        Utils.server.scheduleInTicks(4, () => {
            player.runCommand("function na:game/end");
        })
    }
});
mainMenu.addSlot({
    page: 0, x: 4, y: 3, label: Text.white("选择模式").italic(false), item: "minecraft:compass",
    onLeftClicked: (player) => modeSelectMenu.show(player)
});
mainMenu.addSlot({
    page: 0, x: 4, y: 4, label: Text.white("设置目标").italic(false), item: "minecraft:target",
    onLeftClicked: (player) => targetSettingMenu.show(player)
});
// 模式
let modeSelectMenu = new MenuType(Text.red("模式选择"));
modeSelectMenu.addSlot({
    page: 0, x: 3, y: 5, label: Text.green("主菜单").italic(false), item: "minecraft:lime_dye",
    onLeftClicked: (player) => mainMenu.show(player)
})
modeSelectMenu.addSlot({
    page: 0, x: 1, y: 1, label: Text.red("团队死斗").italic(false).italic(false), item: "minecraft:iron_sword",
    onLeftClicked: (player) => {
        player.runCommand("scoreboard players set #System GameMode 1");
        deathmatchMapMenu.show(player);
    }
});
modeSelectMenu.addSlot({
    page: 0, x: 3, y: 1, label: Text.aqua("随机乱斗").italic(false), item: "minecraft:golden_sword",
    onLeftClicked: (player) => {
        player.runCommand("scoreboard players set #System GameMode 2");
        randomBattleMapMenu.show(player);
    }
});
modeSelectMenu.addSlot({
    page: 0, x: 5, y: 1, label: Text.lightPurple("个人狙击"), item: "minecraft:bow",
    onLeftClicked: (player) => {
        player.runCommand("scoreboard players set #System GameMode 3");
        sniperMapMenu.show(player);
    }
});
// 死斗地图
let deathmatchMapMenu = new MenuType(Text.green("团队死斗|地图"));
deathmatchMapMenu.addSlot({
    page: 0, x: 3, y: 5, label: Text.green("模式选择").italic(false), item: "minecraft:lime_dye",
    onLeftClicked: (player) => modeSelectMenu.show(player)
})
deathmatchMapMenu.addSlot({
    page: 0, x: 1, y: 1, label: Text.white("awp_india2").italic(false), item: "minecraft:map",
    onLeftClicked: (player) => player.runCommand("scoreboard players set #System MapNumber 1")
});
deathmatchMapMenu.addSlot({
    page: 0, x: 3, y: 1, label: Text.white("dust2").italic(false), item: "minecraft:map",
    onLeftClicked: (player) => player.runCommand("scoreboard players set #System MapNumber 2")
});
deathmatchMapMenu.addSlot({
    page: 0, x: 5, y: 1, label: Text.white("inferno").italic(false), item: "minecraft:map",
    onLeftClicked: (player) => player.runCommand("scoreboard players set #System MapNumber 5")
});
// 乱斗地图
let randomBattleMapMenu = new MenuType(Text.green("随机乱斗|地图"));
randomBattleMapMenu.addSlot({
    page: 0, x: 3, y: 5, label: Text.green("模式选择").italic(false), item: "minecraft:lime_dye",
    onLeftClicked: (player) => modeSelectMenu.show(player)
})
randomBattleMapMenu.addSlot({
    page: 0, x: 1, y: 1, label: Text.white("dust2").italic(false), item: "minecraft:map",
    onLeftClicked: (player) => player.runCommand("scoreboard players set #System MapNumber 2")
});
randomBattleMapMenu.addSlot({
    page: 0, x: 3, y: 1, label: Text.white("gary_indiana").italic(false), item: "minecraft:map",
    onLeftClicked: (player) => player.runCommand("scoreboard players set #System MapNumber 4")
});
// 狙击地图
let sniperMapMenu = new MenuType(Text.green("狙击|地图"));
sniperMapMenu.addSlot({
    page: 0, x: 3, y: 5, label: Text.green("模式选择").italic(false), item: "minecraft:lime_dye",
    onLeftClicked: (player) => modeSelectMenu.show(player)
})
sniperMapMenu.addSlot({
    page: 0, x: 1, y: 1, label: Text.white("dust2").italic(false), item: "minecraft:map",
    onLeftClicked: (player) => event.player.runCommand("scoreboard players set #System MapNumber 2")
});
sniperMapMenu.addSlot({
    page: 0, x: 3, y: 1, label: Text.white("awp_india2").italic(false), item: "minecraft:map",
    onLeftClicked: (player) => event.player.runCommand("scoreboard players set #System MapNumber 1")
});

/////////
// 商店 //
/////////

// 主武器
let mainGunShopMenu = new MenuType(Text.red("枪械商店|主武器"));

// 步枪
mainGunShopMenu.addSlot({
    page: 0, x: 4, y: 0, label: Text.white("步枪").italic(false), item: Item.of('tacz:modern_kinetic_gun', '{GunCurrentAmmoCount:30,GunFireMode:"AUTO",GunId:"tacz:ak47",HasBulletInBarrel:1b,HideFlags:63}')
})
mainGunShopMenu.addSlot({
    page: 0, x: 3, y: 5, label: Text.green("确定").italic(false), item: "minecraft:lime_dye",
    onLeftClicked: (player) => {
        player.closeMenu();
        Utils.server.scheduleInTicks(2, () => {
            player.runCommand("function na:mode/deathmatch/shop");
        })
    }
})
mainGunShopMenu.addSlot({
    page: 0, x: 5, y: 5, label: Text.green("副武器").italic(false), item: Item.of('tacz:modern_kinetic_gun', '{GunCurrentAmmoCount:9,GunFireMode:"SEMI",GunId:"tacz:deagle_golden",HasBulletInBarrel:1b,HideFlags:63}'),
    onLeftClicked: (player) => offGunShopMenu.show(player)
})
mainGunShopMenu.addSlot({
    page: 0, x: 1, y: 1, label: Text.white("AKM 突击步枪").italic(false), item: Item.of('tacz:modern_kinetic_gun', '{GunCurrentAmmoCount:30,GunFireMode:"AUTO",GunId:"tacz:ak47",HasBulletInBarrel:1b}'),
    onLeftClicked: (player) => player.runCommand("scoreboard players set @s MainGunID 101")
})
mainGunShopMenu.addSlot({
    page: 0, x: 2, y: 1, label: Text.green("ISO汉姆洛克 突击步枪").italic(false), item: Item.of('tacz:modern_kinetic_gun', '{GunCurrentAmmoCount:30,GunFireMode:"AUTO",GunId:"nmw2:iso_hemlock_556",HasBulletInBarrel:1b}'),
    onLeftClicked: (player) => player.runCommand("scoreboard players set @s MainGunID 102")
})
mainGunShopMenu.addSlot({
    page: 0, x: 3, y: 1, label: Text.green("M4 突击步枪").italic(false), item: Item.of('tacz:modern_kinetic_gun', '{GunCurrentAmmoCount:30,GunFireMode:"AUTO",GunId:"nmw2:m4",HasBulletInBarrel:1b}'),
    onLeftClicked: (player) => player.runCommand("scoreboard players set @s MainGunID 103")
})
mainGunShopMenu.addSlot({
    page: 0, x: 4, y: 1, label: Text.green("克洛南烈风 战斗步枪").italic(false), item: Item.of('tacz:modern_kinetic_gun', '{GunCurrentAmmoCount:20,GunFireMode:"SEMI",GunId:"nmw2:squall",HasBulletInBarrel:1b}'),
    onLeftClicked: (player) => player.runCommand("scoreboard players set @s MainGunID 104")
})
mainGunShopMenu.addSlot({
    page: 0, x: 5, y: 1, label: Text.red("Bal-27 突击步枪").italic(false), item: Item.of('tacz:modern_kinetic_gun', '{GunCurrentAmmoCount:30,GunFireMode:"AUTO",GunId:"nmw3:bal27",HasBulletInBarrel:1b}'),
    onLeftClicked: (player) => player.runCommand("scoreboard players set @s MainGunID 105")
})
mainGunShopMenu.addSlot({
    page: 0, x: 6, y: 1, label: Text.red("MTZ-556 突击步枪").italic(false), item: Item.of('tacz:modern_kinetic_gun', '{GunCurrentAmmoCount:30,GunFireMode:"AUTO",GunId:"nmw3:mtz556",HasBulletInBarrel:1b}'),
    onLeftClicked: (player) => player.runCommand("scoreboard players set @s MainGunID 106")
})
mainGunShopMenu.addSlot({
    page: 0, x: 7, y: 1, label: Text.red("霍尔格556 突击步枪").italic(false), item: Item.of('tacz:modern_kinetic_gun', '{GunCurrentAmmoCount:30,GunFireMode:"AUTO",GunId:"nmw3:holger556",HasBulletInBarrel:1b}'),
    onLeftClicked: (player) => player.runCommand("scoreboard players set @s MainGunID 107")
})
mainGunShopMenu.addSlot({
    page: 0, x: 1, y: 2, label: Text.red("BAS-B『布鲁恩毒液长枪管』").italic(false), item: Item.of('tacz:modern_kinetic_gun', '{GunCurrentAmmoCount:20,GunFireMode:"AUTO",GunId:"nmw3:basb_bvl",HasBulletInBarrel:1b}'),
    onLeftClicked: (player) => player.runCommand("scoreboard players set @s MainGunID 108")
})
mainGunShopMenu.addSlot({
    page: 0, x: 2, y: 2, label: Text.gold("XM4 突击步枪").italic(false), item: Item.of('tacz:modern_kinetic_gun', '{GunCurrentAmmoCount:30,GunFireMode:"AUTO",GunId:"bo6:xm4",HasBulletInBarrel:1b}'),
    onLeftClicked: (player) => player.runCommand("scoreboard players set @s MainGunID 109")
})
// 冲锋枪
mainGunShopMenu.addSlot({
    page: 1, x: 4, y: 0, label: Text.white("冲锋枪").italic(false), item: Item.of('tacz:modern_kinetic_gun', '{GunCurrentAmmoCount:24,GunFireMode:"AUTO",GunId:"tacz:ump45",HasBulletInBarrel:1b,HideFlags:63}')
})
mainGunShopMenu.addSlot({
    page: 1, x: 3, y: 5, label: Text.green("确定").italic(false), item: "minecraft:lime_dye",
    onLeftClicked: (player) => {
        player.closeMenu();
        Utils.server.scheduleInTicks(2, () => {
            player.runCommand("function na:mode/deathmatch/shop");
        })
    }
})
mainGunShopMenu.addSlot({
    page: 1, x: 5, y: 5, label: Text.green("副武器").italic(false), item: Item.of('tacz:modern_kinetic_gun', '{GunCurrentAmmoCount:9,GunFireMode:"SEMI",GunId:"tacz:deagle_golden",HasBulletInBarrel:1b,HideFlags:63}'),
    onLeftClicked: (player) => offGunShopMenu.show(player)
})
mainGunShopMenu.addSlot({
    page: 1, x: 1, y: 1, label: Text.white("UMP 冲锋枪").italic(false), item: Item.of('tacz:modern_kinetic_gun', '{GunCurrentAmmoCount:24,GunFireMode:"AUTO",GunId:"tacz:ump45",HasBulletInBarrel:1b}'),
    onLeftClicked: (player) => player.runCommand("scoreboard players set @s MainGunID 201")
})
mainGunShopMenu.addSlot({
    page: 1, x: 2, y: 1, label: Text.white("MP5A5 冲锋枪").italic(false), item: Item.of('tacz:modern_kinetic_gun', '{GunCurrentAmmoCount:29,GunFireMode:"AUTO",GunId:"tacz:hk_mp5a5",HasBulletInBarrel:1b}'),
    onLeftClicked: (player) => player.runCommand("scoreboard players set @s MainGunID 202")
})
mainGunShopMenu.addSlot({
    page: 1, x: 3, y: 1, label: Text.white("P90 冲锋枪").italic(false), item: Item.of('tacz:modern_kinetic_gun', '{GunCurrentAmmoCount:89,GunFireMode:"AUTO",GunId:"tacz:p90",HasBulletInBarrel:1b}'),
    onLeftClicked: (player) => player.runCommand("scoreboard players set @s MainGunID 203")
})
mainGunShopMenu.addSlot({
    page: 1, x: 4, y: 1, label: Text.white("ISO45 微型冲锋枪").italic(false), item: Item.of('tacz:modern_kinetic_gun', '{GunCurrentAmmoCount:30,GunFireMode:"AUTO",GunId:"nmw2:iso45",HasBulletInBarrel:1b}'),
    onLeftClicked: (player) => player.runCommand("scoreboard players set @s MainGunID 204")
})
mainGunShopMenu.addSlot({
    page: 1, x: 5, y: 1, label: Text.green("威尔46 微型冲锋枪").italic(false), item: Item.of('tacz:modern_kinetic_gun', '{GunCurrentAmmoCount:30,GunFireMode:"AUTO",GunId:"nmw2:vel46",HasBulletInBarrel:1b}'),
    onLeftClicked: (player) => player.runCommand("scoreboard players set @s MainGunID 205")
})
mainGunShopMenu.addSlot({
    page: 1, x: 6, y: 1, label: Text.green("FSS飓风 微型冲锋枪").italic(false), item: Item.of('tacz:modern_kinetic_gun', '{GunCurrentAmmoCount:50,GunFireMode:"AUTO",GunId:"nmw2:fss",HasBulletInBarrel:1b}'),
    onLeftClicked: (player) => player.runCommand("scoreboard players set @s MainGunID 206")
})
mainGunShopMenu.addSlot({
    page: 1, x: 7, y: 1, label: Text.green("威尔 ").italic(false).append(Text.aqua("卷云").italic(false)), item: Item.of('tacz:modern_kinetic_gun', '{GunCurrentAmmoCount:30,GunFireMode:"AUTO",GunId:"nmw2:vel46_cirrus",HasBulletInBarrel:1b}'),
    onLeftClicked: (player) => player.runCommand("scoreboard players set @s MainGunID 207")
})
mainGunShopMenu.addSlot({
    page: 1, x: 1, y: 2, label: Text.red("AMR9 微型冲锋枪").italic(false), item: Item.of('tacz:modern_kinetic_gun', '{GunCurrentAmmoCount:30,GunFireMode:"AUTO",GunId:"nmw3:amr9",HasBulletInBarrel:1b}'),
    onLeftClicked: (player) => player.runCommand("scoreboard players set @s MainGunID 208")
})
mainGunShopMenu.addSlot({
    page: 1, x: 2, y: 2, label: Text.red("AMR9 ").italic(false).append(Text.white("JAK双头巨人双管改件").italic(false)), item: Item.of('tacz:modern_kinetic_gun', '{GunCurrentAmmoCount:30,GunFireMode:"AUTO",GunId:"jak:jak_ettin",HasBulletInBarrel:1b}'),
    onLeftClicked: (player) => player.runCommand("scoreboard players set @s MainGunID 209")
})
// 狙击枪
mainGunShopMenu.addSlot({
    page: 2, x: 4, y: 0, label: Text.white("狙击枪").italic(false), item: Item.of('tacz:modern_kinetic_gun', '{GunCurrentAmmoCount:5,GunFireMode:"SEMI",GunId:"tacz:m700",HasBulletInBarrel:1b,HideFlags:63}')
})
mainGunShopMenu.addSlot({
    page: 2, x: 3, y: 5, label: Text.green("确定").italic(false), item: "minecraft:lime_dye",
    onLeftClicked: (player) => {
        player.closeMenu();
        Utils.server.scheduleInTicks(2, () => {
            player.runCommand("function na:mode/deathmatch/shop");
        })
    }
})
mainGunShopMenu.addSlot({
    page: 2, x: 5, y: 5, label: Text.green("副武器").italic(false), item: Item.of('tacz:modern_kinetic_gun', '{GunCurrentAmmoCount:9,GunFireMode:"SEMI",GunId:"tacz:deagle_golden",HasBulletInBarrel:1b,HideFlags:63}'),
    onLeftClicked: (player) => offGunShopMenu.show(player)
})
mainGunShopMenu.addSlot({
    page: 2, x: 1, y: 1, label: Text.white("M700 狙击步枪").italic(false), item: Item.of('tacz:modern_kinetic_gun', '{AttachmentSCOPE:{Count:1b,id:"tacz:attachment",tag:{AttachmentId:"tacz:scope_elcan_4x",ZoomNumber:3}},GunCurrentAmmoCount:5,GunFireMode:"SEMI",GunId:"tacz:m700",HasBulletInBarrel:1b}'),
    onLeftClicked: (player) => player.runCommand("scoreboard players set @s MainGunID 301")
})
mainGunShopMenu.addSlot({
    page: 2, x: 2, y: 1, label: Text.white("精密国际AWM 狙击步枪").italic(false), item: Item.of('tacz:modern_kinetic_gun', '{AttachmentSCOPE:{Count:1b,id:"tacz:attachment",tag:{AttachmentId:"tacz:scope_elcan_4x",ZoomNumber:3}},GunCurrentAmmoCount:5,GunFireMode:"SEMI",GunId:"tacz:ai_awp",HasBulletInBarrel:1b}'),
    onLeftClicked: (player) => player.runCommand("scoreboard players set @s MainGunID 302")
})

// 副武器
let offGunShopMenu = new MenuType(Text.red("枪械商店|副武器"));

// 手枪
offGunShopMenu.addSlot({
    page: 0, x: 4, y: 0, label: Text.white("手枪").italic(false), item: Item.of('tacz:modern_kinetic_gun', '{GunCurrentAmmoCount:9,GunFireMode:"SEMI",GunId:"tacz:deagle_golden",HasBulletInBarrel:1b,HideFlags:63}')
})
offGunShopMenu.addSlot({
    page: 0, x: 3, y: 5, label: Text.green("确定").italic(false), item: "minecraft:lime_dye",
    onLeftClicked: (player) => {
        player.closeMenu();
        Utils.server.scheduleInTicks(2, () => {
            player.runCommand("function na:mode/deathmatch/shop");
        })
    }
})
offGunShopMenu.addSlot({
    page: 0, x: 5, y: 5, label: Text.green("主武器 ").italic(false), item: Item.of('tacz:modern_kinetic_gun', '{GunCurrentAmmoCount:30,GunFireMode:"AUTO",GunId:"tacz:ak47",HasBulletInBarrel:1b,HideFlags:63}'),
    onLeftClicked: (player) => mainGunShopMenu.show(player)
})
offGunShopMenu.addSlot({
    page: 0, x: 1, y: 1, label: Text.darkPurple("格洛克18型|黑龙纹身").italic(false), item: Item.of('tacz:modern_kinetic_gun', '{GunCurrentAmmoCount:20,GunFireMode:"SEMI",GunId:"mcs2:cs_glock_dragon_tattoo",HasBulletInBarrel:1b}'),
    onLeftClicked: (player) => player.runCommand("scoreboard players set @s OffGunID 401")
})
offGunShopMenu.addSlot({
    page: 0, x: 2, y: 1, label: Text.blue("格洛克18型|红苹果").italic(false), item: Item.of('tacz:modern_kinetic_gun', '{GunCurrentAmmoCount:20,GunFireMode:"SEMI",GunId:"mcs2:cs_glock_candy_apple",HasBulletInBarrel:1b}'),
    onLeftClicked: (player) => player.runCommand("scoreboard players set @s OffGunID 402")
})
offGunShopMenu.addSlot({
    page: 0, x: 3, y: 1, label: Text.darkPurple("格洛克18型|核子反应").italic(false), item: Item.of('tacz:modern_kinetic_gun', '{GunCurrentAmmoCount:20,GunFireMode:"SEMI",GunId:"mcs2:cs_glock_reactor",HasBulletInBarrel:1b}'),
    onLeftClicked: (player) => player.runCommand("scoreboard players set @s OffGunID 403")
})
offGunShopMenu.addSlot({
    page: 0, x: 4, y: 1, label: Text.darkPurple("格洛克18型|城里的月光").italic(false), item: Item.of('tacz:modern_kinetic_gun', '{GunCurrentAmmoCount:20,GunFireMode:"SEMI",GunId:"mcs2:cs_glock_moonrise",HasBulletInBarrel:1b}'),
    onLeftClicked: (player) => player.runCommand("scoreboard players set @s OffGunID 404")
})
offGunShopMenu.addSlot({
    page: 0, x: 5, y: 1, label: Text.blue("格洛克18型|本生灯").italic(false), item: Item.of('tacz:modern_kinetic_gun', '{GunCurrentAmmoCount:20,GunFireMode:"SEMI",GunId:"mcs2:cs_glock_bunsen_burner",HasBulletInBarrel:1b}'),
    onLeftClicked: (player) => player.runCommand("scoreboard players set @s OffGunID 405")
})
offGunShopMenu.addSlot({
    page: 0, x: 6, y: 1, label: Text.blue("格洛克18型|远光灯").italic(false), item: Item.of('tacz:modern_kinetic_gun', '{GunCurrentAmmoCount:20,GunFireMode:"SEMI",GunId:"mcs2:cs_glock_high_beam",HasBulletInBarrel:1b}'),
    onLeftClicked: (player) => player.runCommand("scoreboard players set @s OffGunID 406")
})
offGunShopMenu.addSlot({
    page: 0, x: 7, y: 1, label: Text.aqua("USP消音版|宝蓝之色").italic(false), item: Item.of('tacz:modern_kinetic_gun', '{GunCurrentAmmoCount:20,GunFireMode:"SEMI",GunId:"mcs2:cs_usp_royal_blue",HasBulletInBarrel:1b}'),
    onLeftClicked: (player) => player.runCommand("scoreboard players set @s OffGunID 407")
})
offGunShopMenu.addSlot({
    page: 0, x: 1, y: 2, label: Text.blue("USP消音版|不锈钢").italic(false), item: Item.of('tacz:modern_kinetic_gun', '{GunCurrentAmmoCount:20,GunFireMode:"SEMI",GunId:"mcs2:cs_usp_stainless",HasBulletInBarrel:1b}'),
    onLeftClicked: (player) => player.runCommand("scoreboard players set @s OffGunID 408")
})
offGunShopMenu.addSlot({
    page: 0, x: 2, y: 2, label: Text.red("USP消音版|印花集").italic(false), item: Item.of('tacz:modern_kinetic_gun', '{GunCurrentAmmoCount:20,GunFireMode:"SEMI",GunId:"mcs2:cs_usp_printstream",HasBulletInBarrel:1b}'),
    onLeftClicked: (player) => player.runCommand("scoreboard players set @s OffGunID 409")
})
offGunShopMenu.addSlot({
    page: 0, x: 3, y: 2, label: Text.darkPurple("USP消音版|银装素裹").italic(false), item: Item.of('tacz:modern_kinetic_gun', '{GunCurrentAmmoCount:20,GunFireMode:"SEMI",GunId:"mcs2:cs_usp_whiteout",HasBulletInBarrel:1b}'),
    onLeftClicked: (player) => player.runCommand("scoreboard players set @s OffGunID 410")
})

// 
NetworkEvents.dataReceived("OpenMenu", event => {
    if (event.player.hasPermissions(2)) {
        mainMenu.show(event.player);
    } else {
        event.player.sendSystemMessage(Text.red("权限不足，无法打开菜单。"));
    }
});

NetworkEvents.dataReceived("OpenShop", event => {
    if (event.player.tags.contains("shop")) {
        mainGunShopMenu.show(event.player);
    } else {
        event.player.sendSystemMessage(Text.red("你现在不能打开商店"));
    }
});


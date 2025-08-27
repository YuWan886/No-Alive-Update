// 取消瞄准
TaCZClientEvents.playerAim(event => {
    const NoAimGuns = [
        "mcs2:cs_glock_dragon_tattoo",
        "mcs2:cs_glock_candy_apple",
        "mcs2:cs_glock_reactor",
        "mcs2:cs_glock_moonrise",
        "mcs2:cs_glock_bunsen_burner",
        "mcs2:cs_glock_high_beam",
        "mcs2:cs_usp_royal_blue",
        "mcs2:cs_usp_stainless",
        "mcs2:cs_usp_printstream",
        "mcs2:cs_usp_whiteout",
        "mcs2:cs_m4a1s",
        "mcs2:cs_ak",
        "mcs2:ct_knife",
        "mcs2:t_knife",
        "pixel_gun:fdemon",
        "pixel_gun:ls",
        "pixel_gun:dls",
        "pixel_gun:hh",
        "pixel_gun:rui_yan"
    ]

    if (NoAimGuns.includes(event.getGunId().toString())) {
        event.cancelAim();
    }
})

// 左键近战
TaCZClientEvents.playerShoot(event => {
    const MeleeWeapon = [
        "mcs2:ct_knife",
        "mcs2:t_knife",
        "pixel_gun:fdemon",
        "pixel_gun:ls",
        "pixel_gun:dls",
        "pixel_gun:hh",
        "pixel_gun:rui_yan"
    ]
    if (MeleeWeapon.includes(event.getGunId().toString())) {
        event.cancelShoot();
        event.gunOperator.melee()
        return
    }
})

// 像素射击近战武器
ClientEvents.tick((event) => {
    let handitem = event.player.getMainHandItem();
    let pixelgunmelee = [
        "pixel_gun:fdemon",
        "pixel_gun:ls",
        "pixel_gun:dls",
        "pixel_gun:hh",
        "pixel_gun:rui_yan"
    ];
    if (handitem && handitem.nbt && pixelgunmelee.includes(handitem.nbt.GunId) && handitem.areItemsEqual(Item.of('tacz:modern_kinetic_gun', '{AttachmentMUZZLE:{Count:0b,id:"minecraft:air"},GunCurrentAmmoCount:9999,GunFireMode:"SEMI",GunId:"' + handitem.nbt.GunId + '",HasBulletInBarrel:1b}'))) {
        handitem.setNbt(Item.of('tacz:modern_kinetic_gun', '{AttachmentMUZZLE:{Count:1b,id:"tacz:attachment",tag:{AttachmentId:"pixel_gun:mp"}},GunCurrentAmmoCount:9999,GunFireMode:"SEMI",GunId:"' + handitem.nbt.GunId + '",HasBulletInBarrel:1b}').nbt);
    }
})

// 自瞄
// TaCZClientEvents.playerAim(event => {
//     let player = event.player;
//     let entities = player.level.getEntitiesWithin(
//         AABB.of(player.x - 10, player.y - 10, player.z - 10, player.x + 10, player.y + 10, player.z + 10)
//     );
//     let nearestEntity = null;
//     let minDistance = Infinity;
//     for (let entity of entities) {
//         if (entity !== player &&
//             entity.getType() === "minecraft:mooshroom") {
//             let distance = player.distanceToEntitySqr(entity);
//             if (distance < minDistance) {
//                 minDistance = distance;
//                 nearestEntity = entity;
//             }
//         }
//     }
//     if (nearestEntity) {
//         player.lookAt("eyes", nearestEntity.getEyePosition())

//     }
// })




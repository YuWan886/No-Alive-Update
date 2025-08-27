
TaCZServerEvents.gunDataLoad((event) => {
    const id = event.getId().toString();
    const json = JSON.parse(event.getStdJson());
    // P90
    if (id === "tacz:p90_data") {

        json.ammo = "tacz:57x28";
        json.rpm = 700;
        json.bullet.life = 0.8;
        json.bullet.bullet_amount = 1;
        json.bullet.damage = 7.0;
        json.bullet.tracer_count_interval = 0;
        json.bullet.extra_damage.armor_ignore = 0.2;
        json.bullet.extra_damage.head_shot_multiplier = 1.5;
        json.bullet.extra_damage.damage_adjust = [
            { distance: 30, damage: 8 },
            { distance: 55, damage: 6 },
            { distance: "infinite", damage: 4.5 }
        ];
        json.bullet.speed = 310;
        json.bullet.gravity = 0.15;
        json.bullet.knockback = 0;
        json.bullet.friction = 0.02;
        json.bullet.ignite = false;
        json.bullet.pierce = 1;
        json.ammo_amount = 89;
        json.extended_mag_ammo_amount = [35, 45, 50];
        json.bolt = "closed_bolt";
        json.reload.type = "magazine";
        json.reload.feed.empty = 2.45;
        json.reload.feed.tactical = 2.01;
        json.reload.cooldown.empty = 3.04;
        json.reload.cooldown.tactical = 2.71;
        return event.setJson(JSON.stringify(json));
    }

    // uzi
    if (id === "tacz:uzi_data") {
        json.ammo_amount = 21;
        return event.setJson(JSON.stringify(json));
    }
    // UMP45
    if (id === "tacz:ump45_data") {
        json.bullet.damage = 8.0;
        json.bullet.extra_damage.armor_ignore = 0.2;
        json.bullet.extra_damage.head_shot_multiplier = 1.5;
        json.bullet.extra_damage.damage_adjust = [
            { distance: 30, damage: 8 },
            { distance: 55, damage: 6 },
            { distance: "infinite", damage: 4.5 }
        ];
        return event.setJson(JSON.stringify(json));
    }
    // 像素射击-冲锋狙击枪
    if (id === "pixel_gun:isr_data") {
        json.bullet.damage = 15.0;
        json.bullet.extra_damage.armor_ignore = 0.2;
        json.bullet.extra_damage.head_shot_multiplier = 1.5;
        json.bullet.extra_damage.damage_adjust = [
            { distance: 14, damage: 15.0 },
            { distance: 50, damage: 12.0 },
            { distance: "infinite", damage: 8 }
        ];
        return event.setJson(JSON.stringify(json));
    }
    // 像素射击-最好的朋友
    if (id === "pixel_gun:bf") {
        json.bullet.damage = 8.0;
        json.bullet.extra_damage.armor_ignore = 0.2;
        json.bullet.extra_damage.head_shot_multiplier = 1.5;
        json.bullet.extra_damage.damage_adjust = [
            { distance: 30, damage: 8 },
            { distance: 55, damage: 6 },
            { distance: "infinite", damage: 4.5 }
        ];
        return event.setJson(JSON.stringify(json));
    }
    // 像素射击-黄金好朋友
    if (id === "pixel_gun:gf_data") {
        json.bullet.damage = 8.0;
        json.bullet.extra_damage.armor_ignore = 0.2;
        json.bullet.extra_damage.head_shot_multiplier = 1.5;
        json.bullet.extra_damage.damage_adjust = [
            { distance: 30, damage: 8 },
            { distance: 55, damage: 6 },
            { distance: "infinite", damage: 4.5 }
        ];
        return event.setJson(JSON.stringify(json));
    }
    // 像素射击-印德荣龄枪
    if (id === "pixel_gun:erika_data") {
        json.bullet.damage = 8.0;
        json.bullet.extra_damage.armor_ignore = 0.2;
        json.bullet.extra_damage.head_shot_multiplier = 1.5;
        json.bullet.extra_damage.damage_adjust = [
            { distance: 30, damage: 8 },
            { distance: 55, damage: 6 },
            { distance: "infinite", damage: 4.5 }
        ];
        return event.setJson(JSON.stringify(json));
    }
    // 像素射击-血色佣兵
    if (id === "pixel_gun:bm_data") {
        json.bullet.damage = 16.0;
        json.bullet.extra_damage.armor_ignore = 0.25;
        json.bullet.extra_damage.head_shot_multiplier = 1.75;
        json.bullet.extra_damage.damage_adjust = [
            { distance: 15, damage: 16 },
            { distance: 30, damage: 14 },
            { distance: 50, damage: 12 },
            { distance: "infinite", damage: 10 }
        ];
        return event.setJson(JSON.stringify(json));
    }
    // 像素射击-教父的助手
    if (id === "pixel_gun:ga_data") {
        json.bullet.damage = 16.0;
        json.bullet.extra_damage.armor_ignore = 0.25;
        json.bullet.extra_damage.head_shot_multiplier = 1.75;
        json.bullet.extra_damage.damage_adjust = [
            { distance: 15, damage: 16 },
            { distance: 30, damage: 14 },
            { distance: 50, damage: 12 },
            { distance: "infinite", damage: 10 }
        ];
        return event.setJson(JSON.stringify(json));
    }
    // 像素射击-反重力爆炸机
    if (id === "pixel_gun:agb_data") {
        json.bullet.damage = 12.0;
        json.bullet.extra_damage.armor_ignore = 0.25;
        json.bullet.extra_damage.head_shot_multiplier = 1.5;
        json.bullet.extra_damage.damage_adjust = [
            { distance: 15, damage: 12 },
            { distance: 30, damage: 8 },
            { distance: 50, damage: 6 },
            { distance: "infinite", damage: 4 }
        ];
        json.bullet.gravity = 0.44;
        json.bullet.explosion.explode = false;
        return event.setJson(JSON.stringify(json));
    }
    // 像素射击-灭绝者
    if (id === "pixel_gun:ext_data") {
        json.bullet.damage = 16.0;
        json.bullet.extra_damage.armor_ignore = 0.25;
        json.bullet.extra_damage.head_shot_multiplier = 1.75;
        json.bullet.extra_damage.damage_adjust = [
            { distance: 15, damage: 16 },
            { distance: 30, damage: 14 },
            { distance: 50, damage: 12 },
            { distance: "infinite", damage: 10 }
        ];
        return event.setJson(JSON.stringify(json));
    }
    // 像素射击-Opti不Fine
    if (id === "pixel_gun:opti_data") {
        json.ammo_amount = 60;
        json.rpm = 900;
        json.weight = 1.3
        json.bullet.damage = 15;
        json.bullet.extra_damage.armor_ignore = 0.2;
        json.bullet.extra_damage.head_shot_multiplier = 1.5;
        json.bullet.extra_damage.damage_adjust = [
            { distance: 15, damage: 20 },
            { distance: 30, damage: 18 },
            { distance: "infinite", damage: 12 }
        ];
        return event.setJson(JSON.stringify(json));
    }
    // 像素射击-破坏外骨骼
    if (id === "pixel_gun:armor_b_data") {
        json.bullet.damage = 20;
        json.bullet.explosion.damage = 20;
        json.bullet.explosion.delay = 20;
        json.bullet.extra_damage.armor_ignore = 0.5;
        json.bullet.extra_damage.head_shot_multiplier = 1;
        json.bullet.extra_damage.damage_adjust = [
            { distance: 15, damage: 20 },
            { distance: 30, damage: 18 },
            { distance: "infinite", damage: 12 }
        ];
        return event.setJson(JSON.stringify(json));
    }
    // 像素射击-最终方案
    if (id === "pixel_gun:ul_mg_data") {
        json.ammo_amount = 40;
        json.bullet.damage = 180;
        json.bullet.bullet_amount = 20;
        json.bullet.extra_damage.armor_ignore = 0.2;
        json.bullet.extra_damage.head_shot_multiplier = 1.2;
        json.bullet.extra_damage.damage_adjust = [
            { distance: 8, damage: 180 },
            { distance: 30, damage: 150 },
            { distance: "infinite", damage: 100 }
        ];
        json.reload.feed.empty = 6.5;
        json.reload.feed.tactical = 6.5;
        json.reload.cooldown.empty = 8.5;
        json.reload.cooldown.tactical = 8.5;
        json.inaccuracy.stand = 5;
        json.inaccuracy.move = 5.75;
        json.inaccuracy.sneak = 4.5;
        json.inaccuracy.lie = 4.5;
        json.inaccuracy.aim = 3.5;
        return event.setJson(JSON.stringify(json));
    }


});

// 像素射击-近战武器
TaCZServerEvents.gunDataLoad((event) => {
    const id = event.getId().toString();
    const json = JSON.parse(event.getStdJson());
    const PixelGunMelee = [
        "pixel_gun:fdemon_data",
        "pixel_gun:ls_data",
        "pixel_gun:dls_data",
        "pixel_gun:hh_data",
        "pixel_gun:rui_yan_data"
    ]
    if (PixelGunMelee.includes(id)) {

        return event.setJson(JSON.stringify(json));
    }
})

// 像素射击-狙击
TaCZServerEvents.gunDataLoad((event) => {
    const id = event.getId().toString();
    const json = JSON.parse(event.getStdJson());
    const Sniper = [
        "pixel_gun:morgan_data",
        "pixel_gun:te_data",
        "pixel_gun:prototype_gold_data",
        "pixel_gun:comet_data",
        "pixel_gun:antihero_data",
        "pixel_gun:sunrise_data",
        "pixel_gun:sakura_data",
        "pixel_gun:prototype_data",
        "pixel_gun:mam_data",
        "pixel_gun:hp_data",
        "pixel_gun:eva_data",
        "pixel_gun:antichamp_data",
        "pixel_gun:os_data"
    ]

    if (Sniper.includes(id)) {
        json.ammo_amount = 5;
        json.bullet.bullet_amount = 1;
        json.bullet.damage = 40.0;
        json.bullet.extra_damage.armor_ignore = 0.5;
        json.bullet.extra_damage.head_shot_multiplier = 2.25;
        json.bullet.extra_damage.damage_adjust = [
            { distance: 80, damage: 40 },
            { distance: "infinite", damage: 40 }
        ];
        return event.setJson(JSON.stringify(json));
    }
})
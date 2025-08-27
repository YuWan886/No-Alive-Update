const $KeyMappingRegistry = Java.loadClass("dev.architectury.registry.client.keymappings.KeyMappingRegistry");
const $KeyMapping = Java.loadClass("net.minecraft.client.KeyMapping");
const $GLFWkey = Java.loadClass("org.lwjgl.glfw.GLFW");

ClientEvents.init(() => {
    global.regKeyL = new $KeyMapping(
        "key.na.openmenu",
        $GLFWkey.GLFW_KEY_L,
        "key.keybinding.na"
    );
    $KeyMappingRegistry.register(global.regKeyL);

    global.regKeyB = new $KeyMapping(
        "key.na.openshop",
        $GLFWkey.GLFW_KEY_B,
        "key.keybinding.na"
    );
    $KeyMappingRegistry.register(global.regKeyB);
});
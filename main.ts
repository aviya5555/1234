package com.example.onebuttonmod;

import net.minecraft.client.Minecraft;
import net.minecraft.client.gui.screens.TitleScreen;
import net.minecraft.client.gui.components.Button;
import net.minecraft.network.chat.Component;
import net.minecraftforge.client.event.ScreenEvent;
import net.minecraftforge.common.MinecraftForge;
import net.minecraftforge.eventbus.api.SubscribeEvent;
import net.minecraftforge.fml.common.Mod;
import net.minecraftforge.fml.loading.FMLPaths;

import java.io.File;

@Mod("onebuttonmod")
public class OneButtonMod {

    public OneButtonMod() {
        MinecraftForge.EVENT_BUS.register(this);
    }

    @SubscribeEvent
    public void onGuiInit(ScreenEvent.Init.Post event) {
        if (event.getScreen() instanceof TitleScreen) {
            Button myButton = Button.builder(
                Component.literal("היכנס לעולם המיוחד!"),
                (btn) -> {
                    try {
                        launchCustomWorld();
                    } catch(Exception e) {
                        e.printStackTrace();
                    }
                })
                .pos(event.getScreen().width / 2 - 100, event.getScreen().height / 4 + 120)
                .size(200, 20)
                .build();
            event.addListener(myButton);
        }
    }

    private void launchCustomWorld() {
        Minecraft mc = Minecraft.getInstance();

        // שם העולם
        String worldName = "OneButtonWorld";

        // נתיב תיקיית עולמות שמורים
        File savesDir = new File(FMLPaths.GAMEDIR.get().toFile(), "saves");
        File worldDir = new File(savesDir, worldName);

        if (!worldDir.exists()) {
            // אם העולם לא קיים - פתח מסך יצירת עולם
            mc.forceSetScreen(new net.minecraft.client.gui.screens.worldselection.CreateWorldScreen(
                new net.minecraft.client.gui.screens.worldselection.SelectWorldScreen(null)
            ));
        } else {
            // אם העולם קיים - פתח מסך בחירת עולמות
            mc.forceSetScreen(new net.minecraft.client.gui.screens.worldselection.SelectWorldScreen(null));
        }
    }
}

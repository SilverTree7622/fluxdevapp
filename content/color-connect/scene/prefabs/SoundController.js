import { GAMEOPTIONS } from "../GameOption.js";
export default class SoundController {
    
    constructor()
    {
        
    }
    SoundPlay(scene,music_name)
        {
            if (!GAMEOPTIONS.CHECK_SOUND) return
            if (music_name =='bg_music')
            {
                let music_bg= scene.sound.add(music_name)
                music_bg.play()
                music_bg.setLoop(true)
            }
            else{
            let sound= scene.sound.play(music_name);
            }
        }

}

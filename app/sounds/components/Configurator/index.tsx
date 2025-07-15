"use client";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Cloud,
  Waves,
  TreePine,
  Zap,
  Wind,
  Flame,
  Music,
  Brain,
  Heart,
  Coffee,
  Moon,
} from "lucide-react";
import dynamic from "next/dynamic";

const TipsCard = dynamic(() => import("../TipsCard"), { ssr: true });

// ✅ All audio is loaded dynamically in `toggleSound`
const soundCategories = [
  {
    id: "nature",
    name: "Nature",
    icon: TreePine,
    color: "bg-green-100 text-green-600",
    sounds: [
      {
        id: "rain",
        name: "Gentle Rain",
        icon: Cloud,
        duration: "∞",
        description: "Soft rainfall on leaves",
      },
      {
        id: "ocean",
        name: "Ocean Waves",
        icon: Waves,
        duration: "∞",
        description: "Rhythmic ocean waves",
      },
      {
        id: "forest",
        name: "Forest Ambience",
        icon: TreePine,
        duration: "∞",
        description: "Birds and rustling leaves",
      },
      {
        id: "thunder",
        name: "Distant Thunder",
        icon: Zap,
        duration: "∞",
        description: "Gentle thunderstorm",
      },
      {
        id: "wind",
        name: "Mountain Wind",
        icon: Wind,
        duration: "∞",
        description: "Soft mountain breeze",
      },
      {
        id: "fire",
        name: "Crackling Fire",
        icon: Flame,
        duration: "∞",
        description: "Cozy fireplace sounds",
      },
    ],
  },
  {
    id: "ambient",
    name: "Ambient",
    icon: Music,
    color: "bg-purple-100 text-purple-600",
    sounds: [
      {
        id: "white-noise",
        name: "White Noise",
        icon: Volume2,
        duration: "∞",
        description: "Pure white noise",
      },
      {
        id: "pink-noise",
        name: "Pink Noise",
        icon: Volume2,
        duration: "∞",
        description: "Softer than white noise",
      },
      {
        id: "brown-noise",
        name: "Brown Noise",
        icon: Volume2,
        duration: "∞",
        description: "Deep, rumbling sound",
      },
      {
        id: "space",
        name: "Deep Space",
        icon: Moon,
        duration: "∞",
        description: "Cosmic ambient sounds",
      },
      {
        id: "meditation",
        name: "Meditation Bell",
        icon: Heart,
        duration: "∞",
        description: "Tibetan singing bowls",
      },
      {
        id: "cafe",
        name: "Coffee Shop",
        icon: Coffee,
        duration: "∞",
        description: "Busy café atmosphere",
      },
    ],
  },
  {
    id: "binaural",
    name: "Binaural Beats",
    icon: Brain,
    color: "bg-blue-100 text-blue-600",
    sounds: [
      {
        id: "delta",
        name: "Delta Waves",
        icon: Brain,
        duration: "∞",
        description: "0.5-4 Hz for deep sleep",
      },
      {
        id: "theta",
        name: "Theta Waves",
        icon: Brain,
        duration: "∞",
        description: "4-8 Hz for relaxation",
      },
    ],
  },
];

interface PlayingSound {
  id: string;
  volume: number;
}

export default function Configurator() {
  const [playingSounds, setPlayingSounds] = useState<PlayingSound[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("nature");
  const audioRefs = useRef<{ [key: string]: HTMLAudioElement }>({});

  const currentCategory = soundCategories.find(
    (cat) => cat.id === selectedCategory
  );

  const isSoundPlaying = (soundId: string) =>
    playingSounds.some((sound) => sound.id === soundId);

  const getSoundVolume = (soundId: string) =>
    playingSounds.find((s) => s.id === soundId)?.volume || 50;

  const toggleSound = (soundId: string) => {
    if (isSoundPlaying(soundId)) {
      setPlayingSounds((prev) => prev.filter((s) => s.id !== soundId));
      if (audioRefs.current[soundId]) {
        audioRefs.current[soundId].pause();
        audioRefs.current[soundId].currentTime = 0;
      }
    } else {
      setPlayingSounds((prev) => [...prev, { id: soundId, volume: 50 }]);

      if (!audioRefs.current[soundId]) {
        const audio = new Audio(`/${soundId}.mp3`);
        audio.loop = true;
        audio.volume = 0.5;
        audioRefs.current[soundId] = audio;
      }

      audioRefs.current[soundId]?.play().catch(console.error);
    }
  };

  const updateSoundVolume = (soundId: string, volume: number) => {
    setPlayingSounds((prev) =>
      prev.map((s) => (s.id === soundId ? { ...s, volume } : s))
    );

    if (audioRefs.current[soundId]) {
      audioRefs.current[soundId].volume = volume / 100;
    }
  };

  const stopAllSounds = () => {
    Object.entries(audioRefs.current).forEach(([id, audio]) => {
      audio.pause();
      audio.currentTime = 0;
    });
    setPlayingSounds([]);
  };

  useEffect(() => {
    return () => {
      Object.values(audioRefs.current).forEach((audio) => {
        audio.pause();
        audio.currentTime = 0;
      });
    };
  }, []);

  return (
    <div className="grid lg:grid-cols-4 gap-8">
      <div className="lg:col-span-1">
        <Card className="border-sleep-200 sticky top-24">
          <CardHeader>
            <CardTitle className="font-display">Categories</CardTitle>
            <CardDescription>Browse sound collections</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {soundCategories.map((category) => (
              <Button
                key={category.id}
                variant={
                  selectedCategory === category.id ? "default" : "outline"
                }
                onClick={() => setSelectedCategory(category.id)}
                className="w-full justify-start h-auto py-3 px-4"
              >
                <div
                  className={`h-8 w-8 rounded-lg flex items-center justify-center mr-3 ${category.color}`}
                >
                  <category.icon className="h-4 w-4" />
                </div>
                <div className="text-left">
                  <div className="font-medium">{category.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {category.sounds.length} sounds
                  </div>
                </div>
              </Button>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="lg:col-span-3 space-y-8">
        {playingSounds.length > 0 && (
          <Card className="border-dream-200 bg-gradient-to-r from-dream-50 to-sleep-50">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="font-display">Now Playing</CardTitle>
                  <CardDescription>
                    {playingSounds.length} sound
                    {playingSounds.length !== 1 ? "s" : ""} active
                  </CardDescription>
                </div>
                <Button onClick={stopAllSounds} variant="outline" size="sm">
                  Stop All
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {playingSounds.map((playingSound) => {
                  const sound = soundCategories
                    .flatMap((cat) => cat.sounds)
                    .find((s) => s.id === playingSound.id);
                  if (!sound) return null;

                  return (
                    <div
                      key={playingSound.id}
                      className="flex items-center space-x-4 p-3 bg-background/50 rounded-lg"
                    >
                      <div className="h-10 w-10 bg-dream-100 rounded-lg flex items-center justify-center">
                        <sound.icon className="h-5 w-5 text-dream-600" />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium">{sound.name}</div>
                        <div className="text-sm text-muted-foreground">
                          Volume: {playingSound.volume}%
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 min-w-[120px]">
                        <VolumeX className="h-4 w-4 text-muted-foreground" />
                        <Slider
                          value={[playingSound.volume]}
                          min={0}
                          max={100}
                          step={1}
                          onValueChange={(value) =>
                            updateSoundVolume(playingSound.id, value[0])
                          }
                          className="flex-1"
                        />
                        <Volume2 className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <Button
                        onClick={() => toggleSound(playingSound.id)}
                        size="sm"
                        variant="outline"
                      >
                        <Pause className="h-4 w-4" />
                      </Button>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Sound grid */}
        <div>
          <div className="flex items-center space-x-3 mb-6">
            <div
              className={`h-10 w-10 rounded-lg flex items-center justify-center ${currentCategory?.color}`}
            >
              {currentCategory && <currentCategory.icon className="h-5 w-5" />}
            </div>
            <div>
              <h2 className="text-2xl font-display font-bold">
                {currentCategory?.name}
              </h2>
              <p className="text-muted-foreground">
                {currentCategory?.sounds.length} sounds available
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            {currentCategory?.sounds.map((sound) => (
              <Card
                key={sound.id}
                className={`group hover:shadow-lg transition-all duration-300 cursor-pointer ${
                  isSoundPlaying(sound.id)
                    ? "border-dream-300 bg-gradient-to-br from-dream-50 to-sleep-50"
                    : "border-sleep-200 hover:border-sleep-300"
                }`}
                onClick={() => toggleSound(sound.id)}
              >
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <div
                      className={`h-12 w-12 rounded-lg flex items-center justify-center ${
                        isSoundPlaying(sound.id)
                          ? "bg-dream-200"
                          : "bg-sleep-100 group-hover:bg-sleep-200"
                      } transition-colors`}
                    >
                      <sound.icon
                        className={`h-6 w-6 ${
                          isSoundPlaying(sound.id)
                            ? "text-dream-700"
                            : "text-sleep-600"
                        }`}
                      />
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="secondary" className="text-xs">
                        {sound.duration}
                      </Badge>
                      <Button
                        size="sm"
                        variant={
                          isSoundPlaying(sound.id) ? "default" : "outline"
                        }
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleSound(sound.id);
                        }}
                      >
                        {isSoundPlaying(sound.id) ? (
                          <Pause className="h-4 w-4" />
                        ) : (
                          <Play className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                  <div>
                    <CardTitle className="font-display text-lg">
                      {sound.name}
                    </CardTitle>
                    <CardDescription className="text-sm">
                      {sound.description}
                    </CardDescription>
                  </div>
                </CardHeader>

                {isSoundPlaying(sound.id) && (
                  <CardContent className="pt-0">
                    <div className="flex items-center space-x-2">
                      <VolumeX className="h-4 w-4 text-muted-foreground" />
                      <Slider
                        value={[getSoundVolume(sound.id)]}
                        min={0}
                        max={100}
                        step={1}
                        onValueChange={(value) =>
                          updateSoundVolume(sound.id, value[0])
                        }
                        className="flex-1"
                        onClick={(e) => e.stopPropagation()}
                      />
                      <Volume2 className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        </div>

        <TipsCard />
      </div>
    </div>
  );
}

// "use client";
// import { useState, useRef, useEffect } from "react";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Slider } from "@/components/ui/slider";
// import {
//   Play,
//   Pause,
//   Volume2,
//   VolumeX,
//   Cloud,
//   Waves,
//   TreePine,
//   Zap,
//   Wind,
//   Flame,
//   Music,
//   Brain,
//   Heart,
//   Coffee,
//   Moon,
// } from "lucide-react";
// import dynamic from "next/dynamic";
// const TipsCard = dynamic(() => import("../TipsCard"), { ssr: true });

// // Sound categories and individual sounds
// const soundCategories = [
//   {
//     id: "nature",
//     name: "Nature",
//     icon: TreePine,
//     color: "bg-green-100 text-green-600",
//     sounds: [
//       {
//         id: "rain",
//         name: "Gentle Rain",
//         icon: Cloud,
//         duration: "∞",
//         description: "Soft rainfall on leaves",
//         audio: new Audio("/rain.mp3"),
//       },
//       {
//         id: "ocean",
//         name: "Ocean Waves",
//         icon: Waves,
//         duration: "∞",
//         description: "Rhythmic ocean waves",
//         audio: new Audio("/waves.mp3"),
//       },
//       {
//         id: "forest",
//         name: "Forest Ambience",
//         icon: TreePine,
//         duration: "∞",
//         description: "Birds and rustling leaves",
//         audio: new Audio("/forest.mp3"),
//       },
//       {
//         id: "thunder",
//         name: "Distant Thunder",
//         icon: Zap,
//         duration: "∞",
//         description: "Gentle thunderstorm",
//         audio: new Audio("/thunder.mp3"),
//       },
//       {
//         id: "wind",
//         name: "Mountain Wind",
//         icon: Wind,
//         duration: "∞",
//         description: "Soft mountain breeze",
//         audio: new Audio("/wind.mp3"),
//       },
//       {
//         id: "fire",
//         name: "Crackling Fire",
//         icon: Flame,
//         duration: "∞",
//         description: "Cozy fireplace sounds",
//         audio: new Audio("/fireplace.mp3"),
//       },
//     ],
//   },
//   {
//     id: "ambient",
//     name: "Ambient",
//     icon: Music,
//     color: "bg-purple-100 text-purple-600",
//     sounds: [
//       {
//         id: "white-noise",
//         name: "White Noise",
//         icon: Volume2,
//         duration: "∞",
//         description: "Pure white noise",
//         audio: new Audio("/white-noise.mp3"),
//       },
//       {
//         id: "pink-noise",
//         name: "Pink Noise",
//         icon: Volume2,
//         duration: "∞",
//         description: "Softer than white noise",
//         audio: new Audio("/pink-noise.mp3"),
//       },
//       {
//         id: "brown-noise",
//         name: "Brown Noise",
//         icon: Volume2,
//         duration: "∞",
//         description: "Deep, rumbling sound",
//         audio: new Audio("/brown-noise.mp3"),
//       },
//       {
//         id: "space",
//         name: "Deep Space",
//         icon: Moon,
//         duration: "∞",
//         description: "Cosmic ambient sounds",
//         audio: new Audio("/space.mp3"),
//       },
//       {
//         id: "meditation",
//         name: "Meditation Bell",
//         icon: Heart,
//         duration: "∞",
//         description: "Tibetan singing bowls",
//         audio: new Audio("/meditation.mp3"),
//       },
//       {
//         id: "cafe",
//         name: "Coffee Shop",
//         icon: Coffee,
//         duration: "∞",
//         description: "Busy café atmosphere",
//         audio: new Audio("/coffee-shop.mp3"),
//       },
//     ],
//   },
//   {
//     id: "binaural",
//     name: "Binaural Beats",
//     icon: Brain,
//     color: "bg-blue-100 text-blue-600",
//     sounds: [
//       {
//         id: "delta",
//         name: "Delta Waves",
//         icon: Brain,
//         duration: "∞",
//         description: "0.5-4 Hz for deep sleep",
//         audio: new Audio("/delta.mp3"),
//       },
//       {
//         id: "theta",
//         name: "Theta Waves",
//         icon: Brain,
//         duration: "∞",
//         description: "4-8 Hz for relaxation",
//         audio: new Audio("/theta.mp3"),
//       },
//     ],
//   },
// ];

// interface PlayingSound {
//   id: string;
//   volume: number;
//   audio?: HTMLAudioElement;
// }

// export default function Configurator() {
//   const [playingSounds, setPlayingSounds] = useState<PlayingSound[]>([]);
//   const [selectedCategory, setSelectedCategory] = useState<string>("nature");
//   const audioRefs = useRef<{ [key: string]: HTMLAudioElement }>({});

//   // Get currently selected category
//   const currentCategory = soundCategories.find(
//     (cat) => cat.id === selectedCategory
//   );

//   // Check if a sound is playing
//   const isSoundPlaying = (soundId: string) => {
//     return playingSounds.some((sound) => sound.id === soundId);
//   };

//   // Get volume for a sound
//   const getSoundVolume = (soundId: string) => {
//     const sound = playingSounds.find((s) => s.id === soundId);
//     return sound ? sound.volume : 50;
//   };

//   // Toggle sound play/pause
//   const toggleSound = (soundId: string) => {
//     if (isSoundPlaying(soundId)) {
//       // Stop the sound
//       setPlayingSounds((prev) => prev.filter((sound) => sound.id !== soundId));
//       if (audioRefs.current[soundId]) {
//         audioRefs.current[soundId].pause();
//         audioRefs.current[soundId].currentTime = 0;
//       }
//     } else {
//       // Start the sound
//       setPlayingSounds((prev) => [...prev, { id: soundId, volume: 50 }]);

//       // // Create audio element if it doesn't exist
//       // if (!audioRefs.current[soundId]) {
//       //   // In a real app, you'd use actual audio URLs here
//       //   // For demo purposes, we'll use placeholder URLs
//       //   const audio = new Audio(`/sounds/${soundId}.mp3`);
//       //   audio.loop = true;
//       //   audio.volume = 0.5;
//       //   audioRefs.current[soundId] = audio;
//       // }

//       // // Play the audio
//       // audioRefs.current[soundId]?.play().catch(console.error);
//       // Find the sound object from all categories
//       const sound = soundCategories
//         .flatMap((cat) => cat.sounds)
//         .find((s) => s.id === soundId);

//       if (!sound) return;

//       const audio = sound.audio;

//       if (!audioRefs.current[soundId]) {
//         audio.loop = true;
//         audio.volume = 0.5;
//         audioRefs.current[soundId] = audio;
//       }

//       audioRefs.current[soundId]?.play().catch(console.error);
//     }
//   };

//   // Update sound volume
//   const updateSoundVolume = (soundId: string, volume: number) => {
//     setPlayingSounds((prev) =>
//       prev.map((sound) => (sound.id === soundId ? { ...sound, volume } : sound))
//     );

//     if (audioRefs.current[soundId]) {
//       audioRefs.current[soundId].volume = volume / 100;
//     }
//   };

//   // Stop all sounds
//   const stopAllSounds = () => {
//     playingSounds.forEach((sound) => {
//       if (audioRefs.current[sound.id]) {
//         audioRefs.current[sound.id].pause();
//         audioRefs.current[sound.id].currentTime = 0;
//       }
//     });
//     setPlayingSounds([]);
//   };

//   // Cleanup audio on unmount
//   useEffect(() => {
//     return () => {
//       Object.values(audioRefs.current).forEach((audio) => {
//         audio.pause();
//         audio.currentTime = 0;
//       });
//     };
//   }, []);

//   return (
//     <div className="grid lg:grid-cols-4 gap-8">
//       {/* Sound Categories Sidebar */}
//       <div className="lg:col-span-1">
//         <Card className="border-sleep-200 sticky top-24">
//           <CardHeader>
//             <CardTitle className="font-display">Categories</CardTitle>
//             <CardDescription>Browse sound collections</CardDescription>
//           </CardHeader>
//           <CardContent className="space-y-2">
//             {soundCategories.map((category) => (
//               <Button
//                 key={category.id}
//                 variant={
//                   selectedCategory === category.id ? "default" : "outline"
//                 }
//                 onClick={() => setSelectedCategory(category.id)}
//                 className="w-full justify-start h-auto py-3 px-4"
//               >
//                 <div
//                   className={`h-8 w-8 rounded-lg flex items-center justify-center mr-3 ${category.color}`}
//                 >
//                   <category.icon className="h-4 w-4" />
//                 </div>
//                 <div className="text-left">
//                   <div className="font-medium">{category.name}</div>
//                   <div className="text-xs text-muted-foreground">
//                     {category.sounds.length} sounds
//                   </div>
//                 </div>
//               </Button>
//             ))}
//           </CardContent>
//         </Card>
//       </div>

//       {/* Main Content */}
//       <div className="lg:col-span-3 space-y-8">
//         {/* Currently Playing */}
//         {playingSounds.length > 0 && (
//           <Card className="border-dream-200 bg-gradient-to-r from-dream-50 to-sleep-50">
//             <CardHeader>
//               <div className="flex items-center justify-between">
//                 <div>
//                   <CardTitle className="font-display">Now Playing</CardTitle>
//                   <CardDescription>
//                     {playingSounds.length} sound
//                     {playingSounds.length !== 1 ? "s" : ""} active
//                   </CardDescription>
//                 </div>
//                 <Button onClick={stopAllSounds} variant="outline" size="sm">
//                   Stop All
//                 </Button>
//               </div>
//             </CardHeader>
//             <CardContent>
//               <div className="space-y-4">
//                 {playingSounds.map((playingSound) => {
//                   const sound = soundCategories
//                     .flatMap((cat) => cat.sounds)
//                     .find((s) => s.id === playingSound.id);

//                   if (!sound) return null;

//                   return (
//                     <div
//                       key={playingSound.id}
//                       className="flex items-center space-x-4 p-3 bg-background/50 rounded-lg"
//                     >
//                       <div className="h-10 w-10 bg-dream-100 rounded-lg flex items-center justify-center">
//                         <sound.icon className="h-5 w-5 text-dream-600" />
//                       </div>
//                       <div className="flex-1">
//                         <div className="font-medium">{sound.name}</div>
//                         <div className="text-sm text-muted-foreground">
//                           Volume: {playingSound.volume}%
//                         </div>
//                       </div>
//                       <div className="flex items-center space-x-2 min-w-[120px]">
//                         <VolumeX className="h-4 w-4 text-muted-foreground" />
//                         <Slider
//                           value={[playingSound.volume]}
//                           min={0}
//                           max={100}
//                           step={1}
//                           onValueChange={(value) =>
//                             updateSoundVolume(playingSound.id, value[0])
//                           }
//                           className="flex-1"
//                         />
//                         <Volume2 className="h-4 w-4 text-muted-foreground" />
//                       </div>
//                       <Button
//                         onClick={() => toggleSound(playingSound.id)}
//                         size="sm"
//                         variant="outline"
//                       >
//                         <Pause className="h-4 w-4" />
//                       </Button>
//                     </div>
//                   );
//                 })}
//               </div>
//             </CardContent>
//           </Card>
//         )}

//         {/* Sound Grid */}
//         <div>
//           <div className="flex items-center space-x-3 mb-6">
//             <div
//               className={`h-10 w-10 rounded-lg flex items-center justify-center ${currentCategory?.color}`}
//             >
//               {currentCategory && <currentCategory.icon className="h-5 w-5" />}
//             </div>
//             <div>
//               <h2 className="text-2xl font-display font-bold">
//                 {currentCategory?.name}
//               </h2>
//               <p className="text-muted-foreground">
//                 {currentCategory?.sounds.length} sounds available
//               </p>
//             </div>
//           </div>

//           <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
//             {currentCategory?.sounds.map((sound) => (
//               <Card
//                 key={sound.id}
//                 className={`group hover:shadow-lg transition-all duration-300 cursor-pointer ${
//                   isSoundPlaying(sound.id)
//                     ? "border-dream-300 bg-gradient-to-br from-dream-50 to-sleep-50"
//                     : "border-sleep-200 hover:border-sleep-300"
//                 }`}
//                 onClick={() => toggleSound(sound.id)}
//               >
//                 <CardHeader className="pb-4">
//                   <div className="flex items-center justify-between">
//                     <div
//                       className={`h-12 w-12 rounded-lg flex items-center justify-center ${
//                         isSoundPlaying(sound.id)
//                           ? "bg-dream-200"
//                           : "bg-sleep-100 group-hover:bg-sleep-200"
//                       } transition-colors`}
//                     >
//                       <sound.icon
//                         className={`h-6 w-6 ${
//                           isSoundPlaying(sound.id)
//                             ? "text-dream-700"
//                             : "text-sleep-600"
//                         }`}
//                       />
//                     </div>
//                     <div className="flex items-center space-x-2">
//                       <Badge variant="secondary" className="text-xs">
//                         {sound.duration}
//                       </Badge>
//                       <Button
//                         size="sm"
//                         variant={
//                           isSoundPlaying(sound.id) ? "default" : "outline"
//                         }
//                         onClick={(e) => {
//                           e.stopPropagation();
//                           toggleSound(sound.id);
//                         }}
//                       >
//                         {isSoundPlaying(sound.id) ? (
//                           <Pause className="h-4 w-4" />
//                         ) : (
//                           <Play className="h-4 w-4" />
//                         )}
//                       </Button>
//                     </div>
//                   </div>
//                   <div>
//                     <CardTitle className="font-display text-lg">
//                       {sound.name}
//                     </CardTitle>
//                     <CardDescription className="text-sm">
//                       {sound.description}
//                     </CardDescription>
//                   </div>
//                 </CardHeader>

//                 {isSoundPlaying(sound.id) && (
//                   <CardContent className="pt-0">
//                     <div className="flex items-center space-x-2">
//                       <VolumeX className="h-4 w-4 text-muted-foreground" />
//                       <Slider
//                         value={[getSoundVolume(sound.id)]}
//                         min={0}
//                         max={100}
//                         step={1}
//                         onValueChange={(value) =>
//                           updateSoundVolume(sound.id, value[0])
//                         }
//                         className="flex-1"
//                         onClick={(e) => e.stopPropagation()}
//                       />
//                       <Volume2 className="h-4 w-4 text-muted-foreground" />
//                     </div>
//                   </CardContent>
//                 )}
//               </Card>
//             ))}
//           </div>
//         </div>

//         {/* Tips Card */}
//         <TipsCard />
//       </div>
//     </div>
//   );
// }

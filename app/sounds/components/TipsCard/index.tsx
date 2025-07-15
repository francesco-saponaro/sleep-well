import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Volume2, Music, Brain } from "lucide-react";

export default function TipsCard() {
  return (
    <Card className="border-dream-200">
      <CardHeader>
        <CardTitle className="font-display">
          How to Use Soothing Sounds
        </CardTitle>
        <CardDescription>
          Tips for the best relaxation experience
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <div className="h-8 w-8 bg-dream-100 rounded-lg flex items-center justify-center shrink-0">
              <Music className="h-5 w-5 text-dream-600" />
            </div>
            <div>
              <h3 className="font-medium mb-1">Mix & Match</h3>
              <p className="text-sm text-muted-foreground">
                Combine multiple sounds to create your perfect ambient
                environment. Try rain + thunder or ocean + wind.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <div className="h-8 w-8 bg-dream-100 rounded-lg flex items-center justify-center shrink-0">
              <Volume2 className="h-5 w-5 text-dream-600" />
            </div>
            <div>
              <h3 className="font-medium mb-1">Volume Balance</h3>
              <p className="text-sm text-muted-foreground">
                Keep volumes low enough to be soothing but audible. Adjust each
                sound individually for the perfect mix.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <div className="h-8 w-8 bg-dream-100 rounded-lg flex items-center justify-center shrink-0">
              <Brain className="h-5 w-5 text-dream-600" />
            </div>
            <div>
              <h3 className="font-medium mb-1">Binaural Beats</h3>
              <p className="text-sm text-muted-foreground">
                Use headphones for binaural beats to experience the full effect
                of brainwave entrainment.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

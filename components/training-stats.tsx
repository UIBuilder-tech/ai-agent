import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

export function TrainingStats() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Training Data</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <div className="flex justify-between mb-2">
            <span className="text-sm font-medium">Links</span>
            <span className="text-sm text-muted-foreground">2/5</span>
          </div>
          <Progress value={40} />
        </div>
        <div>
          <div className="flex justify-between mb-2">
            <span className="text-sm font-medium">Files</span>
            <span className="text-sm text-muted-foreground">0/20</span>
          </div>
          <Progress value={0} />
        </div>
        <div>
          <div className="flex justify-between mb-2">
            <span className="text-sm font-medium">Characters</span>
            <span className="text-sm text-muted-foreground">10.2K/100K</span>
          </div>
          <Progress value={10.2} />
        </div>
        <div className="space-y-2">
          <h4 className="text-sm font-medium">Need more?</h4>
          <p className="text-sm text-muted-foreground">Add more links, files, and characters.</p>
          <Button className="w-full">UPGRADE</Button>
        </div>
      </CardContent>
    </Card>
  )
}


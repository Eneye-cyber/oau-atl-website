
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Mail, GraduationCap, Calendar } from "lucide-react"

export interface ExecutiveUserProps {
  fullName: string
  email: string
  studyField?: string
  yearGraduated?: number
  bioSummary: string
  positionAssigned: string
  fullSummary?: string
  imageUrl: string
  isActive: boolean
  isPreviewMode?: boolean
}

interface ExecutiveCardProps {
  executiveData: ExecutiveUserProps
}

export function ExecutiveCard({ executiveData }: ExecutiveCardProps) {
  const { fullName, email, studyField, yearGraduated, bioSummary, positionAssigned, fullSummary, imageUrl, isActive, isPreviewMode } =
    executiveData

  // Get initials for avatar fallback
  const getInitials = (name: string) => {
    if (!name) return "EX"
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .substring(0, 2)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-4">
              <Avatar className="h-16 w-16 border">
                <AvatarImage src={imageUrl || "/img/placeholder.svg"} alt={fullName} />
                <AvatarFallback>{getInitials(fullName)}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-xl">{fullName || "Executive Name"}</CardTitle>
                <CardDescription className="text-base">{positionAssigned || "Position"}</CardDescription>
                {isActive ? (
                  <Badge className="mt-1 bg-green-500 hover:bg-green-600">Active</Badge>
                ) : (
                  <Badge className="mt-1 bg-gray-500 hover:bg-gray-600">Inactive</Badge>
                )}
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pb-2">
          <div className="space-y-2 text-sm">
            {email && (
              <div className="flex items-center">
                <Mail className="mr-2 h-4 w-4 opacity-70" />
                <span>{email}</span>
              </div>
            )}
            {studyField && (
              <div className="flex items-center">
                <GraduationCap className="mr-2 h-4 w-4 opacity-70" />
                <span>{studyField}</span>
              </div>
            )}
            {yearGraduated && (
              <div className="flex items-center">
                <Calendar className="mr-2 h-4 w-4 opacity-70" />
                <span>Graduated {yearGraduated}</span>
              </div>
            )}
          </div>

          {bioSummary && (
            <div className="mt-4">
              <p className="text-sm text-muted-foreground">{bioSummary}</p>
            </div>
          )}
        </CardContent>
        {fullSummary && (
          <>
            <Separator />
            <CardFooter className="pt-4">
              <div>
                <h4 className="font-medium mb-2">Biography</h4>
                <p className="text-sm text-muted-foreground">{fullSummary}</p>
              </div>
            </CardFooter>
          </>
        )}
      </Card>

      {isPreviewMode && (<div className="text-center text-sm text-muted-foreground">
        <p>This is a preview of how the executive profile will appear</p>
      </div>)}
    </div>
  )
}

/* eslint-disable @next/next/no-img-element */
import Image from 'next/image'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { User } from 'lucide-react'

interface ExecutiveCardProps {
  name: string
  title: string
  imageSrc: string
  linkedinUrl: string
}

export function ExecutiveCard({ name, title, imageSrc, linkedinUrl }: ExecutiveCardProps) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="aspect-square relative">
          <img
            src={imageSrc ?? '/img/placeholder.svg'}
            // src={imageSrc}
            alt={`${name}, ${title}`}
            className="object-cover"
          />
        </div>
        <div className="p-4 bg-white">
          <h3 className="text-lg font-semibold">{name}</h3>
          <p className="text-sm text-muted-foreground mb-4">{title}</p>
          <Button variant="outline" className="w-full" asChild>
            <a href={linkedinUrl} target="_blank" rel="noopener noreferrer">
              <User className="mr-2 h-4 w-4" />
               Profile
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
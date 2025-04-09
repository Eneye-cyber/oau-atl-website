"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import CreateExecutiveForm from '@/app/ui/forms/members/CreateExecutiveForm';
import { ExecutiveCard, type ExecutiveUserProps } from "@/app/ui/cards/executive-card"


export default function ExecutiveCreationPage() {
  const [executiveData, setExecutiveData] = useState<ExecutiveUserProps>({
    fullName: "",
    email: "",
    studyField: "",
    yearGraduated: new Date().getFullYear(),
    bioSummary: "",
    positionAssigned: "",
    fullSummary: "",
    imageUrl: "",
    isActive: true,
    isPreviewMode: true
  })

  return (
    <main className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Create Executive User</h1>

      {/* Mobile View - Tabs */}
      <div className="block md:hidden w-full">
        <Tabs defaultValue="form">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="form">Form</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
          </TabsList>
          <TabsContent value="form">
            <Card>
              <CardHeader>
                <CardTitle>Executive Details</CardTitle>
              </CardHeader>
              <CardContent>
                <CreateExecutiveForm executiveData={executiveData} setExecutiveData={setExecutiveData} />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="preview">
            <Card>
              <CardHeader>
                <CardTitle>Preview</CardTitle>
              </CardHeader>
              <CardContent>
                <ExecutiveCard executiveData={executiveData} />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Desktop View - Side by Side */}
      <div className="hidden md:grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Executive Details</CardTitle>
          </CardHeader>
          <CardContent>
            <CreateExecutiveForm executiveData={executiveData} setExecutiveData={setExecutiveData} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Preview</CardTitle>
          </CardHeader>
          <CardContent>
            <ExecutiveCard executiveData={executiveData} />
          </CardContent>
        </Card>
      </div>
    </main>
  )
}

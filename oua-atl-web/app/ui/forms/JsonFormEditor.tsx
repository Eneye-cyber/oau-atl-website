"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useDataContext } from "../../../lib/contexts/DataContext";
import { Action, Content, JsonData, Section } from "@/app/lib/types";
import { LucideEdit2 } from "lucide-react";
import { useState } from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"

export default function JsonFormEditor({ page }: { page: string }) {
  const { state, updateItem, routes } = useDataContext();
  const [isUploading, setIsUploading] = useState(false); // Tracks upload state

  const jsonData: JsonData = state;
  // Function to sanitize input (e.g., handle special characters)
  const sanitizeInput = (value: string) => {
    // Replace quotes with escaped quotes or any other sanitization logic
    return value.replace(/"/g, '\\"');
  };
  const handleFileChange = async (
    pageKey: string,
    sectionIndex: number,
    contentIndex: number | null,
    field: string,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];  
      const url = `/api/image`; //
      const formData = new FormData();
      formData.append("file", file);

      setIsUploading(true);

      try {
        const response = await fetch(url, {
          method: "POST",
          body: formData, // No need for 'Content-Type', FormData sets it automatically
        });

        if (!response.ok) {
          throw new Error("File upload failed!");
        }

        const data = await response.json();
        if (data.payload[0].success) {
          handleInputChange(
            pageKey,
            sectionIndex,
            contentIndex,
            field,
            data.payload[0].url
          );
        } else {
          throw new Error("File upload unsuccessful!");
        }
      } catch (error) {
        console.error(error);
        alert("File upload failed. Please try again.");
      } finally {
        setIsUploading(false);
      }
    }
  };

  const handleInputChange = (
    pageKey: string,
    sectionIndex: number,
    contentIndex: number | null,
    field: string,
    value: string
  ) => {
    const sanitizedValue = sanitizeInput(value);
    const newData = { ...jsonData };
    const section = newData.pages[pageKey].sections[sectionIndex];

    type EditableContentField = "label" | "title" | "subtitle" | "text" | "media";
    type EditableSectionField = "header" | "subheader";


    if (contentIndex !== null && field ) {
      // Update content field
      section.content[contentIndex][field as EditableContentField] = sanitizedValue as any;
    } else {
      // Update section field
      section[field as EditableSectionField] = sanitizedValue;
    }

    updateItem({ ...newData });
  };

  const handleSelection = (
    pageKey: string,
    sectionIndex: number,
    contentIndex: number | null,
    value: Content
  ) => {
    const newData = { ...jsonData };
    const section = newData.pages[pageKey].sections[sectionIndex];



    if (contentIndex !== null ) {
      // Update content field
      section.content[contentIndex] = value ;
    } 

    updateItem({ ...newData });
  };
  const handleButtonInputChange =  (
    pageKey: string,
    sectionIndex: number,
    contentIndex: number | null,
    field: string,
    value: string
  ) => {
    const sanitizedValue = sanitizeInput(value);
    const newData = { ...jsonData };
    const section = newData.pages[pageKey].sections[sectionIndex];

    if (contentIndex !== null &&  section.content[contentIndex].action !== null) {
      // Update action field
      section.content[contentIndex].action[field as keyof Action] = sanitizedValue;
    } else {
      // Update section action field
      if(section.action !== null)
      section.action[field as keyof Action] = sanitizedValue;
    }

    updateItem({ ...newData });
  };

  return (
    <div className="py-4">
      {jsonData.pages?.[page] && (
        <div className={ isUploading ? 'opacity-45 pointer-events-none' : '' }>
          <Accordion type="single" collapsible className="w-full">
            {jsonData.pages?.[page].sections.map((section, sectionIndex) => (
              <AccordionItem value={section.slug} key={section.slug}>
                <AccordionTrigger>{section.name}</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4">
                    {section.header !== null && (
                      <div>
                        <Label htmlFor={`${section.slug}-header`}>Header</Label>
                        <Input
                          id={`${section.slug}-header`}
                          value={section.header || ""}
                          onChange={(e) =>
                            handleInputChange(
                              page,
                              sectionIndex,
                              null,
                              "header",
                              e.target.value
                            )
                          }
                        />
                      </div>
                    )}

                    {section.subheader !== null && (
                      <div>
                        <Label htmlFor={`${section.slug}-subheader`}>
                          Subheader
                        </Label>
                        <Input
                          id={`${section.slug}-subheader`}
                          value={section.subheader || ""}
                          onChange={(e) =>
                            handleInputChange(
                              page,
                              sectionIndex,
                              null,
                              "subheader",
                              e.target.value
                            )
                          }
                        />
                      </div>
                    )}

                    {
                      section.type === "fetch" 
                        ?
                        section.content.map((content, contentIndex) => (
                          <div key={content.id} className="border p-4 rounded">
                             <h4 className="font-semibold mb-2">
                              Content Item {contentIndex + 1}
                            </h4>
                            <SelectContentComponent 
                              slug={section.slug} 
                              title={content.title ?? ""} id={content.id}
                              onSave={(obj) => handleSelection(page, sectionIndex, contentIndex, obj)}
                            /> 
                          </div>
                        ))
                        :
                        section.content.map((content, contentIndex) => (
                          <div key={content.id} className="border p-4 rounded">
                            <h4 className="font-semibold mb-2">
                              Content Item {content.id}
                            </h4>
                            <div className="space-y-2">
                            {content.label !== null && (
                                <div>
                                  <Label
                                    htmlFor={`${section.slug}-content-${content.id}-label`}
                                  >
                                    Label
                                  </Label>
                                  <Input
                                    id={`${section.slug}-content-${content.id}-label`}
                                    value={content.label || ""}
                                    onChange={(e) =>
                                      handleInputChange(
                                        page,
                                        sectionIndex,
                                        contentIndex,
                                        "label",
                                        e.target.value
                                      )
                                    }
                                  />
                                </div>
                              )}
                              {content.title !== null && (
                                <div>
                                  <Label
                                    htmlFor={`${section.slug}-content-${content.id}-title`}
                                  >
                                    Title
                                  </Label>
                                  <Input
                                    id={`${section.slug}-content-${content.id}-title`}
                                    value={content.title || ""}
                                    onChange={(e) =>
                                      handleInputChange(
                                        page,
                                        sectionIndex,
                                        contentIndex,
                                        "title",
                                        e.target.value
                                      )
                                    }
                                  />
                                </div>
                              )}

                              {content.subtitle !== null && (
                                <div>
                                  <Label
                                    htmlFor={`${section.slug}-content-${content.id}-subtitle`}
                                  >
                                    Title
                                  </Label>
                                  <Input
                                    id={`${section.slug}-content-${content.id}-subtitle`}
                                    value={content.subtitle || ""}
                                    onChange={(e) =>
                                      handleInputChange(
                                        page,
                                        sectionIndex,
                                        contentIndex,
                                        "subtitle",
                                        e.target.value
                                      )
                                    }
                                  />
                                </div>
                              )}

                              {content.text !== null && (
                                <div>
                                  <Label
                                    htmlFor={`${section.slug}-content-${content.id}-text`}
                                  >
                                    Text
                                  </Label>
                                  <Textarea
                                    id={`${section.slug}-content-${content.id}-text`}
                                    value={content.text || ""}
                                    onChange={(e) =>
                                      handleInputChange(
                                        page,
                                        sectionIndex,
                                        contentIndex,
                                        "text",
                                        e.target.value
                                      )
                                    }
                                  />
                                </div>
                              )}


                              {content.media !== null && (
                                <div>
                                  <Label
                                    htmlFor={`${section.slug}-content-${content.id}-media-url`}
                                  >
                                    Media
                                  </Label>
                                  <div className="flex-between">
                                    <input
                                      id={`${section.slug}-content-${content.id}-media-url`}
                                      value={content.media || ""}
                                      disabled
                                      readOnly
                                    />

                                    <label className="cursor-pointer">
                                      <input
                                        type="file"
                                        className="hidden"
                                        onChange={(e) =>
                                          handleFileChange(
                                            page,
                                            sectionIndex,
                                            contentIndex,
                                            "media",
                                            e
                                          )
                                        }
                                        accept="image/*" // Restrict to image files
                                      />
                                      <LucideEdit2 />
                                    </label>
                                  </div>
                                </div>
                              )}

                              {content.action !== null && (
                                <>
                                <div>
                                  <Label
                                    htmlFor={`${section.slug}-content-${content.id}-button-label`}
                                  >
                                    Button Text
                                  </Label>
                                  <Input
                                    id={`${section.slug}-content-${content.id}-button-label`}
                                    value={content.action.label || ""}
                                    onChange={(e) =>
                                      handleButtonInputChange(
                                        page,
                                        sectionIndex,
                                        contentIndex,
                                        "label",
                                        e.target.value
                                      )
                                    }
                                  />
                                </div>

                                <div>
                                  <Label
                                    htmlFor={`${section.slug}-content-${content.id}-button-href`}
                                  >
                                    Button Destination Page
                                  </Label>
                                  <Input
                                    list="routes"
                                    id={`${section.slug}-content-${content.id}-button-href`}
                                    value={content.action.href || ""}
                                    onChange={(e) =>
                                      handleButtonInputChange(
                                        page,
                                        sectionIndex,
                                        contentIndex,
                                        "href",
                                        e.target.value
                                      )
                                    }
                                  />
                                    <datalist id="routes">
                                      {routes.map((route) => {
                                          let routeText = route.charAt(0) === '/' ? route.substring(1) : route
                                          return <option key={route} value={routeText}>{routeText}</option>
                                        }
                                      )}
                                    </datalist>

                                  </div>
                                </>
                              )}
                              

                              {/* Add more fields for content as needed */}
                            </div>
                          </div>
                        ))
                       
                    }
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      )}
    </div>
  );
}

const SelectContentComponent = ({ slug, title, id, onSave }: { slug: string; title: string; id: string | number, onSave: (obj: Content) => void }) => {
  const [isEditMode, setEditMode] = useState<boolean>(false)
  const [currTitle, setCurrTitle] = useState<string>(title)
  const [pId, setPId] = useState<string | number>(id)  
  const { getOptions } = useDataContext();

  // Ensure the slug passed matches the API's expected format
  const normalizedSlug = slug === "projects" ? "projects" : "events";
  const options = getOptions(normalizedSlug);

  const saveSelection = () => {
    const result = options.find((item) => item.id === pId)
    if(result && result.title) {
      setCurrTitle(result.title)
      onSave(result)
    }
    setEditMode(false)
  }

  return (
    <>
    {
      isEditMode ?
      (
        <div className="">
          <Select onValueChange={setPId}>
            <SelectTrigger className="w-full max-w-full">
              <SelectValue placeholder={slug === "projects" ? "Select Project" : "Select Event"} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>{slug === "projects" ? "Projects" : "Events"}</SelectLabel>
                {options.map((item) => (
                  <SelectItem key={item.id} value={`${item.id}`}>
                    {item.title}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          <div className="flex items-center justify-end gap-3 mt-3">
            <Button onClick={() => setEditMode(false)} variant={"outline"}>Cancel</Button>
            <Button onClick={saveSelection} variant={"secondary"}>Save</Button>
          </div>
        </div>
      ) : (
      <div className="flex-between gap-3">
        <Input value={currTitle} disabled readOnly />
        <Button size={"icon"} onClick={() => setEditMode(true)} className="cursor-pointer"><LucideEdit2 /></Button>
      </div>

      )
    }
    
    </>
  );
};

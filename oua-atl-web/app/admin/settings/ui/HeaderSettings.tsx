"use client";

import { ListItem, PageData } from "@/app/lib/types";
import NavBar from "@/app/ui/shared/NavBar";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LucideEdit2 } from "lucide-react";
import { toast } from 'sonner'
import { Button } from "@/components/ui/button"

const HeaderSettings = ({ jsonData }: { jsonData: PageData }) => {
  const [formData, setFormData] = useState<PageData>(jsonData);
  const [isUploading, setIsUploading] = useState(false); // Tracks upload state
  const sanitizeInput = (value: string) => {
    // Replace quotes with escaped quotes or any other sanitization logic
    return value.replace(/"/g, '\\"');
  };
  const handleFileChange = async (
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
    sectionIndex: number,
    contentIndex: number | null,
    field: string,
    value: string
  ) => {
    const sanitizedValue = sanitizeInput(value);
    const newData = { ...formData };
    const section = formData.sections[sectionIndex];

    type EditableContentField =
      | "label"
      | "title"
      | "subtitle"
      | "text"
      | "media";
    type EditableSectionField = "header" | "subheader";

    if (contentIndex !== null && field) {
      // Update content field
      section.content[contentIndex][field as EditableContentField] =
        sanitizedValue as any;
    } else {
      // Update section field
      section[field as EditableSectionField] = sanitizedValue;
    }

    setFormData({ ...newData });
  };

  const handleButtonInputChange = (
    sectionIndex: number,
    contentIndex: number | null,
    listIndex: number,
    field: string,
    value: string
  ) => {
    const sanitizedValue = sanitizeInput(value);
    const newData = { ...formData };
    const section = formData.sections[sectionIndex];

    if (contentIndex !== null && section.content[contentIndex].list !== null) {
      // Update action field
      const listItem = section.content[contentIndex].list[
        listIndex
      ] as ListItem;
      listItem[field as "href" | "label"] = sanitizedValue;
    }

    setFormData({ ...newData });
  };

const saveChanges = async () => {
      try {
        const req: Response = await fetch('/api/schema/site', {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({schema: formData, key: "header"}),
          credentials: 'include',
        })
        if(req.ok) {
          const res = await req.json();
          toast.success(res.message)
          return
        }
  
        throw new Error(req.statusText)
  
        
      } catch (error: unknown) {
        if(error instanceof Error) 
        toast.error('Something went wrong', { description: error.message})
      }
    }

  return (
    <section
      className={`w-full ${
        isUploading ? "opacity-50 pointer-events-none" : ""
      }`}
    >
      <div className="border-y py-4 w-full my-6">
        <NavBar data={formData} />
      </div>

      <div className="p-3 py-6">
        {formData.sections.map((section, sectionIndex) => (
          <div key={section.slug} className="p-3 border rounded">
            {section.content.map((content, contentIndex) => (
              <div key={content.id} className="border p-4 rounded">
                <div className="space-y-2">
                  {content.media !== null && (
                    <div>
                      <Label
                        htmlFor={`${section.slug}-content-${content.id}-media-url`}
                      >
                        Media
                      </Label>
                      <div className="flex-between gap-3">
                        <Input
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

                  {/* Add more fields for content as needed */}
                  {content?.list?.length &&
                    content.list.map((listItem: any, listIndex) => (
                      <div
                        className="grid sm:grid-cols-2 gap-3"
                        key={listIndex}
                      >
                        <div>
                          <Label
                            htmlFor={`${section.slug}-list-${listIndex}-list-label`}
                            className="font-semibold mb-2"
                          >
                            Menu Text {listIndex + 1}
                          </Label>
                          <Input
                            id={`${section.slug}-content-${listIndex}-list-label`}
                            value={listItem?.label || ""}
                            onChange={(e) =>
                              handleButtonInputChange(
                                sectionIndex,
                                contentIndex,
                                listIndex,
                                "label",
                                e.target.value
                              )
                            }
                          />
                        </div>

                        <div>
                          <Label
                            htmlFor={`${section.slug}-content-${listIndex}-list-href`}
                            className="font-semibold mb-2"
                          >
                            Menu Link {listIndex + 1}
                          </Label>
                          <Input
                            list="routes"
                            id={`${section.slug}-content-${listIndex}-list-href`}
                            value={listItem.href || ""}
                            onChange={(e) =>
                              handleButtonInputChange(
                                sectionIndex,
                                contentIndex,
                                listIndex,
                                "href",
                                e.target.value
                              )
                            }
                          />
                          {/* <datalist id="routes">
                                {routes.map((route) => {
                                    let routeText = route.charAt(0) === '/' ? route.substring(1) : route
                                    return <option key={route} value={routeText}>{routeText}</option>
                                  }
                                )}
                              </datalist> */}
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

      <Button onClick={saveChanges}>Save changes</Button>
    </section>
  );
};

export default HeaderSettings;

"use client";

import { Action, ListItem, PageData } from "@/app/lib/types";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { LucideEdit2 } from "lucide-react";
import Footer from "@/app/ui/shared/Footer";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

const HeaderSettings = ({ jsonData }: { jsonData: PageData }) => {
  const [formData, setFormData] = useState<PageData>(jsonData);
  const [isUploading, setIsUploading] = useState(false); // Tracks upload state
  const sanitizeInput = (value: string) => {
    // Replace quotes with escaped quotes or any other sanitization logic
    return value.replace(/"/g, '\\"');
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

  const handleListInputChange = (
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

  const handleButtonInputChange = (
    sectionIndex: number,
    contentIndex: number | null,
    field: string,
    value: string
  ) => {
    const sanitizedValue = sanitizeInput(value);
    const newData = { ...formData };
    const section = newData.sections[sectionIndex];

    if (
      contentIndex !== null &&
      section.content[contentIndex].action !== null
    ) {
      // Update action field
      section.content[contentIndex].action[field as keyof Action] =
        sanitizedValue;
    } else {
      // Update section action field
      if (section.action !== null)
        section.action[field as keyof Action] = sanitizedValue;
    }

    setFormData({ ...newData });
  };

  const saveChanges = async () => {
    try {
      const req: Response = await fetch("/api/schema/site", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ schema: formData, key: "social" }),
        credentials: "include",
      });
      if (req.ok) {
        const res = await req.json();
        toast.success(res.message);
        return;
      }

      throw new Error(req.statusText);
    } catch (error: unknown) {
      if (error instanceof Error)
        toast.error("Something went wrong", { description: error.message });
    }
  };

  return (
    <section
      className={`w-full ${
        isUploading ? "opacity-50 pointer-events-none" : ""
      }`}
    >
      <div className="border-y py-4 w-full my-6">
        <Footer data={JSON.parse(JSON.stringify(formData))} />
      </div>

      <div className="p-3 py-6">
        {formData.sections.map((section, sectionIndex) => (
          <div
            key={section.slug}
            className="rounded space-y-3
          "
          >
            {section.content.map((content, contentIndex) => (
              <div key={content.id} className="border p-4 rounded">
                <div className="space-y-2">
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
                            sectionIndex,
                            contentIndex,
                            "title",
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
                            sectionIndex,
                            contentIndex,
                            "text",
                            e.target.value
                          )
                        }
                      />
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
                              sectionIndex,
                              contentIndex,
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
                    </>
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
                              handleListInputChange(
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
                              handleListInputChange(
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

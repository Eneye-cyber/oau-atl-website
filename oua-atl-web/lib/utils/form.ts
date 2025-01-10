type FormField = {
  id: number;
  name: string;
  type: string;
  label: string | null;
  placeholder?: string;
  defaultValue?: string | null;
  options?: string[];
};

type FormSchema = {
  section: string;
  fields: FormField[];
};

function generateFormSchema(json: any): FormSchema[] {
  const pages = json.pages;
  const schemas: FormSchema[] = [];

  for (const pageKey in pages) {
    const page = pages[pageKey];
    if (page.sections) {
      page.sections.forEach((section: any) => {
        const fields: FormField[] = [];

        if (section.content) {
          section.content.forEach((content: any) => {
            fields.push({
              id: content.id,
              name: content.title ? content.title.replace(/\s+/g, '_').toLowerCase() : `field_${content.id}`,
              type: 'text', // Default type, can be enhanced with logic based on content
              label: content.title || content.label || `Field ${content.id}`,
              placeholder: content.text || '',
              defaultValue: content.subtitle || null,
            });
          });
        }

        schemas.push({
          section: section.name,
          fields,
        });
      });
    }
  }

  return schemas;
}

export { generateFormSchema };

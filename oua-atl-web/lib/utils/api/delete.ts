import { toast } from "sonner"; // Assuming you're using Sonner for notifications

const baseUrl = process.env.NEXT_PUBLIC_API_BASE; // Ensure this is exposed to the client

const itemremovalEndpoints = {
  event: `${baseUrl}/physical-events`,
  project: `${baseUrl}/projects`,
};


export const deleteEvent = async (id: string): Promise<boolean> => {
  if (!id) {
    toast.error("Item Identifier is missing.");
    return false;
  }

  try {
    console.log("Deleting item with ID:", id);

    const response = await fetch(`${baseUrl}/physical-events/${id}`, {
      method: "DELETE",
      credentials: "include", // Include authentication cookies if needed
    });

    if (!response.ok) {
      const errorMessage = await response.text().catch(() => "Failed to delete item");
      console.error(`Error deleting item: ${response.status} - ${errorMessage}`);
      toast.error("Failed to delete item", { description: errorMessage });
      return false;
    }

    toast.success("Item deleted successfully!");
    return true;
  } catch (error) {
    console.error("Error deleting item:", error);
    toast.error("Backend Error", { description: (error as Error)?.message || "Something went wrong" });
    return false;
  }
};
